'use client'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl w-full text-center">
        <div className="w-32 h-32 bg-blue-900 rounded-full mx-auto mb-8 flex items-center justify-center">
          <span className="text-white text-6xl font-bold">W</span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Καλώς όρισες, Γιάννη!
        </h1>
        <p className="text-2xl text-slate-600 mb-12">
          Είσαι συνδεδεμένος στο WhiteBlue Premium.
        </p>
        <p className="text-lg text-slate-500 mb-8">
          Το σύστημα δουλεύει τέλεια – τώρα θα προσθέσουμε sidebar, bookings, driver app κλπ.
        </p>
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg">
            Κρατήσεις
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg">
            Driver App
          </button>
        </div>
      </div>
    </div>
  )
}