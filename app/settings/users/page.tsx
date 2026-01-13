'use client'

import Link from 'next/link'
import { Users, Phone, Mail, ToggleLeft, ToggleRight } from 'lucide-react'
import { useState } from 'react'

export default function UsersList() {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active')

  const users = [
    {
      id: 1,
      name: 'Γιάννης Διαχειριστής',
      email: 'giannis@whiteblue.gr',
      phone: '+30 690 0000001',
      role: 'Admin',
      isActive: true,
    },
    {
      id: 2,
      name: 'Μαρία Manager',
      email: 'maria@whiteblue.gr',
      phone: '+30 690 0000002',
      role: 'Manager',
      isActive: true,
    },
    {
      id: 3,
      name: 'Κώστας Viewer',
      email: 'kostas@whiteblue.gr',
      phone: '+30 690 0000003',
      role: 'Viewer',
      isActive: true,
    },
    {
      id: 4,
      name: 'Παλιός Χρήστης',
      email: 'old@whiteblue.gr',
      phone: '+30 690 0000004',
      role: 'Manager',
      isActive: false,
    },
  ]

  const filteredUsers = users.filter(u =>
    activeTab === 'active' ? u.isActive : !u.isActive
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Χρήστες</h1>
            <p className="text-slate-600 mt-1">
              Διαχείριση προσωπικού και δικαιωμάτων πρόσβασης
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'active'
                    ? 'bg-white shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                Ενεργοί
              </button>
              <button
                onClick={() => setActiveTab('inactive')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'inactive'
                    ? 'bg-white shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                Ανενεργοί
              </button>
            </div>
            <Link href="/settings/users/new">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg">
                + Νέος Χρήστης
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p className="col-span-full text-center text-slate-500 py-12">
            Κανένας χρήστης
          </p>
        ) : (
          filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{user.name}</h3>
                    <p className="text-sm text-slate-600">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.isActive ? (
                    <ToggleLeft className="w-6 h-6 text-green-600" />
                  ) : (
                    <ToggleRight className="w-6 h-6 text-slate-400" />
                  )}
                  <span className="text-sm">
                    {user.isActive ? 'Ενεργός' : 'Ανενεργός'}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-500" />
                  <span>{user.phone}</span>
                </div>
              </div>
              <div className="mt-6">
                <Link href={`/settings/users/${user.id}`}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                    Επεξεργασία
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}