'use client'

import { useState, ChangeEvent } from 'react'
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
  price: number
  duration: string
  category: string
  isCombo: boolean
  legs: ComboLeg[]
  extras: string[]
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

  const [isSaving, setIsSaving] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const categories = ['Transfer', 'Tour', 'Package', 'Custom']

  const extrasList = ['Luggage', 'Baby Seat', 'Wheelchair', 'Headphones', 'VIP', 'Luxury']

  const legServices = ['Airport Transfer', 'Wine Tasting', 'Day Trip', 'Mykonos Package', 'Hourly', 'Custom']

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false

    setService(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setService(prev => ({
      ...prev,
      [name]: value === '' ? 0 : Number(value),
    }))
  }

  const toggleCombo = () => {
    setService(prev => ({
      ...prev,
      isCombo: !prev.isCombo,
      legs: !prev.isCombo ? [
        ...prev.legs,
        { time: '', service: '', price: 0, isExternal: false, externalPartner: '', externalCost: 0 },
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

  const calculateTotal = () => {
    const base = service.price || 0
    const extrasCost = service.extras.length * 20 // mock
    const expensesTotal = service.expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0)
    const commission = base * 0.15 // mock 15%
    return (base + extrasCost + expensesTotal + commission).toFixed(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Mock save
    setTimeout(() => {
      console.log('Service saved:', service)
      alert('Υπηρεσία αποθηκεύτηκε (mock)!')
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Νέα Υπηρεσία / Πακέτο</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Βασικά Στοιχεία */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Όνομα Υπηρεσίας</label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
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
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Λεπτομερής περιγραφή της υπηρεσίας..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Διάρκεια</label>
              <input
                type="text"
                name="duration"
                value={service.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="π.χ. 4 ώρες / 1 ημέρα"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Τιμή (€)</label>
              <input
                type="number"
                name="price"
                value={service.price}
                onChange={handleNumberChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="450"
                required
              />
            </div>
          </div>

          {/* Combo */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={service.isCombo}
              onChange={toggleCombo}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-slate-700">Είναι Combo Υπηρεσία;</label>
          </div>

          {service.isCombo && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Legs του Combo</h3>
              {service.legs.map((leg, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Leg {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeLeg(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ώρα</label>
                      <input
                        type="time"
                        value={leg.time}
                        onChange={(e) => updateLeg(index, 'time', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Υπηρεσία</label>
                      <select
                        value={leg.service}
                        onChange={(e) => updateLeg(index, 'service', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Επιλέξτε Υπηρεσία</option>
                        {legServices.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Τιμή (€)</label>
                      <input
                        type="number"
                        value={leg.price || ''}
                        onChange={(e) => updateLeg(index, 'price', e.target.value ? Number(e.target.value) : 0)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-end">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={leg.isExternal}
                          onChange={(e) => updateLeg(index, 'isExternal', e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-slate-700">External</span>
                      </div>
                    </div>
                  </div>

                  {leg.isExternal && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Συνεργάτης</label>
                        <input
                          type="text"
                          value={leg.externalPartner}
                          onChange={(e) => updateLeg(index, 'externalPartner', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Κόστος External (€)</label>
                        <input
                          type="number"
                          value={leg.externalCost || ''}
                          onChange={(e) => updateLeg(index, 'externalCost', e.target.value ? Number(e.target.value) : 0)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addLeg}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Προσθήκη Νέου Leg
              </button>
            </div>
          )}

          {/* Έξοδα Υπηρεσίας */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Έξοδα Υπηρεσίας</h3>
            {service.expenses.map((exp, index) => (
              <div key={index} className="flex gap-6 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Όνομα Εξόδου</label>
                  <input
                    type="text"
                    value={exp.name}
                    onChange={(e) => updateExpense(index, 'name', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                    placeholder="π.χ. Καύσιμα"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ποσό (€)</label>
                  <input
                    type="number"
                    value={exp.amount || ''}
                    onChange={(e) => updateExpense(index, 'amount', e.target.value ? Number(e.target.value) : 0)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                    placeholder="0"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeExpense(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addExpense}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Προσθήκη Εξόδου
            </button>

            {/* Auto-calculate total */}
            <div className="bg-slate-100 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Συνολικό Κόστος</span>
                <span className="text-2xl font-bold text-green-600">€{calculateTotal()}</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                (Τιμή + Έξοδα + Commission)
              </p>
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
              <p className="text-2xl font-bold text-green-600">€{service.price.toFixed(2)}</p>
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
                Συνολικό Κόστος: €{calculateTotal()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}