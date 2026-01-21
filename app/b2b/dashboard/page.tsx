'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const mockBookings = [
  { id: 'BK123', date: '21 Ιαν 2026 14:00', customer: 'John Doe', status: 'In Progress', price: 450, commission: 67.5 },
  { id: 'BK124', date: '22 Ιαν 2026 10:00', customer: 'Maria K', status: 'Completed', price: 320, commission: 48 },
  { id: 'BK125', date: '22 Ιαν 2026 18:00', customer: 'Alex P', status: 'Pending', price: 600, commission: 90 },
]

const mockReviews = [
  { id: 1, rating: 5, comment: 'Άψογος οδηγός, πολύ ευγενικός!', driver: 'Γιάννης Ζ' },
  { id: 2, rating: 3, comment: 'Καλή υπηρεσία αλλά καθυστέρησε 15 λεπτά', driver: 'Πέτρος Κ' },
  { id: 3, rating: 1, comment: 'Κακή συμπεριφορά, δεν συνιστώ', driver: 'Παναγιώτης Β' },
]

const mockTracking = [
  { id: 'BK123', status: 'Ξεκίνησε', driver: 'Γιάννης Ζ', location: 'Λεωφ. Κηφισίας 45' },
  { id: 'BK124', status: 'Έφτασε PU', driver: 'Πέτρος Κ', location: 'Αεροδρόμιο Ελ. Βενιζέλος' },
]

export default function B2BDashboard() {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isLogged = localStorage.getItem('b2b_logged_in') === 'true'
    if (!isLogged) {
      router.push('/b2b/login')
    } else {
      setLoggedIn(true)
    }
  }, [])

  if (!loggedIn) return null

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">B2B Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('b2b_logged_in')
              router.push('/b2b/login')
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Κρατήσεις */}
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
                    <td className="py-3 px-4">{b.status}</td>
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
          <h2 className="text-xl font-bold mb-4">Reviews Οδηγών</h2>
          <div className="space-y-6">
            {mockReviews.map(r => (
              <div key={r.id} className="border-b pb-4">
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
          <h2 className="text-xl font-bold mb-4">Live Tracking (τρέχουσες υπηρεσίες)</h2>
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
            <div className="p-3 bg-green-50 rounded-lg">Ο οδηγός Γιάννης Ζ ξεκίνησε την κράτηση BK123</div>
            <div className="p-3 bg-blue-50 rounded-lg">Η κράτηση BK124 ολοκληρώθηκε επιτυχώς</div>
            <div className="p-3 bg-yellow-50 rounded-lg">Μικρή καθυστέρηση στο BK125 – νέο ETA 18:30</div>
          </div>
        </div>
      </div>
    </div>
  )
}