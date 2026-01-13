'use client'

import Link from 'next/link'
import { Users, Phone, MessageSquare, Car, ToggleLeft, ToggleRight } from 'lucide-react'
import { useState } from 'react'

export default function DriversList() {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active')

  const drivers = [
    { 
      id: 1, 
      name: 'Νίκος Παπαδόπουλος', 
      vehicle: 'Mercedes V-Class (IKA-1234)', 
      status: 'available', 
      shift: '08:00 - 20:00', 
      score: 4.9, 
      jobsToday: 3,
      isActive: true,
      hasTaxiLicense: true,
      hasDCategory: false
    },
    { 
      id: 2, 
      name: 'Πέτρος Κωνσταντίνου', 
      vehicle: 'Skoda Octavia (TAX-5678)', 
      status: 'busy', 
      shift: '10:00 - 22:00', 
      score: 4.7, 
      jobsToday: 5,
      isActive: true,
      hasTaxiLicense: false,
      hasDCategory: true
    },
    { 
      id: 3, 
      name: 'Γιώργος Δημητρίου', 
      vehicle: 'Mercedes V-Class (MYK-9012)', 
      status: 'available', 
      shift: 'Off today', 
      score: 5.0, 
      jobsToday: 0,
      isActive: true,
      hasTaxiLicense: true,
      hasDCategory: true
    },
    { 
      id: 4, 
      name: 'Δημήτρης Αναστασίου', 
      vehicle: 'Mercedes Vito (ATH-3456)', 
      status: 'offline', 
      shift: 'Off today', 
      score: 4.8, 
      jobsToday: 0,
      isActive: false,
      hasTaxiLicense: true,
      hasDCategory: false
    },
  ]

  const filteredDrivers = drivers.filter(d => activeTab === 'active' ? d.isActive : !d.isActive)

  const getStatusColor = (status: string) => {
    if (status === 'available') return 'bg-green-100 text-green-700'
    if (status === 'busy') return 'bg-orange-100 text-orange-700'
    return 'bg-slate-100 text-slate-600'
  }

  const getStripeStyle = (hasTaxi: boolean, hasD: boolean) => {
    if (hasTaxi && hasD) {
      return 'linear-gradient(to right, #fbbf24 50%, #3b82f6 50%)'
    }
    if (hasTaxi) return '#fbbf24'
    if (hasD) return '#3b82f6'
    return 'transparent'
  }

  return (
    <>
      {/* Title + Tabs + Button */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Οδηγοί</h1>
          <p className="text-slate-600 mt-1">Διαχείριση στόλου και διαθεσιμότητας</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'active' ? 'bg-white shadow-sm' : 'text-slate-600'}`}
            >
              Ενεργοί
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'inactive' ? 'bg-white shadow-sm' : 'text-slate-600'}`}
            >
              Ανενεργοί
            </button>
          </div>
          <Link href="/drivers/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105">
              + Νέος Οδηγός
            </button>
          </Link>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDrivers.length === 0 ? (
          <p className="col-span-full text-center text-slate-500 py-12">Κανένας οδηγός</p>
        ) : (
          filteredDrivers.map((driver) => (
            <Link key={driver.id} href={`/drivers/${driver.id}`}>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden">
                {/* Stripe */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-2"
                  style={{ background: getStripeStyle(driver.hasTaxiLicense, driver.hasDCategory) }}
                />

                {/* Photo + Status */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto overflow-hidden border-4 border-white shadow-md">
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <Users className="w-12 h-12 text-slate-500" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 translate-x-4 translate-y-4">
                    <div className={`p-3 rounded-full shadow-lg ${getStatusColor(driver.status)}`}>
                      <Car className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{driver.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{driver.vehicle}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium text-slate-900">{driver.score}</span>
                    <span className="text-sm text-slate-500">({driver.jobsToday} σήμερα)</span>
                  </div>
                </div>

                {/* Shift */}
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-500">Βάρδια</p>
                  <p className="font-medium text-slate-900">{driver.shift}</p>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-center gap-3">
                  <button className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-transform hover:scale-105">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-transform hover:scale-105">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg shadow transition-transform hover:scale-105">
                    {driver.isActive ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  )
}