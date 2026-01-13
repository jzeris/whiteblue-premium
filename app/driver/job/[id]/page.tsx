'use client'

import { useParams } from 'next/navigation'
import { Phone, MapPin, Navigation, Edit3, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function JobDetails() {
  const params = useParams()
  const jobId = params.id

  // Mock data – real θα τραβάει από id
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

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/driver" className="text-blue-600 font-medium">
            ← JOB DETAILS
          </Link>
          <button className="p-2">
            <Edit3 className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Main Content – με σκούρο μπλε περιγράμμα γύρω-γύρω */}
      <div className="p-4">
        <div className="border-4 border-blue-900 rounded-xl overflow-hidden">
          {/* Job Header */}
          <div className="bg-blue-900 text-white p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-bold">{job.time}, {job.day}</p>
                <p className="text-xl mt-1">#{job.id}</p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white text-blue-900 p-4">
            <h3 className="font-bold mb-2">REQUIREMENTS</h3>
            <p className="text-sm whitespace-pre-line">Notes to Driver:</p>
            <p className="text-sm whitespace-pre-line mt-1">{job.notes}</p>
            {job.greetingSign && (
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                VIEW Greeting Sign
              </button>
            )}
          </div>

          {/* Passenger Info */}
          <div className="bg-white text-blue-900 p-4">
            <h3 className="font-bold mb-2">PASSENGER INFO</h3>
            <div className="flex items-center justify-between">
              <p className="font-medium">{job.client}</p>
              <button className="p-2 bg-blue-600 rounded-full">
                <Phone className="w-6 h-6 text-white" />
              </button>
            </div>
            <p className="text-sm mt-1">{job.phone}</p>
          </div>

          {/* Routing */}
          <div className="bg-white text-blue-900 p-4">
            <h3 className="font-bold mb-2">ROUTING</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PU</span>
                </div>
                <p>{job.pickup}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DO</span>
                </div>
                <p>{job.dropoff}</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
              <Navigation className="w-5 h-5" />
              NAVIGATE
            </button>
          </div>

          {/* Payment */}
          <div className="bg-white text-blue-900 p-4">
            <h3 className="font-bold mb-2">PAYMENT</h3>
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold">Total</p>
              <p className="text-2xl font-bold">{job.total.toFixed(2)} €</p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
              COLLECT PAYMENT
            </button>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Collect</span>
                <span className="font-medium">Yes (Mandatory)</span>
              </div>
              <div className="flex justify-between">
                <span>Method</span>
                <span className="font-medium">{job.method}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white text-blue-900 p-4">
            <h3 className="font-bold mb-2">ADDITIONAL INFO</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Company</span>
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Type</span>
                <span className="font-medium">{job.service}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
        <div className="flex gap-4">
          <button className="flex-1 border border-blue-900 text-blue-900 font-bold py-3 rounded-lg">
            CHANGE STATUS
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
            START TRIP
          </button>
        </div>
      </div>
    </div>
  )
}