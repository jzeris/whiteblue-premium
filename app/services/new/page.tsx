'use client'

import { useState } from 'react'

export default function NewService() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Transfers')
  const [location, setLocation] = useState('Athens')
  const [mainPrice, setMainPrice] = useState('')
  const [perPerson, setPerPerson] = useState(false)
  const [isCombo, setIsCombo] = useState(false) // checkbox combo
  const [subServices, setSubServices] = useState<string[]>([]) // sub-services (legs)
  const [description, setDescription] = useState('')
  const [inclusions, setInclusions] = useState('')
  const [exclusions, setExclusions] = useState('')
  const [notesTemplate, setNotesTemplate] = useState('')

  // Λίστα υπηρεσιών
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

  // Auto fill main price από τοποθεσία
  const handleLocationChange = (loc: string) => {
    setLocation(loc)
    setMainPrice(loc === 'Athens' ? '80' : '150')
  }

  // Add sub-service
  const addSubService = () => {
    setSubServices(prev => [...prev, ''])
  }

  const updateSubService = (index: number, service: string) => {
    setSubServices(prev => prev.map((s, i) => i === index ? service : s))
  }

  const removeSubService = (index: number) => {
    setSubServices(prev => prev.filter((_, i) => i !== index))
  }

  // Extras checkboxes
  const [extras, setExtras] = useState({
    wheelchair: false,
    babySeat: false,
    headphones: false,
  })

  const toggleExtra = (key: keyof typeof extras) => {
    setExtras(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Partner Expenses
  const partners = ['Hotel Nefeli', 'Blue Villas', 'Grande Bretagne', 'Winery Santorini']

  const [expenses, setExpenses] = useState<{ partner: string; amount: string }[]>([])

  const addExpense = () => {
    setExpenses(prev => [...prev, { partner: '', amount: '' }])
  }

  const updateExpense = (index: number, field: 'partner' | 'amount', value: string) => {
    setExpenses(prev => prev.map((exp, i) => i === index ? { ...exp, [field]: value } : exp))
  }

  const removeExpense = (index: number) => {
    setExpenses(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    console.log('Saved:', {
      name,
      category,
      location,
      mainPrice,
      perPerson,
      isCombo,
      subServices,
      description,
      inclusions,
      exclusions,
      notesTemplate,
      extras,
      expenses,
    })
    alert('Υπηρεσία / Combo Package αποθηκεύτηκε! (mock)')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Νέα Υπηρεσία / Combo Package</h1>
        <p className="text-slate-600 mt-1">Δημιουργία υπηρεσίας ή combo package</p>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          {/* Όνομα */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Όνομα Υπηρεσίας / Package
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Airport Transfer ή Wine Tasting Tour"
              className="w-full px-4 py-4 text-xl border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Κατηγορία + Τοποθεσία */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Κατηγορία
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-4 border border-slate-300 rounded-lg"
              >
                <option>Transfers</option>
                <option>Tours</option>
                <option>Services</option>
                <option>Activities</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Τοποθεσία
              </label>
              <select
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full px-4 py-4 border border-slate-300 rounded-lg"
              >
                <option>Athens</option>
                <option>Mykonos</option>
              </select>
            </div>
          </div>

          {/* Τιμή Κύριας + Per Person */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Τιμή Κύριας Υπηρεσίας (€)
              </label>
              <input
                type="number"
                value={mainPrice}
                onChange={(e) => setMainPrice(e.target.value)}
                placeholder="80"
                className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-3 mt-8">
              <input
                type="checkbox"
                checked={perPerson}
                onChange={(e) => setPerPerson(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-slate-700">Τιμή ανά άτομο</span>
            </div>
          </div>

          {/* Combo Package */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={isCombo}
                onChange={(e) => setIsCombo(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg font-medium text-slate-700">Combo Package (πολλαπλές υπηρεσίες)</span>
            </div>
            {isCombo && (
              <div>
                <button 
                  onClick={addSubService}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-4"
                >
                  + Προσθήκη Υπηρεσίας στο Package
                </button>
                {subServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <select
                      value={service}
                      onChange={(e) => updateSubService(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg"
                    >
                      <option value="">Επιλέξτε υπηρεσία</option>
                      {availableServices.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => removeSubService(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Περιγραφή */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Περιγραφή (copy-paste)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Πλήρης περιγραφή της υπηρεσίας..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Inclusions / Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Περιλαμβάνονται (copy-paste)
              </label>
              <textarea
                value={inclusions}
                onChange={(e) => setInclusions(e.target.value)}
                rows={6}
                placeholder="- Μεταφορά\n- Χαιρετισμός..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Δεν Περιλαμβάνονται (copy-paste)
              </label>
              <textarea
                value={exclusions}
                onChange={(e) => setExclusions(e.target.value)}
                rows={6}
                placeholder="- Εισιτήρια εισόδου\n- Φιλοδωρήματα..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Notes Template */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes Template (copy-paste)
            </label>
            <textarea
              value={notesTemplate}
              onChange={(e) => setNotesTemplate(e.target.value)}
              rows={4}
              placeholder="Παραλαμβάνουμε από reception..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Extras checkboxes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Extras
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extras.wheelchair}
                  onChange={() => toggleExtra('wheelchair')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>Αναπηρικό Αμαξίδιο</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extras.babySeat}
                  onChange={() => toggleExtra('babySeat')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>Παιδικό Κάθισμα</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extras.headphones}
                  onChange={() => toggleExtra('headphones')}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>Ακουστικά</span>
              </label>
            </div>
          </div>

          {/* Partner Expenses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-slate-700">
                Έξοδα Συνεργάτη {perPerson && '(ανά άτομο)'}
              </label>
              <button onClick={addExpense} className="text-blue-600 hover:text-blue-700 font-medium">
                + Προσθήκη
              </button>
            </div>
            {expenses.map((exp, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <select
                  value={exp.partner}
                  onChange={(e) => updateExpense(index, 'partner', e.target.value)}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg"
                >
                  <option value="">Επιλέξτε συνεργάτη</option>
                  {partners.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <input
                  type="number"
                  value={exp.amount}
                  onChange={(e) => updateExpense(index, 'amount', e.target.value)}
                  placeholder="Ποσό"
                  className="w-32 px-4 py-3 border border-slate-300 rounded-lg"
                />
                <button 
                  onClick={() => removeExpense(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Greeting Sign */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900 font-medium">
              Πινακίδα Χαιρετισμού: Υποχρεωτική (auto με όνομα Passenger's Leader)
            </p>
          </div>

          {/* Save */}
          <div className="text-right">
            <button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Αποθήκευση
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}