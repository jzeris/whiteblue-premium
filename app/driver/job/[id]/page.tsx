'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Phone,
  Navigation,
  Edit3,
  Loader2,
  MessageSquare,
  Home,
  Search,
  Settings,
} from 'lucide-react'
import Link from 'next/link'

export default function JobDetails() {
  const params = useParams()
  const jobId = params.id as string

  // Mock data – αργότερα θα έρχεται από Supabase
  const job = {
    id: jobId,
    time: '10:30',
    day: 'Πέμπτη, 8 Ιαν 2026',
    client: 'Marcus Kantowski',
    phone: '+491626944971',
    pickup: '1 Κεκροπος, Athina, 105 58 GR',
    dropoff: 'ATH Airport, Eleftherios Venizelos International Airport',
    notes: '50 euros\nΤους παραλαμβάνουμε από Hotel Nefeli',
    greetingSign: true,
    total: 50.00,
    collectPayment: true,
    method: 'Cash',
    company: 'Athens Elegant Apartments',
    service: 'To Airport on CAR',
  }

  // States για modals (επιλογή κλήσης/μηνύματος)
  const [showCallModal, setShowCallModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)

  // Status & countdown
  const [status, setStatus] = useState<'pending' | 'en_route' | 'completed'>('pending')
  const [countdownActive, setCountdownActive] = useState(false)
  const [countdownSeconds, setCountdownSeconds] = useState(3)

  const startCountdown = (action: 'en_route' | 'delay') => {
    setCountdownActive(true)
    setCountdownSeconds(3)

    const interval = setInterval(() => {
      setCountdownSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setCountdownActive(false)
          if (action === 'en_route') setStatus('en_route')
          alert(action === 'en_route' ? 'Ξεκίνησα!' : 'Καθυστέρησα!')
          return 3
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }

  const cancelCountdown = () => {
    setCountdownActive(false)
    setCountdownSeconds(3)
  }

  // Navigate full trip
  const openFullNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(job.pickup)}&destination=${encodeURIComponent(job.dropoff)}&travelmode=driving`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <Link href="/driver" className="text-blue-600 font-semibold flex items-center gap-2">
            ← JOB DETAILS
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Edit3 className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Job Header */}
        <div className="bg-blue-900 text-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-3xl font-bold">{job.time}</p>
              <p className="text-lg mt-1">{job.day}</p>
              <p className="text-sm mt-2 opacity-90">#{job.id}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{job.total.toFixed(2)} €</p>
              <p className="text-sm opacity-80">{job.service}</p>
            </div>
          </div>
        </div>

        {/* Οδηγίες */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg text-blue-900 mb-3">ΟΔΗΓΙΕΣ</h3>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.notes}</p>
          {job.greetingSign && (
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition">
              VIEW Greeting Sign
            </button>
          )}
        </section>

        {/* ΕΠΙΒΑΤΗΣ – με icons & modals */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg text-blue-900 mb-3">ΕΠΙΒΑΤΗΣ</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">{job.client}</p>
              <p className="text-gray-600">{job.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Τηλέφωνο – modal επιλογής */}
              <button
                onClick={() => setShowCallModal(true)}
                className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
                title="Επικοινωνία"
              >
                <Phone className="w-5 h-5 text-white" />
              </button>

              {/* Μήνυμα – modal επιλογής */}
              <button
                onClick={() => setShowMessageModal(true)}
                className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition"
                title="Μήνυμα"
              >
                <MessageSquare className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Modal Κλήσης */}
          {showCallModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
                <h3 className="text-lg font-bold text-center mb-6">Επικοινωνία με {job.client}</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      window.location.href = `tel:${job.phone}`
                      setShowCallModal(false)
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-3"
                  >
                    <Phone className="w-6 h-6" />
                    Κανονική Κλήση
                  </button>

                  <button
                    onClick={() => {
                      window.open(`https://wa.me/${job.phone.replace(/\D/g, '')}`, '_blank')
                      setShowCallModal(false)
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-3"
                  >
                    <MessageSquare className="w-6 h-6" />
                    Κλήση WhatsApp
                  </button>

                  <button
                    onClick={() => setShowCallModal(false)}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-4 rounded-xl transition mt-2"
                  >
                    Ακύρωση
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Μηνύματος */}
          {showMessageModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
                <h3 className="text-lg font-bold text-center mb-6">Μήνυμα προς {job.client}</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      window.location.href = `sms:${job.phone}?body=Γεια σας, είμαι ο οδηγός σας για την κράτηση #${job.id}.`
                      setShowMessageModal(false)
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-3"
                  >
                    <MessageSquare className="w-6 h-6" />
                    Κανονικό SMS
                  </button>

                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Γεια σας, είμαι ο οδηγός σας για την κράτηση #${job.id}.`)
                      window.open(`https://wa.me/${job.phone.replace(/\D/g, '')}?text=${msg}`, '_blank')
                      setShowMessageModal(false)
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-3"
                  >
                    <MessageSquare className="w-6 h-6" />
                    Μήνυμα WhatsApp
                  </button>

                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-4 rounded-xl transition mt-2"
                  >
                    Ακύρωση
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Διαδρομή */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg text-blue-900 mb-4">ΔΙΑΔΡΟΜΗ</h3>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                PU
              </div>
              <p className="text-gray-800 leading-relaxed flex-1">{job.pickup}</p>
              <button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.pickup)}`, '_blank')}
                className="p-3 rounded-full hover:bg-blue-50 transition"
                title="Πλοήγηση σε PU"
              >
                <Navigation className="w-6 h-6 text-blue-600" />
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                DO
              </div>
              <p className="text-gray-800 leading-relaxed flex-1">{job.dropoff}</p>
              <button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.dropoff)}`, '_blank')}
                className="p-3 rounded-full hover:bg-blue-50 transition"
                title="Πλοήγηση σε DO"
              >
                <Navigation className="w-6 h-6 text-blue-600" />
              </button>
            </div>
          </div>

          <button
            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(job.pickup)}&destination=${encodeURIComponent(job.dropoff)}&travelmode=driving`, '_blank')}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition"
          >
            <Navigation className="w-6 h-6" />
            NAVIGATE (Full Trip)
          </button>
        </section>

        {/* Πληρωμή */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg text-blue-900 mb-3">ΠΛΗΡΩΜΗ</h3>
          <div className="flex justify-between items-center mb-5">
            <span className="text-xl font-bold">Σύνολο</span>
            <span className="text-3xl font-bold text-green-600">{job.total.toFixed(2)} €</span>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition">
            COLLECT PAYMENT ({job.method})
          </button>
        </section>

        {/* Action Buttons – ΜΕΣΑ στο content */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-6">
          <div className="flex gap-4">
            <button
              disabled={countdownActive || status !== 'pending'}
              onClick={() => startCountdown('en_route')}
              className={`flex-1 py-5 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3 shadow-sm
                ${countdownActive ? 'bg-green-400 cursor-wait' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
            >
              {countdownActive ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {countdownSeconds}...
                </>
              ) : (
                'ΞΕΚΙΝΗΣΑ'
              )}
            </button>

            <button
              disabled={countdownActive}
              onClick={() => startCountdown('delay')}
              className={`flex-1 py-5 rounded-xl font-bold text-white text-lg transition-all shadow-sm
                ${countdownActive ? 'bg-orange-400 cursor-wait' : 'bg-orange-500 hover:bg-orange-600 active:scale-95'}`}
            >
              ΚΑΘΥΣΤΕΡΩ
            </button>
          </div>

          {countdownActive && (
            <button
              onClick={cancelCountdown}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition"
            >
              ΑΚΥΡΩΣΗ
            </button>
          )}
        </div>
      </main>

      {/* Bottom Navigation – FIXED ΚΑΤΩ, όπως στην αρχική σελίδα */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 shadow-lg z-50">
        <Link href="/driver" className="text-blue-600 flex flex-col items-center">
          <Home className="w-7 h-7" />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>
        <Link href="#" className="text-gray-600 flex flex-col items-center">
          <Search className="w-7 h-7" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link href="#" className="text-gray-600 flex flex-col items-center relative">
          <MessageSquare className="w-7 h-7" />
          <span className="text-xs mt-1">Messages</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">2</span>
        </Link>
        <Link href="#" className="text-gray-600 flex flex-col items-center">
          <Settings className="w-7 h-7" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  )
}