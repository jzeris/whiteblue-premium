'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, Filter, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { el } from 'date-fns/locale'

// Mock data (θα αντικατασταθεί από βάση αργότερα)
const mockBookings = [
  { id: 'BK123', date: new Date('2026-01-21T14:00:00'), customer: 'John Doe', status: 'In Progress', price: 450, commission: 67.5, driver: 'Γιάννης Ζ' },
  { id: 'BK124', date: new Date('2026-01-22T10:00:00'), customer: 'Maria K', status: 'Completed', price: 320, commission: 0, driver: 'Πέτρος Κ' },
  { id: 'BK125', date: new Date('2026-01-22T18:00:00'), customer: 'Alex P', status: 'Pending', price: 600, commission: 90, driver: 'Νίκος Π' },
  { id: 'BK126', date: new Date('2026-01-23T09:30:00'), customer: 'Elena S', status: 'Pending', price: 280, commission: 42, driver: '—' },
]

export default function BookingsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Φίλτρα
  const filteredBookings = mockBookings.filter(b => {
    const matchesDate = b.date >= dateRange.from && b.date <= dateRange.to
    const matchesSearch = b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter
    return matchesDate && matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Κρατήσεις</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Νέα Κράτηση
        </button>
      </div>

      {/* Φίλτρα & Ημερολόγιο */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Ημερολόγιο – απλή επιλογή ημερομηνιών (input type date για mock) */}
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="text-sm text-slate-600">Από:</label>
          <input
            type="date"
            value={format(dateRange.from, 'yyyy-MM-dd')}
            onChange={(e) => setDateRange({ ...dateRange, from: new Date(e.target.value) })}
            className="border border-slate-300 rounded px-3 py-2"
          />
          <label className="text-sm text-slate-600">Έως:</label>
          <input
            type="date"
            value={format(dateRange.to, 'yyyy-MM-dd')}
            onChange={(e) => setDateRange({ ...dateRange, to: new Date(e.target.value) })}
            className="border border-slate-300 rounded px-3 py-2"
          />
        </div>

        {/* Search & Status Filter */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            placeholder="Αναζήτηση ID ή Πελάτη..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded px-4 py-2 w-full sm:w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded px-4 py-2 w-full sm:w-40"
          >
            <option value="all">Όλα τα status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Πίνακας Κρατήσεων */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="py-4 px-6 font-semibold">ID</th>
                <th className="py-4 px-6 font-semibold">Ημερομηνία / Ώρα</th>
                <th className="py-4 px-6 font-semibold">Πελάτης</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold">Τιμή</th>
                <th className="py-4 px-6 font-semibold">Προμήθεια</th>
                <th className="py-4 px-6 font-semibold">Οδηγός</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    Δεν βρέθηκαν κρατήσεις για τις επιλεγμένες ημερομηνίες
                  </td>
                </tr>
              ) : (
                filteredBookings.map(b => (
                  <tr key={b.id} className="border-b hover:bg-slate-50 transition">
                    <td className="py-4 px-6 font-medium">{b.id}</td>
                    <td className="py-4 px-6">{format(b.date, "dd MMM yyyy HH:mm", { locale: el })}</td>
                    <td className="py-4 px-6">{b.customer}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        b.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">€{b.price.toFixed(2)}</td>
                    <td className="py-4 px-6 font-medium">€{(b.commission || 0).toFixed(2)}</td>
                    <td className="py-4 px-6">{b.driver}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}