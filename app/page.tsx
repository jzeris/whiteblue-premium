'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <div className="p-8">
        {/* Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm mb-2">Σημερινές Κρατήσεις</p>
            <p className="text-3xl font-bold text-slate-900">12</p>
            <p className="text-sm text-green-600 mt-2">+3 από χτες</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm mb-2">Μη Ανατεθειμένα</p>
            <p className="text-3xl font-bold text-slate-900">2</p>
            <p className="text-sm text-red-600 mt-2">Χρειάζονται προσοχή</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm mb-2">Διαθέσιμοι Οδηγοί</p>
            <p className="text-3xl font-bold text-slate-900">6 / 8</p>
            <p className="text-sm text-slate-600 mt-2">Έτοιμοι</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm mb-2">Έσοδα Σήμερα</p>
            <p className="text-3xl font-bold text-slate-900">€2.340</p>
            <p className="text-sm text-green-600 mt-2">+18%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="/bookings/new" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
            + Νέα Κράτηση
          </Link>
          <Link href="/bookings" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
            Λίστα Κρατήσεων
          </Link>
          <Link href="/drivers" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
            Οδηγοί
          </Link>
          <Link href="/finance" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105">
            Οικονομικά
          </Link>
        </div>
      </div>
    </div>
  )
}