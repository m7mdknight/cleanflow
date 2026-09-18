'use client'

import { useState } from 'react'
import { Bell, Mail, MessageSquare, Clock, Plus, Settings, Check, X, Edit2, Trash2, Zap, Calendar, Users } from 'lucide-react'

interface ReminderTemplate {
  id: string
  name: string
  type: 'email' | 'sms'
  trigger: string
  timing: string
  subject?: string
  message: string
  active: boolean
  sent_count: number
}

const mockTemplates: ReminderTemplate[] = [
  {
    id: '1',
    name: 'Booking Confirmation',
    type: 'email',
    trigger: 'booking_created',
    timing: 'immediate',
    subject: 'Your cleaning is confirmed!',
    message: 'Hi {{customer_name}}, your {{service_type}} is scheduled for {{date}} at {{time}}. See you then!',
    active: true,
    sent_count: 142,
  },
  {
    id: '2',
    name: '24-Hour Reminder',
    type: 'sms',
    trigger: 'before_appointment',
    timing: '24_hours',
    message: 'Reminder: Your cleaning appointment is tomorrow at {{time}}. Reply STOP to opt out.',
    active: true,
    sent_count: 98,
  },
  {
    id: '3',
    name: '1-Hour Reminder',
    type: 'sms',
    trigger: 'before_appointment',
    timing: '1_hour',
    message: 'Your cleaner is on the way! They\'ll arrive around {{time}}.',
    active: true,
    sent_count: 87,
  },
  {
    id: '4',
    name: 'Review Request',
    type: 'email',
    trigger: 'after_completion',
    timing: '2_hours',
    subject: 'How was your cleaning?',
    message: 'Hi {{customer_name}}, we hope you loved your {{service_type}}! Leave us a quick review: {{review_link}}',
    active: true,
    sent_count: 76,
  },
  {
    id: '5',
    name: 'Re-engagement',
    type: 'email',
    trigger: 'no_booking',
    timing: '30_days',
    subject: 'We miss you!',
    message: 'Hi {{customer_name}}, it\'s been a while since your last cleaning. Book now and get 15% off!',
    active: false,
    sent_count: 23,
  },
  {
    id: '6',
    name: 'Payment Receipt',
    type: 'email',
    trigger: 'payment_received',
    timing: 'immediate',
    subject: 'Payment received - Thank you!',
    message: 'Your payment of ${{amount}} has been received. Invoice #{{invoice_id}}',
    active: true,
    sent_count: 156,
  },
]

const triggers = [
  { id: 'booking_created', label: 'Booking Created' },
  { id: 'before_appointment', label: 'Before Appointment' },
  { id: 'after_completion', label: 'After Completion' },
  { id: 'payment_received', label: 'Payment Received' },
  { id: 'no_booking', label: 'No Booking (Dormant)' },
]

const timingOptions: Record<string, { label: string; needsValue?: boolean }> = {
  immediate: { label: 'Immediately' },
  '1_hour': { label: '1 Hour Before' },
  '2_hours': { label: '2 Hours After' },
  '24_hours': { label: '24 Hours Before' },
  '30_days': { label: '30 Days After' },
  custom: { label: 'Custom', needsValue: true },
}

export default function RemindersPage() {
  const [templates, setTemplates] = useState<ReminderTemplate[]>(mockTemplates)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<ReminderTemplate | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'email' | 'sms'>('all')

  const filtered = templates.filter(t => filterType === 'all' || t.type === filterType)

  const toggleActive = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t))
  }

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id))
  }

  const totalSent = templates.reduce((sum, t) => sum + t.sent_count, 0)
  const activeCount = templates.filter(t => t.active).length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Automated Reminders</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{activeCount} active templates · {totalSent.toLocaleString()} sent this month</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Sent</p>
          <p className="text-2xl font-semibold">{totalSent.toLocaleString()}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Active Templates</p>
          <p className="text-2xl font-semibold">{activeCount}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Email Sent</p>
          <p className="text-2xl font-semibold">{templates.filter(t => t.type === 'email').reduce((s, t) => s + t.sent_count, 0)}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">SMS Sent</p>
          <p className="text-2xl font-semibold">{templates.filter(t => t.type === 'sms').reduce((s, t) => s + t.sent_count, 0)}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${filterType === 'all' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('email')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 ${filterType === 'email' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          <Mail size={12} /> Email
        </button>
        <button
          onClick={() => setFilterType('sms')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 ${filterType === 'sms' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          <MessageSquare size={12} /> SMS
        </button>
      </div>

      {/* Templates List */}
      <div className="space-y-3">
        {filtered.map(template => (
          <div key={template.id} className={`bg-[#111113] border rounded-lg p-5 transition-all ${template.active ? 'border-[#27272a]' : 'border-[#27272a] opacity-60'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${template.type === 'email' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'}`}>
                  {template.type === 'email' ? <Mail size={16} /> : <MessageSquare size={16} />}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <p className="text-xs text-[#71717a]">
                    {triggers.find(t => t.id === template.trigger)?.label} · {timingOptions[template.timing]?.label}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(template.id)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${template.active ? 'bg-blue-500' : 'bg-[#27272a]'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${template.active ? 'left-5.5' : 'left-0.5'}`} />
                </button>
                <button
                  onClick={() => setEditingTemplate(template)}
                  className="p-1.5 hover:bg-[#18181b] rounded transition-colors"
                >
                  <Edit2 size={14} className="text-[#71717a]" />
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="p-1.5 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-[#0a0a0b] rounded-lg p-4 mb-3">
              {template.subject && (
                <p className="text-xs text-[#71717a] mb-1">Subject: <span className="text-[#a1a1aa]">{template.subject}</span></p>
              )}
              <p className="text-sm text-[#a1a1aa]">{template.message}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[#71717a]">
              <span className="flex items-center gap-1">
                <Zap size={12} />
                {template.sent_count.toLocaleString()} sent
              </span>
              <span className={`px-2 py-0.5 rounded ${template.active ? 'bg-green-500/10 text-green-400' : 'bg-[#18181b] text-[#71717a]'}`}>
                {template.active ? 'Active' : 'Paused'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingTemplate) && (
        <ReminderModal
          template={editingTemplate}
          onClose={() => { setShowCreateModal(false); setEditingTemplate(null) }}
          onSave={(template) => {
            if (editingTemplate) {
              setTemplates(prev => prev.map(t => t.id === template.id ? template : t))
            } else {
              setTemplates(prev => [{ ...template, id: Date.now().toString(), sent_count: 0 }, ...prev])
            }
            setShowCreateModal(false)
            setEditingTemplate(null)
          }}
        />
      )}
    </div>
  )
}

function ReminderModal({ template, onClose, onSave }: {
  template: ReminderTemplate | null
  onClose: () => void
  onSave: (t: ReminderTemplate) => void
}) {
  const [name, setName] = useState(template?.name || '')
  const [type, setType] = useState<'email' | 'sms'>(template?.type || 'email')
  const [trigger, setTrigger] = useState(template?.trigger || 'booking_created')
  const [timing, setTiming] = useState(template?.timing || 'immediate')
  const [subject, setSubject] = useState(template?.subject || '')
  const [message, setMessage] = useState(template?.message || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    onSave({
      id: template?.id || '',
      name: name.trim(),
      type,
      trigger,
      timing,
      subject: type === 'email' ? subject.trim() : undefined,
      message: message.trim(),
      active: template?.active ?? true,
      sent_count: template?.sent_count || 0,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{template ? 'Edit Template' : 'New Template'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#18181b] rounded transition-colors">
            <X size={18} className="text-[#71717a]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Template Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Booking Confirmation"
              className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Channel</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-colors ${type === 'email' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#0a0a0b] border-[#27272a] text-[#71717a]'}`}
              >
                <Mail size={14} /> Email
              </button>
              <button
                type="button"
                onClick={() => setType('sms')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-colors ${type === 'sms' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#0a0a0b] border-[#27272a] text-[#71717a]'}`}
              >
                <MessageSquare size={14} /> SMS
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Trigger</label>
              <select
                value={trigger}
                onChange={e => setTrigger(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                {triggers.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Timing</label>
              <select
                value={timing}
                onChange={e => setTiming(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                {Object.entries(timingOptions).map(([id, opt]) => (
                  <option key={id} value={id}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {type === 'email' && (
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Email subject..."
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Use {{customer_name}}, {{service_type}}, {{date}}, {{time}} for dynamic values..."
              rows={4}
              className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none font-mono"
              required
            />
            <p className="text-[10px] text-[#71717a] mt-1">
              Variables: {'{{customer_name}}'}, {'{{service_type}}'}, {'{{date}}'}, {'{{time}}'}, {'{{amount}}'}, {'{{invoice_id}}'}, {'{{review_link}}'}
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
              {template ? 'Save Changes' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
