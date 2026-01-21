'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Phone,
  MapPin,
  Navigation,
  Edit3,
  DollarSign,
  Loader2,
  AlertTriangle,
} from 'lucide-react'
import Link from 'next/link'

export default function JobDetails() {
  const params = useParams()
  const jobId = params.id as string

  // Mock data – real θα έρχεται από Supabase ή context
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

  // Status & countdown logic
  const [status, setStatus] = useState<'pending' | 'en_route' | 'in_car' | 'completed'>('pending')
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
          setStatus(action === 'en_route' ? 'en_route' : status) // delay δεν αλλάζει status
          alert(`Mock: Ενέργεια ολοκληρώθηκε - ${action === 'en_route' ? 'Ξεκίνησα' : 'Καθυστέρησα'}`)
          return 0
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

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link href="/driver" className="text-blue-600 font-medium flex items-center gap-2">
            ← JOB DETAILS
          </Link>
          <button className="p-2 hover:bg-slate-100 rounded-full">
            <Edit3 className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="border-4 border-blue-900 rounded-xl overflow-hidden shadow-lg">
          {/* Job Header */}
          <div className="bg-blue-900 text-white p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-3xl font-bold">{job.time}</p>
                <p className="text-lg mt-1">{job.day}</p>
                <p className="text-sm mt-2 opacity-90">#{job.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{job.total.toFixed(2)} €</p>
                <p className="text-sm opacity-80">{job.service}</p>
              </div>
            </div>
          </div>

          {/* Notes / Requirements */}
          <div className="bg-white p-5 border-b border-slate-200">
            <h3 className="font-bold text-lg mb-3 text-blue-900">ΟΔΗΓΙΕΣ</h3>
            <p className="whitespace-pre-line text-slate-700">{job.notes}</p>
            {job.greetingSign && (
              <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                VIEW Greeting Sign
              </button>
            )}
          </div>

          {/* Passenger */}
          <div className="bg-white p-5 border-b border-slate-200">
            <h3 className="font-bold text-lg mb-3 text-blue-900">ΕΠΙΒΑΤΗΣ</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">{job.client}</p>
                <p className="text-sm text-slate-600 mt-1">{job.phone}</p>
              </div>
              <a
                href={`tel:${job.phone}`}
                className="bg-blue-600 p-4 rounded-full text-white hover:bg-blue-700 transition"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Routing */}
          <div className="bg-white p-5 border-b border-slate-200">
            <h3 className="font-bold text-lg mb-3 text-blue-900">ΔΙΑΔΡΟΜΗ</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">PU</span>
                </div>
                <p className="text-slate-800">{job.pickup}</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">DO</span>
                </div>
                <p className="text-slate-800">{job.dropoff}</p>
              </div>
            </div>
            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition">
              <Navigation className="w-6 h-6" />
              NAVIGATE
            </button>
          </div>

          {/* Payment */}
          <div className="bg-white p-5">
            <h3 className="font-bold text-lg mb-3 text-blue-900">ΠΛΗΡΩΜΗ</h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold">Σύνολο</p>
              <p className="text-3xl font-bold text-green-600">{job.total.toFixed(2)} €</p>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition">
              COLLECT PAYMENT ({job.method})
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons – ΜΟΝΟ 2 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl">
        <div className="flex gap-4 max-w-3xl mx-auto">
          {/* ΞΕΚΙΝΗΣΑ / EN ROUTE */}
          <button
            disabled={countdownActive || status !== 'pending'}
            onClick={() => startCountdown('en_route')}
            className={`flex-1 py-5 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3
              ${countdownActive 
                ? 'bg-green-400 cursor-wait' 
                : status === 'pending' 
                  ? 'bg-green-600 hover:bg-green-700 active:scale-95' 
                  : 'bg-green-300 cursor-not-allowed opacity-70'}`}
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

          {/* ΚΑΘΥΣΤΕΡΩ / DELAY */}
          <button
            disabled={countdownActive || status === 'completed'}
            onClick={() => startCountdown('delay')}
            className={`flex-1 py-5 rounded-xl font-bold text-white text-lg transition-all
              ${countdownActive 
                ? 'bg-orange-400 cursor-wait' 
                : 'bg-orange-500 hover:bg-orange-600 active:scale-95'}`}
          >
            ΚΑΘΥΣΤΕΡΩ
          </button>
        </div>

        {/* Cancel Countdown (μόνο όταν τρέχει) */}
        {countdownActive && (
          <button
            onClick={cancelCountdown}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition"
          >
            ΑΚΥΡΩΣΗ
          </button>
        )}
      </div>
    </div>
  )
}