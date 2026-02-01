'use client'

import { useState, ChangeEvent } from 'react'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'
import { el } from 'date-fns/locale'

// Mock υπηρεσίες (όπως τις δηλώνεις εσύ)
const availableServices = [
  'Airport Transfer',
  'Hourly',
  'Day Trip',
  'Mykonos Package',
  'Meet & Greet',
  'Assistant',
  'Wine Tasting Tour',
]

const servicePrices: Record<string, number> = {
  'Airport Transfer': 80,
  'Hourly': 60,
  'Day Trip': 300,
  'Mykonos Package': 800,
  'Meet & Greet': 50,
  'Assistant': 100,
  'Wine Tasting Tour': 450,
}

const serviceTiers: Record<string, { min: number; max: number | '∞'; price: number }[]> = {
  'Airport Transfer': [
    { min: 1, max: 6, price: 70 },
    { min: 7, max: 12, price: 140 },
    { min: 13, max: '∞', price: 180 },
  ],
  'Hourly': [
    { min: 1, max: 4, price: 60 },
    { min: 5, max: 8, price: 100 },
    { min: 9, max: '∞', price: 140 },
  ],
  'Day Trip': [
    { min: 1, max: 6, price: 300 },
    { min: 7, max: 12, price: 500 },
    { min: 13, max: '∞', price: 700 },
  ],
  'Mykonos Package': [
    { min: 1, max: 4, price: 800 },
    { min: 5, max: 8, price: 1200 },
    { min: 9, max: '∞', price: 1600 },
  ],
}

const comboLegs: Record<string, { service: string; price: number }[]> = {
  'Wine Tasting Tour': [
    { service: 'Airport Transfer', price: 80 },
    { service: 'Wine Tasting Tour', price: 290 },
    { service: 'Airport Transfer', price: 80 },
  ],
  'Mykonos Package': [
    { service: 'Airport Transfer', price: 150 },
    { service: 'Mykonos Package', price: 500 },
    { service: 'Airport Transfer', price: 150 },
  ],
}

// Mock προμήθεια συνεργάτη (από προφίλ – εδώ 15%)
const partnerCommission = { type: 'percentage', value: 15 }

export default function NewB2BBooking() {
  const [mainService, setMainService] = useState<keyof typeof serviceTiers>('Airport Transfer')
  const [mainPrice, setMainPrice] = useState(80)
  const [extraLegs, setExtraLegs] = useState<{ service: string; price: number; time: string }[]>([])
  const [extraServices, setExtraServices] = useState<{
    service: string;
    price: number;
    time: string;
    pickup: string;
    dropoff: string;
  }[]>([])
  const [pickup, setPickup] = useState('Athens Airport')
  const [dropoff, setDropoff] = useState('Hotel Grande Bretagne')
  const [extraStops, setExtraStops] = useState<string[]>([])
  const [passengers, setPassengers] = useState<number>(0) // Default 0 (φαίνεται κενό)

  const getServicePrice = (serviceName: string, pax: number): number => {
    const tiers = serviceTiers[serviceName as keyof typeof serviceTiers] || []
    if (tiers.length === 0) return servicePrices[serviceName] || 0

    const matchingTier = tiers.find(tier => pax >= tier.min && (tier.max === '∞' || pax <= tier.max))
    return matchingTier ? matchingTier.price : servicePrices[serviceName] || 0
  }

  const handleMainServiceChange = (service: string) => {
    setMainService(service as keyof typeof serviceTiers)

    if (comboLegs[service]) {
      setMainPrice(0)
      setExtraLegs(comboLegs[service].map(leg => ({ 
        service: leg.service, 
        price: leg.price, 
        time: '', 
      })))
    } else {
      const calculatedPrice = getServicePrice(service, passengers)
      setMainPrice(calculatedPrice)
      setExtraLegs([])
    }

    // Ενημέρωση τιμών extra services
    setExtraServices(prev => prev.map(s => ({
      ...s,
      price: getServicePrice(s.service, passengers)
    })))
  }

  const handlePassengersChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === '') {
      setPassengers(0)
      return
    }
    if (/^\d+$/.test(val)) {
      const num = Number(val)
      setPassengers(num)
      if (!comboLegs[mainService]) {
        setMainPrice(getServicePrice(mainService, num))
      }
      setExtraLegs(prev => prev.map(leg => ({
        ...leg,
        price: getServicePrice(leg.service, num)
      })))
      setExtraServices(prev => prev.map(s => ({
        ...s,
        price: getServicePrice(s.service, num)
      })))
    }
  }

  const addExtraService = () => {
    const defaultService = availableServices[0]
    const defaultPrice = getServicePrice(defaultService, passengers)
    setExtraServices([...extraServices, { 
      service: defaultService, 
      price: defaultPrice, 
      time: '', 
      pickup: '',
      dropoff: ''
    }])
  }

  const updateExtraService = (index: number, field: keyof typeof extraServices[number], value: string | number) => {
    setExtraServices(prev => prev.map((s, i) => {
      if (i !== index) return s

      if (field === 'service') {
        const serviceName = value as string
        const newPrice = getServicePrice(serviceName, passengers)
        return { ...s, service: serviceName, price: newPrice }
      } else if (field === 'price') {
        return { ...s, price: value as number }
      } else if (field === 'time') {
        return { ...s, time: value as string }
      } else if (field === 'pickup') {
        return { ...s, pickup: value as string }
      } else if (field === 'dropoff') {
        return { ...s, dropoff: value as string }
      }
      return s
    }))
  }

  const removeExtraService = (index: number) => {
    setExtraServices(prev => prev.filter((_, i) => i !== index))
  }

  const addExtraStop = () => {
    setExtraStops(prev => [...prev, ''])
  }

  const updateExtraStop = (index: number, value: string) => {
    setExtraStops(prev => prev.map((stop, i) => i === index ? value : stop))
  }

  const removeExtraStop = (index: number) => {
    setExtraStops(prev => prev.filter((_, i) => i !== index))
  }

  const grossRevenue = mainPrice + extraLegs.reduce((sum, leg) => sum + leg.price, 0) + extraServices.reduce((sum, s) => sum + s.price, 0)

  const b2bCommission = grossRevenue * (partnerCommission.value / 100)

  const netProfit = grossRevenue - b2bCommission

  const handleSaveBooking = () => {
    console.log('Κράτηση αποθηκεύτηκε!')
    alert('Κράτηση αποθηκεύτηκε επιτυχώς! (mock)')
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-slate-900">Νέα Κράτηση (B2B)</h1>

        {/* Λίστα Επιβατών */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Λίστα Επιβατών</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reference Number</label>
              <input type="text" placeholder="e.g. 19074" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Passenger's Leader</label>
              <input type="text" placeholder="e.g. Marcus Kantowski" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">Υπόλοιποι Επιβάτες (copy-paste)</label>
            <textarea 
              rows={3}
              placeholder="1. John Doe - Adult\n2. Jane Doe - Child\n3. Baby Smith - Infant"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y min-h-[80px] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Άτομα</label>
              <input 
                type="text" 
                inputMode="numeric" 
                pattern="[0-9]*" 
                value={passengers === 0 ? '' : passengers} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const val = e.target.value
                  if (val === '') {
                    setPassengers(0)
                    return
                  }
                  if (/^\d+$/.test(val)) {
                    const num = Number(val)
                    setPassengers(num)
                    // Update τιμές
                    if (!comboLegs[mainService]) {
                      setMainPrice(getServicePrice(mainService, num))
                    }
                    setExtraLegs(prev => prev.map(leg => ({
                      ...leg,
                      price: getServicePrice(leg.service, num)
                    })))
                    setExtraServices(prev => prev.map(s => ({
                      ...s,
                      price: getServicePrice(s.service, num)
                    })))
                  }
                }}
                onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.preventDefault()} // Εξασφαλίζει ότι η ροδέλα ΔΕΝ αλλάζει τίποτα
                placeholder="0"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Τηλέφωνο</label>
              <div className="flex">
                <div className="flex items-center px-3 py-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg">
                  <span className="text-sm">🇬🇷 +30</span>
                </div>
                <input 
                  type="text" 
                  placeholder="6941234567" 
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-r-lg" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="john.doe@example.com" 
                className="w-full px-4 py-3 border border-slate-300 rounded-lg" 
              />
            </div>
          </div>

          {/* Hint για tiered pricing */}
          {serviceTiers[mainService] && (
            <p className="text-sm text-blue-600 mt-2 italic">
              Η τιμή υπολογίζεται αυτόματα βάσει αριθμού ατόμων (tiered pricing)
            </p>
          )}
        </div>

        {/* Λεπτομέρειες Διαδρομής */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Λεπτομέρειες Διαδρομής</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ημερομηνία & Ώρα</label>
              <input type="datetime-local" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Πτήση</label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="A3 123" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">Κύρια Υπηρεσία</label>
            <select 
              value={mainService}
              onChange={(e) => handleMainServiceChange(e.target.value)}
              className="w-full max-w-md px-4 py-3 border border-slate-300 rounded-lg"
            >
              {availableServices.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {extraLegs.length === 0 && (
            <div className="mb-6 p-6 bg-slate-50 rounded-xl">
              <p className="font-medium text-slate-800 mb-4">Κύρια Υπηρεσία: {mainService}</p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Τιμή (€)</label>
                  <input 
                    type="number" 
                    value={mainPrice}
                    onChange={(e) => setMainPrice(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                  />
                </div>
              </div>
            </div>
          )}

          {extraLegs.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Legs του Combo</h3>
              {extraLegs.map((leg, index) => (
                <div key={index} className="mb-6 p-6 bg-slate-50 rounded-xl">
                  <p className="font-medium text-slate-800 mb-4">Leg {index + 1}: {leg.service}</p>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ώρα</label>
                      <input 
                        type="time" 
                        value={leg.time || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const newLegs = [...extraLegs]
                          newLegs[index].time = e.target.value
                          setExtraLegs(newLegs)
                        }}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Τιμή (€)</label>
                      <input 
                        type="number" 
                        value={leg.price}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const newLegs = [...extraLegs]
                          newLegs[index].price = Number(e.target.value)
                          setExtraLegs(newLegs)
                        }}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pickup + Dropoff + Extra Stops */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pickup</label>
              <input 
                type="text" 
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dropoff</label>
              <input 
                type="text" 
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg" 
              />
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={addExtraStop}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 mb-4"
            >
              + Extra Stop
            </button>
            {extraStops.map((stop, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input 
                  type="text" 
                  value={stop}
                  onChange={(e) => updateExtraStop(index, e.target.value)}
                  placeholder="Extra Stop"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg"
                />
                <button 
                  onClick={() => removeExtraStop(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Επιπλέον Υπηρεσίες */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Επιπλέον Υπηρεσίες</h2>

            <div className="mb-6">
              <button 
                onClick={addExtraService}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
              >
                + Επιπλέον Υπηρεσία
              </button>
            </div>

            {extraServices.map((extra, index) => (
              <div key={index} className="mb-6 p-6 bg-slate-50 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Υπηρεσία</label>
                    <select 
                      value={extra.service}
                      onChange={(e) => updateExtraService(index, 'service', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                    >
                      {availableServices.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ώρα</label>
                    <input 
                      type="time" 
                      value={extra.time ?? ''}
                      onChange={(e) => updateExtraService(index, 'time', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pickup</label>
                    <input 
                      type="text" 
                      value={extra.pickup ?? ''}
                      onChange={(e) => updateExtraService(index, 'pickup', e.target.value)}
                      placeholder="Athens Airport"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dropoff</label>
                    <input 
                      type="text" 
                      value={extra.dropoff ?? ''}
                      onChange={(e) => updateExtraService(index, 'dropoff', e.target.value)}
                      placeholder="Hotel Grande Bretagne"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Τιμή (€)</label>
                    <input 
                      type="number" 
                      value={extra.price}
                      onChange={(e) => updateExtraService(index, 'price', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extras */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Extras</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                <span className="text-slate-700">Αναπηρικό Αμαξίδιο</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                <span className="text-slate-700">Παιδικό Κάθισμα</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                <span className="text-slate-700">Ακουστικά</span>
              </label>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900 font-medium">
                Πινακίδα Χαιρετισμού: Υποχρεωτική με όνομα Passenger's Leader
              </p>
            </div>
          </div>

          {/* Οικονομικά */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Οικονομικά</h2>
            <div className="space-y-4">
              {/* Σύνολο Εσόδων */}
              <div className="flex justify-between items-center font-bold text-lg border-b pb-3">
                <span>Έσοδα από Πελάτη</span>
                <span>€{grossRevenue.toFixed(2)}</span>
              </div>

              {/* Breakdown εσόδων */}
              <div className="space-y-2 pl-6">
                <div className="flex justify-between text-slate-700">
                  <span>Κύρια Υπηρεσία ({mainService})</span>
                  <span>+€{mainPrice.toFixed(2)}</span>
                </div>

                {extraLegs.map((leg, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span>Leg {idx + 1}: {leg.service}</span>
                    <span>+€{leg.price.toFixed(2)}</span>
                  </div>
                ))}

                {extraServices.map((extra, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span>Extra Υπηρεσία: {extra.service} @ {extra.time || '--:--'}</span>
                    <span>+€{extra.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Προμήθεια */}
              <div className="flex justify-between border-t pt-4 font-bold text-xl mt-4">
                <span>Προμήθεια B2B</span>
                <span className="text-red-600">-€{b2bCommission.toFixed(2)}</span>
              </div>

              {/* Καθαρό Κέρδος */}
              <div className="flex justify-between border-t pt-4 font-bold text-xl mt-4">
                <span>Καθαρό Κέρδος</span>
                <span className="text-green-600">€{netProfit.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Invoice</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Collect Status</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                  <option>Collect</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
              </div>
            </div>

            <div className="mt-8 text-right">
              <button 
                onClick={handleSaveBooking}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-16 rounded-xl shadow-lg transition-transform hover:scale-105 text-xl"
              >
                Αποθήκευση Κράτησης
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}