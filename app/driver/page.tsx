'use client'

import { useState } from 'react'
import {
  Home,
  Search,
  MessageSquare,
  Settings,
  User,
  Luggage,
  Headphones,
  Baby,
  Accessibility,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'

type JobStatus = 'pending' | 'upcoming' | 'inprogress'
type ActionStatus = 'started' | 'delayed'
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
  const [countdownJobId, setCountdownJobId] = useState<string | null>(null) // για countdown στο ΞΕΚΙΝΗΣΑ

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

    // Countdown μόνο για "started"
    if (action === 'started') {
      setCountdownJobId(jobId)
      const timer = setTimeout(() => {
        setCountdownJobId(null)
        performStatusChange(jobId, action)
      }, 3000) // 3 δευτερόλεπτα

      return () => clearTimeout(timer)
    }

    // Κανονική αλλαγή για delayed
    performStatusChange(jobId, action)
  }

  const performStatusChange = (jobId: string, action: ActionStatus) => {
    setJobs(prev => {
      const job = prev.pending.find(j => j.id === jobId) || 
                  prev.upcoming.find(j => j.id === jobId) || 
                  prev.inprogress.find(j => j.id === jobId)

      if (!job) return prev

      const clean = (list: Job[]) => list.filter(j => j.id !== jobId)

      let updated = {
        pending: clean(prev.pending),
        upcoming: clean(prev.upcoming),
        inprogress: clean(prev.inprogress),
      }

      let message = ''
      if (action === 'started') {
        updated.inprogress.push(job)
        message = `Γεια σας ${job.client},\n\nΟ οδηγός σας ${job.driverName} ξεκίνησε.\nΠινακίδες: ${job.vehiclePlates}\nLive tracking: ${job.liveLink}`
      } else if (action === 'delayed') {
        message = `Αγαπητέ/ή ${job.client},\n\nΜικρή καθυστέρηση. ETA: ${job.eta}\nLive tracking: ${job.liveLink}`
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
      <div className="border-b px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="text-white" />
          </div>
          <p className="text-sm text-slate-600">Hi, Γιάννης Ζέρης</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">OFF DUTY</span>
          <button
            onClick={() => setOffDuty(!offDuty)}
            className={`w-12 h-6 rounded-full transition-colors ${offDuty ? 'bg-slate-300' : 'bg-blue-600'}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
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
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                {jobs.pending.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="p-4 space-y-6">
        {currentJobs.length === 0 && (
          <p className="text-center text-slate-500 py-10">Καμία κράτηση αυτή τη στιγμή</p>
        )}

        {currentJobs.map(job => (
          <Link key={job.id} href={`/driver/job/${job.id}`} className="block">
            <div className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-blue-900 text-white p-4">
                <p className="text-xl font-bold">
                  {job.time} • {job.day}
                </p>
                <p className="mt-1 font-medium">{job.client}</p>
                <p className="text-sm mt-1 opacity-90">#{job.id}</p>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <p><strong>PU:</strong> {job.pickup}</p>
                  <p><strong>DO:</strong> {job.dropoff}</p>
                </div>

                {job.extras.length > 0 && (
                  <div className="flex justify-center gap-6 text-slate-500">
                    {job.extras.includes('luggage') && <Luggage className="w-6 h-6" />}
                    {job.extras.includes('headphones') && <Headphones className="w-6 h-6" />}
                    {job.extras.includes('baby') && <Baby className="w-6 h-6" />}
                    {job.extras.includes('wheelchair') && <Accessibility className="w-6 h-6" />}
                  </div>
                )}

                {/* Κουμπιά – ΜΟΝΟ 2 τώρα */}
                <div className="mt-6 flex gap-3">
                  <button
                    disabled={offDuty || countdownJobId === job.id}
                    onClick={(e) => handleStatusChange(e, job.id, 'started')}
                    className={`flex-1 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                      ${countdownJobId === job.id 
                        ? 'bg-green-400 cursor-wait' 
                        : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
                  >
                    {countdownJobId === job.id ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        3...
                      </>
                    ) : (
                      'ΞΕΚΙΝΗΣΑ'
                    )}
                  </button>

                  <button
                    disabled={offDuty}
                    onClick={(e) => handleStatusChange(e, job.id, 'delayed')}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all active:scale-95"
                  >
                    ΚΑΘΥΣΤΕΡΩ
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 shadow-lg">
        <Link href="/driver" className="text-blue-600">
          <Home className="w-7 h-7" />
        </Link>
        <Link href="#" className="text-slate-500">
          <Search className="w-7 h-7" />
        </Link>
        <Link href="#" className="text-slate-500">
          <MessageSquare className="w-7 h-7" />
        </Link>
        <Link href="#" className="text-slate-500">
          <Settings className="w-7 h-7" />
        </Link>
      </div>
    </div>
  )
}