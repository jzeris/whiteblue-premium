'use client'

import { useState } from 'react'
import { MapPin, Calendar, Clock, CheckCircle, XCircle, MessageCircle, Lock } from 'lucide-react'

export default function TripLandingPage() {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showExtraModal, setShowExtraModal] = useState(false)

  const trip = {
    client_name: 'Mr. John Doe',
    ref: '#1024',
    is_protected: false, // Άλλαξε σε true για να δεις password screen
    days: [
      {
        date: '25 Oct 2023',
        services: [
          {
            title: 'VIP Airport Transfer',
            time: '14:30',
            pickup: 'Athens Intl. Airport (ATH)',
            dropoff: 'Hotel Grande Bretagne',
            image: 'https://placehold.co/800x400/0057D9/FFF?text=Mercedes+V-Class',
            desc: 'Private transfer with Mercedes V-Class. Meet & Greet at Arrivals Hall.',
            inclusions: ['English Speaking Driver', 'Water & Wipes', 'Tolls & Fees'],
            exclusions: ['Gratuities'],
          }
        ]
      },
      {
        date: '26 Oct 2023',
        services: [
          {
            title: 'Sunset Tour to Sounio',
            time: '17:00',
            pickup: 'Hotel Grande Bretagne',
            dropoff: 'Hotel Grande Bretagne',
            image: 'https://placehold.co/800x400/FF5733/FFF?text=Poseidon+Temple',
            desc: 'A magical evening tour along the Athenian Riviera to the Temple of Poseidon.',
            inclusions: ['4 Hours Duration', 'Private Vehicle', 'Refreshments'],
            exclusions: ['Entrance Fees (€10)', 'Tour Guide'],
          }
        ]
      }
    ]
  }

  // Password protection
  if (trip.is_protected && !isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
        <Lock className="w-12 h-12 mb-4 text-blue-400" />
        <h1 className="text-2xl font-bold mb-2">Secure Itinerary</h1>
        <p className="text-slate-400 mb-6">Please enter the access code sent to your email.</p>
        <form onSubmit={(e) => { e.preventDefault(); if(password==='1234') setIsUnlocked(true); }} className="w-full max-w-xs">
          <input 
            type="password" 
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-center tracking-[0.5em] text-xl focus:ring-2 focus:ring-blue-500 outline-none mb-4"
            placeholder="••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 py-3 rounded-lg font-bold">Unlock</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <div className="relative h-[40vh] bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <img src="https://placehold.co/1920x1080/000000/FFF?text=Cinematic+Greece+Video" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full mx-auto flex items-center justify-center mb-4 border border-white/20">
            <span className="text-2xl font-serif">W</span>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] mb-2 text-blue-200">Your Personal Itinerary</p>
          <h1 className="text-4xl md:text-6xl font-serif font-medium">{trip.client_name}</h1>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20">
        {trip.days.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-12">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center mb-6 sticky top-4 z-30">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-4">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-800">{day.date}</span>
            </div>

            <div className="space-y-8 pl-4 border-l-2 border-slate-200 ml-4">
              {day.services.map((service, sIndex) => (
                <div key={sIndex} className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-50"></div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="h-48 bg-slate-200 relative">
                      <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {service.time}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        {service.desc}
                      </p>

                      <div className="bg-slate-50 p-4 rounded-xl mb-6 text-sm">
                        <div className="flex items-start mb-3">
                          <MapPin className="w-4 h-4 text-green-600 mr-3 mt-1" />
                          <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase">Pickup</span>
                            <span className="font-medium">{service.pickup}</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-red-600 mr-3 mt-1" />
                          <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase">Dropoff</span>
                            <span className="font-medium">{service.dropoff}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-bold text-slate-900 mb-2">Included</p>
                          <ul className="space-y-1">
                            {service.inclusions.map((item, i) => (
                              <li key={i} className="flex items-center text-slate-600">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 mb-2">Excluded</p>
                          <ul className="space-y-1">
                            {service.exclusions.map((item, i) => (
                              <li key={i} className="flex items-center text-slate-400">
                                <XCircle className="w-3 h-3 text-slate-300 mr-2" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Request Extra */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowExtraModal(true)}
            className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-black transition-transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Request Extra Service
          </button>
          <p className="text-slate-400 text-sm mt-4">Need to change something? Contact us directly.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-white border-t border-slate-100 text-center">
        <div className="w-10 h-10 bg-blue-900 rounded-lg mx-auto flex items-center justify-center text-white font-bold mb-4">W</div>
        <p className="text-slate-400 text-sm">Services provided by WhiteBlue Premium</p>
      </footer>

      {/* Extra Modal */}
      {showExtraModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 animate-in slide-in-from-bottom-20">
            <h3 className="text-xl font-bold mb-4">Add Extra Service</h3>
            <p className="text-slate-500 text-sm mb-6">Let us know what you need. We will update your itinerary.</p>
            
            <div className="space-y-4 mb-6">
              <select className="w-full p-3 border rounded-lg bg-white">
                <option>Additional Transfer</option>
                <option>Restaurant Reservation</option>
                <option>Extend Tour Hours</option>
                <option>Other</option>
              </select>
              <textarea className="w-full p-3 border rounded-lg" rows={3} placeholder="Details..."></textarea>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowExtraModal(false)} className="flex-1 py-3 text-slate-500 font-bold">Cancel</button>
              <button onClick={() => { alert('Request sent!'); setShowExtraModal(false); }} className="flex-1 bg-blue-600 text-white rounded-lg font-bold">Send Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}