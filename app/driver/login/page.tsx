'use client'

import { useState } from 'react'
import { User, Lock, Car } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DriverLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Mock login – real θα ελέγχει Supabase
    if (username && password) {
      // Mock successful login
      console.log('Login successful for', username)
      router.push('/driver') // redirect στο dashboard
    } else {
      setError('Συμπληρώστε username και password')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Driver App</h1>
          <p className="text-slate-600 mt-2">Σύνδεση οδηγού</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <User className="w-5 h-5" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nikos_p"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            Σύνδεση
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-8">
          WhiteBlue Premium © 2026
        </p>
      </div>
    </div>
  )
}