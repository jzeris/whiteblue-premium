'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Briefcase, Plus, Package, MapPin, DollarSign, Users, FileText, Luggage, Baby, Accessibility, Headphones } from 'lucide-react'

export default function ServicesList() {
  const [activeTab, setActiveTab] = useState<'services' | 'packages'>('services')

  // Mock services
  const services = [
    { id: 1, name: 'Airport Transfer', price: 80, type: 'Απλή', description: 'Μεταφορά από/προς αεροδρόμιο', extras: ['luggage', 'baby'] },
    { id: 2, name: 'Hourly', price: 60, type: 'Ωριαία', description: 'Ωριαία ενοικίαση με οδηγό', extras: ['headphones'] },
    { id: 3, name: 'Day Trip', price: 300, type: 'Ημερήσια', description: 'Ολοήμερη εκδρομή', extras: ['luggage', 'wheelchair'] },
  ]

  // Mock packages
  const packages = [
    { id: 1, name: 'Wine Tasting Tour', totalPrice: 450, legs: 3, description: 'Πλήρες πακέτο γευσιγνωσίας κρασιού', legsDetails: [
      { leg: 1, from: 'Hotel', to: 'Winery 1' },
      { leg: 2, from: 'Winery 1', to: 'Winery 2' },
      { leg: 3, from: 'Winery 2', to: 'Hotel' },
    ] },
    { id: 2, name: 'Mykonos Full Day', totalPrice: 800, legs: 4, description: 'Πλήρης ημέρα στη Μύκονο', legsDetails: [] },
  ]

  const [expandedPackage, setExpandedPackage] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Υπηρεσίες & Πακέτα</h1>
            <p className="text-slate-600 mt-1">Διαχείριση υπηρεσιών και πακέτων</p>
          </div>
          <Link href="/services/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-3">
              <Plus className="w-5 h-5" />
              Νέα Υπηρεσία
            </button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-8">
        <div className="flex gap-8 border-b border-slate-200 mb-8">
          <button 
            onClick={() => setActiveTab('services')}
            className={`pb-4 text-lg font-medium transition-colors ${activeTab === 'services' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Υπηρεσίες
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`pb-4 text-lg font-medium transition-colors ${activeTab === 'packages' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Πακέτα
          </button>
        </div>

        {/* Services List */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold">{service.name}</h3>
                </div>
                <p className="text-slate-600 mb-2">{service.description}</p>
                <p className="text-slate-600">Τύπος: {service.type}</p>
                <div className="flex justify-center gap-4 mt-4">
                  {service.extras.includes('luggage') && <Luggage className="w-6 h-6 text-slate-400" />}
                  {service.extras.includes('headphones') && <Headphones className="w-6 h-6 text-slate-400" />}
                  {service.extras.includes('baby') && <Baby className="w-6 h-6 text-slate-400" />}
                  {service.extras.includes('wheelchair') && <Accessibility className="w-6 h-6 text-slate-400" />}
                </div>
                <p className="text-2xl font-bold text-green-600 mt-4">€{service.price}</p>
                <div className="mt-6">
                  <Link href={`/services/${service.id}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                      Επεξεργασία
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Packages List */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 cursor-pointer" onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="w-8 h-8 text-purple-600" />
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-600">€{pkg.totalPrice}</p>
                  </div>
                  <p className="text-slate-600 mt-2">{pkg.description}</p>
                  <p className="text-slate-600">Legs: {pkg.legs}</p>
                </div>

                {expandedPackage === pkg.id && pkg.legsDetails.length > 0 && (
                  <div className="border-t border-slate-200 p-6 space-y-4">
                    {pkg.legsDetails.map((leg, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4">
                        <p className="font-medium">Leg {index + 1}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <p>{leg.from} → {leg.to}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-6">
                  <Link href={`/services/package/${pkg.id}`}>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium">
                      Επεξεργασία
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}