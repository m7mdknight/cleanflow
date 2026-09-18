'use client'

import { useState } from 'react'
import { Smartphone, Calendar, ClipboardCheck, Clock, MapPin, User, MessageSquare, Camera, Check, Play, Square, Phone } from 'lucide-react'

interface MobileJob {
  id: string
  customer: string
  address: string
  service: string
  time: string
  status: 'upcoming' | 'in-progress' | 'completed'
  checklist_items: number
  checklist_done: number
  notes: string
  phone: string
}

const mockMobileJobs: MobileJob[] = [
  { id: '1', customer: 'Sarah Johnson', address: '123 Oak Street, Springfield', service: 'Deep Clean', time: '09:00', status: 'in-progress', checklist_items: 12, checklist_done: 8, notes: 'Use eco-friendly products. Dog in house.', phone: '+1 555-0123' },
  { id: '2', customer: 'Michael Chen', address: '789 Pine Ave, Seattle', service: 'Regular Clean', time: '14:00', status: 'upcoming', checklist_items: 8, checklist_done: 0, notes: 'Allergic to bleach.', phone: '+1 555-0789' },
  { id: '3', customer: 'TechStart Inc.', address: '456 Innovation Blvd, Suite 200', service: 'Office Clean', time: '18:00', status: 'upcoming', checklist_items: 6, checklist_done: 0, notes: 'Access code: 4521. All 3 floors.', phone: '+1 555-0456' },
]

export default function MobilePage() {
  const [jobs, setJobs] = useState<MobileJob[]>(mockMobileJobs)
  const [selectedJob, setSelectedJob] = useState<MobileJob | null>(null)
  const [clockedIn, setClockedIn] = useState(false)
  const [timer, setTimer] = useState(0)

  const toggleTimer = () => {
    setClockedIn(!clockedIn)
    if (!clockedIn) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
      // Store interval ID for cleanup
      ;(window as any).__timerInterval = interval
    } else {
      clearInterval((window as any).__timerInterval)
    }
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mobile App (v1)</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Cleaner-facing mobile experience</p>
        </div>
        <span className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-lg">
          v1 Preview
        </span>
      </div>

      {/* Mobile Preview Container */}
      <div className="max-w-sm mx-auto">
        {/* Phone Frame */}
        <div className="bg-[#111113] border-4 border-[#27272a] rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* Status Bar */}
          <div className="bg-[#0a0a0b] px-6 py-3 flex items-center justify-between text-xs text-[#71717a]">
            <span>9:41</span>
            <div className="w-20 h-5 bg-[#18181b] rounded-full" />
            <span>100%</span>
          </div>

          {/* App Header */}
          <div className="bg-[#0a0a0b] border-b border-[#27272a] px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
                <span className="font-semibold text-sm">CleanFlow</span>
              </div>
              <button className="relative p-1.5 hover:bg-[#18181b] rounded-full transition-colors">
                <MessageSquare size={18} className="text-[#71717a]" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
              </button>
            </div>
            <p className="text-xs text-[#71717a]">Thursday, Sep 18</p>
          </div>

          {/* Timer */}
          <div className="px-5 py-4 border-b border-[#27272a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#71717a]">Time Tracker</p>
                <p className="text-2xl font-mono font-semibold">{formatTime(timer)}</p>
              </div>
              <button
                onClick={toggleTimer}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${clockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {clockedIn ? <Square size={18} className="text-white" /> : <Play size={18} className="text-white" />}
              </button>
            </div>
          </div>

          {/* Job List */}
          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
            {jobs.map(job => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedJob?.id === job.id ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#0a0a0b] border-[#27272a]'
                } ${job.status === 'completed' ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{job.customer}</p>
                      {job.status === 'in-progress' && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-500/10 text-green-400 rounded">ACTIVE</span>
                      )}
                    </div>
                    <p className="text-xs text-[#71717a] flex items-center gap-1 mb-1">
                      <MapPin size={11} />{job.address}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#71717a]">
                      <span className="flex items-center gap-1"><Clock size={11} />{job.time}</span>
                      <span className="flex items-center gap-1"><ClipboardCheck size={11} />{job.checklist_done}/{job.checklist_items}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-1.5 bg-[#18181b] rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all ${job.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${job.checklist_items > 0 ? (job.checklist_done / job.checklist_items) * 100 : 0}%` }}
                  />
                </div>

                {/* Expanded Details */}
                {selectedJob?.id === job.id && (
                  <div className="mt-3 pt-3 border-t border-[#27272a] space-y-2">
                    {job.notes && (
                      <p className="text-xs text-[#71717a] bg-[#18181b] p-2 rounded">{job.notes}</p>
                    )}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-colors">
                        <Phone size={12} /> Call
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-colors">
                        <MapPin size={12} /> Navigate
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                        <Camera size={12} /> Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <div className="bg-[#0a0a0b] border-t border-[#27272a] px-6 py-3 flex justify-around">
            <button className="flex flex-col items-center gap-1 text-blue-400">
              <Calendar size={18} />
              <span className="text-[10px]">Jobs</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-[#71717a]">
              <ClipboardCheck size={18} />
              <span className="text-[10px]">Checklist</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-[#71717a]">
              <Clock size={18} />
              <span className="text-[10px]">Time</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-[#71717a]">
              <User size={18} />
              <span className="text-[10px]">Profile</span>
            </button>
          </div>
        </div>

        {/* Phone Label */}
        <p className="text-center text-xs text-[#71717a] mt-4">iPhone 15 Pro · 393×852</p>
      </div>

      {/* Features List */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'Job List', desc: 'View assigned jobs with details' },
          { icon: ClipboardCheck, label: 'Checklists', desc: 'Room-by-room task tracking' },
          { icon: Clock, label: 'Time Tracking', desc: 'Clock in/out with timer' },
          { icon: Camera, label: 'Photo Capture', desc: 'Before/after documentation' },
        ].map(feature => (
          <div key={feature.label} className="bg-[#111113] border border-[#27272a] rounded-lg p-4 text-center">
            <feature.icon size={24} className="text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium mb-1">{feature.label}</p>
            <p className="text-xs text-[#71717a]">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
