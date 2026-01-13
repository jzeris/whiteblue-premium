'use client'

import { useState } from 'react'
import { Upload, Palette, Building2, Phone, Mail, Video, MapPin, Plus, Edit2, Trash2 } from 'lucide-react'

// Ορισμός τύπου για τις τοποθεσίες
type Location = {
  id: number
  name: string
  code: string
  color: string
  active: boolean
}

export default function Settings() {
  // State για Branding
  const [primaryColor, setPrimaryColor] = useState('#1e40af')
  const [secondaryColor, setSecondaryColor] = useState('#6366f1')
  const [watermarkEnabled, setWatermarkEnabled] = useState(false)

  // State για Στοιχεία Εταιρείας
  const [companyName, setCompanyName] = useState('WhiteBlue Premium')
  const [address, setAddress] = useState('Λεωφ. Βουλιαγμένης 85, Αθήνα')
  const [vatNumber, setVatNumber] = useState('EL123456789')
  const [phone, setPhone] = useState('+30 210 1234567')
  const [email, setEmail] = useState('info@whiteblue.gr')

  // State για Τοποθεσίες (με σωστό τύπο)
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: 'Αθήνα', code: 'ATH', color: '#3b82f6', active: true },
    { id: 2, name: 'Μύκονος', code: 'JMK', color: '#10b981', active: true },
    { id: 3, name: 'Σαντορίνη', code: 'JTR', color: '#f59e0b', active: false },
  ])

  const [showLocationModal, setShowLocationModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)

  const [newLocation, setNewLocation] = useState({
    name: '',
    code: '',
    color: '#3b82f6',
    active: true
  })

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.code) {
      if (editingLocation) {
        setLocations(locations.map(l => l.id === editingLocation.id ? { ...newLocation, id: editingLocation.id } : l))
      } else {
        setLocations([...locations, { ...newLocation, id: Date.now() }])
      }
      setNewLocation({ name: '', code: '', color: '#3b82f6', active: true })
      setShowLocationModal(false)
      setEditingLocation(null)
    }
  }

  const handleEditLocation = (loc: Location) => {
    setEditingLocation(loc)
    setNewLocation({ name: loc.name, code: loc.code, color: loc.color, active: loc.active })
    setShowLocationModal(true)
  }

  const handleDeleteLocation = (id: number) => {
    if (confirm('Σίγουρα θέλετε να διαγράψετε αυτή την τοποθεσία;')) {
      setLocations(locations.filter(l => l.id !== id))
    }
  }

  const handleSave = () => {
    console.log('Ρυθμίσεις αποθηκεύτηκαν:', {
      primaryColor,
      secondaryColor,
      watermarkEnabled,
      companyName,
      address,
      vatNumber,
      phone,
      email,
      locations
    })
    alert('Οι ρυθμίσεις αποθηκεύτηκαν επιτυχώς!')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Ρυθμίσεις</h1>
        <p className="text-slate-600 mt-1">Branding, στοιχεία εταιρείας και προτιμήσεις</p>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Branding */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Palette className="w-6 h-6" />
              Branding
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Logo Εταιρείας
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">Ανέβασμα Logo (PNG/SVG)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Intro Video (MP4 - μύλος που γυρίζει)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Video className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">Ανέβασμα MP4 (max 50MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Primary Color
                  </label>
                  <input 
                    type="color" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-12 w-full rounded cursor-pointer" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Secondary Color
                  </label>
                  <input 
                    type="color" 
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="h-12 w-full rounded cursor-pointer" 
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="watermark" 
                  checked={watermarkEnabled}
                  onChange={(e) => setWatermarkEnabled(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                />
                <label htmlFor="watermark" className="text-slate-700 cursor-pointer">
                  Ενεργοποίηση watermark σε videos
                </label>
              </div>
            </div>
          </div>

          {/* Στοιχεία Εταιρείας */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              Στοιχεία Εταιρείας
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Επωνυμία
                </label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Διεύθυνση
                </label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ΑΦΜ
                </label>
                <input 
                  type="text" 
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </div>
          </div>
        </div>

        {/* Τοποθεσίες */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              Τοποθεσίες
            </h2>
            <button 
              onClick={() => setShowLocationModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Νέα Τοποθεσία
            </button>
          </div>

          <p className="text-slate-600 mb-8">Διαχείριση των περιοχών που εξυπηρετείτε</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div key={loc.id} className="bg-slate-50 rounded-xl border border-slate-200 p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{loc.name}</h3>
                  <span className="text-sm font-medium text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
                    {loc.code}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg shadow" style={{ backgroundColor: loc.color }}></div>
                  <span className="text-sm text-slate-600">Χρώμα τοποθεσίας</span>
                </div>
                <div className="text-sm text-slate-600 mb-4">
                  <p>Ενεργή: {loc.active ? 'Ναι' : 'Όχι'}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditLocation(loc)}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Επεξεργασία
                  </button>
                  <button 
                    onClick={() => handleDeleteLocation(loc.id)}
                    className="px-4 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {locations.length === 0 && (
            <p className="text-center text-slate-500 py-12">Δεν έχετε προσθέσει ακόμα τοποθεσίες</p>
          )}
        </div>

        {/* Modal για Νέα/Επεξεργασία Τοποθεσίας */}
        {showLocationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingLocation ? 'Επεξεργασία Τοποθεσίας' : 'Νέα Τοποθεσία'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Όνομα</label>
                  <input 
                    type="text" 
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="π.χ. Μύκονος"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Κωδικός (3 γράμματα)</label>
                  <input 
                    type="text" 
                    value={newLocation.code}
                    onChange={(e) => setNewLocation({...newLocation, code: e.target.value.toUpperCase()})}
                    maxLength={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="π.χ. JMK"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Χρώμα</label>
                  <input 
                    type="color" 
                    value={newLocation.color}
                    onChange={(e) => setNewLocation({...newLocation, color: e.target.value})}
                    className="h-12 w-full rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="active" 
                    checked={newLocation.active}
                    onChange={(e) => setNewLocation({...newLocation, active: e.target.checked})}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <label htmlFor="active" className="text-slate-700">Ενεργή τοποθεσία</label>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => {
                    setShowLocationModal(false)
                    setEditingLocation(null)
                    setNewLocation({ name: '', code: '', color: '#3b82f6', active: true })
                  }}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-3 rounded-lg transition"
                >
                  Ακύρωση
                </button>
                <button 
                  onClick={handleAddLocation}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                  {editingLocation ? 'Αποθήκευση' : 'Προσθήκη'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Αποθήκευση */}
        <div className="mt-12 text-right">
          <button 
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-16 rounded-xl shadow-lg transition-all hover:scale-105 text-xl"
          >
            Αποθήκευση Ρυθμίσεων
          </button>
        </div>
      </div>
    </div>
  )
}