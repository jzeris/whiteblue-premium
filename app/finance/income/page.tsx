'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Download, Users } from 'lucide-react'

export default function Income() {
  // Default: ολόκληρος ο τρέχων μήνας (Ιανουάριος 2026)
  const currentDate = new Date(2026, 0, 10) // 10 Ιαν 2026
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0]
  const today = currentDate.toISOString().split('T')[0]

  const [dateFrom, setDateFrom] = useState(startOfMonth)
  const [dateTo, setDateTo] = useState(today)

  // Mock έσοδα ανά συνεργάτη (real θα τραβάει από API με filter dateFrom/dateTo)
  const revenueByPartner = [
    { partner: 'Blue Villas', revenue: 280000 },
    { partner: 'Grande Bretagne', revenue: 220000 },
    { partner: 'Mykonos Luxury', revenue: 180000 },
    { partner: 'Santorini View', revenue: 120000 },
    { partner: 'Airport VIP', revenue: 90000 },
    { partner: 'Taxi Athens', revenue: 60000 },
  ]

  // Mock φίλτρο βάσει ημερομηνιών (πραγματικά θα γίνεται από backend)
  const getFilteredRevenueByPartner = () => {
    // Εδώ θα έκανες real filter βάσει dateFrom/dateTo
    // Mock: απλά μειώνουμε λίγο αν το εύρος είναι μικρότερο
    const daysInRange = Math.ceil((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24))
    const scale = daysInRange / 31 // 31 μέρες = 100%
    return revenueByPartner.map(p => ({
      ...p,
      revenue: Math.round(p.revenue * scale)
    }))
  }

  const filteredData = getFilteredRevenueByPartner()
  const maxRevenue = Math.max(...filteredData.map(p => p.revenue))

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Έσοδα</h1>
            <p className="text-slate-600 mt-1">Σύνολο εσόδων, αναφορές, invoices</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Date Range Picker – Μπροστά */}
      <div className="p-8 bg-white border-b border-slate-200">
        <div className="flex items-center gap-6 max-w-md">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Από</label>
            <input 
              type="date" 
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Έως</label>
            <input 
              type="date" 
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-bold">Σύνολο Μήνα</h3>
          </div>
          <p className="text-4xl font-bold text-green-600 mt-2">€45.800</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <h3 className="text-xl font-bold">Εκκρεμείς Πληρωμές</h3>
          </div>
          <p className="text-4xl font-bold text-orange-600 mt-2">€8.200</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold">Μέσος Όρος / Κράτηση</h3>
          </div>
          <p className="text-4xl font-bold text-blue-600 mt-2">€380</p>
        </div>
      </div>

      {/* ΤΟ CHART – Έσοδα ανά Συνεργάτη (δυναμικό βάσει ημερομηνιών) */}
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-bold mb-6">Έσοδα ανά Συνεργάτη</h3>
          <div className="relative h-80 flex items-end gap-6 px-4">
            {filteredData.map(p => {
              const height = (p.revenue / maxRevenue) * 100
              return (
                <div key={p.partner} className="flex-1 h-full flex flex-col justify-end items-center">
                  <div
                    className="w-full bg-purple-600 rounded-t-lg transition-all duration-300 hover:bg-purple-700"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs mt-2 text-slate-600 text-center">{p.partner}</span>
                  <span className="text-xs font-medium text-slate-900">
                    €{p.revenue.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}