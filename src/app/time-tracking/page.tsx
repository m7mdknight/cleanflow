'use client'

import { useState } from 'react'
import { Clock, Play, Square, Download, User, Calendar, TrendingUp, AlertCircle } from 'lucide-react'

interface TimeEntry {
  id: string
  cleaner: string
  date: string
  clock_in: string
  clock_out: string | null
  job: string | null
  duration_min: number | null // computed if clock_out exists
  status: 'active' | 'completed'
}

const mockEntries: TimeEntry[] = [
  { id: '1', cleaner: 'Maria G.', date: '2026-09-18', clock_in: '08:00', clock_out: null, job: 'Deep Clean - Sarah Johnson', duration_min: null, status: 'active' },
  { id: '2', cleaner: 'Team Alpha', date: '2026-09-18', clock_in: '07:30', clock_out: '14:00', job: 'Office Clean - TechStart', duration_min: 390, status: 'completed' },
  { id: '3', cleaner: 'John D.', date: '2026-09-18', clock_in: '09:00', clock_out: '12:30', job: 'Regular Clean - Michael Chen', duration_min: 210, status: 'completed' },
  { id: '4', cleaner: 'Maria G.', date: '2026-09-17', clock_in: '08:00', clock_out: '16:00', job: 'Multiple jobs', duration_min: 480, status: 'completed' },
  { id: '5', cleaner: 'Ahmed S.', date: '2026-09-17', clock_in: '10:00', clock_out: '17:00', job: 'Common Area - Green Valley', duration_min: 420, status: 'completed' },
  { id: '6', cleaner: 'Team Alpha', date: '2026-09-16', clock_in: '07:30', clock_out: '13:00', job: 'Office Clean - TechStart', duration_min: 330, status: 'completed' },
  { id: '7', cleaner: 'John D.', date: '2026-09-16', clock_in: '08:30', clock_out: null, job: null, duration_min: null, status: 'active' }, // forgot to clock out
]

export default function TimeTrackingPage() {
  const [entries, setEntries] = useState<TimeEntry[]>(mockEntries)
  const [selectedCleaner, setSelectedCleaner] = useState<string | null>(null)

  const cleaners = Array.from(new Set(entries.map(e => e.cleaner)))
  const filtered = selectedCleaner ? entries.filter(e => e.cleaner === selectedCleaner) : entries

  const totalHours = entries
    .filter(e => e.duration_min)
    .reduce((sum, e) => sum + (e.duration_min || 0), 0) / 60

  const currentlyClockedIn = entries.filter(e => e.status === 'active').length
  const forgotToClockOut = entries.filter(e => e.status === 'active' && e.date !== '2026-09-18').length

  const formatDuration = (min: number) => {
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${h}h ${m}m`
  }

  const handleClockOut = (id: string) => {
    setEntries(prev => prev.map(e => {
      if (e.id !== id) return e
      const [inH, inM] = e.clock_in.split(':').map(Number)
      const now = new Date()
      const duration = (now.getHours() * 60 + now.getMinutes()) - (inH * inM ? inH * 60 + inM : 0)
      return { ...e, clock_out: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`, duration_min: Math.max(duration, 0), status: 'completed' as const }
    }))
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Time Tracking</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{currentlyClockedIn} on the clock · {totalHours.toFixed(1)}h logged this week</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-sm font-medium rounded-lg transition-colors">
          <Download size={16} />
          Export Payroll
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">On Clock Now</p>
          <p className="text-2xl font-semibold text-green-400">{currentlyClockedIn}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Hours (wk)</p>
          <p className="text-2xl font-semibold">{totalHours.toFixed(1)}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Avg Hours/Day</p>
          <p className="text-2xl font-semibold">{(totalHours / 3).toFixed(1)}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Missed Clock-out</p>
          <p className={`text-2xl font-semibold ${forgotToClockOut > 0 ? 'text-red-400' : ''}`}>{forgotToClockOut}</p>
        </div>
      </div>

      {/* Cleaner filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCleaner(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${!selectedCleaner ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          All Cleaners
        </button>
        {cleaners.map(cleaner => (
          <button
            key={cleaner}
            onClick={() => setSelectedCleaner(selectedCleaner === cleaner ? null : cleaner)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${selectedCleaner === cleaner ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
          >
            {cleaner}
          </button>
        ))}
      </div>

      {/* Time Entries Table */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#27272a] text-left">
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Cleaner</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Clock In</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Clock Out</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Job</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Duration</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(entry => {
              const isStale = entry.status === 'active' && entry.date !== '2026-09-18'
              return (
                <tr key={entry.id} className="border-b border-[#1e1e22] last:border-b-0 hover:bg-[#18181b]/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#18181b] rounded-full flex items-center justify-center text-xs font-medium">
                        {entry.cleaner.charAt(0)}
                      </div>
                      <span>{entry.cleaner}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#a1a1aa]">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{entry.clock_in}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{entry.clock_out || '—'}</td>
                  <td className="px-4 py-3 text-[#a1a1aa] max-w-[200px] truncate">{entry.job || '—'}</td>
                  <td className="px-4 py-3 font-medium">
                    {entry.duration_min ? formatDuration(entry.duration_min) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {entry.status === 'active' ? (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded ${isStale ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isStale ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`} />
                        {isStale ? 'MISSED' : 'ACTIVE'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded bg-[#18181b] text-[#71717a]">
                        DONE
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {entry.status === 'active' && (
                      <button
                        onClick={() => handleClockOut(entry.id)}
                        className="px-2.5 py-1 text-xs font-medium bg-[#18181b] border border-[#27272a] hover:border-red-500/50 hover:text-red-400 rounded transition-colors"
                      >
                        Clock Out
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
