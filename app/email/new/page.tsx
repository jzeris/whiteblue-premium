'use client'

import { useState } from 'react'
import { Mail, Clock, Users, Send, Image } from 'lucide-react'

const templates = [
  { id: 1, name: 'Winter Offers 2026', preview: 'https://placehold.co/600x400/0057D9/FFFFFF?text=Winter+Offers+2026', desc: 'Προσφορές χειμώνα με εκπτώσεις' },
  { id: 2, name: 'Mykonos Early Booking', preview: 'https://placehold.co/600x400/FF6B35/FFFFFF?text=Early+Booking+Mykonos', desc: 'Early booking για Μύκονο' },
  { id: 3, name: 'VIP Newsletter', preview: 'https://placehold.co/600x400/722F8A/FFFFFF?text=VIP+Exclusive', desc: 'Αποκλειστικές προσφορές για VIP' },
  { id: 4, name: 'New Year Greeting', preview: 'https://placehold.co/600x400/FFD700/000000?text=Happy+New+Year', desc: 'Εορταστικό μήνυμα νέου έτους' },
]

export default function NewCampaign() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [subject, setSubject] = useState('')
  const [previewName, setPreviewName] = useState('')
  const [sendNow, setSendNow] = useState(true)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Νέο Campaign</h1>
        <p className="text-slate-600 mt-1">Δημιουργία και αποστολή email campaign</p>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-6xl mx-auto">
        {/* Template Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Επιλογή Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`bg-white rounded-xl shadow-sm border-2 transition-all hover:shadow-lg ${
                  selectedTemplate === template.id ? 'border-blue-600 shadow-lg' : 'border-slate-200'
                }`}
              >
                <div className="aspect-video bg-slate-200 rounded-t-xl overflow-hidden">
                  <img src={template.preview} className="w-full h-full object-cover" alt={template.name} />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900">{template.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{template.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedTemplate && (
          <>
            {/* Campaign Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Στοιχεία Campaign</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject Line</label>
                    <input 
                      type="text" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Π.χ. Χειμερινές Προσφορές 2026 - Έως 30% έκπτωση!"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preview Text</label>
                    <input 
                      type="text" 
                      value={previewName}
                      onChange={(e) => setPreviewName(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Εμφανίζεται μετά το subject στο inbox"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Παραλήπτες
                </h3>
                <div className="space-y-4">
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg">
                    <option>Όλοι οι Subscribers (8.420)</option>
                    <option>VIP Clients (320)</option>
                    <option>Athens Clients</option>
                    <option>Mykonos Partners</option>
                  </select>
                  <p className="text-sm text-slate-500">Θα αποσταλεί σε 8.420 παραλήπτες</p>
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-12">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Editor
                </h3>
              </div>
              <div className="p-6">
                <div className="min-h-96 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <Image className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <p>Preview του επιλεγμένου template</p>
                    <p className="text-sm mt-2">Θα προσθέσουμε rich editor σε επόμενο βήμα</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Send Options */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Αποστολή
              </h3>
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="send" 
                    checked={sendNow}
                    onChange={() => setSendNow(true)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="font-medium">Αποστολή Τώρα</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="send" 
                    checked={!sendNow}
                    onChange={() => setSendNow(false)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="font-medium">Προγραμματισμένη Αποστολή</span>
                </label>
              </div>
              {!sendNow && (
                <div className="mt-4 flex items-center gap-4">
                  <input type="date" className="px-4 py-3 border border-slate-300 rounded-lg" />
                  <input type="time" className="px-4 py-3 border border-slate-300 rounded-lg" />
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="text-right">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg flex items-center gap-3 mx-auto transition-transform hover:scale-105">
                <Send className="w-6 h-6" />
                {sendNow ? 'Αποστολή Campaign' : 'Προγραμματισμός'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}