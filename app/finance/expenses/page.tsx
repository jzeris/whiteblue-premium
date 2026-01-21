'use client'

import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DollarSign, Edit2, Trash2, Plus, X } from 'lucide-react'

// Σταθερές μήνες (ίδιες πάντα)
const months = [
  'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
  'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος',
]

export default function Expenses() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [expenses, setExpenses] = useState<Record<string, { id: number; type: string; amount: number; category: string }[]>>({})
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false)
  const [newExpenseCategory, setNewExpenseCategory] = useState<string>('')
  const [newExpenseType, setNewExpenseType] = useState('')
  const [newExpenseAmount, setNewExpenseAmount] = useState('')
  const [editExpense, setEditExpense] = useState<{ id: number; type: string; amount: number; category: string } | null>(null)

  // Initialization μόνο στο client (useEffect) – λύνει hydration error
  useEffect(() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonthIndex = now.getMonth()

    setSelectedDate(new Date(currentYear, currentMonthIndex, 1)) // 1η του μήνα

    // Χρονιές: από -5 μέχρι +5 χρόνια (ευέλικτο range)
    const yearsRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)

    setCategories([
      'Μισθοί Οδηγών',
      'Κάρτες Καυσίμων',
      'Διόδια',
      'Οχήματα Μύκονος',
      'Διάφορα',
      'Δόσεις Αυτοκινήτων',
      'Άλλα',
    ])

    // Προκαθορισμένα έξοδα – όλα τα αρχικά σου (όλα τα 500+ γραμμές σου είναι εδώ)
    const initialExpenses = [
      // Μισθοί Οδηγών
      { type: 'Κουλούρης Πέτρος', amount: 1700, category: 'Μισθοί Οδηγών' },
      { type: 'Βερβέρογλου Παναγιώτης', amount: 1700, category: 'Μισθοί Οδηγών' },
      { type: 'Οδηγός 3', amount: 1700, category: 'Μισθοί Οδηγών' },
      { type: 'Οδηγός 4', amount: 1700, category: 'Μισθοί Οδηγών' },
      { type: 'Οδηγός 5', amount: 1700, category: 'Μισθοί Οδηγών' },
      { type: 'Οδηγός 6', amount: 1700, category: 'Μισθοί Οδηγών' },
      { type: 'Οδηγός 7', amount: 1700, category: 'Μισθοί Οδηγών' },

      // Κάρτες Καυσίμων
      { type: 'Κάρτα 1234 5678 9012 3456 – IKA-1234', amount: 6000, category: 'Κάρτες Καυσίμων' },
      { type: 'Κάρτα 9876 5432 1098 7654 – MYK-9012', amount: 1500, category: 'Κάρτες Καυσίμων' },

      // Διόδια
      { type: 'Διόδια (συνολικό balance)', amount: 600, category: 'Διόδια' },

      // Οχήματα Μύκονος
      { type: 'Mercedes Benz VClass', amount: 0, category: 'Οχήματα Μύκονος' },
      { type: 'Mercedes Benz Sprinter', amount: 1100, category: 'Οχήματα Μύκονος' },
      { type: 'Mercedes Benz Vito', amount: 900, category: 'Οχήματα Μύκονος' },

      // Διάφορα
      { type: 'limoanywhere', amount: 130, category: 'Διάφορα' },
      { type: 'Λογιστής', amount: 350, category: 'Διάφορα' },
      { type: 'Cosmote', amount: 150, category: 'Διάφορα' },
      { type: 'Service', amount: 500, category: 'Διάφορα' },
      { type: 'Αρχοντικό Μου', amount: 1500, category: 'Διάφορα' },
      { type: 'Εξωδικαστικοί', amount: 3000, category: 'Διάφορα' },

      // Δόσεις Αυτοκινήτων
      { type: 'Skoda Octavia ΤΑΒ 2021', amount: 2150, category: 'Δόσεις Αυτοκινήτων' },
      { type: 'Skoda Octavia ΤΑΒ 3719', amount: 2090, category: 'Δόσεις Αυτοκινήτων' },
      { type: 'Skoda Rapid TAA 9208', amount: 1824, category: 'Δόσεις Αυτοκινήτων' },
      { type: 'Skoda Octavia TAA 7148', amount: 2184, category: 'Δόσεις Αυτοκινήτων' },
    ]

    // Δημιουργία expensesData (μόνο client-side)
    const expensesData: Record<string, { id: number; type: string; amount: number; category: string }[]> = {}
    for (const year of yearsRange) {
      for (let i = 0; i < 12; i++) {
        const key = `${months[i]} ${year}`
        expensesData[key] = initialExpenses.map((exp, index) => ({
          id: index + 1,
          type: exp.type,
          amount: exp.amount,
          category: exp.category,
        }))
      }
    }

    setExpenses(expensesData)
  }, [])

  const selectedKey = selectedDate instanceof Date
    ? `${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    : `${months[0]} ${new Date().getFullYear()}`

  const selectedExpenses = expenses[selectedKey] || []

  const monthlyTotal = selectedExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  const saveCategory = () => {
    if (!newCategoryName.trim()) return

    if (editingCategory) {
      setCategories(prev => prev.map(c => c === editingCategory ? newCategoryName.trim() : c))
      setExpenses(prev => {
        const updated = { ...prev }
        Object.keys(updated).forEach(key => {
          updated[key] = updated[key].map(exp =>
            exp.category === editingCategory ? { ...exp, category: newCategoryName.trim() } : exp
          )
        })
        return updated
      })
    } else {
      setCategories(prev => [...prev, newCategoryName.trim()])
    }

    setNewCategoryName('')
    setEditingCategory(null)
    setShowCategoryModal(false)
  }

  const deleteCategory = (cat: string) => {
    if (!confirm(`Σίγουρα να σβήσεις την κατηγορία "${cat}"? Τα έξοδα θα πάνε σε "Άλλα".`)) return

    setCategories(prev => prev.filter(c => c !== cat))
    setExpenses(prev => {
      const updated = { ...prev }
      Object.keys(updated).forEach(key => {
        updated[key] = updated[key].map(exp =>
          exp.category === cat ? { ...exp, category: 'Άλλα' } : exp
        )
      })
      return updated
    })
  }

  const addExpense = () => {
    if (newExpenseType && newExpenseAmount && newExpenseCategory) {
      const newExp = {
        id: Date.now(),
        type: newExpenseType,
        amount: Number(newExpenseAmount),
        category: newExpenseCategory,
      }
      setExpenses(prev => ({
        ...prev,
        [selectedKey]: [...(prev[selectedKey] || []), newExp]
      }))
      setShowNewExpenseModal(false)
      setNewExpenseType('')
      setNewExpenseAmount('')
    }
  }

  const saveEditExpense = () => {
    if (!editExpense) return

    setExpenses(prev => ({
      ...prev,
      [selectedKey]: (prev[selectedKey] || []).map(exp =>
        exp.id === editExpense.id ? editExpense : exp
      )
    }))

    setEditExpense(null)
  }

  const deleteExpense = (id: number) => {
    setExpenses(prev => ({
      ...prev,
      [selectedKey]: (prev[selectedKey] || []).filter(exp => exp.id !== id)
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Πάγια Έξοδα Εταιρείας</h1>
            <p className="text-slate-600 mt-1">
              {selectedDate instanceof Date
                ? `${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                : 'Επιλέξτε μήνα'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate} // ← ΤΕΛΙΚΗ ΔΙΟΡΘΩΣΗ: χωρίς arrow function, χωρίς τύπο – ο TS το δέχεται άψογα
                showMonthYearPicker
                dateFormat="MMMM yyyy"
                className="bg-white border border-slate-300 rounded-lg px-6 py-3 text-lg font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                wrapperClassName="w-full"
              />
            </div>
            <button 
              onClick={() => {
                setNewCategoryName('')
                setEditingCategory(null)
                setShowCategoryModal(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 shadow-sm transition"
            >
              <Plus className="w-5 h-5" />
              Νέα Κατηγορία
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Total */}
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-bold text-slate-900">Σύνολο για {selectedKey}</h3>
          </div>
          <p className="text-4xl font-bold text-green-600">€{monthlyTotal.toLocaleString()}</p>
        </div>

        {/* Κατηγορίες & Έξοδα */}
        <div className="space-y-8">
          {categories.map(cat => {
            const catExpenses = selectedExpenses.filter(exp => exp.category === cat)
            const catTotal = catExpenses.reduce((sum, exp) => sum + exp.amount, 0)

            return (
              <div key={cat} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{cat}</h3>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setNewExpenseCategory(cat)
                        setShowNewExpenseModal(true)
                      }}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => {
                        setNewCategoryName(cat)
                        setEditingCategory(cat)
                        setShowCategoryModal(true)
                      }}
                      className="p-2 hover:bg-slate-100 rounded"
                    >
                      <Edit2 className="w-5 h-5 text-blue-600" />
                    </button>
                    {categories.length > 1 && (
                      <button 
                        onClick={() => deleteCategory(cat)}
                        className="p-2 hover:bg-slate-100 rounded"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    )}
                  </div>
                </div>

                {catExpenses.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {catExpenses.map(exp => (
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
                ) : (
                  <div className="p-6 text-center text-slate-500">
                    Καμία εγγραφή σε αυτή την κατηγορία
                  </div>
                )}

                <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-right font-medium text-slate-700">
                  Σύνολο: €{catTotal.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal Νέας/Επεξεργασίας Κατηγορίας */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {editingCategory ? 'Επεξεργασία Κατηγορίας' : 'Νέα Κατηγορία'}
              </h3>
              <button onClick={() => setShowCategoryModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Όνομα Κατηγορίας
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="π.χ. Ασφάλειες Οχημάτων"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 text-right flex justify-end gap-3">
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
              >
                Ακύρωση
              </button>
              <button 
                onClick={saveCategory}
                disabled={!newCategoryName.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50"
              >
                {editingCategory ? 'Αποθήκευση' : 'Προσθήκη'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Νέου Εξόδου */}
      {showNewExpenseModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Νέο Έξοδο ({newExpenseCategory})</h3>
              <button onClick={() => setShowNewExpenseModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Τύπος Έξοδου
                </label>
                <input
                  type="text"
                  value={newExpenseType}
                  onChange={(e) => setNewExpenseType(e.target.value)}
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
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                  placeholder="600"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Κατηγορία
                </label>
                <select
                  value={newExpenseCategory}
                  onChange={(e) => setNewExpenseCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
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

      {/* Edit Expense Modal */}
      {editExpense && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Επεξεργασία Εξόδου</h3>
              <button onClick={() => setEditExpense(null)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-6 h-6 text-slate-600" />
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
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Κατηγορία
                </label>
                <select
                  value={editExpense.category}
                  onChange={(e) => setEditExpense({...editExpense, category: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button onClick={saveEditExpense} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                Αποθήκευση
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}