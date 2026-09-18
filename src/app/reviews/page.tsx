'use client'

import { useState } from 'react'
import { Star, Plus, ExternalLink, TrendingUp, MessageSquare, Check, X, Settings } from 'lucide-react'

interface Review {
  id: string
  customer: string
  rating: number
  comment: string
  date: string
  source: 'google' | 'direct' | 'email'
  response?: string
  status: 'published' | 'pending' | 'flagged'
}

const mockReviews: Review[] = [
  { id: '1', customer: 'Sarah Johnson', rating: 5, comment: 'Maria did an amazing job! The house has never been so clean. Very thorough and professional.', date: '2026-09-18', source: 'google', status: 'published' },
  { id: '2', customer: 'TechStart Inc.', rating: 4, comment: 'Great work on our office. Only minor issue was they arrived 15 minutes late, but the quality was excellent.', date: '2026-09-15', source: 'direct', response: 'Thank you for the feedback! We\'re working on our punctuality. Hope to see you again!', status: 'published' },
  { id: '3', customer: 'Michael Chen', rating: 5, comment: 'Very detail-oriented. They remembered my allergy concerns and used only green products. Highly recommend!', date: '2026-09-12', source: 'email', status: 'published' },
  { id: '4', customer: 'Anonymous', rating: 1, comment: 'Disappointed with the service. Areas were missed and communication was poor.', date: '2026-09-10', source: 'google', status: 'flagged' },
  { id: '5', customer: 'Jennifer Walsh', rating: 5, comment: 'Best cleaning service I\'ve ever used. Consistent quality every time.', date: '2026-09-08', source: 'direct', status: 'published' },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [showSettings, setShowSettings] = useState(false)

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  const fiveStarCount = reviews.filter(r => r.rating === 5).length
  const responseRate = Math.round((reviews.filter(r => r.response).length / reviews.length) * 100)

  const handleRespond = (id: string, response: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, response } : r))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Review Generation</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Monitor and generate Google reviews</p>
        </div>
        <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-4 py-2 bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-sm font-medium rounded-lg transition-colors">
          <Settings size={16} /> Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Average Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold">{avgRating}</p>
            <Star size={16} className="text-yellow-400" fill="currentColor" />
          </div>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">5-Star Reviews</p>
          <p className="text-2xl font-semibold">{fiveStarCount}/{reviews.length}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Response Rate</p>
          <p className="text-2xl font-semibold">{responseRate}%</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Pending Requests</p>
          <p className="text-2xl font-semibold">3</p>
        </div>
      </div>

      {/* Google Reviews CTA */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-5 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Boost Your Google Reviews</h3>
            <p className="text-sm text-[#a1a1aa]">Automatically request reviews from satisfied customers. Average businesses see 2.5x more reviews.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
            <ExternalLink size={16} /> Setup Automation
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className={`bg-[#111113] border rounded-lg p-5 ${review.status === 'flagged' ? 'border-red-500/30' : 'border-[#27272a]'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{review.customer}</span>
                  <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded capitalize ${
                    review.source === 'google' ? 'bg-blue-500/10 text-blue-400' :
                    review.source === 'direct' ? 'bg-green-500/10 text-green-400' :
                    'bg-purple-500/10 text-purple-400'
                  }`}>{review.source}</span>
                  {review.status === 'flagged' && <span className="px-1.5 py-0.5 text-[10px] font-medium bg-red-500/10 text-red-400 rounded">FLAGGED</span>}
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400' : 'text-[#27272a]'} fill={i < review.rating ? 'currentColor' : 'none'} />
                  ))}
                  <span className="text-xs text-[#71717a] ml-2">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              {review.rating >= 4 && (
                <button className="px-3 py-1.5 text-xs font-medium bg-[#18181b] border border-[#27272a] hover:border-blue-500/50 hover:text-blue-400 rounded-lg transition-colors">
                  Request Google Share
                </button>
              )}
            </div>
            <p className="text-sm text-[#a1a1aa] mb-3">{review.comment}</p>
            {review.response ? (
              <div className="pl-4 border-l-2 border-blue-500/30">
                <p className="text-xs text-[#71717a] mb-1 font-semibold">Your Response:</p>
                <p className="text-sm text-[#a1a1aa]">{review.response}</p>
              </div>
            ) : (
              <button onClick={() => handleRespond(review.id, 'Thank you for your feedback! We appreciate your business.')} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                + Add Response
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
