'use client'

import { useState } from 'react'
import { User, Mail, Phone, Lock, CheckSquare, Square } from 'lucide-react'

export default function NewUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Permissions checkboxes
  const [permissions, setPermissions] = useState({
    bookings: { view: true, edit: true },
    fleet: { view: true, edit: true },
    drivers: { view: true, edit: true },
    finance: { view: true, edit: true },
    reports: { view: true, edit: false },
    mail: { view: true, edit: true },
    settings: { view: true, edit: false },
  })

  const togglePermission = (module: keyof typeof permissions, type: 'view' | 'edit') => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [type]: !prev[module][type]
      }
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Νέος Χρήστης</h1>
        <p className="text-slate-600 mt-1">Προσθήκη νέου μέλους προσωπικού</p>
      </div>

      {/* Form */}
      <div className="p-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column – Βασικά στοιχεία */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Όνομα Χρήστη
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Γιάννης Διαχειριστής"
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
                  placeholder="giannis@whiteblue.gr"
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
                  placeholder="+30 690 0000001"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Username (για login)
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="giannis_admin"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password
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

            {/* Right Column – Permissions */}
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Δικαιώματα Πρόσβασης</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Επιλέξτε ποια modules μπορεί να βλέπει και να επεξεργάζεται ο χρήστης
                </p>

                <div className="space-y-6">
                  {/* Κρατήσεις */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Κρατήσεις</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div onClick={() => togglePermission('bookings', 'view')}>
                          {permissions.bookings.view ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Προβολή</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer ml-8">
                        <div onClick={() => togglePermission('bookings', 'edit')}>
                          {permissions.bookings.edit ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Επεξεργασία / Δημιουργία</span>
                      </label>
                    </div>
                  </div>

                  {/* Στόλος */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Στόλος</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div onClick={() => togglePermission('fleet', 'view')}>
                          {permissions.fleet.view ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Προβολή</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer ml-8">
                        <div onClick={() => togglePermission('fleet', 'edit')}>
                          {permissions.fleet.edit ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Επεξεργασία / Προσθήκη</span>
                      </label>
                    </div>
                  </div>

                  {/* Οδηγοί */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Οδηγοί</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div onClick={() => togglePermission('drivers', 'view')}>
                          {permissions.drivers.view ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Προβολή</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer ml-8">
                        <div onClick={() => togglePermission('drivers', 'edit')}>
                          {permissions.drivers.edit ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Επεξεργασία / Προσθήκη</span>
                      </label>
                    </div>
                  </div>

                  {/* Οικονομικά */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Οικονομικά</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div onClick={() => togglePermission('finance', 'view')}>
                          {permissions.finance.view ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Προβολή</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer ml-8">
                        <div onClick={() => togglePermission('finance', 'edit')}>
                          {permissions.finance.edit ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Επεξεργασία Πάγιων</span>
                      </label>
                    </div>
                  </div>

                  {/* Αναφορές */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Αναφορές</h4>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => togglePermission('reports', 'view')}>
                        {permissions.reports.view ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                      </div>
                      <span className="text-slate-700">Προβολή Αναφορών</span>
                    </label>
                  </div>

                  {/* Mail + Marketing */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Mail + Marketing</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div onClick={() => togglePermission('mail', 'view')}>
                          {permissions.mail.view ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Προβολή</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer ml-8">
                        <div onClick={() => togglePermission('mail', 'edit')}>
                          {permissions.mail.edit ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                        </div>
                        <span className="text-slate-700">Αποστολή / Campaigns</span>
                      </label>
                    </div>
                  </div>

                  {/* Ρυθμίσεις */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">Ρυθμίσεις</h4>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => togglePermission('settings', 'view')}>
                        {permissions.settings.view ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                      </div>
                      <span className="text-slate-700">Προβολή</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105">
              Προσθήκη Χρήστη
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}