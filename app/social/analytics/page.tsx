'use client'

import { TrendingUp, Eye, MessageCircle, Share2, Calendar } from 'lucide-react'

export default function SocialAnalytics() {
  const platformStats = [
    { platform: 'Facebook', reach: 12450, engagement: 15.2, conversions: 42 },
    { platform: 'Instagram', reach: 18920, engagement: 22.8, conversions: 68 },
    { platform: 'X (Twitter)', reach: 8420, engagement: 8.7, conversions: 12 },
    { platform: 'LinkedIn', reach: 5230, engagement: 18.4, conversions: 28 },
    { platform: 'TikTok', reach: 31200, engagement: 31.5, conversions: 95 },
  ]

  const topPosts = [
    { title: 'Sunset Tour Sounio', platform: 'Instagram', date: '02/01/2026', reach: 8420, engagement: 28.4 },
    { title: 'VIP Airport Transfer', platform: 'Facebook', date: '01/01/2026', reach: 6120, engagement: 21.2 },
    { title: 'Mykonos Early Booking', platform: 'TikTok', date: '30/12/2025', reach: 15200, engagement: 35.8 },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Social Media Analytics</h1>
        <p className="text-slate-600 mt-1">Αναλυτικά στατιστικά και performance</p>
      </div>

      {/* Summary Stats */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-blue-600" />
            <p className="text-slate-600">Συνολικό Reach</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">76.220</p>
          <p className="text-sm text-green-600 mt-2">+18% από προηγούμενο μήνα</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <p className="text-slate-600">Μέσο Engagement</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">19.4%</p>
          <p className="text-sm text-green-600 mt-2">+4.2% από προηγούμενο μήνα</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-purple-600" />
            <p className="text-slate-600">Conversions</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">245</p>
          <p className="text-sm text-green-600 mt-2">Νέες κρατήσεις από social</p>
        </div>
      </div>

      {/* Per Platform Stats */}
      <div className="px-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Performance ανά Πλατφόρμα</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Πλατφόρμα</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Reach</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Engagement</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Conversions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {platformStats.map((p) => (
                  <tr key={p.platform} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{p.platform}</td>
                    <td className="px-6 py-4 text-right">{p.reach.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">{p.engagement}%</td>
                    <td className="px-6 py-4 text-right font-bold text-green-600">{p.conversions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top Posts */}
      <div className="px-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Top Performing Posts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Post</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Πλατφόρμα</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Ημερομηνία</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Reach</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topPosts.map((p) => (
                  <tr key={p.title} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">{p.title}</td>
                    <td className="px-6 py-4">{p.platform}</td>
                    <td className="px-6 py-4">{p.date}</td>
                    <td className="px-6 py-4 text-right">{p.reach.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-600">{p.engagement}%</td>
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