'use client'

import { useState } from 'react'

export default function NewBooking() {
  const [mainService, setMainService] = useState('Airport Transfer')
  const [mainPrice, setMainPrice] = useState(80)
  const [mainIsExternal, setMainIsExternal] = useState(false)
  const [mainExternalPartner, setMainExternalPartner] = useState('')
  const [mainExternalCost, setMainExternalCost] = useState(0)
  const [extraLegs, setExtraLegs] = useState<{ service: string; price: number; time: string; isExternal: boolean; externalPartner: string; externalCost: number }[]>([])
  const [extraServices, setExtraServices] = useState<{
    service: string;
    price: number;
    time: string;
    isExternal: boolean;
    externalPartner: string;
    externalCost: number;
    pickup: string;
    dropoff: string;
  }[]>([])
  const [b2bPartner, setB2bPartner] = useState('')
  const [commissionBase, setCommissionBase] = useState<'gross' | 'net'>('gross')
  const [pickup, setPickup] = useState('Athens Airport')
  const [dropoff, setDropoff] = useState('Hotel Grande Bretagne')
  const [extraStops, setExtraStops] = useState<string[]>([])
  const [passengers, setPassengers] = useState<number>(1)

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
    'Mykonos Package': [
      { min: 1, max: 4, price: 600 },
      { min: 5, max: 8, price: 900 },
      { min: 9, max: '∞', price: 1200 },
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

  const externalPartners = [
    { name: 'Taxi Athens', defaultCost: 50 },
    { name: 'Mykonos Transfers Ltd', defaultCost: 150 },
    { name: 'Santorini Tours', defaultCost: 200 },
  ]

  const partnersList = [
    { name: 'Grande Bretagne', type: 'B2B', commissionType: 'percentage', commissionValue: 15 },
    { name: 'Blue Villas', type: 'B2B', commissionType: 'percentage', commissionValue: 12 },
    { name: 'Hotel Nefeli', type: 'both', commissionType: 'fixed', commissionValue: 50 },
    { name: 'Taxi Athens', type: 'external' },
    { name: 'Mykonos Transfers Ltd', type: 'external' },
    { name: 'Santorini Tours', type: 'external' },
  ]

  const b2bOptions = partnersList.filter(p => p.type === 'B2B' || p.type === 'both')

  const getServicePrice = (serviceName: string, pax: number): number => {
    const tiers = serviceTiers[serviceName]
    if (!tiers) return servicePrices[serviceName] || 0

    const matchingTier = tiers.find(tier => pax >= tier.min && (tier.max === '∞' || pax <= tier.max))
    return matchingTier ? matchingTier.price : servicePrices[serviceName] || 0
  }

  const handleMainServiceChange = (service: string) => {
    setMainService(service)

    if (comboLegs[service]) {
      setMainPrice(0)
      setMainIsExternal(false)
      setMainExternalPartner('')
      setMainExternalCost(0)
      setExtraLegs(comboLegs[service].map(leg => ({ 
        service: leg.service, 
        price: leg.price, 
        time: '', 
        isExternal: false, 
        externalPartner: '', 
        externalCost: 0 
      })))
    } else {
      const calculatedPrice = getServicePrice(service, passengers)
      setMainPrice(calculatedPrice)
      setExtraLegs([])
    }
  }

  const handlePassengersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPax = Math.max(1, Number(e.target.value) || 1)
    setPassengers(newPax)

    if (!comboLegs[mainService]) {
      const calculatedPrice = getServicePrice(mainService, newPax)
      setMainPrice(calculatedPrice)
    }
  }

  const toggleMainExternal = () => {
    const newIsExternal = !mainIsExternal
    setMainIsExternal(newIsExternal)
    if (newIsExternal) {
      const partner = externalPartners[0]
      setMainExternalPartner(partner.name)
      setMainExternalCost(partner.defaultCost)
    } else {
      setMainExternalPartner('')
      setMainExternalCost(0)
    }
  }

  const handleMainExternalPartnerChange = (partnerName: string) => {
    setMainExternalPartner(partnerName)
    const partner = externalPartners.find(p => p.name === partnerName)
    const cost = partner?.defaultCost || 0
    setMainExternalCost(cost)
  }

  const updateExtraLeg = (index: number, field: keyof typeof extraLegs[number], value: string | number | boolean) => {
    setExtraLegs(prev => prev.map((leg, i) => i === index ? { ...leg, [field]: value } : leg))
  }

  const toggleExtraExternal = (index: number) => {
    setExtraLegs(prev => prev.map((leg, i) => {
      if (i === index) {
        const isExternal = !leg.isExternal
        if (isExternal) {
          const partner = externalPartners[0]
          return { ...leg, isExternal, externalPartner: partner.name, externalCost: partner.defaultCost }
        }
        return { ...leg, isExternal, externalPartner: '', externalCost: 0 }
      }
      return leg
    }))
  }

  const handleExtraExternalPartnerChange = (index: number, partnerName: string) => {
    const partner = externalPartners.find(p => p.name === partnerName)
    updateExtraLeg(index, 'externalPartner', partnerName)
    updateExtraLeg(index, 'externalCost', partner?.defaultCost || 0)
  }

  const addExtraService = () => {
    const defaultService = availableServices[0]
    setExtraServices([...extraServices, { 
      service: defaultService, 
      price: servicePrices[defaultService] || 0, 
      time: '', 
      isExternal: false, 
      externalPartner: '', 
      externalCost: 0,
      pickup: '',
      dropoff: ''
    }])
  }

  const updateExtraService = (index: number, field: keyof typeof extraServices[number], value: string | number | boolean) => {
    setExtraServices(prev => prev.map((s, i) => {
      if (i !== index) return s

      if (field === 'service') {
        const serviceName = value as string
        const newPrice = servicePrices[serviceName] || 0
        return { ...s, service: serviceName, price: newPrice }
      } else if (field === 'price') {
        return { ...s, price: value as number }
      } else if (field === 'time') {
        return { ...s, time: value as string }
      } else if (field === 'isExternal') {
        const isExternal = value as boolean
        if (isExternal) {
          const partner = externalPartners[0]
          return { ...s, isExternal, externalPartner: partner.name, externalCost: partner.defaultCost }
        }
        return { ...s, isExternal, externalPartner: '', externalCost: 0 }
      } else if (field === 'externalPartner') {
        const partnerName = value as string
        const partner = externalPartners.find(p => p.name === partnerName)
        const cost = partner?.defaultCost || 0
        return { ...s, externalPartner: partnerName, externalCost: cost }
      } else if (field === 'externalCost') {
        return { ...s, externalCost: value as number }
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

  const handleSaveBooking = () => {
    console.log('Κράτηση αποθηκεύτηκε!')
    alert('Κράτηση αποθηκεύτηκε επιτυχώς! (mock)')
  }

  const grossRevenue = mainPrice + extraLegs.reduce((sum, leg) => sum + leg.price, 0) + extraServices.reduce((sum, s) => sum + s.price, 0)

  const totalExternalCost = (mainIsExternal ? mainExternalCost : 0) + extraLegs.reduce((sum, leg) => sum + (leg.isExternal ? leg.externalCost : 0), 0) + extraServices.reduce((sum, s) => sum + (s.isExternal ? s.externalCost : 0), 0)

  const selectedB2b = partnersList.find(p => p.name === b2bPartner)
  const baseForCommission = commissionBase === 'gross' ? grossRevenue : (grossRevenue - totalExternalCost)
  const b2bCommission = selectedB2b && 'commissionType' in selectedB2b && selectedB2b.commissionValue !== undefined
    ? selectedB2b.commissionType === 'percentage'
      ? baseForCommission * selectedB2b.commissionValue / 100
      : selectedB2b.commissionValue
    : 0

  const netProfit = grossRevenue - totalExternalCost - b2bCommission

  const b2bLabelWithCommission = selectedB2b && 'commissionType' in selectedB2b
    ? selectedB2b.commissionType === 'percentage'
      ? `${b2bPartner} (${selectedB2b.commissionValue}%)`
      : `${b2bPartner} (${selectedB2b.commissionValue}€ fixed)`
    : b2bPartner

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-slate-900">Νέα Κράτηση</h1>

        {/* B2B ή B2C */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">B2B ή B2C</h2>
          <select 
            value={b2bPartner}
            onChange={(e) => setB2bPartner(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-slate-300 rounded-lg"
          >
            <option value="">Direct Booking</option>
            {b2bOptions.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>

          {b2bPartner && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-900 mb-3">Προμήθεια B2B ({b2bPartner}) επί:</p>
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="commissionBase" 
                    value="gross"
                    checked={commissionBase === 'gross'}
                    onChange={() => setCommissionBase('gross')}
                    className="w-5 h-5 text-purple-600"
                  />
                  <span className="text-purple-800 font-medium">Συνολικού Ποσού</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="commissionBase" 
                    value="net"
                    checked={commissionBase === 'net'}
                    onChange={() => setCommissionBase('net')}
                    className="w-5 h-5 text-purple-600"
                  />
                  <span className="text-purple-800 font-medium">Καθαρού Κέρδους (μετά έξοδα)</span>
                </label>
              </div>
            </div>
          )}
        </div>

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
                type="number"
                value={passengers}
                onChange={handlePassengersChange}
                min="1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none" // ΝΕΟ: κρύβει arrows
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

          {/* ΝΕΟ: Hint για tiered pricing */}
          {serviceTiers[mainService] && (
            <p className="text-sm text-blue-600 mt-2">
              Η τιμή της κύριας υπηρεσίας υπολογίζεται αυτόματα βάσει αριθμού ατόμων (tiered pricing)
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
                  <div className="relative">
                    <input 
                      type="number" 
                      value={mainPrice}
                      onChange={(e) => setMainPrice(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={mainIsExternal}
                      onChange={toggleMainExternal}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-slate-700">Εξωτερικός</span>
                  </div>
                </div>
                {mainIsExternal && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Συνεργάτες</label>
                      <select 
                        value={mainExternalPartner}
                        onChange={(e) => handleMainExternalPartnerChange(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                      >
                        <option value="">Επιλέξτε</option>
                        {externalPartners.map(p => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Έξοδο (€)</label>
                      <input 
                        type="number" 
                        value={mainExternalCost}
                        onChange={(e) => setMainExternalCost(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                      />
                    </div>
                  </>
                )}
                {!mainIsExternal && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Οδηγός</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                        <option>-- Μη Ανατεθειμένο --</option>
                        <option>Νίκος Παπαδόπουλος</option>
                        <option>Πέτρος Κωνσταντίνου</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Όχημα</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                        <option>-- Επιλογή --</option>
                        <option>IKA-1234 - Mercedes V-Class</option>
                        <option>MYK-9012 - Mercedes Sprinter</option>
                      </select>
                    </div>
                  </>
                )}
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
                        onChange={(e) => updateExtraLeg(index, 'time', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Τιμή (€)</label>
                      <input 
                        type="number" 
                        value={leg.price}
                        onChange={(e) => updateExtraLeg(index, 'price', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={leg.isExternal}
                          onChange={() => toggleExtraExternal(index)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-slate-700">Εξωτερικός</span>
                      </div>
                    </div>
                    {leg.isExternal && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Συνεργάτες</label>
                          <select 
                            value={leg.externalPartner}
                            onChange={(e) => handleExtraExternalPartnerChange(index, e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                          >
                            <option value="">Επιλέξτε</option>
                            {externalPartners.map(p => (
                              <option key={p.name} value={p.name}>{p.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Έξοδο (€)</label>
                          <input 
                            type="number" 
                            value={leg.externalCost}
                            onChange={(e) => updateExtraLeg(index, 'externalCost', Number(e.target.value))}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                          />
                        </div>
                      </>
                    )}
                    {!leg.isExternal && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Οδηγός</label>
                          <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                            <option>-- Μη Ανατεθειμένο --</option>
                            <option>Νίκος Παπαδόπουλος</option>
                            <option>Πέτρος Κωνσταντίνου</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Όχημα</label>
                          <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                            <option>-- Επιλογή --</option>
                            <option>IKA-1234 - Mercedes V-Class</option>
                            <option>MYK-9012 - Mercedes Sprinter</option>
                          </select>
                        </div>
                      </>
                    )}
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
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end">
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
                  <div className="flex items-end">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={extra.isExternal}
                        onChange={() => updateExtraService(index, 'isExternal', !extra.isExternal)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-slate-700">Εξωτερικός</span>
                    </div>
                  </div>

                  {extra.isExternal ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Συνεργάτες</label>
                        <select 
                          value={extra.externalPartner}
                          onChange={(e) => updateExtraService(index, 'externalPartner', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        >
                          <option value="">Επιλέξτε</option>
                          {externalPartners.map(p => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Έξοδο (€)</label>
                        <input 
                          type="number" 
                          value={extra.externalCost}
                          onChange={(e) => updateExtraService(index, 'externalCost', Number(e.target.value))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Οδηγός</label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                          <option>-- Μη Ανατεθειμένο --</option>
                          <option>Νίκος Παπαδόπουλος</option>
                          <option>Πέτρος Κωνσταντίνου</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Όχημα</label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                          <option>-- Επιλογή --</option>
                          <option>IKA-1234 - Mercedes V-Class</option>
                          <option>MYK-9012 - Mercedes Sprinter</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="col-span-1 flex justify-end">
                    <button 
                      onClick={() => removeExtraService(index)}
                      className="text-red-600 hover:text-red-700 text-lg font-bold"
                    >
                      ×
                    </button>
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

              {/* Σύνολο Εξόδων */}
              <div className="flex justify-between items-center font-bold text-lg border-t pt-6 mt-2">
                <span>Έξοδα</span>
                <span>-€{(totalExternalCost + b2bCommission).toFixed(2)}</span>
              </div>

              {/* Breakdown εξόδων */}
              <div className="space-y-2 pl-6">
                {mainIsExternal && (
                  <div className="flex justify-between text-red-600">
                    <span>Κύρια Υπηρεσία - {mainExternalPartner}</span>
                    <span>-€{mainExternalCost.toFixed(2)}</span>
                  </div>
                )}

                {extraLegs.filter(leg => leg.isExternal).map((leg, idx) => (
                  <div key={idx} className="flex justify-between text-red-600">
                    <span>Leg {idx + 1} - {leg.externalPartner}</span>
                    <span>-€{leg.externalCost.toFixed(2)}</span>
                  </div>
                ))}

                {extraServices.filter(s => s.isExternal).map((s, idx) => (
                  <div key={idx} className="flex justify-between text-red-600">
                    <span>Extra Υπηρεσία {idx + 1} - {s.externalPartner}</span>
                    <span>-€{s.externalCost.toFixed(2)}</span>
                  </div>
                ))}

                {b2bPartner && b2bCommission > 0 && (
                  <div className="flex justify-between text-purple-600 font-medium pt-2">
                    <span>Προμήθεια B2B ({b2bLabelWithCommission})</span>
                    <span>-€{b2bCommission.toFixed(2)}</span>
                  </div>
                )}
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