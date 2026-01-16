'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Car,
  Users,
  DollarSign,
  LogOut,
  ChevronDown,
  Mail,
  Share2,
  MapPin,
  Settings,
  Briefcase,
  Handshake,
} from 'lucide-react'

// Ορισμός τύπων - σωστός και ασφαλής
interface NestedSubItem {
  label: string
  href: string
}

interface SubMenuItem {
  label: string
  href?: string // optional για "Emails" (μόνο link)
  sub?: NestedSubItem[] // για "Marketing" (με βελάκι)
}

interface MenuItem {
  icon: typeof Calendar
  label: string
  href: string
  sub?: SubMenuItem[]
}

const menu: MenuItem[] = [
  {
    icon: Calendar,
    label: 'Κρατήσεις',
    href: '/bookings',
    sub: [
      { label: 'Λίστα Κρατήσεων', href: '/bookings' },
      { label: 'Νέα Κράτηση', href: '/bookings/new' },
    ],
  },
  {
    icon: Car,
    label: 'Στόλος',
    href: '/fleet',
    sub: [
      { label: 'Λίστα Οχημάτων', href: '/fleet' },
      { label: 'Νέο Όχημα', href: '/fleet/new' },
    ],
  },
  {
    icon: Users,
    label: 'Οδηγοί',
    href: '/drivers',
    sub: [
      { label: 'Λίστα Οδηγών', href: '/drivers' },
      { label: 'Νέος Οδηγός', href: '/drivers/new' },
    ],
  },
  {
    icon: DollarSign,
    label: 'Οικονομικά',
    href: '/finance',
    sub: [
      { label: 'Έσοδα', href: '/finance/income' },
      { label: 'Αναφορές', href: '/finance/reports' },
      { label: 'Πάγια Έξοδα Εταιρείας', href: '/finance/expenses' },
    ],
  },
  {
    icon: Briefcase,
    label: 'Υπηρεσίες',
    href: '/services',
    sub: [
      { label: 'Λίστα Υπηρεσιών', href: '/services' },
      { label: 'Νέα Υπηρεσία', href: '/services/new' },
    ],
  },
  {
    icon: Handshake,
    label: 'Συνεργάτες',
    href: '/partners',
    sub: [
      { label: 'Λίστα Συνεργατών', href: '/partners' },
      { label: 'Νέος Συνεργάτης', href: '/partners/new' },
    ],
  },
  {
    icon: Mail,
    label: 'Email + Marketing',
    href: '/emails',
    sub: [
      { label: 'Emails', href: '/emails' }, // ← Απλό link, χωρίς βελάκι
      {
        label: 'Marketing',
        sub: [
          { label: 'Campaigns', href: '/email' },
          { label: 'Subscribers', href: '/email/subscribers' },
          { label: 'New Campaign', href: '/email/new' },
        ],
      },
    ],
  },
  {
    icon: Share2,
    label: 'Social Media',
    href: '/social',
    sub: [
      { label: 'New Post', href: '/social' },
      { label: 'Analytics', href: '/social/analytics' },
      { label: 'Scheduled Posts', href: '/social/scheduled' },
    ],
  },
  {
    icon: MapPin,
    label: 'Live Map',
    href: '/map',
    sub: [
      { label: 'Live Tracking', href: '/map' },
      { label: 'History', href: '/map/history' },
    ],
  },
  {
    icon: Settings,
    label: 'Ρυθμίσεις',
    href: '/settings',
    sub: [
      { label: 'Branding & Εταιρεία', href: '/settings' },
      { label: 'Τοποθεσίες', href: '/settings/locations' },
      { label: 'Ειδοποιήσεις', href: '/settings/notifications' },
      { label: 'API Keys', href: '/settings/api-keys' },
      { label: 'Χρήστες', href: '/settings/users' },
      { label: 'Emails', href: '/settings/emails' },
    ],
  },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState<string[]>([]) // ← ΕΔΩ Η ΑΛΛΑΓΗ: ΚΕΝΟ ARRAY → όλα κλειστά από default

  const toggleExpand = (label: string) => {
    setExpanded(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    )
  }

  // Type guard για να ξέρει η TS πότε έχει sub
  const hasSub = (item: MenuItem): item is MenuItem & { sub: SubMenuItem[] } => 'sub' in item

  // Type guard για να ξέρει η TS πότε έχει href
  const hasHref = (sub: SubMenuItem): sub is SubMenuItem & { href: string } => 'href' in sub

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">W</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">WhiteBlue</h1>
            <p className="text-xs text-slate-400">Premium</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map(item => (
          <div key={item.label}>
            <button
              onClick={() => toggleExpand(item.label)}
              className="flex items-center justify-between px-4 py-3 w-full hover:bg-slate-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {hasSub(item) && <ChevronDown className={`w-4 h-4 ${expanded.includes(item.label) ? 'rotate-180' : ''}`} />}
            </button>

            {hasSub(item) && expanded.includes(item.label) && (
              <div className="ml-8 mt-1 space-y-1">
                {item.sub.map(sub =>
                  hasHref(sub) ? (
                    // Απλό link (π.χ. Emails)
                    <Link key={sub.label} href={sub.href}>
                      <div className="py-2 px-4 text-sm text-slate-400 hover:text-white cursor-pointer">
                        {sub.label}
                      </div>
                    </Link>
                  ) : (
                    // Header με βελάκι (π.χ. Marketing)
                    <div key={sub.label}>
                      <button
                        onClick={() => toggleExpand(sub.label)}
                        className="flex justify-between w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"
                      >
                        {sub.label}
                        <ChevronDown className={`w-4 h-4 ${expanded.includes(sub.label) ? 'rotate-180' : ''}`} />
                      </button>

                      {expanded.includes(sub.label) && sub.sub && (
                        <div className="ml-8">
                          {sub.sub.map(nested => (
                            <Link key={nested.label} href={nested.href}>
                              <div className="py-1 px-4 text-sm text-slate-400 hover:text-white">
                                {nested.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white w-full">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Αποσύνδεση</span>
        </button>
      </div>
    </div>
  )
}