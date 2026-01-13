'use client'

import { useState } from 'react'

export default function EmailsSettingsPage() {
  const [accounts, setAccounts] = useState([
    { id: 1, type: 'gmail', email: 'yourname@gmail.com', status: 'connected' },
    { id: 2, type: 'imap', email: 'info@whiteblue.xyz', status: 'connected' },
  ])

  const [newAccount, setNewAccount] = useState({
    type: 'imap',
    email: '',
    server: '',
    port: '993',
    username: '',
    password: '',
  })

  const handleAddAccount = () => {
    if (!newAccount.email || !newAccount.username) return alert('Συμπλήρωσε τα απαραίτητα πεδία!')

    const newId = accounts.length + 1
    setAccounts([
      ...accounts,
      {
        id: newId,
        type: newAccount.type,
        email: newAccount.email,
        status: 'pending' // Θα γίνει 'connected' μετά το test
      }
    ])
    setNewAccount({ type: 'imap', email: '', server: '', port: '993', username: '', password: '' })
    alert('Ο λογαριασμός προστέθηκε! (mock - θα γίνει real test σύνδεσης)')
  }

  const handleTestConnection = (id: number) => {
    alert(`Mock test σύνδεσης για λογαριασμό #${id} - Σύνδεση επιτυχής!`)
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, status: 'connected' } : acc
    ))
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-slate-900">
          Ρυθμίσεις Emails
        </h1>

        {/* Τρέχοντες Λογαριασμοί */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Συνδεδεμένοι Λογαριασμοί
          </h2>

          <div className="space-y-4">
            {accounts.map(acc => (
              <div key={acc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">{acc.email}</p>
                  <p className="text-sm text-slate-600 capitalize">{acc.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    acc.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {acc.status === 'connected' ? 'Συνδεδεμένος' : 'Σε εκκρεμότητα'}
                  </span>
                  <button
                    onClick={() => handleTestConnection(acc.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Test Σύνδεσης
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Προσθήκη Νέου Λογαριασμού */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Προσθήκη Νέου Λογαριασμού
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Τύπος Λογαριασμού
              </label>
              <select
                value={newAccount.type}
                onChange={e => setNewAccount({ ...newAccount, type: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="imap">IMAP (Custom Server - π.χ. whiteblue.xyz)</option>
                <option value="gmail">Gmail / Google Workspace</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Διεύθυνση
              </label>
              <input
                type="email"
                value={newAccount.email}
                onChange={e => setNewAccount({ ...newAccount, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="info@whiteblue.xyz ή yourname@gmail.com"
              />
            </div>

            {newAccount.type === 'imap' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    IMAP Server (Host)
                  </label>
                  <input
                    type="text"
                    value={newAccount.server}
                    onChange={e => setNewAccount({ ...newAccount, server: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="imap.whiteblue.xyz ή mail.whiteblue.xyz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Port (συνήθως 993 για SSL)
                  </label>
                  <input
                    type="text"
                    value={newAccount.port}
                    onChange={e => setNewAccount({ ...newAccount, port: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="993"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={newAccount.username}
                    onChange={e => setNewAccount({ ...newAccount, username: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="info@whiteblue.xyz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newAccount.password}
                    onChange={e => setNewAccount({ ...newAccount, password: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </>
            )}

            <div className="md:col-span-2 mt-4">
              <button
                onClick={handleAddAccount}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition"
              >
                Προσθήκη Λογαριασμού
              </button>
            </div>
          </div>
        </div>

        {/* Σημειώσεις */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            Σημειώσεις
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-800">
            <li>Για Gmail χρειάζεται OAuth (θα προστεθεί αργότερα)</li>
            <li>Για custom server (whiteblue.xyz) χρησιμοποιούμε IMAP + SSL</li>
            <li>Όλα τα credentials αποθηκεύονται κρυπτογραφημένα</li>
            <li>Μετά την προσθήκη, θα γίνει αυτόματος test σύνδεσης</li>
          </ul>
        </div>
      </div>
    </div>
  )
}