'use client'

import Link from 'next/link'
import { Car, Gauge, Calendar, Users, Edit2, History } from 'lucide-react'

export default function Fleet() {
  const vehicles = [
    { id: 1, plate: 'IKA-1234', model: 'Mercedes V-Class', year: 2024, mileage: 12450, nextService: '15/02/2026', status: 'available', driver: 'Νίκος Παπαδόπουλος' },
    { id: 2, plate: 'TAX-5678', model: 'Skoda Octavia', year: 2023, mileage: 45800, nextService: '01/03/2026', status: 'in_use', driver: 'Πέτρος Κωνσταντίνου' },
    { id: 3, plate: 'MYK-9012', model: 'Mercedes V-Class', year: 2025, mileage: 8900, nextService: '20/04/2026', status: 'available', driver: 'Γιώργος Δημητρίου' },
    { id: 4, plate: 'ATH-3456', model: 'Mercedes Vito', year: 2022, mileage: 78200, nextService: '10/01/2026', status: 'maintenance', driver: '-' },
  ]

  const getStatusColor = (status: string) => {
    if (status === 'available') return 'bg-green-100 text-green-700'
    if (status === 'in_use') return 'bg-orange-100 text-orange-700'
    return 'bg-red-100 text-red-700'
  }

  const getStatusLabel = (status: string) => {
    if (status === 'available') return 'Διαθέσιμο'
    if (status === 'in_use') return 'Σε Χρήση'
    return 'Συντήρηση'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Στόλος</h1>
            <p className="text-slate-600 mt-1">Διαχείριση οχημάτων και συντήρησης</p>
          </div>
          <Link href="/fleet/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105">
              + Νέο Όχημα
            </button>
          </Link>
        </div>
      </div>

      {/* Fleet List */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Car className="w-8 h-8 text-slate-600" />
                <div>
                  <p className="font-bold text-xl text-slate-900">{v.plate}</p>
                  <p className="text-sm text-slate-600">{v.model} ({v.year})</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(v.status)}`}>
                {getStatusLabel(v.status)}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">{v.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Επόμενο service: {v.nextService}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">{v.driver || 'Χωρίς οδηγό'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <Link href={`/fleet/edit/${v.id}`} className="flex-1">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Επεξεργασία
                </button>
              </Link>
              <Link href={`/fleet/history/${v.id}`} className="flex-1">
                <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                  <History className="w-4 h-4" />
                  Ιστορικό
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}