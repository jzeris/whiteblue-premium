'use client'

import { useState } from 'react'
import { Users, Phone, Mail, MapPin, Upload, FileText, User, Lock, CheckSquare, Square, CreditCard } from 'lucide-react'

export default function EditDriver() {
  // Mock data – real θα τραβάει από id
  const [name, setName] = useState('Νίκος Παπαδόπουλος')
  const [phone, setPhone] = useState('+30 690 1234567')
  const [email, setEmail] = useState('nikos@whiteblue.gr')
  const [license, setLicense] = useState('123456789')
  const [location, setLocation] = useState('athens')
  const [username, setUsername] = useState('nikos_p')
  const [password] = useState('********') // read-only (δεν αλλάζει ο οδηγός)
  const [iban, setIban] = useState('GR1601101250000000012300695')
  const [hasDCategory, setHasDCategory] = useState(true)
  const [hasTaxiLicense, setHasTaxiLicense] = useState(true)
  const [notes, setNotes] = useState('Πολύ αξιόπιστος οδηγός')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Επεξεργασία Οδηγού</h1>
        <p className="text-slate-600 mt-1">Ενημέρωση στοιχείων οδηγού</p>
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Username (για login στην Driver App)
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Password – read-only */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password (για login στην Driver App)
                </label>
                <input
                  type="password"
                  value={password}
                  disabled
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-100 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Ο κωδικός δεν εμφανίζεται για ασφάλεια – μπορεί να αλλάξει μόνο από admin.
                </p>
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
                      <p className="text-sm text-slate-600">Αντικατάσταση</p>
                      <input type="file" className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Ταυτότητα</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Αντικατάσταση</p>
                      <input type="file" className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Ειδική Άδεια Ταξί</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Αντικατάσταση</p>
                      <input type="file" className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Έγγραφα Πρόσληψης</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Αντικατάσταση / Προσθήκη</p>
                      <input type="file" multiple className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Έγγραφα Απόλυσης</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Αντικατάσταση / Προσθήκη</p>
                      <input type="file" multiple className="hidden" />
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
                  className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 text-right">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105">
              Αποθήκευση Αλλαγών
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}