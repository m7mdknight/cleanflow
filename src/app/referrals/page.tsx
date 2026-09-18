'use client'

import { useState } from 'react'
import { Gift, Users, DollarSign, TrendingUp, Copy, Check, Plus, ExternalLink } from 'lucide-react'

interface Referral {
  id: string
  referrer: string
  referred_customer: string
  status: 'pending' | 'signed_up' | 'completed' | 'rewarded'
  reward_amount: number
  date: string
  completed_date?: string
}

const mockReferrals: Referral[] = [
  { id: '1', referrer: 'Sarah Johnson', referred_customer: 'Emily Chen', status: 'completed', reward_amount: 25, date: '2026-09-10', completed_date: '2026-09-15' },
  { id: '2', referrer: 'Sarah Johnson', referred_customer: 'Robert Kim', status: 'signed_up', reward_amount: 25, date: '2026-09-14' },
  { id: '3', referrer: 'Jennifer Walsh', referred_customer: 'Amanda Torres', status: 'completed', reward_amount: 25, date: '2026-09-05', completed_date: '2026-09-12' },
  { id: '4', referrer: 'Michael Chen', referred_customer: 'David Park', status: 'pending', reward_amount: 25, date: '2026-09-18' },
]

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals)
  const [copied, setCopied] = useState(false)

  const referralLink = 'https://cleanflow.io/ref/sarah-johnson'
  const totalRewards = referrals.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.reward_amount, 0)
  const pendingRewards = referrals.filter(r => r.status === 'signed_up' || r.status === 'pending').length

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Referral Program</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Reward customers for spreading the word</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} /> Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Referrals</p>
          <p className="text-2xl font-semibold">{referrals.length}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Rewards Paid</p>
          <p className="text-2xl font-semibold text-green-400">${totalRewards}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Pending Rewards</p>
          <p className="text-2xl font-semibold text-yellow-400">{pendingRewards}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Conversion Rate</p>
          <p className="text-2xl font-semibold">{referrals.length > 0 ? Math.round((referrals.filter(r => r.status === 'completed').length / referrals.length) * 100) : 0}%</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 mb-8">
        <h3 className="font-semibold mb-3">Your Referral Link</h3>
        <div className="flex gap-3">
          <code className="flex-1 px-4 py-3 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm font-mono text-[#a1a1aa]">
            {referralLink}
          </code>
          <button
            onClick={copyLink}
            className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${copied ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <p className="text-xs text-[#71717a] mt-2">Share this link with friends. You earn $25 for every customer who completes their first job!</p>
      </div>

      {/* How It Works */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-4">How It Works</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Share', desc: 'Send your referral link to friends' },
            { step: '2', title: 'Sign Up', desc: 'They create an account and book' },
            { step: '3', title: 'Complete', desc: 'They complete their first job' },
            { step: '4', title: 'Earn', desc: 'You both get $25 credit!' },
          ].map(item => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                {item.step}
              </div>
              <p className="text-sm font-medium mb-1">{item.title}</p>
              <p className="text-xs text-[#71717a]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[#27272a]">
          <h3 className="font-semibold">Recent Referrals</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#27272a] text-left">
              <th className="px-5 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Referrer</th>
              <th className="px-5 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Referred</th>
              <th className="px-5 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Reward</th>
              <th className="px-5 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map(ref => (
              <tr key={ref.id} className="border-b border-[#1e1e22] last:border-b-0">
                <td className="px-5 py-3 font-medium">{ref.referrer}</td>
                <td className="px-5 py-3 text-[#a1a1aa]">{ref.referred_customer}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 text-[10px] font-medium rounded capitalize ${
                    ref.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                    ref.status === 'signed_up' ? 'bg-blue-500/10 text-blue-400' :
                    ref.status === 'rewarded' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {ref.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium">${ref.reward_amount}</td>
                <td className="px-5 py-3 text-[#71717a]">{new Date(ref.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
