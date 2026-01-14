'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Plus, X, ImagePlus, Loader2 } from 'lucide-react'

interface PricingTier {
  min: number
  max: number | '∞'
  price: number
}

interface ComboLeg {
  time: string
  service: string
  price: number
  isExternal: boolean
  externalPartner: string
  externalCost: number
  isExternalPerPerson: boolean  // Νέο: αν το external cost είναι per person
}

interface Expense {
  name: string
  amount: number
}

interface Service {
  name: string
  description: string
  price: number        // base price
  duration: string
  category: string
  isCombo: boolean
  isPerPerson: boolean  // Νέο: αν η τιμή είναι per person
  defaultPassengers: number  // Νέο: default αριθμός ατόμων για calcs
  useTieredPricing: boolean          // ΝΕΟ: ενεργοποίηση tiered
  pricingTiers: PricingTier[]        // ΝΕΟ: τα εύρη τιμών
  legs: ComboLeg[]
  extras: { name: string; price: number }[]  // τιμή ανά extra
  expenses: Expense[]
  photos: string[]
}

export default function NewService() {
  const [service, setService] = useState<Service>({
    name: '',
    description: '',
    price: 0,
    duration: '',
    category: 'Transfer',
    isCombo: false,
    isPerPerson: false,
    defaultPassengers: 1,
    useTieredPricing: false,
    pricingTiers: [
      { min: 1, max: 6, price: 70 },
      { min: 7, max: 12, price: 140 },
      { min: 13, max: '∞', price: 180 }
    ],
    legs: [],
    extras: [],
    expenses: [],
    photos: [],
  })

  // Νέα states από το NewBooking + additions
  const [isExternal, setIsExternal] = useState(false)
  const [externalPartner, setExternalPartner] = useState('')
  const [externalCost, setExternalCost] = useState(0)
  const [isExternalPerPerson, setIsExternalPerPerson] = useState(false)  // Νέο για external cost per person

  const [b2bPartner, setB2bPartner] = useState('')
  const [commissionBase, setCommissionBase] = useState<'gross' | 'net'>('gross')

  const [isSaving, setIsSaving] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const categories = ['Transfer', 'Tour', 'Package', 'Custom']

  const legServices = ['Airport Transfer', 'Wine Tasting', 'Day Trip', 'Mykonos Package', 'Hourly', 'Custom']

  const extrasList = [
    { name: 'Luggage', price: 10 },
    { name: 'Baby Seat', price: 15 },
    { name: 'Wheelchair', price: 20 },
    { name: 'Headphones', price: 5 },
    { name: 'VIP', price: 50 },
    { name: 'Luxury', price: 100 },
  ]

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked ?? false

    setService(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setService(prev => ({
      ...prev,
      [name]: value ? Number(value) : 0,
    }))
  }

  const togglePerPerson = () => {
    setService(prev => ({
      ...prev,
      isPerPerson: !prev.isPerPerson,
      defaultPassengers: !prev.isPerPerson ? 1 : 1,  // reset to 1 if toggled off
    }))
  }

  const toggleTieredPricing = () => {
    setService(prev => ({
      ...prev,
      useTieredPricing: !prev.useTieredPricing,
    }))
  }

  const addPricingTier = () => {
    setService(prev => ({
      ...prev,
      pricingTiers: [...prev.pricingTiers, { min: 1, max: '∞', price: 0 }],
    }))
  }

  const updatePricingTier = (index: number, field: 'min' | 'max' | 'price', value: number | string) => {
    setService(prev => ({
      ...prev,
      pricingTiers: prev.pricingTiers.map((tier, i) =>
        i === index ? { ...tier, [field]: value } : tier
      ),
    }))
  }

  const removePricingTier = (index: number) => {
    setService(prev => ({
      ...prev,
      pricingTiers: prev.pricingTiers.filter((_, i) => i !== index),
    }))
  }

  const toggleCombo = () => {
    setService(prev => ({
      ...prev,
      isCombo: !prev.isCombo,
      legs: !prev.isCombo ? [
        { time: '', service: '', price: 0, isExternal: false, externalPartner: '', externalCost: 0, isExternalPerPerson: false }
      ] : [],
    }))
  }

  const addLeg = () => {
    setService(prev => ({
      ...prev,
      legs: [
        ...prev.legs,
        { time: '', service: '', price: 0, isExternal: false, externalPartner: '', externalCost: 0, isExternalPerPerson: false },
      ],
    }))
  }

  const removeLeg = (index: number) => {
    setService(prev => ({
      ...prev,
      legs: prev.legs.filter((_, i) => i !== index),
    }))
  }

  const updateLeg = (index: number, field: keyof ComboLeg, value: string | number | boolean) => {
    setService(prev => ({
      ...prev,
      legs: prev.legs.map((leg, i) =>
        i === index ? { ...leg, [field]: value } : leg
      ),
    }))
  }

  const toggleMainExternal = () => {
    const newIsExternal = !isExternal
    setIsExternal(newIsExternal)
    if (newIsExternal) {
      const partner = externalPartners[0]
      setExternalPartner(partner.name)
      setExternalCost(partner.defaultCost)
    } else {
      setExternalPartner('')
      setExternalCost(0)
      setIsExternalPerPerson(false)
    }
  }

  const handleExternalPartnerChange = (partnerName: string) => {
    setExternalPartner(partnerName)
    const partner = externalPartners.find(p => p.name === partnerName)
    setExternalCost(partner?.defaultCost || 0)
  }

  const toggleExternalPerPerson = () => {
    setIsExternalPerPerson(!isExternalPerPerson)
  }

  const toggleLegExternalPerPerson = (index: number) => {
    setService(prev => ({
      ...prev,
      legs: prev.legs.map((leg, i) =>
        i === index ? { ...leg, isExternalPerPerson: !leg.isExternalPerPerson } : leg
      ),
    }))
  }

  const addExpense = () => {
    setService(prev => ({
      ...prev,
      expenses: [...prev.expenses, { name: '', amount: 0 }],
    }))
  }

  const removeExpense = (index: number) => {
    setService(prev => ({
      ...prev,
      expenses: prev.expenses.filter((_, i) => i !== index),
    }))
  }

  const updateExpense = (index: number, field: keyof Expense, value: string | number) => {
    setService(prev => ({
      ...prev,
      expenses: prev.expenses.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    const newPhotos = files.map(file => URL.createObjectURL(file))
    setService(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
    }))
  }

  const removePhoto = (index: number) => {
    setService(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  // ────────────────────────────────────────────────
  // Οικονομικοί Υπολογισμοί (προσαρμοσμένοι με per person)
  // ────────────────────────────────────────────────
  const passengers = service.defaultPassengers || 1  // Χρησιμοποιούμε default για preview/calcs

  const baseRevenue = service.isPerPerson ? (service.price || 0) * passengers : (service.price || 0)

  const legsRevenue = service.legs.reduce((sum, leg) => sum + (leg.price || 0) * (service.isPerPerson ? passengers : 1), 0)

  const grossRevenue = baseRevenue + legsRevenue

  const baseExternalCost = isExternal ? (isExternalPerPerson ? externalCost * passengers : externalCost) : 0

  const legsExternalCost = service.legs.reduce((sum, leg) => 
    sum + (leg.isExternal ? (leg.isExternalPerPerson ? (leg.externalCost || 0) * passengers : (leg.externalCost || 0)) : 0), 0)

  const totalExternalCost = 
    baseExternalCost +
    legsExternalCost +
    service.expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0)

  const selectedB2b = partnersList.find(p => p.name === b2bPartner)
  const baseForCommission = commissionBase === 'gross' ? grossRevenue : (grossRevenue - totalExternalCost)
  const b2bCommission = selectedB2b && 'commissionType' in selectedB2b && selectedB2b.commissionValue !== undefined
    ? selectedB2b.commissionType === 'percentage'
      ? baseForCommission * selectedB2b.commissionValue / 100
      : selectedB2b.commissionValue
    : 0

  const netProfit = grossRevenue - totalExternalCost - b2bCommission

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const dataToSave = {
      ...service,
      isExternal,
      externalPartner,
      externalCost,
      isExternalPerPerson,
      b2bPartner,
      commissionBase,
      financials: {
        grossRevenue,
        totalExternalCost,
        b2bCommission,
        netProfit,
      }
    }

    // Mock save – εδώ θα μπει Supabase αργότερα
    setTimeout(() => {
      console.log('Service saved with financials:', dataToSave)
      alert('Υπηρεσία αποθηκεύτηκε (mock)!')
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Νέα Υπηρεσία / Πακέτο</h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Βασικά Στοιχεία */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Όνομα Υπηρεσίας</label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                placeholder="π.χ. Wine Tasting Tour"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Κατηγορία</label>
              <select
                name="category"
                value={service.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Περιγραφή</label>
            <textarea
              name="description"
              value={service.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
              placeholder="Λεπτομερής περιγραφή..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Διάρκεια</label>
              <input
                type="text"
                name="duration"
                value={service.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                placeholder="π.χ. 4 ώρες"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Βασική Τιμή (€)</label>
              <input
                type="number"
                name="price"
                value={service.price || ''}
                onChange={handleNumberChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                placeholder="450"
                required
              />
            </div>

            <div className="flex items-end">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={service.isPerPerson}
                  onChange={togglePerPerson}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="text-slate-700 font-medium">Τιμή ανά Άτομο</span>
              </div>
            </div>
          </div>

          {service.isPerPerson && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Default Αριθμός Ατόμων (για preview)</label>
                <input
                  type="number"
                  name="defaultPassengers"
                  value={service.defaultPassengers}
                  onChange={handleNumberChange}
                  min="1"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                  placeholder="1"
                />
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────
               ΝΕΟ: Tiered Pricing (εύρη ατόμων) - προστέθηκε εδώ χωρίς να αλλάξει τίποτα πριν
          ──────────────────────────────────────────────── */}
          <div className="border-t border-slate-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={service.useTieredPricing}
                onChange={toggleTieredPricing}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-lg font-medium text-slate-700">
                Χρήση τιμών βάσει εύρους ατόμων (Tiered Pricing)
              </label>
            </div>

            {service.useTieredPricing && (
              <div className="bg-slate-50 p-6 rounded-xl space-y-6">
                <p className="text-sm text-slate-600">
                  Ορίστε τα διαφορετικά εύρη ατόμων και τις αντίστοιχες τιμές. Αυτές θα χρησιμοποιηθούν αυτόματα στις κρατήσεις.
                </p>

                {service.pricingTiers.map((tier, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Από άτομα
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={tier.min}
                        onChange={(e) => updatePricingTier(index, 'min', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Έως άτομα
                      </label>
                      <input
                        type="text"
                        value={tier.max}
                        onChange={(e) => updatePricingTier(index, 'max', e.target.value)}
                        placeholder="π.χ. 12 ή ∞"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Τιμή (€)
                      </label>
                      <input
                        type="number"
                        value={tier.price}
                        onChange={(e) => updatePricingTier(index, 'price', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-right"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removePricingTier(index)}
                      className="text-red-600 hover:text-red-700 self-end mb-2"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addPricingTier}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Προσθήκη νέου εύρους
                </button>
              </div>
            )}
          </div>

          <div className="flex items-end">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isExternal}
                onChange={toggleMainExternal}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-slate-700 font-medium">Εξωτερικός</span>
            </div>
          </div>

          {isExternal && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-slate-50 p-6 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Εξωτερικός Συνεργάτης</label>
                <select
                  value={externalPartner}
                  onChange={(e) => handleExternalPartnerChange(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                >
                  <option value="">Επιλέξτε</option>
                  {externalPartners.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Κόστος (€)</label>
                <input
                  type="number"
                  value={externalCost || ''}
                  onChange={(e) => setExternalCost(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-xl text-right"
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isExternalPerPerson}
                    onChange={toggleExternalPerPerson}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-slate-700 font-medium">Κόστος ανά Άτομο</span>
                </div>
              </div>
            </div>
          )}

          {/* B2B / Commission */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">B2B / Συνεργάτης (προαιρετικό)</h3>
            <select
              value={b2bPartner}
              onChange={e => setB2bPartner(e.target.value)}
              className="w-full max-w-md px-4 py-3 border border-slate-300 rounded-lg"
            >
              <option value="">Χωρίς B2B</option>
              {b2bOptions.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>

            {b2bPartner && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-900 mb-3">Υπολογισμός προμήθειας επί:</p>
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
                    <span>Συνολικού Ποσού</span>
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
                    <span>Καθαρού Κέρδους (μετά έξοδα)</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Combo Legs */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={service.isCombo}
              onChange={toggleCombo}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <label className="text-sm font-medium text-slate-700">Είναι Combo / Πολυ-νοηματική Υπηρεσία;</label>
          </div>

          {service.isCombo && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Legs του Combo</h3>
              {service.legs.map((leg, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Leg {index + 1}</h4>
                    <button type="button" onClick={() => removeLeg(index)}>
                      <X className="w-6 h-6 text-red-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ώρα</label>
                      <input
                        type="time"
                        value={leg.time}
                        onChange={e => updateLeg(index, 'time', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Υπηρεσία</label>
                      <select
                        value={leg.service}
                        onChange={e => updateLeg(index, 'service', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                      >
                        <option value="">Επιλέξτε</option>
                        {legServices.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Τιμή (€)</label>
                      <input
                        type="number"
                        value={leg.price || ''}
                        onChange={e => updateLeg(index, 'price', Number(e.target.value))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-right"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={leg.isExternal}
                          onChange={e => updateLeg(index, 'isExternal', e.target.checked)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span>External</span>
                      </div>
                    </div>
                  </div>

                  {leg.isExternal && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">Συνεργάτης</label>
                        <select
                          value={leg.externalPartner}
                          onChange={e => updateLeg(index, 'externalPartner', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        >
                          <option value="">Επιλέξτε</option>
                          {externalPartners.map(p => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Κόστος (€)</label>
                        <input
                          type="number"
                          value={leg.externalCost || ''}
                          onChange={e => updateLeg(index, 'externalCost', Number(e.target.value))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg font-bold text-right"
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={leg.isExternalPerPerson}
                            onChange={() => toggleLegExternalPerPerson(index)}
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <span className="text-slate-700 font-medium">Κόστος ανά Άτομο</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addLeg}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Προσθήκη Leg
              </button>
            </div>
          )}

          {/* Έξοδα Υπηρεσίας (παραμένουν) */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Έξοδα Υπηρεσίας</h3>
            {service.expenses.map((exp, index) => (
              <div key={index} className="flex gap-6 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Όνομα</label>
                  <input
                    type="text"
                    value={exp.name}
                    onChange={e => updateExpense(index, 'name', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Ποσό (€)</label>
                  <input
                    type="number"
                    value={exp.amount || ''}
                    onChange={e => updateExpense(index, 'amount', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  />
                </div>
                <button type="button" onClick={() => removeExpense(index)}>
                  <X className="w-6 h-6 text-red-600" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addExpense}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Προσθήκη Εξόδου
            </button>
          </div>

          {/* Οικονομικά Breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Οικονομικά</h2>

            <div className="space-y-4">
              <div className="flex justify-between font-bold text-lg border-b pb-3">
                <span>Έσοδα {service.isPerPerson ? `(για ${passengers} άτομα)` : ''}</span>
                <span>€{grossRevenue.toFixed(2)}</span>
              </div>

              <div className="space-y-2 pl-6 text-slate-700">
                <div className="flex justify-between">
                  <span>Βασική Τιμή {service.isPerPerson ? 'x ' + passengers : ''}</span>
                  <span>+€{baseRevenue.toFixed(2)}</span>
                </div>
                {service.legs.map((leg, i) => (
                  <div key={i} className="flex justify-between">
                    <span>Leg {i + 1}: {leg.service || '—'} {service.isPerPerson ? 'x ' + passengers : ''}</span>
                    <span>+€{(service.isPerPerson ? (leg.price || 0) * passengers : (leg.price || 0)).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-6 mt-4">
                <span>Έξοδα {service.isPerPerson ? `(για ${passengers} άτομα)` : ''}</span>
                <span className="text-red-600">-€{(totalExternalCost + b2bCommission).toFixed(2)}</span>
              </div>

              <div className="space-y-2 pl-6">
                {isExternal && (
                  <div className="flex justify-between text-red-600">
                    <span>Εξωτερικός - {externalPartner} {isExternalPerPerson ? 'x ' + passengers : ''}</span>
                    <span>-€{baseExternalCost.toFixed(2)}</span>
                  </div>
                )}
                {service.legs.filter(l => l.isExternal).map((leg, i) => (
                  <div key={i} className="flex justify-between text-red-600">
                    <span>Leg {i + 1} - {leg.externalPartner} {leg.isExternalPerPerson ? 'x ' + passengers : ''}</span>
                    <span>-€{(leg.isExternalPerPerson ? (leg.externalCost || 0) * passengers : (leg.externalCost || 0)).toFixed(2)}</span>
                  </div>
                ))}
                {service.expenses.map((exp, i) => (
                  exp.amount > 0 && (
                    <div key={i} className="flex justify-between text-red-600">
                      <span>{exp.name}</span>
                      <span>-€{exp.amount.toFixed(2)}</span>
                    </div>
                  )
                ))}
                {b2bPartner && b2bCommission > 0 && (
                  <div className="flex justify-between text-purple-600 font-medium pt-2">
                    <span>Προμήθεια B2B ({b2bPartner})</span>
                    <span>-€{b2bCommission.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between border-t pt-6 font-bold text-xl">
                <span>Καθαρό Κέρδος</span>
                <span className="text-green-600">€{netProfit.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Upload Φωτογραφιών */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Φωτογραφίες Υπηρεσίας</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <ImagePlus className="w-12 h-12 text-slate-400" />
                <span className="text-slate-600 font-medium">Drag & drop ή κλικ για upload</span>
                <span className="text-sm text-slate-500">jpg, png (πολλαπλές)</span>
              </label>
            </div>

            {service.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preview & Save */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="flex-1 border border-blue-600 text-blue-600 font-bold py-4 rounded-lg hover:bg-blue-50 transition"
            >
              Προεπισκόπηση
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className={`flex-1 font-bold py-4 rounded-lg text-white transition ${
                isSaving ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
              } disabled:opacity-50 flex items-center justify-center gap-2`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Αποθήκευση...
                </>
              ) : (
                'Αποθήκευση Υπηρεσίας'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full m-4 p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Προεπισκόπηση Υπηρεσίας</h2>
              <button onClick={() => setPreviewOpen(false)} className="text-slate-600 hover:text-slate-900">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold">{service.name || 'Όνομα Υπηρεσίας'}</h3>
              <p className="text-slate-600">{service.description || 'Περιγραφή...'}</p>
              <p className="text-2xl font-bold text-green-600">€{service.price.toFixed(2)} {service.isPerPerson ? 'ανά άτομο' : ''}</p>
              <p><strong>Διάρκεια:</strong> {service.duration || '-'}</p>
              <p><strong>Κατηγορία:</strong> {service.category}</p>

              {service.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {service.photos.map((photo, i) => (
                    <img key={i} src={photo} alt="preview" className="w-full h-32 object-cover rounded-lg" />
                  ))}
                </div>
              )}

              {service.expenses.length > 0 && (
                <div>
                  <h4 className="font-bold mb-2">Έξοδα</h4>
                  <ul className="space-y-1">
                    {service.expenses.map((exp, i) => (
                      <li key={i}>{exp.name}: €{exp.amount.toFixed(2)}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xl font-bold text-green-600 mt-6">
                Συνολικό Κόστος: €{grossRevenue.toFixed(2)}
              </p>
              <p className="text-xl font-bold text-green-600">
                Καθαρό Κέρδος: €{netProfit.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}