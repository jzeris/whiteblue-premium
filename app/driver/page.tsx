'use client'

import { useState } from 'react'
import {
  Home,
  Search,
  MessageSquare,
  Settings,
  Luggage,
  Headphones,
  Baby,
  Accessibility,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'

type JobStatus = 'pending' | 'upcoming' | 'inprogress' | 'picked_up' | 'en_route_dropoff' | 'completed'
type ActionStatus = 'accept' | 'started' | 'arrived' | 'picked_up' | 'completed' | 'delayed'

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
  b2bPartner?: string // για B2B μήνυμα
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
        b2bPartner: 'Grande Bretagne',
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
        b2bPartner: 'Blue Villas',
      },
    ],
    upcoming: [],
    inprogress: [],
    picked_up: [],
    en_route_dropoff: [],
    completed: [],
  })

  const currentJobs = jobs[activeTab]

  const sendNotification = (job: Job, action: string) => {
    const clientMsg = `Mock: Μήνυμα στον πελάτη ${job.client} για ${action} (#${job.id})`
    const b2bMsg = job.b2bPartner ? `Mock: Μήνυμα στον B2B ${job.b2bPartner} για ${action} (#${job.id})` : ''
    alert(clientMsg + (b2bMsg ? '\n' + b2bMsg : ''))
    console.log(clientMsg, b2bMsg)
  }

  const handleAction = (e: React.MouseEvent, jobId: string, action: ActionStatus) => {
    e.stopPropagation()
    e.preventDefault()
    if (offDuty) return

    setCountdownJobId(jobId)

    const timer = setTimeout(() => {
      setCountdownJobId(null)
      setJobs(prev => {
        const job = prev.pending.find(j => j.id === jobId) ||
                    prev.upcoming.find(j => j.id === jobId) ||
                    prev.inprogress.find(j => j.id === jobId) ||
                    prev.picked_up.find(j => j.id === jobId) ||
                    prev.en_route_dropoff.find(j => j.id === jobId)

        if (!job) return prev

        const clean = (list: Job[]) => list.filter(j => j.id !== jobId)

        let updated: Record<JobStatus, Job[]> = {
          pending: clean(prev.pending),
          upcoming: clean(prev.upcoming),
          inprogress: clean(prev.inprogress),
          picked_up: clean(prev.picked_up),
          en_route_dropoff: clean(prev.en_route_dropoff),
          completed: clean(prev.completed),
        }

        let nextStatus: JobStatus | null = null
        let message = ''

        switch (action) {
          case 'accept':
            nextStatus = 'upcoming'
            message = 'Accept'
            break
          case 'started':
            nextStatus = 'inprogress'
            message = 'Ξεκίνησα'
            break
          case 'arrived':
            nextStatus = 'picked_up'
            message = 'Έφτασα στο PU'
            break
          case 'picked_up':
            nextStatus = 'en_route_dropoff'
            message = 'Παρέλαβα τον πελάτη'
            break
          case 'completed':
            nextStatus = 'completed'
            message = 'Ολοκλήρωσα'
            break
          case 'delayed':
            message = 'Καθυστέρησα'
            break
        }

        if (nextStatus) {
          updated[nextStatus].push(job)
        }

        if (message) sendNotification(job, message)

        return updated
      })
    }, 3000)

    return () => clearTimeout(timer)
  }

  const cancelCountdown = () => {
    setCountdownJobId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            Y
          </div>
          <div>
            <p className="font-medium">Hi, Γιάννης Ζέρης!</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">OFF DUTY</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!offDuty}
              onChange={() => setOffDuty(!offDuty)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </header>

      {/* Tabs – 5 tabs τώρα */}
      <div className="flex border-b bg-white overflow-x-auto">
        {(['pending', 'upcoming', 'inprogress', 'picked_up', 'completed'] as JobStatus[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[100px] py-3.5 text-sm font-medium text-center transition-colors ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab === 'picked_up' ? 'PICKED UP' : tab === 'completed' ? 'COMPLETED' : tab.toUpperCase()}
            {tab === 'pending' && jobs.pending.length > 0 && (
              <span className="ml-1.5 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {jobs.pending.length}
              </span>
            )}
            {tab === 'completed' && jobs.completed.length > 0 && (
              <span className="ml-1.5 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                {jobs.completed.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {currentJobs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <div className="w-28 h-28 mb-6 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" stroke="#d1d5db" strokeWidth="6" fill="none" />
                <path d="M50 30 L50 50 L65 65" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" fill="none" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-gray-400">
                E
              </div>
            </div>
            <p className="text-lg font-medium">No trips in this category.</p>
          </div>
        ) : (
          currentJobs.map(job => (
            <Link key={job.id} href={`/driver/job/${job.id}`} className="block mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow transition-shadow">
                <div className="bg-blue-900 text-white p-5">
                  <p className="text-2xl font-bold">{job.time} • {job.day}</p>
                  <p className="text-lg mt-1">{job.client}</p>
                  <p className="text-sm mt-2 opacity-90">#{job.id}</p>
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-2 text-gray-700">
                    <p><strong>PU:</strong> {job.pickup}</p>
                    <p><strong>DO:</strong> {job.dropoff}</p>
                  </div>

                  {job.extras.length > 0 && (
                    <div className="flex justify-center gap-8 text-gray-500 py-3">
                      {job.extras.includes('luggage') && <Luggage className="w-8 h-8" />}
                      {job.extras.includes('headphones') && <Headphones className="w-8 h-8" />}
                      {job.extras.includes('baby') && <Baby className="w-8 h-8" />}
                      {job.extras.includes('wheelchair') && <Accessibility className="w-8 h-8" />}
                    </div>
                  )}

                  {/* Κουμπιά ανάλογα με tab */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    {activeTab === 'pending' && (
                      <button
                        disabled={countdownJobId === job.id}
                        onClick={(e) => handleAction(e, job.id, 'accept')}
                        className={`flex-1 min-w-[120px] py-5 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3 shadow-sm
                          ${countdownJobId === job.id ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
                      >
                        {countdownJobId === job.id ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            3...
                          </>
                        ) : (
                          'ACCEPT'
                        )}
                      </button>
                    )}

                    {activeTab === 'upcoming' && (
                      <>
                        <button
                          disabled={countdownJobId === job.id}
                          onClick={(e) => handleAction(e, job.id, 'started')}
                          className={`flex-1 min-w-[120px] py-5 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3 shadow-sm
                            ${countdownJobId === job.id ? 'bg-green-400 cursor-wait' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
                        >
                          {countdownJobId === job.id ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              3...
                            </>
                          ) : (
                            'ΞΕΚΙΝΗΣΑ'
                          )}
                        </button>

                        <button
                          disabled={countdownJobId === job.id}
                          onClick={(e) => handleAction(e, job.id, 'delayed')}
                          className="flex-1 min-w-[120px] bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-sm"
                        >
                          ΚΑΘΥΣΤΕΡΩ
                        </button>
                      </>
                    )}

                    {activeTab === 'inprogress' && (
                      <>
                        <button
                          disabled={countdownJobId === job.id}
                          onClick={(e) => handleAction(e, job.id, 'arrived')}
                          className={`flex-1 min-w-[120px] py-5 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3 shadow-sm
                            ${countdownJobId === job.id ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}`}
                        >
                          {countdownJobId === job.id ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              3...
                            </>
                          ) : (
                            'ΈΦΤΑΣΑ'
                          )}
                        </button>

                        <button
                          disabled={countdownJobId === job.id}
                          onClick={(e) => handleAction(e, job.id, 'delayed')}
                          className="flex-1 min-w-[120px] bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-sm"
                        >
                          ΚΑΘΥΣΤΕΡΩ
                        </button>
                      </>
                    )}

                    {activeTab === 'picked_up' && (
                      <>
                        <button
                          disabled={countdownJobId === job.id}
                          onClick={(e) => handleAction(e, job.id, 'picked_up')}
                          className={`flex-1 min-w-[120px] py-5 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3 shadow-sm
                            ${countdownJobId === job.id ? 'bg-teal-400 cursor-wait' : 'bg-teal-600 hover:bg-teal-700 active:scale-95'}`}
                        >
                          {countdownJobId === job.id ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              3...
                            </>
                          ) : (
                            'ΠΑΡΕΛΑΒΑ'
                          )}
                        </button>

                        <button
                          disabled={countdownJobId === job.id}
                          onClick={(e) => handleAction(e, job.id, 'delayed')}
                          className="flex-1 min-w-[120px] bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-sm"
                        >
                          ΚΑΘΥΣΤΕΡΩ
                        </button>
                      </>
                    )}

                    {activeTab === 'en_route_dropoff' && (
                      <>
                        <button
                          disabled={countdownJobId === job.id}
                          onClick={(e) => handleAction(e, job.id, 'completed')}
                          className={`flex-1 min-w-[120px] py-5 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-3 shadow-sm
                            ${countdownJobId === job.id ? 'bg-purple-400 cursor-wait' : 'bg-purple-600 hover:bg-purple-700 active:scale-95'}`}
                        >
                          {countdownJobId === job.id ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              3...
                            </>
                          ) : (
                            'ΟΛΟΚΛΗΡΩΣΑ'
                          )}
                        </button>

                        <button
                          disabled={countdownJobId === job.id}
                          onClick={(e) => handleAction(e, job.id, 'delayed')}
                          className="flex-1 min-w-[120px] bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-sm"
                        >
                          ΚΑΘΥΣΤΕΡΩ
                        </button>
                      </>
                    )}

                    {activeTab === 'completed' && (
                      <p className="text-center text-gray-500 w-full py-4 font-medium">Ολοκληρώθηκε</p>
                    )}
                  </div>

                  {countdownJobId === job.id && (
                    <button
                      onClick={cancelCountdown}
                      className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition"
                    >
                      ΑΚΥΡΩΣΗ
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 shadow-lg z-50">
        <Link href="/driver" className="text-blue-600 flex flex-col items-center">
          <Home className="w-7 h-7" />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>
        <Link href="#" className="text-gray-600 flex flex-col items-center">
          <Search className="w-7 h-7" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link href="#" className="text-gray-600 flex flex-col items-center relative">
          <MessageSquare className="w-7 h-7" />
          <span className="text-xs mt-1">Messages</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">2</span>
        </Link>
        <Link href="#" className="text-gray-600 flex flex-col items-center">
          <Settings className="w-7 h-7" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  )
}