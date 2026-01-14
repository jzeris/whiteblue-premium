'use client'

import { useState } from 'react'
import { FileText, Upload, Eye, EyeOff, Plus, X } from 'lucide-react'

export default function NewPartner() {
  const [name, setName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isB2B, setIsB2B] = useState(false)
  const [b2bCommissionType, setB2bCommissionType] = useState('percentage')
  const [b2bCommissionValue, setB2bCommissionValue] = useState('')
  const [isExternal, setIsExternal] = useState(false)
  const [externalCost, setExternalCost] = useState('')
  const [referralEnabled, setReferralEnabled] = useState(false)
  const [referralPartner, setReferralPartner] = useState('')
  const [referralType, setReferralType] = useState('percentage')
  const [referralValue, setReferralValue] = useState('')
  const [notes, setNotes] = useState('')

  // Νέα states για Tour Partners
  const [isTourPartner, setIsTourPartner] = useState(false)
  const [tourPartnerCost, setTourPartnerCost] = useState('')
  const [tourPartnerPerPerson, setTourPartnerPerPerson] = useState(false)
  const [tourPartnerExtras, setTourPartnerExtras] = useState<{ name: string; amount: string }[]>([])

  // Νέα states για Licenced Tour Guides
  const [isLicensedGuide, setIsLicensedGuide] = useState(false)
  const [licensedGuideCost, setLicensedGuideCost] = useState('')
  const [licensedGuideExtras, setLicensedGuideExtras] = useState<{ name: string; amount: string }[]>([])

  // Όλοι οι συνεργάτες – για referral dropdown
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
    if (!username || !password) {
      alert('Πρέπει να βάλετε username και password για το B2B portal!')
      return
    }

    console.log('New Partner saved (with login):', {
      name,
      contactPerson,
      email,
      phone,
      website,
      username,
      password, // real θα hash-άρει
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
      isTourPartner,
      tourPartnerCost,
      tourPartnerPerPerson,
      tourPartnerExtras,
      isLicensedGuide,
      licensedGuideCost,
      licensedGuideExtras,
    })
    alert('Συνεργάτης αποθηκεύτηκε με login credentials! (mock)')
  }

  // Handlers για Tour Partners extras
  const addTourPartnerExtra = () => {
    setTourPartnerExtras([...tourPartnerExtras, { name: '', amount: '' }])
  }

  const updateTourPartnerExtra = (index: number, field: 'name' | 'amount', value: string) => {
    const newExtras = [...tourPartnerExtras]
    newExtras[index][field] = value
    setTourPartnerExtras(newExtras)
  }

  const removeTourPartnerExtra = (index: number) => {
    setTourPartnerExtras(tourPartnerExtras.filter((_, i) => i !== index))
  }

  // Handlers για Licensed Guides extras
  const addLicensedGuideExtra = () => {
    setLicensedGuideExtras([...licensedGuideExtras, { name: '', amount: '' }])
  }

  const updateLicensedGuideExtra = (index: number, field: 'name' | 'amount', value: string) => {
    const newExtras = [...licensedGuideExtras]
    newExtras[index][field] = value
    setLicensedGuideExtras(newExtras)
  }

  const removeLicensedGuideExtra = (index: number) => {
    setLicensedGuideExtras(licensedGuideExtras.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Νέος Συνεργάτης</h1>
        <p className="text-slate-600 mt-1">Δημιουργία συνεργάτη (B2B, Εξωτερικός ή και τα δύο)</p>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
          {/* Όνομα Συνεργάτη */}
          <div>
            <label className="block text-lg font-medium text-slate-700 mb-2">
              Όνομα Συνεργάτη
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Grande Bretagne"
              className="w-full px-4 py-4 text-xl border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Στοιχεία Επικοινωνίας – 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ιστοσελίδα
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.example.gr"
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
                placeholder="info@grande-bretagne.gr"
                className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Υπεύθυνος Επικοινωνίας
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="Μάρκος Καντώσκι"
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
                placeholder="210 333 0000"
                className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Login Credentials για B2B Portal */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Στοιχεία Εισόδου στο B2B Portal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="nikospapad"
                  className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* B2B Συνεργάτης */}
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
                    placeholder={b2bCommissionType === 'percentage' ? '15' : '50'}
                    className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Εξωτερικός Συνεργάτης */}
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
                  placeholder="50"
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
                    placeholder={referralType === 'percentage' ? '15' : '50'}
                    className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Γραμμή Διαχωρισμού + Νέα Sections: Tour Partners & Licensed Tour Guides */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Ειδικοί Συνεργάτες</h3>
            <div className="space-y-8">
              {/* Tour Partners */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={isTourPartner}
                    onChange={(e) => setIsTourPartner(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-lg font-medium text-slate-700">Tour Partners</span>
                </div>
                {isTourPartner && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Έξοδο (€)
                        </label>
                        <input
                          type="number"
                          value={tourPartnerCost}
                          onChange={(e) => setTourPartnerCost(e.target.value)}
                          placeholder="150"
                          className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-3 mt-6">
                        <input
                          type="checkbox"
                          checked={tourPartnerPerPerson}
                          onChange={(e) => setTourPartnerPerPerson(e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-slate-700">Ανά Άτομο</span>
                      </div>
                    </div>

                    {/* Εξτρα Έξοδα για Tour Partners */}
                    <div>
                      <button
                        type="button"
                        onClick={addTourPartnerExtra}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 mb-4"
                      >
                        <Plus className="w-4 h-4" />
                        Εξτρα Έξοδα
                      </button>
                      {tourPartnerExtras.map((extra, index) => (
                        <div key={index} className="flex gap-6 mb-4 items-end">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Όνομα Εξόδου
                            </label>
                            <input
                              type="text"
                              value={extra.name}
                              onChange={(e) => updateTourPartnerExtra(index, 'name', e.target.value)}
                              placeholder="π.χ. Εισιτήρια"
                              className="w-full px-4 py-4 border border-slate-300 rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Ποσό (€)
                            </label>
                            <input
                              type="number"
                              value={extra.amount}
                              onChange={(e) => updateTourPartnerExtra(index, 'amount', e.target.value)}
                              placeholder="20"
                              className="w-full px-4 py-4 border border-slate-300 rounded-lg"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeTourPartnerExtra(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Licensed Tour Guides */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={isLicensedGuide}
                    onChange={(e) => setIsLicensedGuide(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-lg font-medium text-slate-700">Licenced Tour Guides</span>
                </div>
                {isLicensedGuide && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Έξοδο (€)
                      </label>
                      <input
                        type="number"
                        value={licensedGuideCost}
                        onChange={(e) => setLicensedGuideCost(e.target.value)}
                        placeholder="100"
                        className="w-full px-4 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    {/* Εξτρα Έξοδα για Licensed Guides */}
                    <div>
                      <button
                        type="button"
                        onClick={addLicensedGuideExtra}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 mb-4"
                      >
                        <Plus className="w-4 h-4" />
                        Εξτρα Έξοδα
                      </button>
                      {licensedGuideExtras.map((extra, index) => (
                        <div key={index} className="flex gap-6 mb-4 items-end">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Όνομα Εξόδου
                            </label>
                            <input
                              type="text"
                              value={extra.name}
                              onChange={(e) => updateLicensedGuideExtra(index, 'name', e.target.value)}
                              placeholder="π.χ. Μετακίνηση"
                              className="w-full px-4 py-4 border border-slate-300 rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Ποσό (€)
                            </label>
                            <input
                              type="number"
                              value={extra.amount}
                              onChange={(e) => updateLicensedGuideExtra(index, 'amount', e.target.value)}
                              placeholder="30"
                              className="w-full px-4 py-4 border border-slate-300 rounded-lg"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLicensedGuideExtra(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
              placeholder="Σημειώσεις για τον συνεργάτη..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Ανέβασμα Ιδιωτικού Συμφωνητικού */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Ιδιωτικό Συμφωνητικό
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-medium text-slate-700">Ανέβασε το Ιδιωτικό Συμφωνητικό</p>
              <p className="text-sm text-slate-500 mt-1">pdf, doc, docx, jpg, png</p>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.jpg,.png" 
                className="hidden" 
              />
            </div>
          </div>

          {/* Save */}
          <div className="text-right mt-10">
            <button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Αποθήκευση Συνεργάτη
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}