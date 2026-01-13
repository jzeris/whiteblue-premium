'use client'

import { Mail, Send, Clock, FileText, BarChart3, Plus } from 'lucide-react'

export default function EmailMarketing() {
  const campaigns = [
    { id: 1, name: 'Winter Offers 2026', sent: '02/01/2026', recipients: 1240, openRate: 42.3, clickRate: 12.8, status: 'sent' },
    { id: 2, name: 'Mykonos Early Booking', scheduled: '10/01/2026 09:00', recipients: 890, status: 'scheduled' },
    { id: 3, name: 'VIP Client Newsletter', sent: '28/12/2025', recipients: 320, openRate: 68.4, clickRate: 28.1, status: 'sent' },
    { id: 4, name: 'New Year Greeting', status: 'draft' },
  ]

  const getStatusColor = (status: string) => {
    if (status === 'sent') return 'bg-green-100 text-green-700'
    if (status === 'scheduled') return 'bg-blue-100 text-blue-700'
    return 'bg-slate-100 text-slate-600'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'sent') return <Send className="w-4 h-4" />
    if (status === 'scheduled') return <Clock className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Email Marketing</h1>
            <p className="text-slate-600 mt-1">Διαχείριση campaigns και templates</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105">
            <Plus className="w-5 h-5" />
            Νέο Campaign
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
            <p className="text-slate-600">Συνολικά Emails</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">8.420</p>
          <p className="text-sm text-green-600 mt-2">+12% αυτόν τον μήνα</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <p className="text-slate-600">Μέσο Open Rate</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">48.2%</p>
          <p className="text-sm text-green-600 mt-2">+5.3% από πέρσι</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Send className="w-8 h-8 text-purple-600" />
            <p className="text-slate-600">Conversions</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">142</p>
          <p className="text-sm text-green-600 mt-2">Νέες κρατήσεις</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="px-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Campaigns</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Ημερομηνία</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Παραλήπτες</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Open Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Click Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Κατάσταση</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{c.name}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {c.sent || c.scheduled || 'Draft'}
                    </td>
                    <td className="px-6 py-4">{c.recipients || '-'}</td>
                    <td className="px-6 py-4">{c.openRate ? `${c.openRate}%` : '-'}</td>
                    <td className="px-6 py-4">{c.clickRate ? `${c.clickRate}%` : '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(c.status)}`}>
                        {getStatusIcon(c.status)}
                        {c.status === 'sent' ? 'Απεστάλη' : c.status === 'scheduled' ? 'Προγραμματισμένο' : 'Πρόχειρο'}
                      </span>
                    </td>
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