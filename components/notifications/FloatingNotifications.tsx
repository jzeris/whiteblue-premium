'use client'

import { useState } from 'react'
import { Bell, X, Calendar, Mail, Users, Car } from 'lucide-react'
import Link from 'next/link'

export default function FloatingNotifications() {
  const [isOpen, setIsOpen] = useState(false)

  const notifications = [
    { id: 1, type: 'booking', title: 'Νέα Κράτηση #1001', desc: 'John Doe - Airport → Hotel', time: 'Πριν 5 λεπτά', href: '/bookings/1001', read: false },
    { id: 2, type: 'social', title: 'Ώρα για Post', desc: 'Πρόταση AI για Instagram', time: 'Πριν 10 λεπτά', href: '/social', read: false },
    { id: 3, type: 'b2b', title: 'New B2B Request', desc: 'Blue Villas - 6 pax Mykonos', time: 'Πριν 30 λεπτά', href: '/bookings', read: true },
    { id: 4, type: 'driver', title: 'Οδηγός Offline', desc: 'Πέτρος Κωνσταντίνου', time: 'Πριν 1 ώρα', href: '/drivers', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    if (type === 'booking') return <Calendar className="w-5 h-5 text-blue-600" />
    if (type === 'social') return <Mail className="w-5 h-5 text-purple-600" />
    if (type === 'b2b') return <Users className="w-5 h-5 text-indigo-600" />
    return <Car className="w-5 h-5 text-orange-600" />
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        <Bell className="w-8 h-8 animate-pulse" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96">
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col max-h-96">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex items-center justify-between text-white">
              <h3 className="font-bold text-lg">Ειδοποιήσεις</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center text-slate-500 py-8">Καμία ειδοποίηση</p>
              ) : (
                notifications.map((n) => (
                  <Link key={n.id} href={n.href} onClick={() => setIsOpen(false)}>
                    <div className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0 ${!n.read ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          {getIcon(n.type)}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</p>
                          <p className="text-sm text-slate-600 mt-1">{n.desc}</p>
                          <p className="text-xs text-slate-400 mt-2">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}