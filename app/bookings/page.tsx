'use client'

import { useState } from 'react'
import { Calendar, Search, ChevronLeft, ChevronRight, Plus, ChevronDown, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function BookingsList() {
  const [selectedDate, setSelectedDate] = useState('2026-01-08')
  const [filter, setFilter] = useState('all')
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null)

  // Mock bookings με combo packages και assignments
  const [allBookings, setAllBookings] = useState([
    { 
      id: '1001', 
      date: '2026-01-08', 
      time: '14:30', 
      client: 'John Doe', 
      pax: 4, 
      service: 'Wine Tasting Tour Package', 
      from: 'Airport', 
      to: 'Hotel Grande Bretagne', 
      driver: null, 
      vehicle: null,
      status: 'assigned',
      totalPrice: 450,
      isCombo: true,
      legs: [
        { time: '14:30', service: 'Airport Transfer', price: 80, from: 'Athens Airport', to: 'Wine Tour Start', isExternal: false, driver: 'Nikos', vehicle: 'V-Class', externalPartner: '', externalCost: 0 },
        { time: '15:30', service: 'Wine Tasting Tour', price: 290, from: 'Wine Tour Start', to: 'Wine Tour End', isExternal: false, driver: 'Petros', vehicle: 'Sprinter', externalPartner: '', externalCost: 0 },
        { time: '20:00', service: 'Airport Transfer', price: 80, from: 'Wine Tour End', to: 'Hotel Grande Bretagne', isExternal: false, driver: null, vehicle: null, externalPartner: '', externalCost: 0 }
      ],
      reference: 'REF-19074',
      leader: 'Marcus Kantowski',
      passengers: '1. John Doe - Adult\n2. Jane Doe - Child',
      flight: 'A3 123',
      pickup: 'Athens Airport',
      dropoff: 'Hotel Grande Bretagne',
      extraStops: ['Stop 1', 'Stop 2'],
      extras: ['Παιδικό Κάθισμα'],
      b2bPartner: 'Grande Bretagne',
      commissionBase: 'gross'
    },
    { 
      id: '1002', 
      date: '2026-01-08', 
      time: '18:00', 
      client: 'Blue Villas', 
      pax: 6, 
      service: 'Day Trip', 
      from: 'Hotel', 
      to: 'Sounio', 
      driver: null, 
      vehicle: null, 
      status: 'pending',
      totalPrice: 300,
      isCombo: false,
      legs: [],
      reference: 'REF-19075',
      leader: 'Family Brown',
      passengers: 'Family of 6',
      flight: '',
      pickup: 'Hotel',
      dropoff: 'Sounio',
      extraStops: [],
      extras: [],
      b2bPartner: 'Blue Villas',
      commissionBase: 'gross'
    },
  ])

  // Mock drivers & vehicles
  const drivers = [
    { name: 'Νίκος Παπαδόπουλος', busy: false },
    { name: 'Πέτρος Κωνσταντίνου', busy: true },
    { name: 'Γιώργος Δημητρίου', busy: false },
  ]

  const vehicles = [
    { plate: 'IKA-1234', model: 'Mercedes V-Class', busy: false },
    { plate: 'MYK-9012', model: 'Mercedes Sprinter', busy: true },
    { plate: 'ATH-5678', model: 'Mercedes Vito', busy: false },
  ]

  // Mock external partners
  const externalPartners = [
    { name: 'Taxi Athens', defaultCost: 50 },
    { name: 'Mykonos Transfers Ltd', defaultCost: 150 },
    { name: 'Santorini Tours', defaultCost: 200 },
  ]

  const filteredBookings = allBookings.filter(b => {
    const dateMatch = b.date === selectedDate
    if (filter === 'pending') return dateMatch && b.status === 'pending'
    if (filter === 'today') return dateMatch
    return dateMatch
  })

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-100 text-green-700'
    if (status === 'pending') return 'bg-orange-100 text-orange-700'
    return 'bg-blue-100 text-blue-700'
  }

  const getStatusText = (status: string) => {
    if (status === 'completed') return 'Ολοκληρωμένο'
    if (status === 'pending') return 'Εκκρεμές'
    return 'Ανατεθειμένο'
  }

  const toggleExpand = (id: string) => {
    setExpandedBooking(expandedBooking === id ? null : id)
  }

  // Update leg
  const updateLeg = (bookingId: string, legIndex: number, field: string, value: any) => {
    setAllBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updatedLegs = b.legs.map((leg, idx) => idx === legIndex ? { ...leg, [field]: value } : leg)
        return { ...b, legs: updatedLegs }
      }
      return b
    }))
  }

  // Αποθήκευση ΟΛΩΝ (κύριο + όλα τα legs μαζί)
  const saveBooking = (bookingId: string) => {
    const booking = allBookings.find(b => b.id === bookingId)
    if (booking) {
      console.log(`[SAVE BOOKING] ${bookingId}:`, {
        driver: booking.driver,
        vehicle: booking.vehicle,
        status: booking.status,
        legs: booking.legs // Σώζει και όλα τα legs μαζί!
      })
      const totalExternal = booking.legs.reduce((sum, l) => sum + (l.isExternal ? l.externalCost : 0), 0)
      const netProfit = booking.totalPrice - totalExternal
      console.log(`[ΤΑΜΕΙΟ] Έξοδα εξωτερικών: €${totalExternal} | Καθαρό Κέρδος: €${netProfit}`)
      alert(`Η κράτηση #${bookingId} και όλα τα legs αποθηκεύτηκαν! (mock)`)
    }
  }

  // Update main assignment
  const updateMainAssignment = (bookingId: string, field: 'driver' | 'vehicle', value: string) => {
    setAllBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, [field]: value }
      }
      return b
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Κρατήσεις</h1>
          <Link href="/bookings/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105">
              <Plus className="w-5 h-5" />
              Νέα Κράτηση
            </button>
          </Link>
        </div>

        {/* Filters + Date Picker */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50'}`}
          >
            Όλες
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${filter === 'pending' ? 'bg-orange-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50'}`}
          >
            Μη Ανατεθειμένα
          </button>
          <button 
            onClick={() => setFilter('today')}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${filter === 'today' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50'}`}
          >
            Σημερινές
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 pointer-events-none" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Αναζήτηση..." 
                className="pl-10 pr-4 py-3 border border-slate-300 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
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
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Ώρα</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Πελάτης</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Άτομα</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Υπηρεσία</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Διαδρομή</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Οδηγός</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Όχημα</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Κατάσταση</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((b) => (
                  <React.Fragment key={b.id}>
                    <tr 
                      className="hover:bg-blue-50 transition-colors cursor-pointer"
                      onClick={() => toggleExpand(b.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/bookings/${b.id}/edit`}>
                          <span className="font-mono text-blue-600 font-bold hover:underline cursor-pointer">
                            #{b.id}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{b.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{b.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{b.pax}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{b.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{b.from} → {b.to}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {b.isCombo ? (
                          <span className="text-slate-500 text-xs italic">→ Υπάρχουν {b.legs.length} legs</span>
                        ) : (
                          <select 
                            value={b.driver || ''}
                            onChange={(e) => updateMainAssignment(b.id, 'driver', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="">-- --</option>
                            {drivers.map(d => (
                              <option 
                                key={d.name} 
                                value={d.name}
                                disabled={d.busy}
                              >
                                {d.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {b.isCombo ? (
                          <span className="text-slate-500 text-xs italic">→ Ανά leg</span>
                        ) : (
                          <select 
                            value={b.vehicle || ''}
                            onChange={(e) => updateMainAssignment(b.id, 'vehicle', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="">-- --</option>
                            {vehicles.map(v => (
                              <option 
                                key={v.plate} 
                                value={v.plate}
                                disabled={v.busy}
                              >
                                {v.plate}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold ${getStatusColor(b.status)}`}>
                          {getStatusText(b.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-end">
                        {b.isCombo && (
                          <ChevronDown 
                            className={`w-5 h-5 transition-transform ${expandedBooking === b.id ? 'rotate-180' : ''}`} 
                          />
                        )}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            saveBooking(b.id)
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 flex items-center gap-1"
                        >
                          <Save className="w-4 h-4" />
                          Αποθήκευση
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Legs με ανάθεση */}
                    {b.isCombo && expandedBooking === b.id && (
                      <tr key={`expand-${b.id}`}>
                        <td colSpan={10} className="p-0">
                          <div className="bg-gray-50 px-12 py-4">
                            <p className="font-medium mb-3 text-slate-800">
                              {b.service} (σύνολο: €{b.totalPrice})
                            </p>
                            {b.legs.map((leg, legIndex) => (
                              <div key={legIndex} className="py-3 border-t border-gray-200">
                                <div className="flex justify-between mb-2">
                                  <span className="font-medium">
                                    Leg {legIndex + 1}: {leg.service} @ {leg.time}
                                  </span>
                                  <span className="text-slate-600">
                                    {leg.from} → {leg.to} • €{leg.price}
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="flex items-center gap-3">
                                    <input 
                                      type="checkbox" 
                                      checked={leg.isExternal}
                                      onChange={(e) => updateLeg(b.id, legIndex, 'isExternal', e.target.checked)}
                                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-slate-700 text-sm">Εξωτερικός</span>
                                  </div>

                                  {leg.isExternal ? (
                                    <>
                                      <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Συνεργάτες</label>
                                        <select 
                                          value={leg.externalPartner}
                                          onChange={(e) => updateLeg(b.id, legIndex, 'externalPartner', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                                        >
                                          <option value="">Επιλέξτε</option>
                                          {externalPartners.map(p => (
                                            <option key={p.name} value={p.name}>{p.name}</option>
                                          ))}
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Έξοδο (€)</label>
                                        <input 
                                          type="number" 
                                          value={leg.externalCost}
                                          onChange={(e) => updateLeg(b.id, legIndex, 'externalCost', Number(e.target.value))}
                                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-bold text-right"
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Οδηγός</label>
                                        <select 
                                          value={leg.driver || ''}
                                          onChange={(e) => updateLeg(b.id, legIndex, 'driver', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                                        >
                                          <option value="">-- Μη Ανατεθειμένο --</option>
                                          {drivers.map(d => (
                                            <option 
                                              key={d.name} 
                                              value={d.name}
                                              disabled={d.busy}
                                            >
                                              {d.name} {d.busy && '(Κατειλημμένος)'}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Όχημα</label>
                                        <select 
                                          value={leg.vehicle || ''}
                                          onChange={(e) => updateLeg(b.id, legIndex, 'vehicle', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                                        >
                                          <option value="">-- Επιλογή --</option>
                                          {vehicles.map(v => (
                                            <option 
                                              key={v.plate} 
                                              value={v.plate}
                                              disabled={v.busy}
                                            >
                                              {v.plate} - {v.model} {v.busy && '(Κατειλημμένο)'}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">Εμφάνιση 1-5 από 48 κρατήσεις</p>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">1</span>
              <span className="px-3 py-1 text-slate-600">2</span>
              <span className="px-3 py-1 text-slate-600">3</span>
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}