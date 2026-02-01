'use client'

import { useState } from 'react'
import React from 'react' // ← ΑΥΤΟ λύνει το "React is not defined"
import { Calendar as CalendarIcon, Star, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'
import { el } from 'date-fns/locale'

// Mock data (θα έρχονται από βάση αργότερα)
const mockReviews = [
  { 
    id: 'R001', 
    bookingId: 'BK123', 
    date: new Date('2026-01-21T15:30:00'), 
    customer: 'John Doe', 
    rating: 5, 
    comment: 'Άψογος οδηγός, πολύ ευγενικός και ακριβής! Ήρθε στην ώρα του, το όχημα ήταν καθαρό και η διαδρομή άνετη. Θα ξανακλείσω σίγουρα!', 
    driver: 'Γιάννης Ζ',
    extras: 'Παιδικό κάθισμα, Πινακίδα με όνομα',
  },
  { 
    id: 'R002', 
    bookingId: 'BK124', 
    date: new Date('2026-01-22T12:00:00'), 
    customer: 'Maria K', 
    rating: 3, 
    comment: 'Καλή υπηρεσία αλλά καθυστέρησε 15 λεπτά λόγω κίνησης. Ο οδηγός ήταν ευγενικός αλλά μπορούσε να ενημερώσει για την καθυστέρηση. Το όχημα ήταν ΟΚ.', 
    driver: 'Πέτρος Κ',
    extras: 'Κανένα',
  },
  { 
    id: 'R003', 
    bookingId: 'BK125', 
    date: new Date('2026-01-22T19:15:00'), 
    customer: 'Alex P', 
    rating: 4, 
    comment: 'Πολύ καλή οδήγηση, καθαρό όχημα, αλλά η πινακίδα δεν είχε το όνομα μου όπως είχα ζητήσει. Η ώρα παραλαβής ήταν ακριβής.', 
    driver: 'Νίκος Π',
    extras: 'Ακουστικά',
  },
  { 
    id: 'R004', 
    bookingId: 'BK126', 
    date: new Date('2026-01-23T10:45:00'), 
    customer: 'Elena S', 
    rating: 2, 
    comment: 'Ο οδηγός ήταν αγενής και οδήγησε επικίνδυνα. Η καθυστέρηση ήταν μεγάλη και δεν υπήρχε ενημέρωση. Δεν θα ξαναχρησιμοποιήσω την υπηρεσία.', 
    driver: 'Παναγιώτης Β',
    extras: 'Κανένα',
  },
]

export default function ReviewsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [search, setSearch] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [expandedReview, setExpandedReview] = useState<string | null>(null)

  // Φίλτρα
  const filteredReviews = mockReviews.filter(r => {
    const matchesDate = r.date >= dateRange.from && r.date <= dateRange.to
    const matchesSearch = r.customer.toLowerCase().includes(search.toLowerCase()) || 
                          r.bookingId.toLowerCase().includes(search.toLowerCase()) || 
                          r.comment.toLowerCase().includes(search.toLowerCase())
    const matchesRating = ratingFilter === 'all' || r.rating === Number(ratingFilter)
    return matchesDate && matchesSearch && matchesRating
  })

  const toggleExpand = (id: string) => {
    setExpandedReview(expandedReview === id ? null : id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Reviews</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base">
          <Download className="w-4 h-4" />
          Εξαγωγή Excel
        </button>
      </div>

      {/* Φίλτρα & Ημερολόγιο */}
      <div className="flex flex-col gap-4">
        {/* Ημερολόγιο */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 whitespace-nowrap">Από:</label>
            <input
              type="date"
              value={format(dateRange.from, 'yyyy-MM-dd')}
              onChange={(e) => setDateRange({ ...dateRange, from: new Date(e.target.value) })}
              className="border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 whitespace-nowrap">Έως:</label>
            <input
              type="date"
              value={format(dateRange.to, 'yyyy-MM-dd')}
              onChange={(e) => setDateRange({ ...dateRange, to: new Date(e.target.value) })}
              className="border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Search & Rating Filter */}
        <div className="flex flex-wrap gap-4">
          <input
            placeholder="Αναζήτηση Πελάτη, ID ή Σχόλιο..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded px-4 py-2 flex-1 min-w-[200px] text-sm"
          />
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="border border-slate-300 rounded px-4 py-2 min-w-[160px] text-sm"
          >
            <option value="all">Όλα τα ratings</option>
            <option value="5">5 ★</option>
            <option value="4">4 ★</option>
            <option value="3">3 ★</option>
            <option value="2">2 ★</option>
            <option value="1">1 ★</option>
          </select>
        </div>
      </div>

      {/* Πίνακας Reviews – με expandable rows */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="py-4 px-4 font-semibold text-sm w-10"></th>
                <th className="py-4 px-4 font-semibold text-sm">ID Review</th>
                <th className="py-4 px-4 font-semibold text-sm">Κράτηση ID</th>
                <th className="py-4 px-4 font-semibold text-sm">Ημερομηνία</th>
                <th className="py-4 px-4 font-semibold text-sm">Πελάτης</th>
                <th className="py-4 px-4 font-semibold text-sm">Rating</th>
                <th className="py-4 px-4 font-semibold text-sm">Σχόλιο</th>
                <th className="py-4 px-4 font-semibold text-sm">Οδηγός</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-sm">
                    Δεν βρέθηκαν reviews για τις επιλεγμένες ημερομηνίες
                  </td>
                </tr>
              ) : (
                filteredReviews.map(r => (
                  <React.Fragment key={r.id}>
                    <tr
                      className="border-b hover:bg-slate-50 transition cursor-pointer"
                      onClick={() => toggleExpand(r.id)}
                    >
                      <td className="py-4 px-4">
                        {expandedReview === r.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium">{r.id}</td>
                      <td className="py-4 px-4 text-sm">{r.bookingId}</td>
                      <td className="py-4 px-4 text-sm">{format(r.date, "dd MMM yyyy HH:mm", { locale: el })}</td>
                      <td className="py-4 px-4 text-sm">{r.customer}</td>
                      <td className="py-4 px-4">
                        <div className="flex">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                          {[...Array(5 - r.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-gray-300" />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm max-w-xs truncate" title={r.comment}>
                        {r.comment}
                      </td>
                      <td className="py-4 px-4 text-sm">{r.driver}</td>
                    </tr>

                    {/* Expandable Row */}
                    {expandedReview === r.id && (
                      <tr>
                        <td colSpan={8} className="p-0">
                          <div className="bg-slate-50 p-6 border-t">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Πλήρες Σχόλιο */}
                              <div>
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                  <Star className="w-5 h-5 text-yellow-500" />
                                  Πλήρες Σχόλιο
                                </h3>
                                <div className="bg-white rounded-lg p-4 border shadow-sm">
                                  <p className="text-slate-800">{r.comment}</p>
                                  <p className="text-sm text-slate-500 mt-3">
                                    Rating: {r.rating} ★ • Πελάτης: {r.customer} • Οδηγός: {r.driver}
                                  </p>
                                </div>
                              </div>

                              {/* Στοιχεία Κράτησης */}
                              <div>
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                                  Στοιχεία Κράτησης
                                </h3>
                                <div className="bg-white rounded-lg p-4 border shadow-sm space-y-2 text-sm">
                                  <p><strong>ID Κράτησης:</strong> {r.bookingId}</p>
                                  <p><strong>Ημερομηνία:</strong> {format(r.date, "dd MMM yyyy HH:mm", { locale: el })}</p>
                                  <p><strong>Πελάτης:</strong> {r.customer}</p>
                                  <p><strong>Οδηγός:</strong> {r.driver}</p>
                                  <p><strong>Extras:</strong> {r.extras || 'Κανένα'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}