'use client'

import { useState } from 'react'
import { Car, Gauge, Calendar, Users, Palette, FileText, Upload, Paperclip, Hash, Shield, Wrench, CreditCard, Radio } from 'lucide-react'

export default function NewVehicle() {
  const [plate, setPlate] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [color, setColor] = useState('')
  const [seats, setSeats] = useState('8')
  const [type, setType] = useState('Minivan')
  const [mileage, setMileage] = useState('')
  const [nextService, setNextService] = useState('')
  const [vin, setVin] = useState('')
  const [insuranceExpiry, setInsuranceExpiry] = useState('')
  const [kteoExpiry, setKteoExpiry] = useState('')
  const [fuelCardNumber, setFuelCardNumber] = useState('')
  const [tollTransponder, setTollTransponder] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Νέο Όχημα</h1>
        <p className="text-slate-600 mt-1">Προσθήκη νέου οχήματος στον στόλο</p>
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
                  placeholder="IKA-1234"
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
                  placeholder="Mercedes V-Class"
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
                    placeholder="2024"
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
                    placeholder="Μαύρο"
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
                  placeholder="W1K00000000000000"
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
                  Αρχικό Χιλιόμετρα
                </label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  placeholder="0"
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
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Πομποδέκτης Διόδιων */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  Πομποδέκτης Διόδιων (Αριθμός)
                </label>
                <input
                  type="text"
                  value={tollTransponder}
                  onChange={(e) => setTollTransponder(e.target.value)}
                  placeholder="123456789"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Το balance ορίζεται στα Πάγια Έξοδα → Διόδια (συνολικό για όλους)
                </p>
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
                    <p className="text-sm text-slate-600">Κάντε κλικ για upload</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    ΚΤΕΟ
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Κάντε κλικ για upload</p>
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
                    <p className="text-sm text-slate-600">Κάντε κλικ για upload πολλαπλών αρχείων</p>
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
                  placeholder="Επιπλέον πληροφορίες..."
                  className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105">
              Προσθήκη Οχήματος
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}