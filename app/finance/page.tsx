'use client'

import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react'

export default function Finance() {
  const summary = {
    todayRevenue: 2340,
    todayCost: 980,
    todayProfit: 1360,
    monthRevenue: 45230,
    monthProfit: 18950,
    profitRate: 41.9
  }

  const recentBookings = [
    { id: '1001', date: '05/01', client: 'John Doe', revenue: 80, cost: 35, profit: 45 },
    { id: '1002', date: '05/01', client: 'Blue Villas', revenue: 250, cost: 110, profit: 140 },
    { id: '1003', date: '04/01', client: 'Maria Smith', revenue: 60, cost: 28, profit: 32 },
    { id: '1004', date: '04/01', client: 'VIP Group', revenue: 350, cost: 160, profit: 190 },
    { id: '1005', date: '03/01', client: 'Family Brown', revenue: 90, cost: 40, profit: 50 },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Οικονομικά</h1>
        <p className="text-slate-600 mt-1">Πλήρης εικόνα εσόδων, εξόδων και κέρδους</p>
      </div>

      {/* Summary Cards */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-emerald-600" />
            <span className="text-xs text-slate-500">Σήμερα</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">€{summary.todayRevenue.toLocaleString()}</p>
          <p className="text-sm text-slate-600 mt-2">Συνολικά Έσοδα</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <span className="text-xs text-slate-500">Σήμερα</span>
          </div>
          <p className="text-3xl font-bold text-green-600">€{summary.todayProfit.toLocaleString()}</p>
          <p className="text-sm text-slate-600 mt-2">Καθαρό Κέρδος</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-slate-500">Αυτός ο μήνας</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">€{summary.monthRevenue.toLocaleString()}</p>
          <p className="text-sm text-slate-600 mt-2">Συνολικά Έσοδα</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span className="text-xs text-slate-500">Ποσοστό Κέρδους</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">{summary.profitRate}%</p>
          <p className="text-sm text-slate-600 mt-2">Μέσος όρος</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="px-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Πρόσφατες Κρατήσεις</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Ημερομηνία</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Πελάτης</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Έσοδα</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Κόστος</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-green-600 uppercase">Κέρδος</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-600">#{b.id}</td>
                    <td className="px-6 py-4">{b.date}</td>
                    <td className="px-6 py-4">{b.client}</td>
                    <td className="px-6 py-4 text-right font-medium">€{b.revenue}</td>
                    <td className="px-6 py-4 text-right text-slate-600">€{b.cost}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-600">€{b.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
            Αναλυτική Αναφορά
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
            Έξοδα Βάρδιας
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
            Μισθοδοσία Οδηγών
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
            Εξαγωγή Excel
          </button>
        </div>
      </div>
    </div>
  )
}