'use client'

import { useState } from 'react'
import { DollarSign, Edit2, Trash2, Plus, ChevronDown, X } from 'lucide-react'

export default function Expenses() {
  const currentYear = new Date().getFullYear()
  const currentMonthIndex = new Date().getMonth()

  const months = [
    'Ιανουάριος',
    'Φεβρουάριος',
    'Μάρτιος',
    'Απρίλιος',
    'Μάιος',
    'Ιούνιος',
    'Ιούλιος',
    'Αύγουστος',
    'Σεπτέμβριος',
    'Οκτώβριος',
    'Νοέμβριος',
    'Δεκέμβριος',
  ]

  const years = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2]

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthIndex)
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)

  const selectedKey = `${months[selectedMonth]} ${selectedYear}`

  // Πάγια έξοδα – ίδια για όλους τους μήνες (single balance για Διόδια)
  const baseExpenses = [
    // Μισθοί Οδηγών
    { id: 1, type: 'Κουλούρης Πέτρος', amount: 1700, subcategory: 'Μισθοί Οδηγών' },
    { id: 2, type: 'Βερβέρογλου Παναγιώτης', amount: 1700, subcategory: 'Μισθοί Οδηγών' },
    { id: 3, type: 'Οδηγός 3', amount: 1700, subcategory: 'Μισθοί Οδηγών' },
    { id: 4, type: 'Οδηγός 4', amount: 1700, subcategory: 'Μισθοί Οδηγών' },
    { id: 5, type: 'Οδηγός 5', amount: 1700, subcategory: 'Μισθοί Οδηγών' },
    { id: 6, type: 'Οδηγός 6', amount: 1700, subcategory: 'Μισθοί Οδηγών' },
    { id: 7, type: 'Οδηγός 7', amount: 1700, subcategory: 'Μισθοί Οδηγών' },

    // Κάρτες Καυσίμων
    { id: 8, type: 'Κάρτα 1234 5678 9012 3456 – IKA-1234', amount: 6000, subcategory: 'Κάρτες Καυσίμων' },
    { id: 9, type: 'Κάρτα 9876 5432 1098 7654 – MYK-9012', amount: 1500, subcategory: 'Κάρτες Καυσίμων' },

    // Διόδια – single balance
    { id: 10, type: 'Διόδια (συνολικό balance)', amount: 600, subcategory: 'Διόδια' },

    // Οχήματα Μύκονος
    { id: 11, type: 'Mercedes Benz VClass', amount: 0, subcategory: 'Οχήματα Μύκονος' },
    { id: 12, type: 'Mercedes Benz Sprinter', amount: 1100, subcategory: 'Οχήματα Μύκονος' },
    { id: 13, type: 'Mercedes Benz Vito', amount: 900, subcategory: 'Οχήματα Μύκονος' },

    // Διάφορα
    { id: 14, type: 'limoanywhere', amount: 130, subcategory: 'Διάφορα' },
    { id: 15, type: 'Λογιστής', amount: 350, subcategory: 'Διάφορα' },
    { id: 16, type: 'Cosmote', amount: 150, subcategory: 'Διάφορα' },
    { id: 17, type: 'Service', amount: 500, subcategory: 'Διάφορα' },
    { id: 18, type: 'Αρχοντικό Μου', amount: 1500, subcategory: 'Διάφορα' },
    { id: 19, type: 'Εξωδικαστικοί', amount: 3000, subcategory: 'Διάφορα' },

    // Δόσεις Αυτοκινήτων
    { id: 20, type: 'Skoda Octavia ΤΑΒ 2021', amount: 2150, subcategory: 'Δόσεις Αυτοκινήτων' },
    { id: 21, type: 'Skoda Octavia ΤΑΒ 3719', amount: 2090, subcategory: 'Δόσεις Αυτοκινήτων' },
    { id: 22, type: 'Skoda Rapid TAA 9208', amount: 1824, subcategory: 'Δόσεις Αυτοκινήτων' },
    { id: 23, type: 'Skoda Octavia TAA 7148', amount: 2184, subcategory: 'Δόσεις Αυτοκινήτων' },
  ]

  // Ίδια έξοδα για όλους τους μήνες
  const expensesData: Record<string, typeof baseExpenses> = {}
  for (const year of years) {
    for (let i = 0; i < 12; i++) {
      const key = `${months[i]} ${year}`
      expensesData[key] = baseExpenses.map((exp, index) => ({ ...exp, id: index + 1 }))
    }
  }

  const [expenses, setExpenses] = useState(expensesData)

  const filteredExpenses = expenses[selectedKey] || []

  const monthlyTotal = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  // Group by subcategory
  const groupedExpenses = filteredExpenses.reduce((groups, exp) => {
    const key = exp.subcategory
    if (!groups[key]) groups[key] = []
    groups[key].push(exp)
    return groups
  }, {} as Record<string, typeof baseExpenses>)

  // Modal for new expense
  const [showNewModal, setShowNewModal] = useState(false)
  const [newSubcategory, setNewSubcategory] = useState('Μισθοί Οδηγών')
  const [newType, setNewType] = useState('')
  const [newAmount, setNewAmount] = useState('')

  const addExpense = () => {
    if (newType && newAmount && newSubcategory) {
      const newExp = {
        id: filteredExpenses.length + 1000,
        type: newType,
        amount: Number(newAmount),
        subcategory: newSubcategory,
      }
      setExpenses(prev => ({
        ...prev,
        [selectedKey]: [...(prev[selectedKey] || []), newExp]
      }))
      setShowNewModal(false)
      setNewType('')
      setNewAmount('')
    }
  }

  // Edit modal
  const [editExpense, setEditExpense] = useState<typeof baseExpenses[0] | null>(null)

  const saveEdit = () => {
    if (editExpense) {
      setExpenses(prev => ({
        ...prev,
        [selectedKey]: prev[selectedKey].map(exp => 
          exp.id === editExpense.id ? editExpense : exp
        )
      }))
      setEditExpense(null)
    }
  }

  // Delete
  const deleteExpense = (id: number) => {
    setExpenses(prev => ({
      ...prev,
      [selectedKey]: prev[selectedKey].filter(exp => exp.id !== id)
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Πάγια Έξοδα Εταιρείας</h1>
            <p className="text-slate-600 mt-1">{months[selectedMonth]} {selectedYear}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="appearance-none bg-white border border-slate-300 rounded-lg px-6 py-3 pr-10 text-lg font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                {months.map((m, i) => (
                  <option key={i} value={i}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 pointer-events-none" />
            </div>
            <div className="relative">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="appearance-none bg-white border border-slate-300 rounded-lg px-6 py-3 pr-10 text-lg font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Total */}
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-bold text-slate-900">Σύνολο για {months[selectedMonth]} {selectedYear}</h3>
          </div>
          <p className="text-4xl font-bold text-green-600">€{monthlyTotal.toLocaleString()}</p>
        </div>

        {/* Grouped Expenses */}
        <div className="space-y-8">
          {Object.entries(groupedExpenses).map(([subcategory, exps]) => (
            <div key={subcategory} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{subcategory}</h3>
                <button 
                  onClick={() => {
                    setNewSubcategory(subcategory)
                    setShowNewModal(true)
                  }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {exps.map((exp) => (
                  <div key={exp.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="font-medium text-slate-900">{exp.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-green-600">€{exp.amount}</p>
                      <button 
                        onClick={() => setEditExpense(exp)}
                        className="p-1 hover:bg-slate-100 rounded"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => deleteExpense(exp.id)}
                        className="p-1 hover:bg-slate-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Expense Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Νέο Έξοδο ({newSubcategory})</h3>
              <button onClick={() => setShowNewModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Τύπος Έξοδου
                </label>
                <input
                  type="text"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  placeholder="π.χ. Διόδια"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ποσό (€)
                </label>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="600"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="mt-6 text-right">
              <button onClick={addExpense} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                Προσθήκη
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editExpense && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Επεξεργασία Εξόδου</h3>
              <button onClick={() => setEditExpense(null)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Τύπος
                </label>
                <input
                  type="text"
                  value={editExpense.type}
                  onChange={(e) => setEditExpense({...editExpense, type: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ποσό (€)
                </label>
                <input
                  type="number"
                  value={editExpense.amount}
                  onChange={(e) => setEditExpense({...editExpense, amount: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="mt-6 text-right">
              <button onClick={saveEdit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                Αποθήκευση
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}