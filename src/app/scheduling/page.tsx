'use client'

import { useState, useMemo } from 'react'
import { Plus, ChevronLeft, ChevronRight, Clock, User, MapPin, X, Calendar as CalendarIcon } from 'lucide-react'
import type { Job, Customer } from '@/types'

const mockCustomers: Customer[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 555-0123', address: '123 Oak Street', notes: '', tags: ['residential'], service_history: [], created_at: '', updated_at: '' },
  { id: '2', name: 'TechStart Inc.', email: 'office@techstart.io', phone: '+1 555-0456', address: '456 Innovation Blvd', notes: '', tags: ['commercial'], service_history: [], created_at: '', updated_at: '' },
  { id: '3', name: 'Michael Chen', email: 'mchen@email.com', phone: '+1 555-0789', address: '789 Pine Ave', notes: '', tags: ['residential'], service_history: [], created_at: '', updated_at: '' },
]

const mockJobs: Job[] = [
  { id: '1', customer_id: '1', customer_name: 'Sarah Johnson', service_type: 'Deep Clean', date: '2026-09-18', time: '09:00', duration: 180, cleaner_id: 'c1', cleaner_name: 'Maria G.', status: 'scheduled', notes: '', address: '123 Oak Street', created_at: '' },
  { id: '2', customer_id: '2', customer_name: 'TechStart Inc.', service_type: 'Office Clean', date: '2026-09-18', time: '14:00', duration: 240, cleaner_id: 'c2', cleaner_name: 'Team Alpha', status: 'scheduled', notes: '', address: '456 Innovation Blvd', created_at: '' },
  { id: '3', customer_id: '3', customer_name: 'Michael Chen', service_type: 'Regular Clean', date: '2026-09-19', time: '10:00', duration: 120, cleaner_id: null, cleaner_name: null, status: 'scheduled', notes: '', address: '789 Pine Ave', created_at: '' },
  { id: '4', customer_id: '1', customer_name: 'Sarah Johnson', service_type: 'Regular Clean', date: '2026-09-20', time: '09:00', duration: 120, cleaner_id: 'c1', cleaner_name: 'Maria G.', status: 'scheduled', notes: '', address: '123 Oak Street', created_at: '' },
  { id: '5', customer_id: '2', customer_name: 'TechStart Inc.', service_type: 'Office Clean', date: '2026-09-21', time: '18:00', duration: 180, cleaner_id: 'c2', cleaner_name: 'Team Alpha', status: 'scheduled', notes: '', address: '456 Innovation Blvd', created_at: '' },
]

const cleaners = [
  { id: 'c1', name: 'Maria G.', color: 'bg-blue-500' },
  { id: 'c2', name: 'Team Alpha', color: 'bg-purple-500' },
  { id: 'c3', name: 'John D.', color: 'bg-green-500' },
  { id: 'c4', name: 'Lisa K.', color: 'bg-orange-500' },
]

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 8
  return `${hour.toString().padStart(2, '0')}:00`
})

const statusColors: Record<string, string> = {
  scheduled: 'border-blue-500/30 bg-blue-500/5',
  'in-progress': 'border-yellow-500/30 bg-yellow-500/5',
  completed: 'border-green-500/30 bg-green-500/5',
  cancelled: 'border-red-500/30 bg-red-500/5',
}

const statusDot: Record<string, string> = {
  scheduled: 'bg-blue-400',
  'in-progress': 'bg-yellow-400',
  completed: 'bg-green-400',
  cancelled: 'bg-red-400',
}

export default function SchedulingPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 18)) // Sep 18, 2026
  const [view, setView] = useState<'day' | 'week'>('week')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const getDaysInWeek = (date: Date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay() + 1) // Monday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      return d
    })
  }

  const weekDays = getDaysInWeek(currentDate)
  const today = new Date(2026, 8, 18) // Mock today

  const navigateWeek = (dir: number) => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + dir * 7)
    setCurrentDate(d)
  }

  const getJobsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return jobs.filter(j => j.date === dateStr)
  }

  const formatTime = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hour = h % 12 || 12
    return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
  }

  const handleStatusChange = (jobId: string, status: Job['status']) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status } : j))
    if (selectedJob?.id === jobId) setSelectedJob({ ...selectedJob, status })
  }

  const handleAssign = (jobId: string, cleanerId: string) => {
    const cleaner = cleaners.find(c => c.id === cleanerId)
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, cleaner_id: cleanerId, cleaner_name: cleaner?.name || null } : j))
    if (selectedJob?.id === jobId) setSelectedJob({ ...selectedJob, cleaner_id: cleanerId, cleaner_name: cleaner?.name || null })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Scheduling</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{jobs.length} jobs this period</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-[#111113] border border-[#27272a] rounded-lg p-0.5">
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${view === 'day' ? 'bg-blue-500/10 text-blue-400' : 'text-[#71717a] hover:text-[#fafafa]'}`}
            >
              Day
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${view === 'week' ? 'bg-blue-500/10 text-blue-400' : 'text-[#71717a] hover:text-[#fafafa]'}`}
            >
              Week
            </button>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} />
            New Job
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateWeek(-1)} className="p-1.5 hover:bg-[#18181b] rounded-lg transition-colors">
            <ChevronLeft size={18} className="text-[#71717a]" />
          </button>
          <h2 className="text-lg font-medium">
            {weekDays[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={() => navigateWeek(1)} className="p-1.5 hover:bg-[#18181b] rounded-lg transition-colors">
            <ChevronRight size={18} className="text-[#71717a]" />
          </button>
        </div>
        <button
          onClick={() => setCurrentDate(today)}
          className="px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
        >
          Today
        </button>
      </div>

      {/* Week Grid */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-8 border-b border-[#27272a]">
          <div className="p-3 text-xs text-[#71717a] font-medium border-r border-[#27272a]">Time</div>
          {weekDays.map((day, i) => {
            const isToday = day.toDateString() === today.toDateString()
            return (
              <div key={i} className={`p-3 text-center border-r border-[#27272a] last:border-r-0 ${isToday ? 'bg-blue-500/5' : ''}`}>
                <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className={`text-sm font-medium mt-0.5 ${isToday ? 'text-blue-400' : ''}`}>
                  {day.getDate()}
                </p>
              </div>
            )
          })}
        </div>

        {/* Time Slots */}
        <div className="max-h-[600px] overflow-y-auto">
          {timeSlots.map((time, timeIdx) => (
            <div key={time} className="grid grid-cols-8 border-b border-[#27272a] last:border-b-0 min-h-[60px]">
              <div className="p-2 text-xs text-[#71717a] border-r border-[#27272a] flex items-start justify-center pt-2">
                {formatTime(time)}
              </div>
              {weekDays.map((day, dayIdx) => {
                const dayJobs = getJobsForDay(day).filter(j => {
                  const jobHour = parseInt(j.time.split(':')[0])
                  const slotHour = parseInt(time.split(':')[0])
                  return jobHour === slotHour
                })
                return (
                  <div key={dayIdx} className="border-r border-[#27272a] last:border-r-0 p-1 space-y-1">
                    {dayJobs.map(job => (
                      <button
                        key={job.id}
                        onClick={() => setSelectedJob(job)}
                        className={`w-full text-left p-2 rounded border text-xs transition-all hover:scale-[1.02] ${statusColors[job.status]}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[job.status]}`} />
                          <span className="font-medium truncate">{job.customer_name}</span>
                        </div>
                        <p className="text-[10px] text-[#71717a]">{job.service_type}</p>
                        {job.cleaner_name && (
                          <p className="text-[10px] text-[#71717a] mt-0.5 flex items-center gap-1">
                            <User size={10} />{job.cleaner_name}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Job Detail Sidebar */}
      {selectedJob && (
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-[#111113] border-l border-[#27272a] p-6 overflow-y-auto z-40">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">{selectedJob.customer_name}</h2>
              <p className="text-sm text-[#a1a1aa]">{selectedJob.service_type}</p>
            </div>
            <button onClick={() => setSelectedJob(null)} className="p-1.5 hover:bg-[#18181b] rounded transition-colors">
              <X size={18} className="text-[#71717a]" />
            </button>
          </div>

          {/* Status */}
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2">Status</p>
            <div className="grid grid-cols-2 gap-2">
              {(['scheduled', 'in-progress', 'completed', 'cancelled'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(selectedJob.id, status)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border capitalize transition-colors ${selectedJob.status === status ? statusColors[status] + ' border-current' : 'bg-[#0a0a0b] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <CalendarIcon size={14} className="text-[#71717a]" />
              <span>{new Date(selectedJob.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={14} className="text-[#71717a]" />
              <span>{formatTime(selectedJob.time)} · {selectedJob.duration} min</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={14} className="text-[#71717a]" />
              <span>{selectedJob.address}</span>
            </div>
          </div>

          {/* Assign Cleaner */}
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2">Assigned To</p>
            <div className="space-y-2">
              {cleaners.map(cleaner => (
                <button
                  key={cleaner.id}
                  onClick={() => handleAssign(selectedJob.id, cleaner.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${selectedJob.cleaner_id === cleaner.id ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#0a0a0b] border-[#27272a] hover:border-[#3f3f46]'}`}
                >
                  <div className={`w-8 h-8 ${cleaner.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                    {cleaner.name.charAt(0)}
                  </div>
                  <span className="text-sm">{cleaner.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          {selectedJob.notes && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2">Notes</p>
              <p className="text-sm text-[#a1a1aa] bg-[#0a0a0b] p-3 rounded-lg">{selectedJob.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <CreateJobModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(job) => {
            setJobs(prev => [...prev, job])
            setShowCreateModal(false)
          }}
          customers={mockCustomers}
          cleaners={cleaners}
        />
      )}
    </div>
  )
}

function CreateJobModal({ onClose, onCreate, customers, cleaners }: {
  onClose: () => void
  onCreate: (j: Job) => void
  customers: Customer[]
  cleaners: { id: string; name: string; color: string }[]
}) {
  const [customerId, setCustomerId] = useState('')
  const [serviceType, setServiceType] = useState('Regular Clean')
  const [date, setDate] = useState('2026-09-18')
  const [time, setTime] = useState('09:00')
  const [duration, setDuration] = useState('120')
  const [cleanerId, setCleanerId] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const customer = customers.find(c => c.id === customerId)
    const cleaner = cleaners.find(c => c.id === cleanerId)
    if (!customer) return

    onCreate({
      id: Date.now().toString(),
      customer_id: customerId,
      customer_name: customer.name,
      service_type: serviceType,
      date,
      time,
      duration: parseInt(duration),
      cleaner_id: cleanerId || null,
      cleaner_name: cleaner?.name || null,
      status: 'scheduled',
      notes,
      address: customer.address,
      created_at: new Date().toISOString(),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">New Job</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#18181b] rounded transition-colors">
            <X size={18} className="text-[#71717a]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Customer *</label>
            <select
              value={customerId}
              onChange={e => setCustomerId(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select customer...</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Service Type</label>
            <select
              value={serviceType}
              onChange={e => setServiceType(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
            >
              <option>Regular Clean</option>
              <option>Deep Clean</option>
              <option>Move-in/out</option>
              <option>Office Clean</option>
              <option>Post-construction</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Duration (min)</label>
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                step={30}
                min={30}
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Assign Cleaner</label>
              <select
                value={cleanerId}
                onChange={e => setCleanerId(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Unassigned</option>
                {cleaners.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Special instructions..."
              rows={3}
              className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
