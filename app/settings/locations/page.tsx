'use client'

import { useState } from 'react'
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react'

type Location = {
  id: number
  name: string
  code: string
  color: string
  active: boolean
}

export default function LocationsSettings() {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: 'Αθήνα', code: 'ATH', color: '#3b82f6', active: true },
    { id: 2, name: 'Μύκονος', code: 'JMK', color: '#10b981', active: true },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    color: '#3b82f6',
    active: true
  })

  const handleSaveLocation = () => {
    if (!formData.name || !formData.code) return

    if (editingLocation) {
      setLocations(locations.map(l => l.id === editingLocation.id ? { ...formData, id: editingLocation.id } : l))
    } else {
      setLocations([...locations, { ...formData, id: Date.now() }])
    }

    setFormData({ name: '', code: '', color: '#3b82f6', active: true })
    setShowModal(false)
    setEditingLocation(null)
  }

  const handleEdit = (loc: Location) => {
    setEditingLocation(loc)
    setFormData({ name: loc.name, code: loc.code, color: loc.color, active: loc.active })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Σίγουρα θέλετε να διαγράψετε αυτή την τοποθεσία;')) {
      setLocations(locations.filter(l => l.id !== id))
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <MapPin className="w-8 h-8" />
            Τοποθεσίες
          </h1>
          <p className="text-slate-600 mt-2">Διαχείριση των περιοχών που εξυπηρετείτε</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Νέα Τοποθεσία
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {locations.length === 0 ? (
          <p className="col-span-full text-center text-slate-500 py-12">Δεν έχετε προσθέσει ακόμα τοποθεσίες</p>
        ) : (
          locations.map((loc) => (
            <div key={loc.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{loc.name}</h3>
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {loc.code}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg shadow" style={{ backgroundColor: loc.color }}></div>
                <span className="text-sm text-slate-600">Χρώμα</span>
              </div>

              <div className="text-sm text-slate-600 mb-6">
                Κατάσταση: <span className="font-medium">{loc.active ? 'Ενεργή' : 'Ανενεργή'}</span>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleEdit(loc)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Επεξεργασία
                </button>
                <button 
                  onClick={() => handleDelete(loc.id)}
                  className="px-4 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
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
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="π.χ. Μύκονος"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Κωδικός (3 γράμματα)</label>
                <input 
                  type="text" 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  maxLength={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="π.χ. JMK"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Χρώμα</label>
                <input 
                  type="color" 
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="h-12 w-full rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="active" 
                  checked={formData.active}
                  onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <label htmlFor="active" className="text-slate-700">Ενεργή τοποθεσία</label>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => {
                  setShowModal(false)
                  setEditingLocation(null)
                  setFormData({ name: '', code: '', color: '#3b82f6', active: true })
                }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-3 rounded-lg transition"
              >
                Ακύρωση
              </button>
              <button 
                onClick={handleSaveLocation}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              >
                {editingLocation ? 'Αποθήκευση' : 'Προσθήκη'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}