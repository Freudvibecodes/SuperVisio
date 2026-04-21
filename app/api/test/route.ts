import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
  
  return NextResponse.json({ 
    count: data?.length || 0,
    error: error?.message || null,
    sessions: data
  })
}