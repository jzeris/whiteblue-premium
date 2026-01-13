import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://ddheltkywyh1fphqidik.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkaGVsdGt5d3loMWZwaHFpZGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNzI4NzEsImV4cCI6MjA1MTY0ODg3MX0.J2dX8hYmfzSIsiNjI1I6ImRk'
  )
}