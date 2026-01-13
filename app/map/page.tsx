'use client'

import { useState } from 'react'
import { MapPin, Car, ChevronDown, CreditCard, Radio } from 'lucide-react'

export default function LiveMap() {
  const [location, setLocation] = useState('athens')

  // Mock πομποδέκτες (real θα τραβάει από fleet)
  const transponders = [
    { number: '123456', plate: 'IKA-1234' },
    { number: '789012', plate: 'ATH-3456' },
    { number: '456789', plate: 'MYK-9012' },
  ]

  const currentTransponders = transponders.filter(t => 
    location === 'athens' ? t.plate.startsWith('IKA') || t.plate.startsWith('ATH') : t.plate.startsWith('MYK')
  )

  // Single tolls balance (real θα τραβάει από Πάγια Έξοδα)
  const tollsBalance = 600

  // Mock προπληρωμένες κάρτες καυσίμων
  const fuelCards = [
    { number: '1234 5678 9012 3456', plate: 'IKA-1234', balance: 6000 },
    { number: '9876 5432 1098 7654', plate: 'ATH-3456', balance: 5000 },
    { number: '4567 8901 2345 6789', plate: 'MYK-9012', balance: 1500 },
  ]

  const currentFuelCards = fuelCards.filter(f => 
    location === 'athens' ? f.plate.startsWith('IKA') || f.plate.startsWith('ATH') : f.plate.startsWith('MYK')
  )

  const totalFuel = currentFuelCards.reduce((sum, f) => sum + f.balance, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Live Map</h1>
            <p className="text-slate-600 mt-1">Real-time tracking οδηγών</p>
          </div>
          <div className="relative">
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-6 py-3 pr-10 text-lg font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="athens">Αθήνα</option>
              <option value="mykonos">Μύκονος</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Χάρτης + Λίστα Οδηγών (πάνω) */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Χάρτης – μεγαλύτερος χώρος */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 h-[600px] flex items-center justify-center">
          <p className="text-slate-500 text-2xl font-medium">Live Map με Οδηγούς (Google Maps integration)</p>
        </div>

        {/* Λίστα Οδηγών */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Οδηγοί ({location === 'athens' ? 'Αθήνα' : 'Μύκονος'})</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {(location === 'athens' ? ['Νίκος Παπαδόπουλος', 'Πέτρος Κωνσταντίνου'] : ['Γιώργος Δημητρίου']).map((d) => (
              <div key={d} className="p-4">
                <div className="flex items-center gap-3">
                  <Car className="w-6 h-6 text-green-600" />
                  <span className="font-medium">{d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Widgets – Διόδια + Καύσιμα (κάτω) */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Διόδια Widget */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Radio className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-bold text-slate-900">Διόδια (συνολικό balance)</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600">€{tollsBalance.toLocaleString()}</p>
          </div>
          <div className="divide-y divide-slate-100">
            {currentTransponders.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                Καμία εγγραφή
              </div>
            ) : (
              currentTransponders.map((t) => (
                <div key={t.number} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Radio className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Πομποδέκτης {t.number}</p>
                      <p className="text-sm text-slate-600">{t.plate}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Καύσιμα Widget */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-slate-900">Κάρτες Καυσίμων</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">€{totalFuel.toLocaleString()}</p>
          </div>
          <div className="divide-y divide-slate-100">
            {currentFuelCards.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                Καμία εγγραφή
              </div>
            ) : (
              currentFuelCards.map((f) => (
                <div key={f.number} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Κάρτα {f.number}</p>
                      <p className="text-sm text-slate-600">{f.plate}</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">€{f.balance}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}