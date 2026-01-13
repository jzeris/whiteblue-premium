'use client'

import { useState } from 'react'
import {
  Home,
  Search,
  MessageSquare,
  Settings,
  User,               // ← Προστέθηκε εδώ
  Luggage,
  Headphones,
  Baby,
  Accessibility,
} from 'lucide-react'
import Link from 'next/link'

type JobStatus = 'pending' | 'upcoming' | 'inprogress'
type ActionStatus = 'started' | 'delayed' | 'completed'
type Extra = 'luggage' | 'headphones' | 'baby' | 'wheelchair'

interface Job {
  id: string
  time: string
  day: string
  client: string
  pickup: string
  dropoff: string
  extras: Extra[]
  driverName: string
  vehiclePlates: string
  liveLink: string
  eta: string
  reviewLink: string
}

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState<JobStatus>('pending')
  const [offDuty, setOffDuty] = useState(false)

  const [jobs, setJobs] = useState<Record<JobStatus, Job[]>>({
    pending: [
      {
        id: '19074',
        time: '10:30',
        day: 'Πέμπτη, 8 Ιαν',
        client: 'Marcus Kantowski',
        pickup: '1 Κεκροπος, Athina',
        dropoff: 'ATH, Eleftherios Venizelos International Airport',
        extras: ['luggage', 'headphones', 'baby', 'wheelchair'],
        driverName: 'Νίκος Παπαδόπουλος',
        vehiclePlates: 'IKA-1234',
        liveLink: 'https://maps.google.com/track/123',
        eta: '15 λεπτά',
        reviewLink: 'https://review.whiteblue.xyz/19074',
      },
      {
        id: '19075',
        time: '14:00',
        day: 'Πέμπτη, 8 Ιαν',
        client: 'John Doe',
        pickup: 'Hotel Grande Bretagne',
        dropoff: 'Mykonos Port',
        extras: ['luggage'],
        driverName: 'Πέτρος Κωνσταντίνου',
        vehiclePlates: 'MYK-9012',
        liveLink: 'https://maps.google.com/track/456',
        eta: '20 λεπτά',
        reviewLink: 'https://review.whiteblue.xyz/19075',
      },
    ],
    upcoming: [],
    inprogress: [],
  })

  const currentJobs = jobs[activeTab]

  const handleStatusChange = (e: React.MouseEvent, jobId: string, action: ActionStatus) => {
    e.stopPropagation()
    e.preventDefault()

    if (offDuty) return

    setJobs(prev => {
      const job =
        prev.pending.find(j => j.id === jobId) ||
        prev.upcoming.find(j => j.id === jobId) ||
        prev.inprogress.find(j => j.id === jobId)

      if (!job) return prev

      const clean = (list: Job[]) => list.filter(j => j.id !== jobId)

      let updated = {
        pending: clean(prev.pending),
        upcoming: clean(prev.upcoming),
        inprogress: clean(prev.inprogress),
      }

      if (action === 'started') {
        updated.inprogress.push(job)
      }

      let message = ''
      switch (action) {
        case 'started':
          message = `Γεια σας ${job.client},\n\nΟ οδηγός σας ${job.driverName} ξεκίνησε.\nΠινακίδες: ${job.vehiclePlates}\nLive tracking: ${job.liveLink}`
          break
        case 'delayed':
          message = `Αγαπητέ/ή ${job.client},\n\nΜικρή καθυστέρηση. ETA: ${job.eta}\nLive tracking: ${job.liveLink}`
          break
        case 'completed':
          message = `Η διαδρομή ολοκληρώθηκε! Ευχαριστούμε!\nReview: ${job.reviewLink}`
          break
      }

      if (message) {
        console.log(`Mock: Εστάλη ειδοποίηση:\n${message}`)
        alert(`Mock: Εστάλη ειδοποίηση:\n${message}`)
      }

      return updated
    })
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="border-b px-4 py-3 flex justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="text-white" />
          </div>
          <p className="text-sm text-slate-600">Hi, Γιάννης Ζέρης</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">OFF DUTY</span>
          <button
            onClick={() => setOffDuty(!offDuty)}
            className={`w-12 h-6 rounded-full ${offDuty ? 'bg-slate-300' : 'bg-blue-600'}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                offDuty ? 'translate-x-1' : 'translate-x-6'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {(['pending', 'upcoming', 'inprogress'] as JobStatus[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'
            }`}
          >
            {tab.toUpperCase()}
            {tab === 'pending' && jobs.pending.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2">
                {jobs.pending.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Jobs – ΚΛΙΚΑΜΠΛ κάρτα */}
      <div className="p-4 space-y-8">
        {currentJobs.length === 0 && (
          <p className="text-center text-slate-500">Καμία κράτηση</p>
        )}

        {currentJobs.map(job => (
          <Link key={job.id} href={`/driver/job/${job.id}`} className="block">
            <div className="border-4 border-blue-900 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
              <div className="bg-blue-900 text-white p-4">
                <p className="text-xl font-bold">
                  {job.time}, {job.day}
                </p>
                <p className="mt-1">{job.client}</p>
                <p className="text-sm mt-1">#{job.id}</p>
              </div>

              <div className="p-4 space-y-4">
                <p><strong>PU:</strong> {job.pickup}</p>
                <p><strong>DO:</strong> {job.dropoff}</p>

                <div className="flex justify-center gap-4 text-slate-400">
                  {job.extras.includes('luggage') && <Luggage />}
                  {job.extras.includes('headphones') && <Headphones />}
                  {job.extras.includes('baby') && <Baby />}
                  {job.extras.includes('wheelchair') && <Accessibility />}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    disabled={offDuty}
                    onClick={(e) => handleStatusChange(e, job.id, 'started')}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg disabled:opacity-40"
                  >
                    ΞΕΚΙΝΗΣΑ
                  </button>
                  <button
                    disabled={offDuty}
                    onClick={(e) => handleStatusChange(e, job.id, 'delayed')}
                    className="flex-1 bg-yellow-600 text-white py-3 rounded-lg disabled:opacity-40"
                  >
                    ΚΑΘΥΣΤΕΡΩ
                  </button>
                  <button
                    disabled={offDuty}
                    onClick={(e) => handleStatusChange(e, job.id, 'completed')}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg disabled:opacity-40"
                  >
                    ΟΛΟΚΛΗΡΩΣΑ
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <Home className="text-blue-600" />
        <Search className="text-slate-500" />
        <MessageSquare className="text-slate-500" />
        <Settings className="text-slate-500" />
      </div>
    </div>
  )
}