'use client'

import { useState } from 'react'
import {
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
  const [countdownJobId, setCountdownJobId] = useState<string | null>(null)

  const [jobs, setJobs] = useState<Record<JobStatus, Job[]>>({
    pending: [
      {
        id: '19074',
        time: '10:30',
        day: 'Πέμπτη, 8 Ιαν',
        client: 'Marcus Kantowski',
        pickup: '1 Κεκροπος, Athina',
        dropoff: 'ATH Airport',
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

    if (action === 'started') {
      setCountdownJobId(jobId)
      const timer = setTimeout(() => {
        setCountdownJobId(null)
        setJobs(prev => {
          const job = prev.pending.find(j => j.id === jobId) || prev.inprogress.find(j => j.id === jobId)
          if (!job) return prev
          const clean = (list: Job[]) => list.filter(j => j.id !== jobId)
          return {
            ...prev,
            pending: clean(prev.pending),
            inprogress: [...prev.inprogress, job],
          }
        })
        alert(`Ξεκίνησα για ${jobId}`)
      }, 3000)
      return () => clearTimeout(timer)
    }

    // Delay χωρίς αλλαγή tab
    alert(`Καθυστέρησα για ${jobId}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Απλό Header – ΧΩΡΙΣ sidebar */}
      <header className="bg-white border-b px-4 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div>
            <p className="font-medium">Hi, Γιάννης</p>
            <p className="text-sm text-slate-500">Driver App</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600">OFF DUTY</span>
          <button
            onClick={() => setOffDuty(!offDuty)}
            className={`w-12 h-6 rounded-full transition-colors ${offDuty ? 'bg-slate-300' : 'bg-green-600'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${offDuty ? 'translate-x-1' : 'translate-x-6'}`} />
          </button>
        </div>
      </header>

      {/* Tabs – απλά & καθαρά */}
      <div className="flex border-b bg-white">
        {(['pending', 'upcoming', 'inprogress'] as JobStatus[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === tab 
                ? 'text-blue-600 border-b-4 border-blue-600' 
                : 'text-slate-500'
            }`}
          >
            {tab.toUpperCase()}
            {tab === 'pending' && jobs.pending.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {jobs.pending.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Jobs List – μεγάλα cards, focus στα κουμπιά */}
      <div className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
        {currentJobs.length === 0 ? (
          <p className="text-center text-slate-500 py-12">Καμία κράτηση αυτή τη στιγμή</p>
        ) : (
          currentJobs.map(job => (
            <Link key={job.id} href={`/driver/job/${job.id}`} className="block">
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
                {/* Job Header */}
                <div className="bg-blue-900 text-white p-5">
                  <p className="text-2xl font-bold">{job.time} • {job.day}</p>
                  <p className="text-lg mt-1">{job.client}</p>
                  <p className="text-sm mt-2 opacity-90">#{job.id}</p>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div className="space-y-2 text-slate-700">
                    <p><strong>PU:</strong> {job.pickup}</p>
                    <p><strong>DO:</strong> {job.dropoff}</p>
                  </div>

                  {job.extras.length > 0 && (
                    <div className="flex justify-center gap-8 text-slate-500 py-2">
                      {job.extras.includes('luggage') && <Luggage className="w-8 h-8" />}
                      {job.extras.includes('headphones') && <Headphones className="w-8 h-8" />}
                      {job.extras.includes('baby') && <Baby className="w-8 h-8" />}
                      {job.extras.includes('wheelchair') && <Accessibility className="w-8 h-8" />}
                    </div>
                  )}

                  {/* Κουμπιά – ΜΟΝΟ 2, μεγάλα, κολλημένα κάτω */}
                  <div className="flex gap-4 mt-6">
                    <button
                      disabled={offDuty || countdownJobId === job.id}
                      onClick={(e) => handleStatusChange(e, job.id, 'started')}
                      className={`flex-1 py-5 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3
                        ${countdownJobId === job.id 
                          ? 'bg-green-400 cursor-wait' 
                          : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
                    >
                      {countdownJobId === job.id ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          {countdownJobId === job.id ? countdownJobId : '3...'} 
                        </>
                      ) : (
                        'ΞΕΚΙΝΗΣΑ'
                      )}
                    </button>

                    <button
                      disabled={offDuty}
                      onClick={(e) => handleStatusChange(e, job.id, 'delayed')}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-xl font-bold text-lg transition-all active:scale-95"
                    >
                      ΚΑΘΥΣΤΕΡΩ
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Bottom Nav – ΚΡΥΜΜΕΝΗ στο Driver Dashboard (δεν χρειάζεται εδώ) */}
      {/* Αν θες να την κρατήσεις, βάλε την fixed bottom, αλλά τώρα την αφήνουμε κενή για καθαρότητα */}
    </div>
  )
}