'use client'

import EmailClient from '@/components/EmailClient'

// Mock λίστα accounts (θα έρχεται αργότερα από ρυθμίσεις/DB)
const mockAccounts = [
  { id: 'gmail', name: 'Gmail', email: 'yourname@gmail.com', unreadCount: 2 },
  { id: 'whiteblue.xyz', name: 'whiteblue.xyz', email: 'info@whiteblue.xyz', unreadCount: 3 },
  { id: 'company', name: 'Εταιρικό Email', email: 'office@company.com', unreadCount: 1 },
]

export default function EmailsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Τίτλος σελίδας */}
        <h1 className="text-3xl font-bold text-slate-900">
          Email + Marketing - Όλοι οι Λογαριασμοί
        </h1>

        {/* Το EmailClient με δυναμική λίστα accounts και αρχική επιλογή 'all' */}
        <EmailClient accounts={mockAccounts} initialAccount="all" />
      </div>
    </div>
  )
}