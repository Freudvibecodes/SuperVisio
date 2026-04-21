import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('status', 'scheduled')

    if (error) {
      console.log('Supabase error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Found ${sessions?.length || 0} scheduled sessions`)

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ message: 'No sessions to start' })
    }

    const now = new Date()
    const torontoOffset = -4 * 60
    const torontoTime = new Date(now.getTime() + torontoOffset * 60 * 1000)
    const currentDate = torontoTime.toISOString().split('T')[0]
    const currentHour = torontoTime.getUTCHours().toString().padStart(2, '0')
    const currentMinute = torontoTime.getUTCMinutes().toString().padStart(2, '0')
    const currentTime = `${currentHour}:${currentMinute}`

    console.log(`Toronto time: ${currentDate} ${currentTime}`)

    const sessionsToStart = sessions.filter(s => {
      const sessionDateTime = `${s.date} ${s.time}`
      const currentDateTime = `${currentDate} ${currentTime}`
      const fiveMinutesAgo = new Date(torontoTime.getTime() - 5 * 60 * 1000)
      const fiveAgoDate = fiveMinutesAgo.toISOString().split('T')[0]
      const fiveAgoHour = fiveMinutesAgo.getUTCHours().toString().padStart(2, '0')
      const fiveAgoMinute = fiveMinutesAgo.getUTCMinutes().toString().padStart(2, '0')
      const fiveAgoTime = `${fiveAgoDate} ${fiveAgoHour}:${fiveAgoMinute}`
      const tenMinutesFromNow = new Date(torontoTime.getTime() + 10 * 60 * 1000)
      const tenFromDate = tenMinutesFromNow.toISOString().split('T')[0]
      const tenFromHour = tenMinutesFromNow.getUTCHours().toString().padStart(2, '0')
      const tenFromMinute = tenMinutesFromNow.getUTCMinutes().toString().padStart(2, '0')
      const tenFromTime = `${tenFromDate} ${tenFromHour}:${tenFromMinute}`
      return sessionDateTime >= fiveAgoTime && sessionDateTime <= tenFromTime
    })

    console.log(`Sessions to start: ${sessionsToStart.length}`)

    for (const session of sessionsToStart) {
      if (!session.zoom_link || session.zoom_link.includes('insert into')) continue

      const botResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/bot`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            meetingUrl: session.zoom_link,
            sessionId: session.id,
          }),
        }
      )

      const botData = await botResponse.json()
      console.log('Bot response:', JSON.stringify(botData))

      if (botData.botId) {
        await supabase
          .from('sessions')
          .update({ status: 'live' })
          .eq('id', session.id)
        console.log(`Bot joined session ${session.id}`)
      }
    }

    return NextResponse.json({ message: 'Cron job completed', checked: currentDateTime, started: sessionsToStart.length })

  } catch (error) {
    console.log('Cron error:', error)
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}