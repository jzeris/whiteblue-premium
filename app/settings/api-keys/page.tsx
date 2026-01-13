'use client'

import { useState } from 'react'
import { Key, Copy, Check } from 'lucide-react'

export default function ApiKeysSettings() {
  const [googleMapsKey, setGoogleMapsKey] = useState<string>('')
  const [googlePlacesKey, setGooglePlacesKey] = useState<string>('')
  const [tollsApiKey, setTollsApiKey] = useState<string>('')
  const [openWeatherKey, setOpenWeatherKey] = useState<string>('')
  const [ruhavikKey, setRuhavikKey] = useState<string>('')
  const [epsilonSmartKey, setEpsilonSmartKey] = useState<string>('')
  const [edexixKey, setEdexixKey] = useState<string>('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSave = () => {
    console.log('API Keys αποθηκεύτηκαν:', {
      googleMapsKey,
      googlePlacesKey,
      tollsApiKey,
      openWeatherKey,
      ruhavikKey,
      epsilonSmartKey,
      edexixKey,
    })
    alert('Τα API Keys αποθηκεύτηκαν επιτυχώς!')
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Key className="w-8 h-8" />
          API Keys
        </h1>
        <p className="text-slate-600 mt-2">
          Διαχείριση κλειδιών για εξωτερικές υπηρεσίες
        </p>
      </div>

      <div className="space-y-12">
        {/* Google Maps */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Google Maps JavaScript API</h2>
              <p className="text-slate-600 mt-1">
                Απαραίτητο για χάρτες, autocomplete και υπολογισμό διαδρομών.
              </p>
              <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Οδηγίες δημιουργίας →
              </a>
            </div>
          </div>

          <div className="relative">
            <input 
              type="password" 
              value={googleMapsKey}
              onChange={(e) => setGoogleMapsKey(e.target.value)}
              placeholder="Εισάγετε το Google Maps API Key"
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {googleMapsKey && (
              <button onClick={() => handleCopy(googleMapsKey, 'maps')} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg">
                {copiedField === 'maps' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
              </button>
            )}
          </div>
        </div>

        {/* Google Places */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Key className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Google Places API</h2>
              <p className="text-slate-600 mt-1">
                Προτάσεις τοποθεσιών κατά την εισαγωγή διευθύνσεων.
              </p>
              <a href="https://developers.google.com/places/web-service/intro" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Ενεργοποίηση Places API →
              </a>
            </div>
          </div>

          <div className="relative">
            <input 
              type="password" 
              value={googlePlacesKey}
              onChange={(e) => setGooglePlacesKey(e.target.value)}
              placeholder="Εισάγετε το Places API Key (συνήθως ίδιο με Maps)"
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            {googlePlacesKey && (
              <button onClick={() => handleCopy(googlePlacesKey, 'places')} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg">
                {copiedField === 'places' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
              </button>
            )}
          </div>
        </div>

        {/* TollGuru */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Key className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">TollGuru API (Διόδια)</h2>
              <p className="text-slate-600 mt-1">
                Αυτόματος υπολογισμός διοδίων σε διαδρομές.
              </p>
              <a href="https://tollguru.com/developer/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Εγγραφή για API Key →
              </a>
            </div>
          </div>

          <div className="relative">
            <input 
              type="password" 
              value={tollsApiKey}
              onChange={(e) => setTollsApiKey(e.target.value)}
              placeholder="Εισάγετε το TollGuru API Key (προαιρετικό)"
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {tollsApiKey && (
              <button onClick={() => handleCopy(tollsApiKey, 'tolls')} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg">
                {copiedField === 'tolls' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
              </button>
            )}
          </div>
        </div>

        {/* OpenWeatherMap */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Key className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">OpenWeatherMap API (Καιρός)</h2>
              <p className="text-slate-600 mt-1">
                Ειδοποιήσεις για κακοκαιρία (προαιρετικό).
              </p>
              <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Δωρεάν API Key →
              </a>
            </div>
          </div>

          <div className="relative">
            <input 
              type="password" 
              value={openWeatherKey}
              onChange={(e) => setOpenWeatherKey(e.target.value)}
              placeholder="Εισάγετε το OpenWeatherMap API Key (προαιρετικό)"
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {openWeatherKey && (
              <button onClick={() => handleCopy(openWeatherKey, 'weather')} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg">
                {copiedField === 'weather' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
              </button>
            )}
          </div>
        </div>

        {/* Ruhavik */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Key className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Ruhavik API Key</h2>
              <p className="text-slate-600 mt-1">
                Για live tracking οχημάτων και πομποδέκτες.
              </p>
              <a href="https://ruhavik.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Εγγραφή / API Docs →
              </a>
            </div>
          </div>

          <div className="relative">
            <input 
              type="password" 
              value={ruhavikKey}
              onChange={(e) => setRuhavikKey(e.target.value)}
              placeholder="ruhavik_xxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {ruhavikKey && (
              <button onClick={() => handleCopy(ruhavikKey, 'ruhavik')} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg">
                {copiedField === 'ruhavik' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
              </button>
            )}
          </div>
        </div>

        {/* Epsilon Smart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Key className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Epsilon Smart API Key</h2>
              <p className="text-slate-600 mt-1">
                Για έξοδα καυσίμων, προπληρωμένες κάρτες και λογιστική.
              </p>
              <a href="https://epsilonsmart.gr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Εγγραφή / API →
              </a>
            </div>
          </div>

          <div className="relative">
            <input 
              type="password" 
              value={epsilonSmartKey}
              onChange={(e) => setEpsilonSmartKey(e.target.value)}
              placeholder="epsilon_xxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            {epsilonSmartKey && (
              <button onClick={() => handleCopy(epsilonSmartKey, 'epsilon')} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg">
                {copiedField === 'epsilon' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
              </button>
            )}
          </div>
        </div>

        {/* Μητρώο φορέων διαμεσολάβησης και συμβάσεων Ε.Ι.Χ. οχημάτων με οδηγό (Edxeix) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Key className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Μητρώο φορέων διαμεσολάβησης και συμβάσεων Ε.Ι.Χ. οχημάτων με οδηγό (Edxeix)</h2>
              <p className="text-slate-600 mt-1">
                Για ηλεκτρονικές άδειες κυκλοφορίας, ΚΤΕΟ, άδειες ταξί.
              </p>
              <a href="https://edxeix.yme.gov.gr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Επίσημη Πλατφόρμα →
              </a>
            </div>
          </div>

          <div className="relative">
            <input 
              type="password" 
              value={edexixKey}
              onChange={(e) => setEdexixKey(e.target.value)}
              placeholder="edexix_xxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
            {edexixKey && (
              <button onClick={() => handleCopy(edexixKey, 'edexix')} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg">
                {copiedField === 'edexix' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Αποθήκευση */}
      <div className="mt-12 text-right">
        <button 
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-16 rounded-xl shadow-lg transition-all hover:scale-105 text-xl"
        >
          Αποθήκευση API Keys
        </button>
      </div>
    </div>
  )
}