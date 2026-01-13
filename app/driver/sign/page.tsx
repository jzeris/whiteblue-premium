'use client'

export default function GreetingSign() {
  const client = {
    name: 'MR. JOHN DOE',
    message: 'Welcome to Athens'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      {/* Logo */}
      <div className="w-32 h-32 bg-blue-900 rounded-full mx-auto mb-12 flex items-center justify-center shadow-2xl">
        <span className="text-white text-6xl font-bold">W</span>
      </div>

      {/* Client Name */}
      <h1 className="text-7xl md:text-9xl font-black text-slate-900 mb-8 tracking-wider">
        {client.name}
      </h1>

      {/* Welcome Message */}
      <div className="bg-blue-50 px-12 py-6 rounded-2xl border border-blue-200">
        <p className="text-3xl font-bold text-blue-900 uppercase">
          {client.message}
        </p>
      </div>

      {/* Tap to close */}
      <p className="absolute bottom-12 text-slate-400 text-lg">
        Tap anywhere to close
      </p>
    </div>
  )
}