'use client'

import { useState, useEffect } from 'react'
import { Paperclip, Search, Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface Email {
  id: string
  subject: string
  from: string
  to: string
  body: string
  date: string
  isRead: boolean
  folder: 'inbox' | 'sent' | 'drafts' | 'trash'
  account: string
  starred?: boolean
  attachments?: string[]
}

interface Account {
  id: string
  name: string
  email: string
  unreadCount: number
}

interface EmailClientProps {
  accounts: Account[]
  initialAccount?: string
}

export default function EmailClient({ accounts, initialAccount = 'all' }: EmailClientProps) {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      subject: 'Καλωσόρισμα από Gmail',
      from: 'google@gmail.com',
      to: 'you@gmail.com',
      body: 'Καλώς ήρθες στο Gmail!',
      date: '2026-01-11 09:30',
      isRead: false,
      folder: 'inbox',
      account: 'gmail',
      starred: false,
      attachments: []
    },
    {
      id: '2',
      subject: 'Επιβεβαίωση από Google',
      from: 'no-reply@google.com',
      to: 'you@gmail.com',
      body: 'Η κράτησή σου ενημερώθηκε.',
      date: '2026-01-10 17:15',
      isRead: true,
      folder: 'inbox',
      account: 'gmail',
      starred: false,
      attachments: []
    },
    {
      id: '3',
      subject: 'Νέα Κράτηση #56789',
      from: 'bookings@whiteblue.xyz',
      to: 'you@whiteblue.xyz',
      body: 'Πελάτης: Marcus Kantowski - Mykonos Package.',
      date: '2026-01-11 11:45',
      isRead: false,
      folder: 'inbox',
      account: 'whiteblue.xyz',
      starred: true,
      attachments: ['invoice.pdf']
    },
    {
      id: '4',
      subject: 'Παραγγελία #123',
      from: 'shop@whiteblue.xyz',
      to: 'you@whiteblue.xyz',
      body: 'Η παραγγελία σου ελήφθη.',
      date: '2026-01-10 12:00',
      isRead: false,
      folder: 'inbox',
      account: 'whiteblue.xyz',
      starred: false,
      attachments: []
    },
  ])

  const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'sent' | 'drafts' | 'trash'>('inbox')
  const [selectedAccount, setSelectedAccount] = useState<string>(initialAccount)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [composeMode, setComposeMode] = useState(false)
  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: '',
    body: '',
    account: accounts[0]?.id || 'whiteblue.xyz',
    attachments: [] as File[]
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const emailsPerPage = 5

  // AI draft previews + flag για να μην ξαναεμφανίζεται στο ίδιο session
  const [draftPreviews, setDraftPreviews] = useState<{ emailId: string; draftBody: string }[]>([])
  const [aiProcessing, setAiProcessing] = useState(false)
  const [hasProcessedInbox, setHasProcessedInbox] = useState(false) // ← Αυτό το flag διορθώνει το loop

  const signature = '\n\nΜε εκτίμηση,\n[Το όνομά σου]\nWhiteBlue Premium Transportation\n+30 210 123 4567\ninfo@whiteblue.xyz'

  // Reset flag όταν φεύγουμε από το inbox (cleanup effect)
  useEffect(() => {
    return () => {
      setHasProcessedInbox(false) // Επόμενη φορά που μπαίνουμε, ξαναελέγχουμε
    }
  }, [selectedFolder])

  // Auto-process unread emails ONLY ONCE per inbox visit
  useEffect(() => {
    if (selectedFolder === 'inbox' && !hasProcessedInbox && !aiProcessing) {
      const unread = emails.filter(e => !e.isRead && e.folder === 'inbox')
      if (unread.length > 0) {
        setAiProcessing(true)
        setTimeout(() => {
          const previews = unread.map(email => {
            const aiDraft = `Αγαπητέ/ή,\n\nΕυχαριστούμε για το μήνυμά σας σχετικά με "${email.subject}".\n\nΘα επανέλθουμε σύντομα.\n\nΜε εκτίμηση,\nWhiteBlue Team\n${signature}`
            return {
              emailId: email.id,
              draftBody: aiDraft
            }
          })
          setDraftPreviews(previews)
          setAiProcessing(false)
          setHasProcessedInbox(true) // ← Σημαδεύουμε ότι το κάναμε, δεν ξαναγίνεται μέχρι να φύγουμε
        }, 1500)
      }
    }
  }, [selectedFolder, emails, hasProcessedInbox, aiProcessing])

  // Φιλτράρισμα emails
  const filteredEmails = emails.filter(email => {
    const searchMatch = 
      searchQuery === '' ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase())
    const folderMatch = email.folder === selectedFolder
    const accountMatch = selectedAccount === 'all' || email.account === selectedAccount
    return searchMatch && folderMatch && accountMatch
  })

  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage)
  const paginatedEmails = filteredEmails.slice(
    (currentPage - 1) * emailsPerPage,
    currentPage * emailsPerPage
  )

  const getUnreadCount = (folder: string, accountId?: string) => {
    return emails.filter(e => 
      e.folder === folder &&
      !e.isRead &&
      (!accountId || e.account === accountId)
    ).length
  }

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email)
    if (!email.isRead) {
      setEmails(emails.map(e => e.id === email.id ? { ...e, isRead: true } : e))
    }
  }

  const handleCompose = () => {
    setComposeMode(true)
    setSelectedEmail(null)
    setNewEmail({ to: '', subject: '', body: signature, account: accounts[0]?.id || 'whiteblue.xyz', attachments: [] })
  }

  const handleSend = () => {
    if (!newEmail.to || !newEmail.subject) return alert('Συμπλήρωσε To και Subject!')

    const newId = (emails.length + 1).toString()
    setEmails([
      ...emails,
      {
        ...newEmail,
        id: newId,
        from: newEmail.account,
        date: new Date().toLocaleString('el-GR'),
        isRead: true,
        folder: 'sent',
        account: newEmail.account,
        attachments: newEmail.attachments.map(f => f.name)
      }
    ])
    setComposeMode(false)
    console.log(`Mock: Απεστάλη από ${newEmail.account} στο:`, newEmail.to, 'Attachments:', newEmail.attachments)
    alert('Email απεστάλη (mock)!')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setNewEmail({ ...newEmail, attachments: [...newEmail.attachments, ...files] })
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setNewEmail({ ...newEmail, attachments: newEmail.attachments.filter((_, i) => i !== index) })
  }

  const handleSaveDraft = () => {
    if (!newEmail.subject && !newEmail.body) return

    const newId = (emails.length + 1).toString()
    setEmails([
      ...emails,
      {
        ...newEmail,
        id: newId,
        from: newEmail.account,
        date: new Date().toLocaleString('el-GR'),
        isRead: true,
        folder: 'drafts',
        account: newEmail.account,
        attachments: newEmail.attachments.map(f => f.name)
      }
    ])
    setComposeMode(false)
    console.log(`Mock: Αποθηκεύτηκε draft στο ${newEmail.account}`)
  }

  const handleReply = () => {
    if (selectedEmail) {
      setNewEmail({
        to: selectedEmail.from,
        subject: `Re: ${selectedEmail.subject}`,
        body: `\n\n---\nΑπό: ${selectedEmail.from}\n${selectedEmail.body}\n\n${signature}`,
        account: selectedEmail.account,
        attachments: []
      })
      setComposeMode(true)
    }
  }

  const handleDelete = (emailId: string) => {
    setEmails(emails.map(e => e.id === emailId ? { ...e, folder: 'trash' } : e))
    setSelectedEmail(null)
    console.log('Mock: Μετακινήθηκε στον κάδο')
  }

  const toggleStar = (emailId: string) => {
    setEmails(emails.map(e => 
      e.id === emailId ? { ...e, starred: !e.starred } : e
    ))
  }

  const handleApproveDraft = (emailId: string) => {
    alert(`Mock: Το draft για το email #${emailId} εστάλη!`)
    setDraftPreviews(draftPreviews.filter(p => p.emailId !== emailId))
  }

  const handleEditDraft = (emailId: string, draftBody: string) => {
    const email = emails.find(e => e.id === emailId)
    if (email) {
      setNewEmail({
        to: email.from,
        subject: `Re: ${email.subject}`,
        body: draftBody,
        account: email.account,
        attachments: []
      })
      setComposeMode(true)
      setDraftPreviews(draftPreviews.filter(p => p.emailId !== emailId))
    }
  }

  const handleRejectDraft = (emailId: string) => {
    setDraftPreviews(draftPreviews.filter(p => p.emailId !== emailId))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-12 relative">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Email + Marketing</h2>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Αναζήτηση σε emails..."
        />
      </div>

      {/* Δυναμικά tabs */}
      <div className="flex gap-4 mb-6 border-b overflow-x-auto">
        <button
          className={`pb-2 px-4 font-medium transition whitespace-nowrap ${selectedAccount === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
          onClick={() => setSelectedAccount('all')}
        >
          Όλοι ({accounts.reduce((sum, acc) => sum + acc.unreadCount, 0)})
        </button>
        {accounts.map(acc => (
          <button
            key={acc.id}
            className={`pb-2 px-4 font-medium transition whitespace-nowrap ${selectedAccount === acc.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
            onClick={() => setSelectedAccount(acc.id)}
          >
            {acc.name} ({acc.unreadCount})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Folders */}
        <div className="lg:col-span-1 bg-slate-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-4">Φάκελοι</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer p-3 rounded-lg transition flex justify-between items-center ${selectedFolder === 'inbox' ? 'bg-blue-100 font-medium' : 'hover:bg-slate-100'}`}
              onClick={() => setSelectedFolder('inbox')}
            >
              <span>Εισερχόμενα</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {getUnreadCount('inbox')}
              </span>
            </li>
            <li
              className={`cursor-pointer p-3 rounded-lg transition ${selectedFolder === 'sent' ? 'bg-blue-100 font-medium' : 'hover:bg-slate-100'}`}
              onClick={() => setSelectedFolder('sent')}
            >
              Απεσταλμένα
            </li>
            <li
              className={`cursor-pointer p-3 rounded-lg transition ${selectedFolder === 'drafts' ? 'bg-blue-100 font-medium' : 'hover:bg-slate-100'}`}
              onClick={() => setSelectedFolder('drafts')}
            >
              Σχέδια
            </li>
            <li
              className={`cursor-pointer p-3 rounded-lg transition ${selectedFolder === 'trash' ? 'bg-blue-100 font-medium' : 'hover:bg-slate-100'}`}
              onClick={() => setSelectedFolder('trash')}
            >
              Κάδος
            </li>
          </ul>

          <button
            onClick={handleCompose}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            Σύνθεση Νέου Email
          </button>
        </div>

        {/* Λίστα Emails με Pagination */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-4 capitalize">
            {selectedFolder} - {selectedAccount === 'all' ? 'Όλοι' : accounts.find(a => a.id === selectedAccount)?.name || selectedAccount}
          </h3>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {paginatedEmails.length === 0 ? (
              <p className="text-slate-500 text-center py-10">Δεν υπάρχουν emails</p>
            ) : (
              paginatedEmails.map(email => (
                <div
                  key={email.id}
                  className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-start ${
                    selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-slate-50'
                  } ${!email.isRead ? 'font-semibold' : ''}`}
                  onClick={() => handleSelectEmail(email)}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        toggleStar(email.id)
                      }}
                      className={email.starred ? 'text-yellow-500' : 'text-slate-400'}
                    >
                      <Star size={18} fill={email.starred ? 'currentColor' : 'none'} />
                    </button>
                    <div>
                      <div className="text-sm text-slate-600">{email.from}</div>
                      <div className="font-medium">{email.subject}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-2">
                    {email.attachments && email.attachments.length > 0 && <Paperclip size={14} />}
                    {email.date}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-slate-100 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm">
                Σελίδα {currentPage} από {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-slate-100 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Email View / Compose */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border min-h-[500px]">
          {composeMode ? (
            <div>
              <h3 className="text-xl font-bold mb-6">Νέο Email</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Αποστολή από</label>
                  <select
                    value={newEmail.account}
                    onChange={(e) => setNewEmail({ ...newEmail, account: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Προς</label>
                  <input
                    type="email"
                    value={newEmail.to}
                    onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Θέμα</label>
                  <input
                    type="text"
                    value={newEmail.subject}
                    onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Θέμα email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Κείμενο</label>
                  <textarea
                    value={newEmail.body}
                    onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Γράψε το μήνυμά σου εδώ..."
                  />
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Επισυνάψεις</label>
                  <label className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-4 rounded-lg transition inline-flex items-center gap-2">
                    <Paperclip size={16} />
                    Προσθήκη Αρχείου
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {newEmail.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {newEmail.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <span>{file.name}</span>
                          <button
                            onClick={() => handleRemoveAttachment(idx)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSend}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Αποστολή
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Αποθήκευση ως Σχέδιο
                  </button>
                  <button
                    onClick={() => setComposeMode(false)}
                    className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-medium py-2 px-6 rounded-lg transition"
                  >
                    Ακύρωση
                  </button>
                </div>
              </div>
            </div>
          ) : selectedEmail ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">{selectedEmail.subject}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Από: <strong>{selectedEmail.from}</strong> | Προς: <strong>{selectedEmail.to}</strong> | Λογαριασμός: <strong>{accounts.find(a => a.id === selectedEmail.account)?.name || selectedEmail.account}</strong>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{selectedEmail.date}</p>
                  {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                    <p className="text-sm text-slate-600 mt-2">
                      Επισυνάψεις: {selectedEmail.attachments.join(', ')}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStar(selectedEmail.id)}
                    className={selectedEmail.starred ? 'text-yellow-500' : 'text-slate-400'}
                  >
                    <Star size={20} fill={selectedEmail.starred ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    Κλείσιμο
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 whitespace-pre-wrap text-slate-800">
                {selectedEmail.body}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleReply}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                >
                  Απάντηση
                </button>
                <button
                  onClick={() => handleDelete(selectedEmail.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition"
                >
                  Διαγραφή
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              Επίλεξε ένα email από τη λίστα ή σύνθεσε νέο
            </div>
          )}
        </div>
      </div>

      {/* AI Draft Previews Modal - Λύση 1 με Κλείσιμο */}
      {draftPreviews.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Προτεινόμενα Drafts από AI</h2>
              <button
                onClick={() => setDraftPreviews([])}
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {draftPreviews.map(preview => (
              <div key={preview.emailId} className="mb-8 border-b pb-6 last:border-b-0">
                <p className="font-medium mb-3">Για email: {emails.find(e => e.id === preview.emailId)?.subject}</p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre-wrap text-gray-800">
                  {preview.draftBody}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleApproveDraft(preview.emailId)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Ναι, Στείλε
                  </button>
                  <button
                    onClick={() => handleEditDraft(preview.emailId, preview.draftBody)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Επεξεργασία
                  </button>
                  <button
                    onClick={() => handleRejectDraft(preview.emailId)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Όχι
                  </button>
                </div>
              </div>
            ))}

            {/* Απλό κουμπί Κλείσιμο - Λύση 1 */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDraftPreviews([])}
                className="text-slate-600 hover:text-slate-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition"
              >
                Κλείσιμο (Θα τα δω αργότερα)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}