'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingAI from '@/components/ai/FloatingAI'
import FloatingNotifications from '@/components/notifications/FloatingNotifications'
import Sidebar from '@/components/sidebar/Sidebar'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()
  const isDriverApp = pathname === '/driver' || pathname.startsWith('/driver/')

  return (
    <html lang="el">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex bg-white">
          {/* Sidebar ΠΑΝΤΟΥ εκτός driver app */}
          {!isDriverApp && <Sidebar />}

          {/* Main wrapper – πλήρες πλάτος χωρίς sidebar */}
          <div className="flex-1"> {/* ← ΕΔΩ ΑΦΑΙΡΕΘΗΚΕ ΤΟ ml-64 */}
            {/* Header */}
            {!isDriverApp && (
              <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    W
                  </div>
                  <span className="text-xl font-bold text-slate-900">Πίνακας Ελέγχου</span>
                </Link>
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-slate-600" />
                  </button>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    Γ
                  </div>
                </div>
              </div>
            )}

            {/* Main content – πλήρες πλάτος, χωρίς offset */}
            <main className="bg-slate-50 w-full">
              {children}
            </main>
          </div>
        </div>

        {/* Floating components – κρύβονται στο driver app */}
        {!isDriverApp && (
          <>
            <div className="fixed bottom-6 right-24 z-50">
              <FloatingNotifications />
            </div>

            <div className="fixed bottom-6 right-6 z-50">
              <FloatingAI />
            </div>
          </>
        )}
      </body>
    </html>
  )
}