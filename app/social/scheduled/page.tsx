'use client'

import { Calendar, Edit, Trash2, Clock, Image, Film } from 'lucide-react'

export default function ScheduledPosts() {
  const scheduled = [
    { id: 1, platform: 'Facebook', date: '06/01/2026 10:00', content: 'Χειμερινές προσφορές - έως 30% έκπτωση!', media: 'image' },
    { id: 2, platform: 'Instagram', date: '06/01/2026 18:00', content: 'Sunset tour στο Σούνιο – μαγεία!', media: 'video' },
    { id: 3, platform: 'LinkedIn', date: '07/01/2026 09:00', content: 'Νέες VIP υπηρεσίες για corporate clients', media: 'none' },
    { id: 4, platform: 'TikTok', date: '07/01/2026 20:00', content: 'Behind the scenes – Mercedes V-Class', media: 'video' },
  ]

  const getMediaIcon = (media: string) => {
    if (media === 'image') return <Image className="w-5 h-5 text-blue-600" />
    if (media === 'video') return <Film className="w-5 h-5 text-purple-600" />
    return <span className="text-slate-400 text-sm">—</span>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Προγραμματισμένα Posts</h1>
        <p className="text-slate-600 mt-1">Διαχείριση και επεξεργασία προγραμματισμένων δημοσιεύσεων</p>
      </div>

      {/* List */}
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Πλατφόρμα</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Περιεχόμενο</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Ημερομηνία & Ώρα</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Media</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Ενέργειες</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scheduled.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{p.platform}</td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-slate-700">{p.content}</p>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      {p.date}
                    </td>
                    <td className="px-6 py-4">
                      {getMediaIcon(p.media)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-lg mr-2">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}