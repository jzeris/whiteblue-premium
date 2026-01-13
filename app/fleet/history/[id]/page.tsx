'use client'

import { useState } from 'react'
import { Car, Gauge, Calendar, Wrench, Fuel, Receipt, Plus, X } from 'lucide-react'

export default function VehicleHistory() {
  // Mock data
  const vehicle = {
    plate: 'IKA-1234',
    model: 'Mercedes V-Class (2024)',
    currentMileage: 12450,
  }

  const [mileageHistory, setMileageHistory] = useState([
    { date: '01/01/2026', mileage: 12000 },
    { date: '15/12/2025', mileage: 11000 },
  ])

  const [serviceHistory, setServiceHistory] = useState([
    { date: '15/12/2025', description: 'Αλλαγή λαδιών + φίλτρα', cost: 280 },
    { date: '01/08/2025', description: 'Τακάκια + δίσκοι', cost: 650 },
  ])

  const [fuelHistory, setFuelHistory] = useState([
    { date: '03/01/2026', liters: 65, cost: 110, card: 'Shell Card #1234' },
    { date: '20/12/2025', liters: 70, cost: 118, card: 'Shell Card #1234' },
  ])

  const [tollsHistory, setTollsHistory] = useState([
    { month: 'Ιανουάριος 2026', total: 85 },
    { month: 'Δεκέμβριος 2025', total: 120 },
  ])

  // Modal for Mileage
  const [showMileageModal, setShowMileageModal] = useState(false)
  const [newMileageDate, setNewMileageDate] = useState('')
  const [newMileageValue, setNewMileageValue] = useState('')

  const addMileage = () => {
    if (newMileageDate && newMileageValue) {
      setMileageHistory([...mileageHistory, { date: newMileageDate, mileage: Number(newMileageValue) }])
      setNewMileageDate('')
      setNewMileageValue('')
      setShowMileageModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Ιστορικό Οχήματος</h1>
        <p className="text-xl text-slate-700 mt-2">{vehicle.plate} – {vehicle.model}</p>
        <p className="text-slate-600 mt-1">Τρέχοντα χιλιόμετρα: {vehicle.currentMileage.toLocaleString()} km</p>
      </div>

      {/* Sections */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mileage History */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Gauge className="w-6 h-6 text-slate-600" />
              Ιστορικό Χιλιομέτρων
            </h2>
            <button onClick={() => setShowMileageModal(true)} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {mileageHistory.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-700">{m.date}</span>
                <span className="font-medium">{m.mileage.toLocaleString()} km</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service History */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Wrench className="w-6 h-6 text-slate-600" />
              Service History
            </h2>
            <button className="p-2 bg-slate-300 text-slate-500 rounded-lg cursor-not-allowed">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {serviceHistory.map((s, i) => (
              <div key={i} className="py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">{s.date}</span>
                  <span className="font-medium text-green-600">€{s.cost}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fuel History */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Fuel className="w-6 h-6 text-slate-600" />
              Γεμίσματα Καυσίμων
            </h2>
            <button className="p-2 bg-slate-300 text-slate-500 rounded-lg cursor-not-allowed">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {fuelHistory.map((f, i) => (
              <div key={i} className="py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">{f.date}</span>
                  <span className="font-medium text-green-600">€{f.cost}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{f.liters} λίτρα – {f.card}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tolls History */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Receipt className="w-6 h-6 text-slate-600" />
              Διόδια
            </h2>
            <button className="p-2 bg-slate-300 text-slate-500 rounded-lg cursor-not-allowed">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {tollsHistory.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-700">{t.month}</span>
                <span className="font-medium text-green-600">€{t.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Mileage */}
      {showMileageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Νέα Εγγραφή Χιλιομέτρων</h3>
              <button onClick={() => setShowMileageModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ημερομηνία
                </label>
                <input
                  type="date"
                  value={newMileageDate}
                  onChange={(e) => setNewMileageDate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Χιλιόμετρα
                </label>
                <input
                  type="number"
                  value={newMileageValue}
                  onChange={(e) => setNewMileageValue(e.target.value)}
                  placeholder="12450"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={addMileage}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                Αποθήκευση
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}