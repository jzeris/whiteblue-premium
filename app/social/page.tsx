'use client'

import { useState } from 'react'
import { Facebook, Instagram, Twitter, Linkedin, Music4, Calendar, Clock, Send, Sparkles } from 'lucide-react'

const platforms = [
  { name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
  { name: 'X (Twitter)', icon: Twitter, color: 'text-black' },
  { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
  { name: 'TikTok', icon: Music4, color: 'text-black' },
]

export default function SocialMedia() {
  const [selectedPlatform, setSelectedPlatform] = useState('Facebook')
  const [postContent, setPostContent] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')

  const getPlatformIcon = (name: string) => {
    const p = platforms.find(p => p.name === name)
    if (!p) return null
    const Icon = p.icon
    return <Icon className={`w-6 h-6 ${p.color}`} />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Social Media</h1>
        <p className="text-slate-600 mt-1">Δημιουργία και προγραμματισμός posts</p>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Platform Select */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Επιλογή Πλατφόρμας</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {platforms.map((p) => (
              <button
                key={p.name}
                onClick={() => setSelectedPlatform(p.name)}
                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                  selectedPlatform === p.name ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {getPlatformIcon(p.name)}
                <span className="font-medium text-slate-900">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* New Post Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Νέο Post - {selectedPlatform}
          </h2>

          {/* AI Suggestion */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-6 border border-purple-200">
            <p className="text-sm font-medium text-purple-800 mb-2">Πρόταση AI:</p>
            <p className="text-slate-700">
              {selectedPlatform === 'LinkedIn' ? 'Ανακοινώστε τις νέες VIP υπηρεσίες μας για corporate clients – ιδανικό για B2B networking!' :
               selectedPlatform === 'TikTok' ? 'Video με sunset tour στο Σούνιο – trending sound + #MykonosLuxury' :
               selectedPlatform === 'Instagram' ? 'Story + Reel με Mercedes V-Class στο αεροδρόμιο – caption: "Your luxury ride awaits"' :
               'Χειμερινές προσφορές - έως 30% έκπτωση σε airport transfers!'}
            </p>
            <button className="mt-3 text-sm text-purple-600 hover:text-purple-800 font-medium">
              Χρήση πρότασης →
            </button>
          </div>

          {/* Post Content */}
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Γράψτε το περιεχόμενο του post..."
            className="w-full h-48 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />

          {/* Media Upload */}
          <div className="mt-4">
            <button className="border-2 border-dashed border-slate-300 rounded-lg w-full py-8 text-slate-500 hover:bg-slate-50 transition-colors">
              + Προσθήκη Φωτογραφίας / Video
            </button>
          </div>

          {/* Schedule */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Ημερομηνία Αποστολής
              </label>
              <input type="date" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Ώρα Αποστολής
              </label>
              <input type="time" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105">
              <Send className="w-5 h-5" />
              Προγραμματισμός Post
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Preview</h3>
          <div className="bg-slate-100 rounded-lg p-8 text-center">
            <p className="text-slate-600">Το post θα εμφανίζεται εδώ σε real-time</p>
          </div>
        </div>
      </div>
    </div>
  )
}