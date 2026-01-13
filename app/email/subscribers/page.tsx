'use client'

import { Mail, Plus, Search, Tag, Download, Upload } from 'lucide-react'

export default function SubscribersList() {
  const subscribers = [
    { id: 1, email: 'john@example.com', name: 'John Doe', tags: ['VIP', 'Athens'], lastBooking: '05/01/2026', subscribed: '2024-06-15' },
    { id: 2, email: 'bluevillas@partner.com', name: 'Blue Villas', tags: ['Partner', 'Mykonos'], lastBooking: '04/01/2026', subscribed: '2023-01-10' },
    { id: 3, email: 'maria.smith@gmail.com', name: 'Maria Smith', tags: ['Repeat', 'Athens'], lastBooking: '28/12/2025', subscribed: '2025-03-20' },
    { id: 4, email: 'vipgroup@corp.com', name: 'VIP Group Ltd', tags: ['Corporate', 'VIP'], lastBooking: '20/12/2025', subscribed: '2024-11-01' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Subscribers</h1>
          <div className="flex items-center gap-4">
            <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import CSV
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Νέος Subscriber
            </button>
          </div>
        </div>

        {/* Search & Stats */}
        <div className="flex items-center gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Αναζήτηση email ή όνομα..." 
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="text-slate-600">
            <span className="font-bold text-2xl text-slate-900">{subscribers.length}</span> συνολικά subscribers
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Όνομα</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Τελευταία Κράτηση</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Εγγραφή</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-blue-600">{s.email}</td>
                    <td className="px-6 py-4">{s.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {s.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{s.lastBooking}</td>
                    <td className="px-6 py-4 text-slate-600">{s.subscribed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}