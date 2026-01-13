'use client'

import { MapPin, Phone, Mail, Edit, DollarSign, Car, User, MessageSquare, CheckCircle } from 'lucide-react'

export default function BookingDetail() {
  const booking = {
    id: '1001',
    client: 'John Doe',
    pax: 4,
    phone: '+30 690 1234567',
    email: 'john@example.com',
    partner: 'Blue Villas Mykonos (10% commission)',
    date: '05/01/2026',
    time: '14:30',
    flight: 'A3 123',
    from: 'Athens Intl. Airport (ATH)',
    to: 'Hotel Grande Bretagne',
    service: 'VIP Airport Transfer',
    price: '€80.00',
    cost: '€40.00',
    profit: '€40.00',
    driver: 'Nikos Papadopoulos',
    vehicle: 'Mercedes V-Class (IKA-1234)',
    notes: 'Child seat required. Client has extra luggage.',
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Κράτηση #{booking.id}</h1>
            <p className="text-slate-600 mt-1">{booking.client} • {booking.pax} άτομα • {booking.date} {booking.time}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
              Ανατεθειμένο
            </span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Επεξεργασία
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Στοιχεία Πελάτη
            </h3>
            <div className="space-y-3">
              <p className="text-slate-900 font-medium text-xl">{booking.client}</p>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4" />
                {booking.phone}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4" />
                {booking.email}
              </div>
              {booking.partner && (
                <p className="text-slate-600 mt-4">
                  <span className="font-medium">B2B Συνεργάτης:</span> {booking.partner}
                </p>
              )}
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Διαδρομή
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold">Pickup</p>
                  <p className="text-lg font-bold text-slate-900">{booking.time} • {booking.from}</p>
                  <p className="text-sm text-slate-600 mt-1">Flight: {booking.flight}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold">Dropoff</p>
                  <p className="text-lg font-bold text-slate-900">{booking.to}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service & Notes */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{booking.service}</h3>
            <p className="text-slate-600">{booking.notes}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Assignment */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Car className="w-5 h-5" />
              Ανάθεση
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-500">Οδηγός</p>
                <p className="font-medium text-slate-900">{booking.driver}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Όχημα</p>
                <p className="font-medium text-slate-900">{booking.vehicle}</p>
              </div>
            </div>
          </div>

          {/* Financials */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Οικονομικά
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Τιμή Πελάτη</span>
                <span className="font-bold text-slate-900">{booking.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Κόστος</span>
                <span className="font-bold text-slate-900">{booking.cost}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-bold text-slate-900">Καθαρό Κέρδος</span>
                <span className="font-bold text-green-600 text-xl">{booking.profit}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Nav
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Sign
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}