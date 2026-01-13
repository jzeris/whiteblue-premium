'use client'

import Link from 'next/link'
import { Plus, Pencil, Trash } from 'lucide-react'

export default function PartnersList() {
  const partners = [
    {
      id: 1,
      type: 'both',
      name: 'Grande Bretagne',
      contact: 'Μάρκος Καντώσκι',
      phone: '210 333 0000',
      email: 'marcus@grande-bretagne.gr',
    },
    {
      id: 2,
      type: 'b2b',
      name: 'Blue Villas',
      contact: 'Νίκος Παπαδόπουλος',
      phone: '22890 12345',
      email: 'nikos@bluevillas.gr',
    },
    {
      id: 3,
      type: 'external',
      name: 'Taxi Athens',
      contact: 'Γιώργος Δημητρίου',
      phone: '694 123 4567',
      email: 'info@taxiathens.gr',
    },
    {
      id: 4,
      type: 'both',
      name: 'Hotel Nefeli',
      contact: 'Ελένη Σταύρου',
      phone: '22860 98765',
      email: 'eleni@nefeli.gr',
    },
    {
      id: 5,
      type: 'external',
      name: 'Mykonos Transfers Ltd',
      contact: 'Πέτρος Κωνσταντίνου',
      phone: '22890 54321',
      email: 'petros@mykonostransfers.gr',
    },
  ]

  const getTypeBadge = (type: string) => {
    if (type === 'both') {
      return (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            B2B
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Εξωτ.
          </span>
        </div>
      )
    }
    if (type === 'b2b') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          B2B
        </span>
      )
    }
    if (type === 'external') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          Εξωτ.
        </span>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900">Συνεργάτες</h1>
          <Link href="/partners/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-md flex items-center gap-2 transition-all hover:shadow-lg">
              <Plus className="w-5 h-5" />
              Νέος Συνεργάτης
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-24">
                    Τύπος
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Όνομα
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Υπεύθυνος
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Τηλέφωνο
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-40">
                    Ενέργειες
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {partners.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">{getTypeBadge(p.type)}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                    <td className="px-6 py-4 text-slate-600">{p.contact}</td>
                    <td className="px-6 py-4 text-slate-600">{p.phone}</td>
                    <td className="px-6 py-4 text-slate-600">{p.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <Link href={`/partners/${p.id}/edit`}>
                          <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                            <Pencil className="w-4 h-4" />
                            Επεξεργασία
                          </button>
                        </Link>
                        <button className="flex items-center gap-1.5 text-red-600 hover:text-red-800 text-sm font-medium transition-colors">
                          <Trash className="w-4 h-4" />
                          Διαγραφή
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}