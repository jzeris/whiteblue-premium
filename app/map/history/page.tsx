'use client'

import { useState } from 'react'
import { Calendar, Download, Filter, Search } from 'lucide-react'

export default function MapHistory() {
  const [dateFrom, setDateFrom] = useState('2026-01-03') // Default 7 μέρες πριν
  const [dateTo, setDateTo] = useState('2026-01-10')
  const [driverFilter, setDriverFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')

  // Mock ιστορικά jobs (real θα τραβάει από bookings table με filters)
  const historyJobs = [
    { id: '1001', date: '2026-01-10', time: '14:30', driver: 'Νίκος Παπαδόπουλος', vehicle: 'IKA-1234', from: 'Airport', to: 'Grande Bretagne', status: 'completed', tolls: 12.50, fuel: 45.00 },
    { id: '1002', date: '2026-01-09', time: '18:00', driver: 'Πέτρος Κωνσταντίνου', vehicle: 'ATH-3456', from: 'Hotel', to: 'Sounio', status: 'completed', tolls: 8.00, fuel: 60.00 },
    { id: '1003', date: '2026-01-08', time: '21:00', driver: 'Γιώργος Δημητρίου', vehicle: 'MYK-9012', from: 'Restaurant', to: 'Airport', status: 'cancelled', tolls: 0, fuel: 0 },
    { id: '1004', date: '2026-01-07', time: '10:00', driver: 'Νίκος Παπαδόπουλος', vehicle: 'IKA-1234', from: 'Piraeus', to: 'Athens Center', status: 'completed', tolls: 0, fuel: 30.00 },
  ]

  // Φίλτρα
  const filteredJobs = historyJobs.filter(job => {
    const dateMatch = job.date >= dateFrom && job.date <= dateTo
    const driverMatch = driverFilter === 'all' || job.driver === driverFilter
    const locationMatch = locationFilter === 'all' || job.vehicle.startsWith(locationFilter.toUpperCase().slice(0,3))
    return dateMatch && driverMatch && locationMatch
  })

  const handleExport = () => {
    console.log('Export CSV:', filteredJobs)
    alert('Εξαγωγή CSV (mock) – δες console')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Ιστορικό Live Map</h1>
            <p className="text-slate-600 mt-1">Προβολή προηγούμενων δρομολογίων</p>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            <Download className="w-5 h-5" />
            Εξαγωγή CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-8 bg-white border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Από</label>
            <input 
              type="date" 
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Έως</label>
            <input 
              type="date" 
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Οδηγός</label>
            <select 
              value={driverFilter}
              onChange={(e) => setDriverFilter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            >
              <option value="all">Όλοι</option>
              <option value="Νίκος Παπαδόπουλος">Νίκος Παπαδόπουλος</option>
              <option value="Πέτρος Κωνσταντίνου">Πέτρος Κωνσταντίνου</option>
              <option value="Γιώργος Δημητρίου">Γιώργος Δημητρίου</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Περιοχή</label>
            <select 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            >
              <option value="all">Όλες</option>
              <option value="athens">Αθήνα</option>
              <option value="mykonos">Μύκονος</option>
            </select>
          </div>
        </div>
      </div>

      {/* Χάρτης (mock) */}
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-96 flex items-center justify-center">
          <p className="text-slate-500 text-xl font-medium">
            Ιστορικός Χάρτης (pins & routes της επιλεγμένης περιόδου – Google Maps integration)
          </p>
        </div>
      </div>

      {/* Πίνακας Ιστορικού */}
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">
              Ιστορικό Κρατήσεων ({filteredJobs.length} εγγραφές)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Ημερομηνία</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Ώρα</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Οδηγός</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Όχημα</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Διαδρομή</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Διόδια</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Καύσιμα</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-500">
                      Καμία εγγραφή
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{job.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{job.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{job.driver}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{job.vehicle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{job.from} → {job.to}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">#{job.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">€{job.tolls.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">€{job.fuel.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.status === 'completed' ? 'bg-green-100 text-green-700' : job.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                          {job.status === 'completed' ? 'Ολοκληρώθηκε' : job.status === 'cancelled' ? 'Ακυρώθηκε' : 'Εκκρεμής'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}