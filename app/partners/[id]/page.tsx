'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function EditPartner() {
  const params = useParams()
  const id = params.id as string

  // Mock data για παράδειγμα (real θα τραβάει από Supabase)
  const mockPartner = {
    id: '2',
    name: 'Blue Villas',
    contactPerson: 'Νίκος Παπαδόπουλος',
    email: 'nikos@bluevillas.gr',
    phone: '22890 12345',
    isB2B: true,
    b2bCommissionType: 'percentage',
    b2bCommissionValue: '12',
    isExternal: false,
    externalCost: '',
    referralEnabled: true,
    referralPartner: 'Elon Musk',
    referralType: 'percentage',
    referralValue: '5',
    notes: 'Πολύ καλός συνεργάτης, μας στέλνει πολλές κρατήσεις',
  }

  // State – pre-filled από mock
  const [name, setName] = useState(mockPartner.name)
  const [contactPerson, setContactPerson] = useState(mockPartner.contactPerson)
  const [email, setEmail] = useState(mockPartner.email)
  const [phone, setPhone] = useState(mockPartner.phone)
  const [isB2B, setIsB2B] = useState(mockPartner.isB2B)
  const [b2bCommissionType, setB2bCommissionType] = useState(mockPartner.b2bCommissionType)
  const [b2bCommissionValue, setB2bCommissionValue] = useState(mockPartner.b2bCommissionValue)
  const [isExternal, setIsExternal] = useState(mockPartner.isExternal)
  const [externalCost, setExternalCost] = useState(mockPartner.externalCost)
  const [referralEnabled, setReferralEnabled] = useState(mockPartner.referralEnabled)
  const [referralPartner, setReferralPartner] = useState(mockPartner.referralPartner)
  const [referralType, setReferralType] = useState(mockPartner.referralType)
  const [referralValue, setReferralValue] = useState(mockPartner.referralValue)
  const [notes, setNotes] = useState(mockPartner.notes)

  // Όλοι οι συνεργάτες για referral
  const allPartners = [
    'Grande Bretagne',
    'Blue Villas',
    'Hotel Nefeli',
    'Taxi Athens',
    'Mykonos Transfers Ltd',
    'Santorini Tours',
    'Elon Musk',
    'Grok',
  ]

  const handleSave = () => {
    console.log('Partner updated:', id, {
      name,
      contactPerson,
      email,
      phone,
      isB2B,
      b2bCommissionType,
      b2bCommissionValue,
      isExternal,
      externalCost,
      referralEnabled,
      referralPartner,
      referralType,
      referralValue,
      notes,
    })
    alert('Συνεργάτης ενημερώθηκε! (mock)')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Επεξεργασία Συνεργάτη #{id}</h1>
        <p className="text-slate-600 mt-1">Ενημέρωση στοιχείων συνεργάτη</p>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          {/* Όνομα */}
          <div>
            <label className="block text-lg font-medium text-slate-700 mb-2">
              Όνομα Συνεργάτη
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-4 text-xl border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Στοιχεία Επικοινωνίας */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Υπεύθυνος Επικοινωνίας
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Τηλέφωνο
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* B2B */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={isB2B}
                onChange={(e) => setIsB2B(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg font-medium text-slate-700">B2B Συνεργάτης (μας δίνει δουλειά)</span>
            </div>
            {isB2B && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Τύπος Προμήθειας
                  </label>
                  <select
                    value={b2bCommissionType}
                    onChange={(e) => setB2bCommissionType(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-300 rounded-lg"
                  >
                    <option value="percentage">Ποσοστό (%)</option>
                    <option value="fixed">Ποσό (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {b2bCommissionType === 'percentage' ? 'Ποσοστό (%)' : 'Ποσό (€)'}
                  </label>
                  <input
                    type="number"
                    value={b2bCommissionValue}
                    onChange={(e) => setB2bCommissionValue(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Εξωτερικός */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={isExternal}
                onChange={(e) => setIsExternal(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg font-medium text-slate-700">Εξωτερικός Συνεργάτης (του δίνουμε δουλειά)</span>
            </div>
            {isExternal && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Έξοδο (€)
                </label>
                <input
                  type="number"
                  value={externalCost}
                  onChange={(e) => setExternalCost(e.target.value)}
                  className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* Referral */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={referralEnabled}
                onChange={(e) => setReferralEnabled(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg font-medium text-slate-700">Referral (Προμήθεια από εισαγωγή)</span>
            </div>
            {referralEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Referral Συνεργάτης
                  </label>
                  <select
                    value={referralPartner}
                    onChange={(e) => setReferralPartner(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-300 rounded-lg"
                  >
                    <option value="">Επιλέξτε συνεργάτη</option>
                    {allPartners.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Τύπος Προμήθειας
                  </label>
                  <select
                    value={referralType}
                    onChange={(e) => setReferralType(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-300 rounded-lg"
                  >
                    <option value="percentage">Ποσοστό (%)</option>
                    <option value="fixed">Ποσό (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {referralType === 'percentage' ? 'Ποσοστό (%)' : 'Ποσό (€)'}
                  </label>
                  <input
                    type="number"
                    value={referralValue}
                    onChange={(e) => setReferralValue(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Σημειώσεις */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Σημειώσεις
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Save */}
          <div className="text-right">
            <button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Ενημέρωση Συνεργάτη
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}