'use client'

import { ReactNode } from 'react'

export default function DriverLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Μόνο το content του driver app – χωρίς sidebar */}
      {children}
    </div>
  )
}