'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Plus, X, ImagePlus, Loader2 } from 'lucide-react'

interface ComboLeg {
  time: string
  service: string
  price: number
  isExternal: boolean
  externalPartner: string
  externalCost: number
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
  legs: ComboLeg[]
  extras: { name: string; price: number }[]  // προσθέσαμε τιμή για extras
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
    legs: [],
    extras: [],
    expenses: [],
    photos: [],
  })

  // Νέα states από το NewBooking
  const [isExternal, setIsExternal] = useState(false)
  const [externalPartner, setExternalPartner] = useState('')
  const [externalCost, setExternalCost] = useState(0)

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

  const toggleCombo = () => {
    setService(prev => ({
      ...prev,
      isCombo: !prev.isCombo,
      legs: !prev.isCombo ? [
        { time: '', service: '', price: 0, isExternal: false, externalPartner: '', externalCost: 0 }
      ] : [],
    }))
  }

  const addLeg = () => {
    setService(prev => ({
      ...prev,
      legs: [
        ...prev.legs,
        { time: '', service: '', price: 0, isExternal: false, externalPartner: '', externalCost: 0 },
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
    }
  }

  const handleExternalPartnerChange = (partnerName: string) => {
    setExternalPartner(partnerName)
    const partner = externalPartners.find(p => p.name === partnerName)
    setExternalCost(partner?.defaultCost || 0)
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
  // Οικονομικοί Υπολογισμοί (ίδια λογική με NewBooking)
  // ────────────────────────────────────────────────

  const grossRevenue = 
    (service.price || 0) +
    service.legs.reduce((sum, leg) => sum + (leg.price || 0), 0)

  const totalExternalCost = 
    (isExternal ? externalCost : 0) +
    service.legs.reduce((sum, leg) => sum + (leg.isExternal ? (leg.externalCost || 0) : 0), 0) +
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
                  checked={isExternal}
                  onChange={toggleMainExternal}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="text-slate-700 font-medium">Εξωτερικός</span>
              </div>
            </div>
          </div>

          {isExternal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl">
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
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <span>Έσοδα</span>
                <span>€{grossRevenue.toFixed(2)}</span>
              </div>

              <div className="space-y-2 pl-6 text-slate-700">
                <div className="flex justify-between">
                  <span>Βασική Τιμή</span>
                  <span>+€{service.price.toFixed(2)}</span>
                </div>
                {service.legs.map((leg, i) => (
                  <div key={i} className="flex justify-between">
                    <span>Leg {i + 1}: {leg.service || '—'}</span>
                    <span>+€{(leg.price || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-6 mt-4">
                <span>Έξοδα</span>
                <span className="text-red-600">-€{(totalExternalCost + b2bCommission).toFixed(2)}</span>
              </div>

              <div className="space-y-2 pl-6">
                {isExternal && (
                  <div className="flex justify-between text-red-600">
                    <span>Εξωτερικός - {externalPartner}</span>
                    <span>-€{externalCost.toFixed(2)}</span>
                  </div>
                )}
                {service.legs.filter(l => l.isExternal).map((leg, i) => (
                  <div key={i} className="flex justify-between text-red-600">
                    <span>Leg {i + 1} - {leg.externalPartner}</span>
                    <span>-€{leg.externalCost.toFixed(2)}</span>
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

          {/* Photos + Submit */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Φωτογραφίες</h3>
            {/* ... το upload section μένει ίδιο όπως πριν ... */}
            {/* (δεν το επαναλαμβάνω για συντομία) */}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="flex-1 border border-blue-600 text-blue-600 py-4 rounded-lg hover:bg-blue-50"
            >
              Προεπισκόπηση
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className={`flex-1 py-4 rounded-lg text-white font-bold ${
                isSaving ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
              } flex items-center justify-center gap-2`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Αποθήκευση...
                </>
              ) : 'Αποθήκευση Υπηρεσίας'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal – μπορείς να το εμπλουτίσεις με τα οικονομικά */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full m-4 p-8 max-h-[90vh] overflow-y-auto">
            {/* ... υπάρχον preview ... */}
            <p className="text-xl font-bold text-green-600 mt-6">
              Καθαρό Κέρδος: €{netProfit.toFixed(2)}
            </p>
            <button onClick={() => setPreviewOpen(false)} className="mt-6 text-slate-600">
              Κλείσιμο
            </button>
          </div>
        </div>
      )}
    </div>
  )
}