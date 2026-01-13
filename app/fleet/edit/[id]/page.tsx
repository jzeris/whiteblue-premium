'use client'

import { useState } from 'react'
import { Car, Gauge, Calendar, Users, Palette, FileText, Upload, Paperclip, Hash, Shield, Wrench, CreditCard, Radio } from 'lucide-react'

export default function EditVehicle() {
  // Mock data – real θα τραβάει από id
  const [plate, setPlate] = useState('IKA-1234')
  const [model, setModel] = useState('Mercedes V-Class')
  const [year, setYear] = useState('2024')
  const [color, setColor] = useState('Μαύρο')
  const [seats, setSeats] = useState('8')
  const [type, setType] = useState('Minivan')
  const [mileage, setMileage] = useState('12450')
  const [nextService, setNextService] = useState('15/02/2026')
  const [vin, setVin] = useState('W1K00000000000000')
  const [insuranceExpiry, setInsuranceExpiry] = useState('15/02/2026')
  const [kteoExpiry, setKteoExpiry] = useState('10/01/2026')
  const [fuelCardNumber, setFuelCardNumber] = useState('1234 5678 9012 3456')
  const [tollTransponder, setTollTransponder] = useState('123456789')
  const [notes, setNotes] = useState('')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Επεξεργασία Οχήματος</h1>
        <p className="text-slate-600 mt-1">Ενημέρωση στοιχείων οχήματος</p>
      </div>

      {/* Form */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Αριθμός Κυκλοφορίας
                </label>
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Μοντέλο
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Έτος
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Χρώμα
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Θέσεις
                  </label>
                  <select
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {Array.from({ length: 18 }, (_, i) => i + 3).map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Τύπος Οχήματος
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Taxi">Taxi</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Minivan">Minivan</option>
                    <option value="Minibus">Minibus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  VIN Number (Αριθμός Πλαισίου)
                </label>
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Λήξη Ασφάλειας
                </label>
                <input
                  type="date"
                  value={insuranceExpiry}
                  onChange={(e) => setInsuranceExpiry(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Λήξη ΚΤΕΟ
                </label>
                <input
                  type="date"
                  value={kteoExpiry}
                  onChange={(e) => setKteoExpiry(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Τρέχοντα Χιλιόμετρα
                </label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Επόμενο Service
                </label>
                <input
                  type="date"
                  value={nextService}
                  onChange={(e) => setNextService(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Προπληρωμένη Κάρτα Καυσίμων */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Προπληρωμένη Κάρτα Καυσίμων (Αριθμός)
                </label>
                <input
                  type="text"
                  value={fuelCardNumber}
                  onChange={(e) => setFuelCardNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Πομποδέκτης */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  Πομποδέκτης Διόδιων (Αριθμός)
                </label>
                <input
                  type="text"
                  value={tollTransponder}
                  onChange={(e) => setTollTransponder(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Έγγραφα */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Έγγραφα Οχήματος
                </label>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Άδεια Αυτοκινήτου
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Αντικατάσταση</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    ΚΤΕΟ
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Αντικατάσταση</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 flex items-center gap-2">
                    <Paperclip className="w-4 h-4" />
                    Άλλα Έγγραφα
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Paperclip className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Προσθήκη / Αντικατάσταση</p>
                    <input type="file" multiple className="hidden" />
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
                  className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
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