import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { transcript, studentName, formFields } = await request.json()

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are helping fill in a clinical supervision form for a student named ${studentName}.
          
Here is the transcript from the supervision session:
${transcript}

Please fill in the following form fields based only on what was discussed about ${studentName} in the transcript. If a field cannot be determined from the transcript, write "Not discussed in this session".

Form fields to fill:
${formFields.map((f: string) => `- ${f}`).join('\n')}

Respond with a JSON object where each key is the field name and the value is what should be filled in. Only respond with the JSON, nothing else.`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response type' }, { status: 500 })
    }

    const formData = JSON.parse(content.text)
    return NextResponse.json({ formData })

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fill form' }, { status: 500 })
  }
}