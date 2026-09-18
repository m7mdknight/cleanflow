'use client'

import { useState } from 'react'
import { ClipboardCheck, Check, Camera, ChevronRight, User, Clock, MessageSquare, Plus, X, AlertCircle } from 'lucide-react'
import type { Checklist, ChecklistItem } from '@/types'

const mockChecklists: Checklist[] = [
  {
    id: '1',
    job_id: '1',
    title: 'Deep Clean - Sarah Johnson',
    room: 'Whole House',
    items: [
      { id: 'i1', label: 'Vacuum all carpets', completed: true, photo_required: false, photo_url: null },
      { id: 'i2', label: 'Mop all floors', completed: true, photo_required: false, photo_url: null },
      { id: 'i3', label: 'Clean kitchen counters & sink', completed: true, photo_required: true, photo_url: null },
      { id: 'i4', label: 'Clean bathrooms (2)', completed: false, photo_required: true, photo_url: null },
      { id: 'i5', label: 'Dust all surfaces', completed: false, photo_required: false, photo_url: null },
      { id: 'i6', label: 'Empty trash bins', completed: false, photo_required: false, photo_url: null },
      { id: 'i7', label: 'Final walkthrough photo', completed: false, photo_required: true, photo_url: null },
    ],
    completed: false,
    completed_at: null,
    completed_by: null,
    photos: [],
    notes: 'Focus on bathroom grout. Customer mentioned stains.',
  },
  {
    id: '2',
    job_id: '2',
    title: 'Office Clean - TechStart',
    room: 'All Floors',
    items: [
      { id: 'i8', label: 'Vacuum lobby and hallways', completed: true, photo_required: false, photo_url: null },
      { id: 'i9', label: 'Clean kitchen & break room', completed: true, photo_required: true, photo_url: null },
      { id: 'i10', label: 'Restock bathroom supplies', completed: true, photo_required: false, photo_url: null },
      { id: 'i11', label: 'Wipe desks and surfaces', completed: true, photo_required: false, photo_url: null },
      { id: 'i12', label: 'Empty all trash', completed: false, photo_required: false, photo_url: null },
    ],
    completed: false,
    completed_at: null,
    completed_by: null,
    photos: [],
    notes: '',
  },
  {
    id: '3',
    job_id: '4',
    title: 'Regular Clean - Sarah Johnson',
    room: 'Living Room',
    items: [
      { id: 'i13', label: 'Vacuum carpet', completed: true, photo_required: false, photo_url: null },
      { id: 'i14', label: 'Dust furniture', completed: true, photo_required: false, photo_url: null },
      { id: 'i15', label: 'Clean mirrors', completed: true, photo_required: false, photo_url: null },
    ],
    completed: true,
    completed_at: '2026-09-15T11:30:00Z',
    completed_by: 'Maria G.',
    photos: [],
    notes: '',
  },
]

export default function ChecklistsPage() {
  const [checklists, setChecklists] = useState<Checklist[]>(mockChecklists)
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const filtered = checklists.filter(c => {
    if (filter === 'active') return !c.completed
    if (filter === 'completed') return c.completed
    return true
  })

  const toggleItem = (checklistId: string, itemId: string) => {
    setChecklists(prev => prev.map(c => {
      if (c.id !== checklistId) return c
      const updatedItems = c.items.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
      const allDone = updatedItems.every(i => i.completed)
      return { ...c, items: updatedItems, completed: allDone, completed_at: allDone ? new Date().toISOString() : null, completed_by: allDone ? 'You' : null }
    }))
    if (selectedChecklist?.id === checklistId) {
      setSelectedChecklist(prev => {
        if (!prev) return null
        const updatedItems = prev.items.map(item =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
        const allDone = updatedItems.every(i => i.completed)
        return { ...prev, items: updatedItems, completed: allDone, completed_at: allDone ? new Date().toISOString() : null, completed_by: allDone ? 'You' : null }
      })
    }
  }

  const addNote = (checklistId: string, note: string) => {
    setChecklists(prev => prev.map(c => c.id === checklistId ? { ...c, notes: note } : c))
    if (selectedChecklist?.id === checklistId) setSelectedChecklist({ ...selectedChecklist, notes: note })
  }

  const stats = {
    total: checklists.length,
    completed: checklists.filter(c => c.completed).length,
    photos: checklists.flatMap(c => c.photos).length,
    pending: checklists.filter(c => !c.completed).length,
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Checklists & QA</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{stats.completed}/{stats.total} completed today</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${filter === 'all' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${filter === 'active' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
          >
            Active ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${filter === 'completed' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
          >
            Completed ({stats.completed})
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Completion Rate</p>
          <p className="text-2xl font-semibold">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Items Done</p>
          <p className="text-2xl font-semibold">{checklists.flatMap(c => c.items).filter(i => i.completed).length}/{checklists.flatMap(c => c.items).length}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Photos Taken</p>
          <p className="text-2xl font-semibold">{stats.photos}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Flagged Items</p>
          <p className="text-2xl font-semibold">{checklists.flatMap(c => c.items).filter(i => i.photo_required && !i.completed).length}</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Checklist List */}
        <div className="flex-1 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#71717a]">
              <ClipboardCheck size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">No checklists found.</p>
            </div>
          ) : (
            filtered.map(checklist => {
              const completedCount = checklist.items.filter(i => i.completed).length
              const totalCount = checklist.items.length
              const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

              return (
                <div
                  key={checklist.id}
                  onClick={() => setSelectedChecklist(checklist)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedChecklist?.id === checklist.id ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#111113] border-[#27272a] hover:border-[#3f3f46]'} ${checklist.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm">{checklist.title}</h3>
                        {checklist.completed && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/30 rounded">DONE</span>
                        )}
                      </div>
                      <p className="text-xs text-[#71717a] mt-0.5">{checklist.room}</p>
                    </div>
                    <ChevronRight size={16} className="text-[#71717a]" />
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-[#18181b] rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all ${checklist.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#71717a]">
                    <span>{completedCount}/{totalCount} tasks</span>
                    {checklist.notes && (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <AlertCircle size={12} />
                        Has notes
                      </span>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Checklist Detail */}
        {selectedChecklist && (
          <div className="w-96 bg-[#111113] border border-[#27272a] rounded-lg p-6 h-fit sticky top-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">{selectedChecklist.title}</h2>
                <p className="text-xs text-[#71717a]">{selectedChecklist.room}</p>
              </div>
              {selectedChecklist.completed && (
                <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30 rounded">
                  COMPLETED
                </span>
              )}
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#71717a]">Progress</span>
                <span className="font-medium">{Math.round((selectedChecklist.items.filter(i => i.completed).length / selectedChecklist.items.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-[#18181b] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${selectedChecklist.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${(selectedChecklist.items.filter(i => i.completed).length / selectedChecklist.items.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-6">
              {selectedChecklist.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(selectedChecklist.id, item.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left ${item.completed ? 'bg-green-500/5 border-green-500/30' : 'bg-[#0a0a0b] border-[#27272a] hover:border-[#3f3f46]'}`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${item.completed ? 'bg-green-500 border-green-500' : 'border-[#3f3f46]'}`}>
                    {item.completed && <Check size={12} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${item.completed ? 'line-through text-[#71717a]' : ''}`}>
                      {item.label}
                    </p>
                    {item.photo_required && !item.completed && (
                      <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 text-[10px] font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded">
                        <Camera size={10} />
                        Photo required
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Notes */}
            {selectedChecklist.notes && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2 flex items-center gap-1">
                  <MessageSquare size={12} />
                  Notes
                </p>
                <p className="text-sm text-[#a1a1aa] bg-[#0a0a0b] p-3 rounded-lg">{selectedChecklist.notes}</p>
              </div>
            )}

            {/* Completed by */}
            {selectedChecklist.completed && selectedChecklist.completed_by && (
              <div className="flex items-center gap-3 text-sm">
                <User size={14} className="text-[#71717a]" />
                <span>Completed by <strong>{selectedChecklist.completed_by}</strong></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
