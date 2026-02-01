'use client'

import { useState } from 'react'
import React from 'react' // ← ΑΥΤΟ λύνει το "React is not defined"
import { Calendar as CalendarIcon, Filter, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'
import { el } from 'date-fns/locale'

// Mock data – περισσότερα παραδείγματα για να βλέπεις live tracking αμέσως
const mockTracking = [
  { 
    id: 'BK123', 
    date: new Date('2026-02-01T14:00:00'), // Σήμερα
    customer: 'John Doe', 
    driver: 'Γιάννης Ζ', 
    status: 'In Progress', 
    location: 'Λεωφ. Κηφισίας 45, Αθήνα', 
    eta: '15:30', 
    logs: [
      { time: '14:00', event: 'Κράτηση δημιουργήθηκε' },
      { time: '14:05', event: 'Ο οδηγός αποδέχτηκε' },
      { time: '14:12', event: 'Ξεκίνησε τη διαδρομή' },
      { time: '14:28', event: 'Έφτασε στο Pickup' },
      { time: '14:45', event: 'Παρέλαβε επιβάτες' },
    ]
  },
  { 
    id: 'BK124', 
    date: new Date('2026-02-01T10:00:00'), // Σήμερα
    customer: 'Maria K', 
    driver: 'Πέτρος Κ', 
    status: 'Completed', 
    location: 'Αεροδρόμιο Ελ. Βενιζέλος', 
    eta: '11:45', 
    logs: [
      { time: '10:00', event: 'Κράτηση δημιουργήθηκε' },
      { time: '10:10', event: 'Ο οδηγός αποδέχτηκε' },
      { time: '10:20', event: 'Παρέλαβε επιβάτες' },
      { time: '11:45', event: 'Ολοκληρώθηκε' },
    ]
  },
  { 
    id: 'BK125', 
    date: new Date('2026-02-02T18:00:00'), // Αύριο
    customer: 'Alex P', 
    driver: 'Νίκος Π', 
    status: 'Pending', 
    location: '—', 
    eta: '—', 
    logs: [
      { time: '18:00', event: 'Κράτηση δημιουργήθηκε' },
      { time: '18:05', event: 'Αναμονή αποδοχής' },
    ]
  },
  { 
    id: 'BK126', 
    date: new Date('2026-02-02T09:30:00'), // Αύριο
    customer: 'Elena S', 
    driver: 'Παναγιώτης Β', 
    status: 'In Progress', 
    location: 'Σύνταγμα, Αθήνα', 
    eta: '10:45', 
    logs: [
      { time: '09:30', event: 'Κράτηση δημιουργήθηκε' },
      { time: '09:35', event: 'Ο οδηγός αποδέχτηκε' },
      { time: '09:40', event: 'Ξεκίνησε τη διαδρομή' },
    ]
  },
]

export default function LiveTrackingPage() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: today,
    to: tomorrow,
  })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null)

  // Φίλτρα
  const filteredTracking = mockTracking.filter(t => {
    const matchesDate = t.date >= dateRange.from && t.date <= dateRange.to
    const matchesSearch = t.customer.toLowerCase().includes(search.toLowerCase()) || 
                          t.id.toLowerCase().includes(search.toLowerCase()) || 
                          t.driver.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    return matchesDate && matchesSearch && matchesStatus
  })

  const toggleExpand = (id: string) => {
    setExpandedTrack(expandedTrack === id ? null : id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Live Tracking</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base">
          <MapPin className="w-4 h-4" />
          Εμφάνιση σε Χάρτη
        </button>
      </div>

      {/* Φίλτρα & Ημερολόγιο */}
      <div className="flex flex-col gap-4">
        {/* Ημερολόγιο */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 whitespace-nowrap">Από:</label>
            <input
              type="date"
              value={format(dateRange.from, 'yyyy-MM-dd')}
              onChange={(e) => setDateRange({ ...dateRange, from: new Date(e.target.value) })}
              className="border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 whitespace-nowrap">Έως:</label>
            <input
              type="date"
              value={format(dateRange.to, 'yyyy-MM-dd')}
              onChange={(e) => setDateRange({ ...dateRange, to: new Date(e.target.value) })}
              className="border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-wrap gap-4">
          <input
            placeholder="Αναζήτηση ID, Πελάτη ή Οδηγό..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded px-4 py-2 flex-1 min-w-[200px] text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded px-4 py-2 min-w-[160px] text-sm"
          >
            <option value="all">Όλα τα status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Πίνακας Live Tracking */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="py-4 px-4 font-semibold text-sm w-10"></th>
                <th className="py-4 px-4 font-semibold text-sm">Κράτηση ID</th>
                <th className="py-4 px-4 font-semibold text-sm">Ημερομηνία / Ώρα</th>
                <th className="py-4 px-4 font-semibold text-sm">Πελάτης</th>
                <th className="py-4 px-4 font-semibold text-sm">Οδηγός</th>
                <th className="py-4 px-4 font-semibold text-sm">Κατάσταση</th>
                <th className="py-4 px-4 font-semibold text-sm">Τοποθεσία</th>
                <th className="py-4 px-4 font-semibold text-sm">ETA</th>
              </tr>
            </thead>
            <tbody>
              {filteredTracking.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-sm">
                    Δεν βρέθηκαν υπηρεσίες για τις επιλεγμένες ημερομηνίες
                  </td>
                </tr>
              ) : (
                filteredTracking.map(t => (
                  <React.Fragment key={t.id}>
                    <tr
                      className="border-b hover:bg-slate-50 transition cursor-pointer"
                      onClick={() => toggleExpand(t.id)}
                    >
                      <td className="py-4 px-4">
                        {expandedTrack === t.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium">{t.id}</td>
                      <td className="py-4 px-4 text-sm">{format(t.date, "dd MMM yyyy HH:mm", { locale: el })}</td>
                      <td className="py-4 px-4 text-sm">{t.customer}</td>
                      <td className="py-4 px-4 text-sm">{t.driver}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          t.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          t.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm">{t.location}</td>
                      <td className="py-4 px-4 text-sm">{t.eta}</td>
                    </tr>

                    {/* Expandable Row */}
                    {expandedTrack === t.id && (
                      <tr>
                        <td colSpan={8} className="p-0">
                          <div className="bg-slate-50 p-6 border-t">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Live Tracking */}
                              <div>
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                  <MapPin className="w-5 h-5 text-blue-600" />
                                  Live Tracking
                                </h3>
                                <div className="bg-white rounded-lg p-4 border shadow-sm space-y-2">
                                  <p><strong>Κράτηση:</strong> {t.id}</p>
                                  <p><strong>Οδηγός:</strong> {t.driver}</p>
                                  <p><strong>Τρέχουσα Κατάσταση:</strong> {t.status}</p>
                                  <p><strong>Τοποθεσία:</strong> {t.location}</p>
                                  <p><strong>ETA:</strong> {t.eta}</p>
                                  <p className="text-sm text-slate-500 italic mt-4">(Mock – αργότερα real-time GPS map)</p>
                                </div>
                              </div>

                              {/* Ιστορικό Βημάτων */}
                              <div>
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                  <Clock className="w-5 h-5 text-purple-600" />
                                  Ιστορικό Βημάτων
                                </h3>
                                <div className="space-y-3">
                                  {t.logs.map((log, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                                      <div>
                                        <p className="font-medium">{log.event}</p>
                                      </div>
                                      <p className="text-sm text-slate-500">{log.time}</p>
                                    </div>
                                  ))}
                                  {t.logs.length === 0 && (
                                    <p className="text-slate-500 text-center py-4">Κανένα βήμα ακόμα</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}