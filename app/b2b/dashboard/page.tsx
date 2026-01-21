'use client'

import { useState, useEffect } from 'react'
import { Calendar, Star, MapPin, Bell, DollarSign } from 'lucide-react'

const mockBookings = [
  { id: 'BK123', date: '21 Ιαν 2026 14:00', customer: 'John Doe', status: 'In Progress', price: 450, commission: 67.5 },
  { id: 'BK124', date: '22 Ιαν 2026 10:00', customer: 'Maria K', status: 'Completed', price: 320, commission: 48 },
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
  { message: 'Ο οδηγός Γιάννης Ζ ξεκίνησε την κράτηση BK123', time: '10 λεπτά πριν' },
  { message: 'Η κράτηση BK124 ολοκληρώθηκε επιτυχώς', time: '2 ώρες πριν' },
  { message: 'Μικρή καθυστέρηση στο BK125 – νέο ETA 18:30', time: '30 λεπτά πριν' },
]

export default function B2BDashboard() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const name = localStorage.getItem('b2b_username') || 'Συνεργάτης'
    setUsername(name)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">B2B Dashboard</h1>
          <p className="text-slate-600 mt-1">Καλώς ήρθατε, {username}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-lg relative">
            <Bell className="w-6 h-6 text-slate-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Σήμερα</p>
              <p className="text-2xl font-bold">3 κρατήσεις</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Προμήθεια μήνα</p>
              <p className="text-2xl font-bold">€205.50</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Μέσος Όρος</p>
              <p className="text-2xl font-bold">4.3 ★</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Τρέχουσες</p>
              <p className="text-2xl font-bold">2 υπηρεσίες</p>
            </div>
          </div>
        </div>
      </div>

      {/* Τρέχουσες Κρατήσεις */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Τρέχουσες Κρατήσεις</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Ημερομηνία</th>
                <th className="py-3 px-4">Πελάτης</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Τιμή</th>
                <th className="py-3 px-4">Προμήθεια</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map(b => (
                <tr key={b.id} className="border-b hover:bg-slate-50">
                  <td className="py-3 px-4">{b.id}</td>
                  <td className="py-3 px-4">{b.date}</td>
                  <td className="py-3 px-4">{b.customer}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      b.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      b.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">€{b.price}</td>
                  <td className="py-3 px-4">€{b.commission.toFixed(2)}</td>
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
            <div key={i} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(r.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-xl">★</span>)}
                {[...Array(5 - r.rating)].map((_, i) => <span key={i} className="text-gray-300 text-xl">★</span>)}
              </div>
              <p className="text-slate-700">{r.comment}</p>
              <p className="text-sm text-slate-500 mt-1">Οδηγός: {r.driver}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Tracking */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Live Tracking</h2>
        <div className="space-y-4">
          {mockTracking.map(t => (
            <div key={t.id} className="p-4 border rounded-lg bg-slate-50">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Κράτηση: {t.id}</p>
                  <p>Οδηγός: {t.driver}</p>
                  <p>Status: {t.status}</p>
                </div>
                <p className="text-sm text-slate-500">{t.location}</p>
              </div>
            </div>
          ))}
          {mockTracking.length === 0 && <p className="text-slate-500">Καμία τρέχουσα υπηρεσία</p>}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Ενημερώσεις</h2>
        <div className="space-y-3">
          {mockNotifications.map((n, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-lg flex justify-between">
              <p>{n.message}</p>
              <p className="text-sm text-slate-500">{n.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}