'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function B2BLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = () => {
    // Mock login – αρκεί να πατήσει οτιδήποτε
    if (username && password) {
      localStorage.setItem('b2b_logged_in', 'true')
      localStorage.setItem('b2b_username', username)
      router.push('/b2b/dashboard')
    } else {
      setError('Βάλε username & password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">B2B Portal</h1>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-3 mb-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 mb-6 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Είσοδος
        </button>
      </div>
    </div>
  )
}