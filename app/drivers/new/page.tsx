'use client'

import { useState } from 'react'
import { Users, Phone, Mail, MapPin, Upload, FileText, Lock, User, CheckSquare, Square, CreditCard } from 'lucide-react'

export default function NewDriver() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [license, setLicense] = useState('')
  const [location, setLocation] = useState('athens')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [iban, setIban] = useState('')
  const [hasDCategory, setHasDCategory] = useState(false)
  const [hasTaxiLicense, setHasTaxiLicense] = useState(false)
  const [notes, setNotes] = useState('')

  // Mock για Google Drive sync
  const handleSave = () => {
    if (!name) {
      alert('Συμπληρώστε τουλάχιστον το όνομα')
      return
    }

    // Mock Google Drive sync
    console.log(`Δημιουργία φακέλου Google Drive: "${name}"`)
    console.log('Αρχεία που θα ανεβούν στο Google Drive:')
    console.log('- Δίπλωμα Οδήγησης')
    console.log('- Ταυτότητα')
    console.log('- Ειδική Άδεια Ταξί')
    console.log('- Έγγραφα Πρόσληψης')
    console.log('- Έγγραφα Απόλυσης (αν υπάρχουν)')
    console.log('- Ιδιωτικό Συμφωνητικό (νέο πεδίο)')

    alert('Οδηγός προστέθηκε! (mock – Google Drive sync στο console)')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Νέος Οδηγός</h1>
        <p className="text-slate-600 mt-1">Προσθήκη νέου οδηγού</p>
      </div>

      {/* Form */}
      <div className="p-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Όνομα Οδηγού
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Κουλούρης Πέτρος"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Τηλέφωνο
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+30 690 1234567"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="petros@whiteblue.gr"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Άδεια Οδήγησης (Αριθμός)
                </label>
                <input
                  type="text"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  placeholder="Αριθμός άδειας"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Περιοχή
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="athens">Αθήνα</option>
                  <option value="mykonos">Μύκονος</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setHasDCategory(!hasDCategory)}>
                    {hasDCategory ? <CheckSquare className="w-6 h-6 text-blue-600" /> : <Square className="w-6 h-6 text-slate-400" />}
                  </div>
                  <span className="text-slate-700">Κάτοχος Δ' Κατηγορίας Δίπλωμα</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setHasTaxiLicense(!hasTaxiLicense)}>
                    {hasTaxiLicense ? <CheckSquare className="w-6 h-6 text-yellow-600" /> : <Square className="w-6 h-6 text-slate-400" />}
                  </div>
                  <span className="text-slate-700">Κάτοχος Ειδικής Άδειας Ταξί</span>
                </label>
              </div>

              {/* IBAN */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  IBAN Τραπεζικού Λογαριασμού
                </label>
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  placeholder="GR1601101250000000012300695"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>

              {/* Username + Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Username (για login στην Driver App)
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="petros_k"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password (για login στην Driver App)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Right Column – Uploads + Notes */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">
                  Έγγραφα Οδηγού
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Δίπλωμα Οδήγησης</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload</p>
                      <input type="file" className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Ταυτότητα</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload</p>
                      <input type="file" className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Ειδική Άδεια Ταξί</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload</p>
                      <input type="file" className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Έγγραφα Πρόσληψης</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload (πολλαπλά)</p>
                      <input type="file" multiple className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Έγγραφα Απόλυσης (αν υπάρχουν)</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload (πολλαπλά)</p>
                      <input type="file" multiple className="hidden" />
                    </div>
                  </div>

                  {/* ΝΕΟ ΠΕΔΙΟ: Ιδιωτικό Συμφωνητικό */}
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Ιδιωτικό Συμφωνητικό
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload (pdf, doc, docx, jpg, png)</p>
                      <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Σημειώσεις
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Επιπλέον πληροφορίες..."
                  className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 text-right">
            <button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Προσθήκη Οδηγού
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}