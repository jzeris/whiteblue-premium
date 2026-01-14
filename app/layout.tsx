'use client'

import { useState } from 'react'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingAI from '@/components/ai/FloatingAI'
import FloatingNotifications from '@/components/notifications/FloatingNotifications'
import Sidebar from '@/components/sidebar/Sidebar'
import { MessageSquare, Share2 } from 'lucide-react'
import Link from 'next/link'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMenu, setShowMenu] = useState(false)

  const shareDriverApp = () => {
    const url = "https://whiteblue-premium.vercel.app/driver"
    const title = "WhiteBlue Driver App"
    const text = "Κατέβασε το app για οδηγούς της WhiteBlue - εύκολη διαχείριση κρατήσεων!"

    if (navigator.share) {
      navigator.share({ title, text, url })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Share failed", error))
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(url)
      alert("Το link αντιγράφηκε! Στείλε το στους οδηγούς σου.")
    }

    setShowMenu(false)
  }

  return (
    <html lang="el">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex">
          <Sidebar />

          <div className="flex-1">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  W
                </div>
                <span className="text-xl font-bold text-slate-900">Πίνακας Ελέγχου</span>
              </Link>

              <div className="flex items-center gap-6">
                <button className="p-2 hover:bg-slate-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-slate-600" />
                </button>

                {/* Avatar με dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold focus:outline-none hover:ring-2 hover:ring-blue-300 transition"
                  >
                    Γ
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border border-slate-200">
                      <button
                        onClick={shareDriverApp}
                        className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center gap-3 transition"
                      >
                        <Share2 className="w-5 h-5 text-slate-600" />
                        <span className="text-slate-800 font-medium">Κοινοποίηση Driver App</span>
                      </button>

                      {/* Μπορείς να προσθέσεις κι άλλες επιλογές εδώ αργότερα */}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <main className="bg-slate-50">
              {children}
            </main>
          </div>
        </div>

        <div className="fixed bottom-6 right-24 z-50">
          <FloatingNotifications />
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          <FloatingAI />
        </div>

        {/* ΝΕΟ: Κρύβει τα arrows από όλα τα input type="number" */}
        <style jsx global>{`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}</style>
      </body>
    </html>
  )
}