import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const sessionId = formData.get('sessionId') as string
    const file = formData.get('file') as File | null
    const recordingUrl = formData.get('recordingUrl') as string | null

    console.log('Processing recording for session:', sessionId)

    const { data: session } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single()
      const templateId = formData.get('templateId') as string | null

if (templateId) {
  await supabase.from('sessions').update({ form_template_id: templateId }).eq('id', sessionId)
}

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    let transcriptId: string

    if (file) {
      console.log('Uploading file to AssemblyAI...')
      const fileBuffer = await file.arrayBuffer()
      
      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'Authorization': process.env.ASSEMBLYAI_API_KEY!,
          'Content-Type': 'application/octet-stream',
        },
        body: fileBuffer,
      })

      const uploadData = await uploadResponse.json()
      console.log('Upload response:', JSON.stringify(uploadData))

      if (!uploadData.upload_url) {
        return NextResponse.json({ error: 'Failed to upload file to AssemblyAI', detail: uploadData }, { status: 500 })
      }

      const submitResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'Authorization': process.env.ASSEMBLYAI_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: uploadData.upload_url,
          speaker_labels: true,
          speakers_expected: session.students.length + 1,
          speech_models: ['universal-2'],
        }),
      })

      const submitData = await submitResponse.json()
      console.log('Transcript submitted:', JSON.stringify(submitData))

      if (!submitData.id) {
        return NextResponse.json({ error: 'Failed to create transcript', detail: submitData }, { status: 500 })
      }

      transcriptId = submitData.id

    } else if (recordingUrl) {
      console.log('Submitting URL to AssemblyAI...')
      const submitResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'Authorization': process.env.ASSEMBLYAI_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: recordingUrl,
          speaker_labels: true,
          speakers_expected: session.students.length + 1,
          speech_models: ['universal-2'],
        }),
      })

      const submitData = await submitResponse.json()
      console.log('Transcript submitted:', JSON.stringify(submitData))

      if (!submitData.id) {
        return NextResponse.json({ error: 'Failed to create transcript', detail: submitData }, { status: 500 })
      }

      transcriptId = submitData.id
    } else {
      return NextResponse.json({ error: 'No file or URL provided' }, { status: 400 })
    }

    await supabase.from('sessions').update({
      transcript_id: transcriptId,
      status: 'processing',
    }).eq('id', sessionId)

    return NextResponse.json({
      success: true,
      message: 'Recording submitted for processing',
      transcriptId,
    })

  } catch (error) {
    console.log('Submit error:', error)
    return NextResponse.json({ error: 'Failed to submit recording' }, { status: 500 })
  }
}