'use client'

import { useState } from 'react'
import { Sparkles, X, Send, Mic } from 'lucide-react'

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        <Sparkles className="w-8 h-8 animate-pulse" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-end justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col" style={{ maxHeight: '80vh' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-t-2xl flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                <h3 className="font-bold text-lg">WhiteBlue AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <p className="text-slate-600">Γεια! Πες μου τι να κάνω – π.χ. "Ανάθεσε το 1001 στον Νίκο"</p>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 flex items-center gap-3">
              <button className="p-3 bg-slate-200 hover:bg-slate-300 rounded-full">
                <Mic className="w-5 h-5 text-slate-600" />
              </button>
              <input 
                type="text" 
                placeholder="Πες ή γράψε εντολή..."
                className="flex-1 px-4 py-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}