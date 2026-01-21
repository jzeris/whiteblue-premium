'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, Star, MapPin, MessageSquare, LogOut } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/b2b/dashboard', icon: Home },
  { name: 'Κρατήσεις', href: '/b2b/bookings', icon: Calendar },
  { name: 'Reviews', href: '/b2b/reviews', icon: Star },
  { name: 'Live Tracking', href: '/b2b/tracking', icon: MapPin },
  { name: 'AI Βοηθός', href: '/b2b/ai', icon: MessageSquare },
]

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('b2b_logged_in')
    window.location.href = '/b2b/login'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">B2B Portal</h1>
          <p className="text-sm text-slate-500 mt-1">Συνεργάτης: [Όνομα Συνεργάτη]</p>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-3 right-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Αποσύνδεση
          </button>
        </div>
      </aside>

      {/* Main Content – κεντραρισμένο σωστά */}
      <div className={`min-h-screen transition-all duration-300 ${isOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4 bg-white border-b sticky top-0 z-40">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 text-xl">
            ☰ Menu
          </button>
        </div>

        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      {/* Overlay για mobile όταν sidebar ανοιχτό */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}