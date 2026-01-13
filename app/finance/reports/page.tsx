'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, MapPin, Users, Download, Car, Calendar, ChevronDown } from 'lucide-react'

export default function Reports() {
  const [startDate, setStartDate] = useState('2026-01-01')
  const [endDate, setEndDate] = useState('2026-01-31')
  const [partner, setPartner] = useState('all')
  const [location, setLocation] = useState('all')
  const [driver, setDriver] = useState('all')
  const [service, setService] = useState('all')

  // Mock υπηρεσίες (real θα τραβάει από services table)
  const servicesList = [
    'all',
    'Airport Transfer',
    'Hourly',
    'Day Trip',
    'Mykonos Package',
    'Meet & Greet',
    'Assistant',
    'Wine Tasting Tour',
  ]

  // Mock συνεργάτες (real θα τραβάει από partners table)
  const [partnersData, setPartnersData] = useState([
    { name: 'Blue Villas', type: 'B2B', referralEnabled: true },
    { name: 'Grande Bretagne', type: 'B2B', referralEnabled: false },
    { name: 'Mykonos Luxury', type: 'B2B', referralEnabled: true },
    { name: 'Santorini View', type: 'external', referralEnabled: false },
    { name: 'Airport VIP', type: 'external', referralEnabled: false },
    { name: 'Taxi Athens', type: 'external', referralEnabled: true },
  ])

  const driversList = [
    'all',
    'Νίκος Παπαδόπουλος',
    'Πέτρος Κωνσταντίνου',
    'Γιώργος Δημητρίου',
  ]

  // Υπολογισμός φιλτραρισμένων συνεργατών για dropdown
  const b2bPartners = partnersData.filter(p => p.type === 'B2B').map(p => p.name)
  const externalPartners = partnersData.filter(p => p.type === 'external').map(p => p.name)
  const referralPartners = partnersData.filter(p => p.referralEnabled).map(p => p.name)

  const monthlyRevenue = [
    { month: 'Ιαν', revenue: 45800 },
    { month: 'Φεβ', revenue: 52000 },
    { month: 'Μάρ', revenue: 48000 },
    { month: 'Απρ', revenue: 61000 },
    { month: 'Μάι', revenue: 72000 },
    { month: 'Ιούν', revenue: 85000 },
    { month: 'Ιούλ', revenue: 98000 },
    { month: 'Αύγ', revenue: 105000 },
    { month: 'Σεπ', revenue: 92000 },
    { month: 'Οκτ', revenue: 78000 },
    { month: 'Νοέ', revenue: 65000 },
    { month: 'Δεκ', revenue: 58000 },
  ]

  const revenueByLocation = [
    { location: 'Αθήνα', revenue: 620000 },
    { location: 'Μύκονος', revenue: 380000 },
  ]

  // Mock αριθμός υπηρεσιών (κρατήσεων) – real από bookings table
  const serviceCounts = [
    { service: 'Airport Transfer', count: 15 },
    { service: 'Mykonos Sightseeing Tours', count: 12 },
    { service: 'Wine Tasting Tour', count: 10 },
    { service: 'Hourly', count: 8 },
    { service: 'Day Trip', count: 7 },
    { service: 'Meet & Greet', count: 5 },
    { service: 'Assistant', count: 3 },
  ]

  // Mock έσοδα ανά υπηρεσία (για το τέταρτο chart)
  const revenueByService = [
    { service: 'Airport Transfer', revenue: 450000 },
    { service: 'Mykonos Sightseeing Tours', revenue: 320000 },
    { service: 'Wine Tasting Tour', revenue: 180000 },
    { service: 'Hourly', revenue: 150000 },
    { service: 'Day Trip', revenue: 120000 },
    { service: 'Meet & Greet', revenue: 80000 },
    { service: 'Assistant', revenue: 60000 },
  ]

  const getFilteredRevenue = () => {
    let base = 1000000
    if (partner !== 'all') base *= 0.3
    if (location !== 'all') base *= 0.6
    if (driver !== 'all') base *= 0.4
    if (service !== 'all') base *= 0.5
    return Math.round(base)
  }

  // Mock φίλτρο αριθμού υπηρεσιών βάσει ημερομηνιών
  const getFilteredServiceCounts = () => {
    const daysInRange = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    const scale = daysInRange / 31 // 31 μέρες = 100%
    return serviceCounts.map(s => ({
      ...s,
      count: Math.round(s.count * scale)
    }))
  }

  const filteredData = getFilteredServiceCounts()
  const maxServiceCount = Math.max(...filteredData.map(s => s.count))

  const handleExport = (type: 'pdf' | 'excel') => {
    console.log(`Export as ${type.toUpperCase()}:`, {
      startDate,
      endDate,
      partner,
      location,
      driver,
      service,
    })
    alert(`Export ${type.toUpperCase()} (mock – check console)`)
  }

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Αναφορές</h1>
            <p className="text-slate-600 mt-1">Στατιστικά εσόδων και απόδοσης</p>
          </div>
        </div>
      </div>

      {/* ΦΙΛΤΡΑ – ΠΑΝΩ ΑΠΟ ΤΑ KPI */}
      <div className="p-8 bg-white border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Από</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Έως</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            />
          </div>

          {/* Συνεργάτες – με υπομενού */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Συνεργάτες</label>
            <div className="relative">
              <select
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg appearance-none"
              >
                <option value="all">Όλοι οι συνεργάτες</option>
                <optgroup label="B2B Συνεργάτες">
                  {partnersData.filter(p => p.type === 'B2B').map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Εξωτερικοί Συνεργάτες">
                  {partnersData.filter(p => p.type === 'external').map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Referrals">
                  {partnersData.filter(p => p.referralEnabled).map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 pointer-events-none" />
            </div>
          </div>

          {/* Περιοχή */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Περιοχή</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            >
              <option value="all">Όλες οι περιοχές</option>
              <option value="athens">Αθήνα</option>
              <option value="mykonos">Μύκονος</option>
            </select>
          </div>

          {/* Οδηγός */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Οδηγός</label>
            <select
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            >
              <option value="all">Όλοι οι οδηγοί</option>
              {driversList.filter(d => d !== 'all').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* ΝΕΟ: Υπηρεσίες */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Υπηρεσίες</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            >
              {servicesList.map(s => (
                <option key={s} value={s}>{s === 'all' ? 'Όλες οι υπηρεσίες' : s}</option>
              ))}
            </select>
          </div>

          {/* Export κουμπιά */}
          <div className="flex flex-col gap-2 md:flex-row md:items-end">
            <button 
              onClick={() => handleExport('pdf')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              PDF
            </button>
            <button 
              onClick={() => handleExport('excel')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-bold">Σύνολο Εσόδων</h3>
          </div>
          <p className="text-4xl font-bold text-green-600">€{getFilteredRevenue().toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2">+15% από πέρσι</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold">Μέσος Όρος / Κράτηση</h3>
          </div>
          <p className="text-4xl font-bold text-blue-600">€380</p>
          <p className="text-sm text-blue-600 mt-2">+8% από πέρσι</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Car className="w-8 h-8 text-purple-600" />
            <h3 className="text-xl font-bold">Ολοκληρωμένες Διαδρομές</h3>
          </div>
          <p className="text-4xl font-bold text-purple-600">2.632</p>
          <p className="text-sm text-purple-600 mt-2">+12% από πέρσι</p>
        </div>
      </div>

      {/* Charts */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Έσοδα ανά Μήνα */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4">Έσοδα ανά Μήνα</h3>
          <div className="relative h-64 flex items-end gap-4 px-4">
            {monthlyRevenue.map(m => {
              const height = (m.revenue / maxRevenue) * 100
              return (
                <div key={m.month} className="flex-1 h-full flex flex-col justify-end items-center">
                  <div
                    className="w-full bg-blue-600 rounded-t-lg min-h-[8px]"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs mt-2">{m.month}</span>
                  <span className="text-xs text-slate-500">
                    €{m.revenue.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Έσοδα ανά Περιοχή */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4">Έσοδα ανά Περιοχή</h3>
          {revenueByLocation.map(l => (
            <div key={l.location} className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-indigo-600" />
                {l.location}
              </div>
              <span className="font-bold text-indigo-600">
                €{l.revenue.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Αριθμός Ανά Υπηρεσία – ΤΟ ΤΡΙΤΟ CHART, ΟΠΩΣ ΖΗΤΗΣΕΣ */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4">Αριθμός Ανά Υπηρεσία</h3>
          {serviceCounts.map(s => (
            <div key={s.service} className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <Car className="w-6 h-6 text-teal-600" />
                {s.service}
              </div>
              <span className="font-bold text-teal-600">
                {s.count}
              </span>
            </div>
          ))}
        </div>

        {/* Έσοδα ανά Υπηρεσία – ΤΟ ΤΕΤΑΡΤΟ, ΠΡΟΣΤΕΘΗΚΕ ΞΑΝΑ */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-4">Έσοδα ανά Υπηρεσία</h3>
          {revenueByService.map(s => (
            <div key={s.service} className="flex justify-between py-2">
              <div className="flex items-center gap-3">
                <Car className="w-6 h-6 text-teal-600" />
                {s.service}
              </div>
              <span className="font-bold text-teal-600">
                €{s.revenue.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}