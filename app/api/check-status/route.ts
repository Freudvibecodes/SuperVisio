import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(
    'https://api.assemblyai.com/v2/transcript/0e26a83e-9ee7-4e60-b1e8-295d72972d15',
    { headers: { 'Authorization': process.env.ASSEMBLYAI_API_KEY! } }
  )
  const data = await response.json()
  return NextResponse.json(data)
}