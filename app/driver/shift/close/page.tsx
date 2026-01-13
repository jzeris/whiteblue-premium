'use client'

import { useState } from 'react'

export default function CloseShift() {
  const [vehicleType, setVehicleType] = useState('taxi') // Auto-detect from select

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-8">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Κλείσιμο Βάρδιας</h1>
          <p className="text-red-700 text-sm">Ελέγξτε τα ποσά προσεκτικά</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Επιλογή Οχήματος</h3>
          <select
            className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="taxi">Taxi</option>
            <option value="van">Van</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Γενικά</h3>
          <label className="block text-sm font-medium text-slate-700 mb-1">Τελικά Χιλιόμετρα</label>
          <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="152340" />
        </div>

        {vehicleType === 'taxi' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Ταξίμετρο & Πλατφόρμες</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Φωτογραφία Ζ (Z-Tape) *</label>
                <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:bg-slate-50">
                  Λήψη Φωτογραφίας
                </button>
              </div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ποσό Ζ (Z-Report)</label>
              <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />

              <label className="block text-sm font-medium text-slate-700 mb-1">Δρόμος Μετρητά</label>
              <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />

              <label className="block text-sm font-medium text-slate-700 mb-1">Δρόμος POS</label>
              <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />

              <label className="block text-sm font-medium text-slate-700 mb-1">Free Now App</label>
              <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />

              <label className="block text-sm font-medium text-slate-700 mb-1">iMove Μετρητά</label>
              <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />
            </div>
          </div>
        )}

        {vehicleType === 'van' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Εισπράξεις</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Μετρητά (Σύνολο)</label>
              <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />

              <label className="block text-sm font-medium text-slate-700 mb-1">POS (Σύνολο)</label>
              <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg font-bold text-orange-600 mb-4">Έξοδα Βάρδιας</h3>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Καύσιμα</label>
            <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />

            <label className="block text-sm font-medium text-slate-700 mb-1">Διόδια (Μετρητά)</label>
            <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />

            <label className="block text-sm font-medium text-slate-700 mb-1">Λοιπά Έξοδα</label>
            <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="€0.00" />
          </div>
        </div>

        <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-xl shadow-lg">
          Υποβολή & Έξοδος
        </button>
      </div>
    </div>
  )
}