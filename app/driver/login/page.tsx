'use client'

import { useState } from 'react'
import { User, Lock, Car, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DriverLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Mock login – αργότερα θα γίνει Supabase auth
    try {
      // Προσομοίωση καθυστέρησης δικτύου (0.8–1.5 sec)
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))

      if (username.trim() && password.trim()) {
        // Mock successful
        console.log('Login successful for:', username)
        
        // Προαιρετικό: Αποθήκευση token/session (localStorage ή cookies αργότερα)
        localStorage.setItem('driverLoggedIn', 'true') // mock session

        router.push('/driver') // redirect στο Driver Dashboard
      } else {
        setError('Συμπληρώστε username και password')
      }
    } catch (err) {
      setError('Κάτι πήγε στραβά. Δοκιμάστε ξανά.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md">
        {/* Logo & Τίτλος */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Car className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Driver App</h1>
          <p className="text-slate-600 mt-2">Σύνδεση οδηγού</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"
            >
              <User className="w-5 h-5 text-slate-500" />
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nikos_p"
              autoComplete="username"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"
            >
              <Lock className="w-5 h-5 text-slate-500" />
              Κωδικός
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2
              ${isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-100'}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Σύνδεση...
              </>
            ) : (
              'Σύνδεση'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            WhiteBlue Premium © {new Date().getFullYear()}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Μην μοιράζεστε τα στοιχεία σας
          </p>
        </div>
      </div>
    </div>
  )
}