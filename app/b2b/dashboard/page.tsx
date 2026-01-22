'use client'

import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { Calendar, Star, MapPin, Bell, DollarSign, ChevronDown, ChevronUp, Clock } from 'lucide-react'

const mockBookings = [
  { id: 'BK123', date: '21 Ιαν 2026 14:00', customer: 'John Doe', status: 'In Progress', price: 450, commission: 67.5 },
  { id: 'BK124', date: '22 Ιαν 2026 10:00', customer: 'Maria K', status: 'Completed', price: 320, commission: 0 },
  { id: 'BK125', date: '22 Ιαν 2026 18:00', customer: 'Alex P', status: 'Pending', price: 600, commission: 90 },
]

const mockReviews = [
  { rating: 5, comment: 'Άψογος οδηγός, πολύ ευγενικός!', driver: 'Γιάννης Ζ' },
  { rating: 3, comment: 'Καλή υπηρεσία αλλά καθυστέρησε 15 λεπτά', driver: 'Πέτρος Κ' },
  { rating: 1, comment: 'Κακή συμπεριφορά, δεν συνιστώ', driver: 'Παναγιώτης Β' },
]

const mockTracking = [
  { id: 'BK123', status: 'Ξεκίνησε', driver: 'Γιάννης Ζ', location: 'Λεωφ. Κηφισίας 45' },
  { id: 'BK124', status: 'Έφτασε PU', driver: 'Πέτρος Κ', location: 'Αεροδρόμιο Ελ. Βενιζέλος' },
]

const mockNotifications = [
  { message: 'Ο οδηγός Γιάννης Ζ ξεκίνησε την κράτηση BK123', time: '10 λεπτά πριν', type: 'start' },
  { message: 'Η κράτηση BK124 ολοκληρώθηκε επιτυχώς', time: '2 ώρες πριν', type: 'complete' },
  { message: 'Μικρή καθυστέρηση στο BK125 – νέο ETA 18:30', time: '30 λεπτά πριν', type: 'delay' },
]

const mockLogs: Record<string, { time: string; event: string }[]> = {
  'BK123': [
    { time: '14:00', event: 'Κράτηση δημιουργήθηκε' },
    { time: '14:05', event: 'Ο οδηγός Γιάννης Ζ αποδέχτηκε' },
    { time: '14:12', event: 'Ξεκίνησε τη διαδρομή' },
    { time: '14:28', event: 'Έφτασε στο Pickup' },
  ],
  'BK124': [
    { time: '10:00', event: 'Κράτηση δημιουργήθηκε' },
    { time: '10:10', event: 'Ο οδηγός Πέτρος Κ αποδέχτηκε' },
    { time: '10:20', event: 'Παρέλαβε επιβάτες' },
    { time: '11:45', event: 'Ολοκληρώθηκε η διαδρομή' },
  ],
  'BK125': [
    { time: '18:00', event: 'Κράτηση δημιουργήθηκε' },
    { time: '18:05', event: 'Αναμονή αποδοχής' },
  ],
}

export default function B2BDashboard() {
  const [username, setUsername] = useState('')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const name = localStorage.getItem('b2b_username') || 'Συνεργάτης'
    setUsername(name)
  }, [])

  // Κλείσιμο dropdown όταν πατάς έξω
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">B2B Dashboard</h1>
          <p className="text-slate-600 mt-1">Καλώς ήρθατε, {username}</p>
        </div>
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-100 rounded-lg relative focus:outline-none"
          >
            <Bell className="w-6 h-6 text-slate-600" />
            {mockNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {mockNotifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b bg-slate-50">
                <h3 className="font-bold text-slate-900">Ενημερώσεις</h3>
              </div>
              <div className="space-y-3 p-4">
                {mockNotifications.map((n, i) => (
                  <div key={i} className={`p-3 rounded-lg flex justify-between items-center ${
                    n.type === 'complete' ? 'bg-green-50 border-l-4 border-green-500' :
                    n.type === 'delay' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                    'bg-blue-50 border-l-4 border-blue-500'
                  }`}>
                    <p className="text-slate-800 text-sm flex-1">{n.message}</p>
                    <p className="text-xs text-slate-500 whitespace-nowrap ml-4">{n.time}</p>
                  </div>
                ))}
                {mockNotifications.length === 0 && (
                  <p className="text-slate-500 text-center py-6">Καμία νέα ενημέρωση</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-xl">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Σήμερα</p>
              <p className="text-2xl font-bold">{mockBookings.length} κρατήσεις</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-100 rounded-xl">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Προμήθεια μήνα</p>
              <p className="text-2xl font-bold">
                €{mockBookings.reduce((sum, b) => sum + (b.commission || 0), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-yellow-100 rounded-xl">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Μέσος Όρος</p>
              <p className="text-2xl font-bold">
                {(mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length || 0).toFixed(1)} ★
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-100 rounded-xl">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Τρέχουσες</p>
              <p className="text-2xl font-bold">{mockTracking.length} υπηρεσίες</p>
            </div>
          </div>
        </div>
      </div>

      {/* Τρέχουσες Κρατήσεις */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Τρέχουσες Κρατήσεις</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="py-4 px-6 font-semibold">ID</th>
                <th className="py-4 px-6 font-semibold">Ημερομηνία</th>
                <th className="py-4 px-6 font-semibold">Πελάτης</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold">Τιμή</th>
                <th className="py-4 px-6 font-semibold">Προμήθεια</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map(b => (
                <tr key={b.id} className="border-b hover:bg-slate-50 transition">
                  <td className="py-4 px-6 font-medium">{b.id}</td>
                  <td className="py-4 px-6">{b.date}</td>
                  <td className="py-4 px-6">{b.customer}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      b.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      b.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium">€{b.price.toFixed(2)}</td>
                  <td className="py-4 px-6 font-medium">€{(b.commission || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Τελευταία Reviews</h2>
        <div className="space-y-6">
          {mockReviews.map((r, i) => (
            <div key={i} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(r.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-2xl">★</span>)}
                {[...Array(5 - r.rating)].map((_, i) => <span key={i} className="text-gray-300 text-2xl">★</span>)}
              </div>
              <p className="text-slate-700 italic">"{r.comment}"</p>
              <p className="text-sm text-slate-500 mt-1">Οδηγός: <strong>{r.driver}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}