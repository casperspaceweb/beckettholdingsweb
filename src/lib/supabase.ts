import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lapsygjoxwgrfanhlmuf.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcHN5Z2pveHdncmZhbmhsbXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTU0MTEsImV4cCI6MjA2ODE3MTQxMX0.yYmxO4mknb10_7fgvYuEeuIADObn4PBAR7BSBc8vy58'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ProjectSubmission = {
  id?: string
  first_name: string
  last_name: string
  email: string
  contact: string
  preferred_contact: 'whatsapp' | 'sms' | 'both'
  service: string
  service_details: Record<string, any>
  created_at?: string
}