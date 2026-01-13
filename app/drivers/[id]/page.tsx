'use client'

import { Phone, MessageSquare, Car, Calendar, Star, MapPin, ToggleLeft, ToggleRight, FileText, Download, CheckSquare, Square, Edit3 } from 'lucide-react'
import Link from 'next/link'

export default function DriverProfile() {
  // Mock data – real θα τραβάει από id
  const driver = {
    id: 1,
    name: 'Νίκος Παπαδόπουλος',
    photo: 'https://placehold.co/300x300',
    vehicle: 'Mercedes V-Class (IKA-1234)',
    licenseNumber: '123456789',
    phone: '+30 690 1234567',
    email: 'nikos@whiteblue.gr',
    iban: 'GR1601101250000000012300695',
    status: 'available', // available, busy, offline
    isActive: true,
    hasDCategory: true,
    hasTaxiLicense: true,
    shift: '08:00 - 20:00',
    score: 4.9,
    totalJobs: 342,
    todayJobs: 3,
    todayEarnings: 280,
    uploadedDocuments: [
      { name: 'Δίπλωμα Οδήγησης', url: '#' },
      { name: 'Ταυτότητα', url: '#' },
      { name: 'Ειδική Άδεια Ταξί', url: '#' },
      { name: 'Σύμβαση Πρόσληψης', url: '#' },
      { name: 'Έγγραφα Απόλυσης', url: '#' },
      { name: 'Ιδιωτικό Συμφωνητικό', url: '#' }, // Νέο πεδίο
    ],
    todayJobsList: [
      { time: '14:30', client: 'John Doe', from: 'Airport', to: 'Grande Bretagne', status: 'in_progress' },
      { time: '18:00', client: 'Blue Villas', from: 'Hotel', to: 'Sounio', status: 'pending' },
      { time: '21:00', client: 'Maria Smith', from: 'Restaurant', to: 'Airport', status: 'pending' },
    ]
  }

  const getStatusColor = (status: string) => {
    if (status === 'available') return 'bg-green-100 text-green-700'
    if (status === 'busy') return 'bg-orange-100 text-orange-700'
    return 'bg-slate-100 text-slate-600'
  }

  const getStatusText = (status: string) => {
    if (status === 'available') return 'Διαθέσιμος'
    if (status === 'busy') return 'Σε Δουλειά'
    return 'Offline'
  }

  const getJobStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-100 text-green-700'
    if (status === 'in_progress') return 'bg-blue-100 text-blue-700'
    return 'bg-slate-100 text-slate-600'
  }

  const getJobStatusText = (status: string) => {
    if (status === 'completed') return 'Ολοκληρωμένη'
    if (status === 'in_progress') return 'Σε Εξέλιξη'
    return 'Εκκρεμής'
  }

  const getStripeColor = () => {
    if (driver.hasTaxiLicense && driver.hasDCategory) {
      return 'linear-gradient(to bottom, #fbbf24 50%, #3b82f6 50%)' // yellow + blue
    }
    if (driver.hasTaxiLicense) return '#fbbf24' // yellow
    if (driver.hasDCategory) return '#3b82f6' // blue
    return 'transparent'
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Stripe left */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-4"
        style={{ background: getStripeColor() }}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 bg-slate-200 rounded-full overflow-hidden border-6 border-white shadow-2xl">
              <img src={driver.photo} className="w-full h-full object-cover" alt={driver.name} />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold text-slate-900">{driver.name}</h1>
                <span className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 ${getStatusColor(driver.status)}`}>
                  {getStatusText(driver.status)}
                </span>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors">
                  {driver.isActive ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />}
                  <span className="font-medium">{driver.isActive ? 'Ενεργός' : 'Ανενεργός'}</span>
                </button>
              </div>
              <p className="text-xl text-slate-600 mb-4">{driver.vehicle}</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold text-slate-900">{driver.score}</span>
                  <span className="text-slate-600">({driver.totalJobs} κρατήσεις)</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Σημερινά Κέρδη</p>
                  <p className="text-3xl font-bold text-green-600">€{driver.todayEarnings}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/drivers/${driver.id}/edit`}>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105">
                <Edit3 className="w-6 h-6" />
                Επεξεργασία Προφίλ
              </button>
            </Link>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105">
              <Phone className="w-6 h-6" />
              Call
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105">
              <MessageSquare className="w-6 h-6" />
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Στοιχεία</h3>
            <div className="space-y-3">
              <p className="text-slate-600"><span className="font-medium">Άδεια Οδήγησης:</span> {driver.licenseNumber}</p>
              <p className="text-slate-600"><span className="font-medium">Τηλέφωνο:</span> {driver.phone}</p>
              <p className="text-slate-600"><span className="font-medium">Email:</span> {driver.email}</p>
              <p className="text-slate-600"><span className="font-medium">IBAN:</span> {driver.iban || 'Δεν έχει δηλωθεί'}</p>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                {driver.hasDCategory ? <CheckSquare className="w-6 h-6 text-blue-600" /> : <Square className="w-6 h-6 text-slate-400" />}
                <span className="text-slate-700">Κάτοχος Δ' Κατηγορίας Δίπλωμα</span>
              </div>
              <div className="flex items-center gap-3">
                {driver.hasTaxiLicense ? <CheckSquare className="w-6 h-6 text-yellow-600" /> : <Square className="w-6 h-6 text-slate-400" />}
                <span className="text-slate-700">Κάτοχος Ειδικής Άδειας Ταξί</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Βάρδια Σήμερα</h3>
            <p className="text-2xl font-bold text-slate-900">{driver.shift}</p>
            <p className="text-slate-600 mt-2">{driver.todayJobs} κρατήσεις</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Έγγραφα (Google Drive)</h3>
            <div className="space-y-3">
              {driver.uploadedDocuments.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-600" />
                    <span className="text-sm">{doc.name}</span>
                  </div>
                  <button 
                    onClick={() => console.log(`Download από Google Drive: ${doc.name}`)}
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <Download className="w-5 h-5" />
                    Λήψη
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Today's Jobs */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Σημερινές Κρατήσεις</h3>
            <div className="space-y-4">
              {driver.todayJobsList.map((job, i) => (
                <div key={i} className="border-l-4 border-l-blue-600 pl-6 py-4 bg-blue-50 rounded-r-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-slate-900">{job.time} • {job.client}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getJobStatusColor(job.status)}`}>
                      {getJobStatusText(job.status)}
                    </span>
                  </div>
                  <p className="text-slate-600">{job.from} → {job.to}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}