import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const now = new Date()
    
    const torontoOffset = -4 * 60
    const torontoTime = new Date(now.getTime() + torontoOffset * 60 * 1000)
    const tenMinutesFromNow = new Date(torontoTime.getTime() + 10 * 60 * 1000)
    const fiveMinutesAgo = new Date(torontoTime.getTime() - 5 * 60 * 1000)

    const currentDate = torontoTime.toISOString().split('T')[0]
    
    const fromHour = fiveMinutesAgo.getUTCHours().toString().padStart(2, '0')
    const fromMinute = fiveMinutesAgo.getUTCMinutes().toString().padStart(2, '0')
    const toHour = tenMinutesFromNow.getUTCHours().toString().padStart(2, '0')
    const toMinute = tenMinutesFromNow.getUTCMinutes().toString().padStart(2, '0')

    const fromTime = `${fromHour}:${fromMinute}`
    const toTime = `${toHour}:${toMinute}`

    console.log(`Checking for sessions between ${fromTime} and ${toTime} on ${currentDate}`)

    const { data: sessions, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('date', currentDate)
      .eq('status', 'scheduled')
      .gte('time', fromTime)
      .lte('time', toTime)

    if (error) {
      console.log('Supabase error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Found ${sessions?.length || 0} sessions`)
    console.log('All scheduled sessions:', JSON.stringify(sessions))

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ 
        message: 'No sessions to start',
        checked: { date: currentDate, from: fromTime, to: toTime }
      })
    }

    for (const session of sessions) {
      if (!session.zoom_link) continue

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

    return NextResponse.json({ message: 'Cron job completed' })

  } catch (error) {
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}