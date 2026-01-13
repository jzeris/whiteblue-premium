'use client'

import { useState } from 'react'
import { Calendar, Plus, Search } from 'lucide-react'

const services = {
  athens: [
    { id: 1, title: 'Airport Transfer (Standard)', desc: 'Mercedes E-Class, max 4 pax, meet & greet at arrivals', price: 'Fixed €60' },
    { id: 2, title: 'Airport Transfer (Van)', desc: 'Mercedes V-Class, max 7 pax + luggage, child seats available', price: 'Fixed €90' },
    { id: 3, title: 'Sounio Sunset Tour', desc: '4 hours private tour along the Athenian Riviera to Temple of Poseidon', price: '€250' },
    { id: 4, title: 'City Tour Athens', desc: 'Half day private tour: Acropolis, Plaka, Monastiraki', price: '€200' },
  ],
  mykonos: [
    { id: 1, title: 'Mykonos Airport Transfer', desc: 'Mercedes Van, max 7 pax, meet & greet', price: 'Fixed €80' },
    { id: 2, title: 'Mykonos Port Transfer', desc: 'Mercedes Van, max 7 pax, direct to hotel', price: 'Fixed €70' },
    { id: 3, title: 'Mykonos Island Tour', desc: '4 hours private tour: beaches, villages, windmills', price: '€350' },
    { id: 4, title: 'Delos Archaeological Tour', desc: 'Boat to Delos + private guide, full day', price: '€450' },
  ]
}

export default function B2BPortal() {
  const [location, setLocation] = useState('athens')
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')

  const currentServices = services[location as keyof typeof services]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Partner Portal</h1>
        <div className="flex items-center gap-6">
          <select 
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
              setSelectedService(null)
              setPickupDate('')
              setPickupTime('')
            }}
            className="px-6 py-3 border border-slate-300 rounded-lg bg-white text-lg font-medium"
          >
            <option value="athens">Athens</option>
            <option value="mykonos">Mykonos</option>
          </select>
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Available Services - {location === 'athens' ? 'Athens' : 'Mykonos'}
        </h2>

        {/* Service Dropdown */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-slate-700 mb-3">
            Select Service
          </label>
          <select 
            className="w-full px-6 py-4 border border-slate-300 rounded-xl text-lg"
            value={selectedService || ''}
            onChange={(e) => setSelectedService(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">-- Choose a service --</option>
            {currentServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title} - {service.price}
              </option>
            ))}
          </select>
        </div>

        {/* Service Description */}
        {selectedService && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {currentServices.find(s => s.id === selectedService)?.title}
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              {currentServices.find(s => s.id === selectedService)?.desc}
            </p>
          </div>
        )}

        {/* Date & Time Picker */}
        {selectedService && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Pickup Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                <input 
                  type="time" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedService && pickupDate && pickupTime && (
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105">
              Submit Request
            </button>
          </div>
        )}
      </div>
    </div>
  )
}