'use client'

import { useState } from 'react'
import { Plus, Search, Mail, Phone, MapPin, MoreVertical, X, Edit2, Trash2, Star, Calendar, Clock } from 'lucide-react'
import type { Customer, ServiceRecord } from '@/types'
import { useToast } from '@/components/Toast'
import EmptyState from '@/components/EmptyState'

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 555-0123',
    address: '123 Oak Street, Springfield, IL 62701',
    notes: 'Prefers eco-friendly products. Has a dog.',
    tags: ['residential', 'recurring', 'eco-friendly'],
    service_history: [
      { id: 's1', customer_id: '1', service_type: 'Deep Clean', date: '2026-09-10', duration: 180, cleaner: 'Maria G.', notes: 'Excellent work', rating: 5, status: 'completed' },
      { id: 's2', customer_id: '1', service_type: 'Regular Clean', date: '2026-08-27', duration: 120, cleaner: 'Maria G.', notes: '', rating: 5, status: 'completed' },
    ],
    created_at: '2026-06-15T10:00:00Z',
    updated_at: '2026-09-10T14:30:00Z',
  },
  {
    id: '2',
    name: 'TechStart Inc.',
    email: 'office@techstart.io',
    phone: '+1 555-0456',
    address: '456 Innovation Blvd, Suite 200, Austin, TX 78701',
    notes: 'Office space, 3 floors. Access code: 4521.',
    tags: ['commercial', 'recurring', 'access-code'],
    service_history: [
      { id: 's3', customer_id: '2', service_type: 'Office Clean', date: '2026-09-12', duration: 240, cleaner: 'Team Alpha', notes: 'All floors done', rating: 4, status: 'completed' },
    ],
    created_at: '2026-04-20T09:00:00Z',
    updated_at: '2026-09-12T18:00:00Z',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '+1 555-0789',
    address: '789 Pine Ave, Apt 4B, Seattle, WA 98101',
    notes: 'Allergic to bleach. Use only green products.',
    tags: ['residential', 'allergy-alert'],
    service_history: [],
    created_at: '2026-09-01T11:00:00Z',
    updated_at: '2026-09-01T11:00:00Z',
  },
  {
    id: '4',
    name: 'Green Valley HOA',
    email: 'admin@greenvalleyhoa.com',
    phone: '+1 555-0321',
    address: '100 Green Valley Dr, Boulder, CO 80302',
    notes: 'Common areas only. Pool house, gym, lobby.',
    tags: ['hoa', 'commercial', 'recurring'],
    service_history: [
      { id: 's4', customer_id: '4', service_type: 'Common Area Clean', date: '2026-09-08', duration: 300, cleaner: 'Team Beta', notes: 'Pool house deep clean', rating: 5, status: 'completed' },
      { id: 's5', customer_id: '4', service_type: 'Common Area Clean', date: '2026-08-25', duration: 240, cleaner: 'Team Beta', notes: '', rating: 4, status: 'completed' },
    ],
    created_at: '2026-03-10T08:00:00Z',
    updated_at: '2026-09-08T16:00:00Z',
  },
]

const tagColors: Record<string, string> = {
  residential: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  commercial: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  recurring: 'bg-green-500/10 text-green-400 border-green-500/30',
  'eco-friendly': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'access-code': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'allergy-alert': 'bg-red-500/10 text-red-400 border-red-500/30',
  hoa: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
}

export default function CRMPage() {
  const { addToast } = useToast()

  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [search, setSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filterTag, setFilterTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(customers.flatMap(c => c.tags)))

  const filtered = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    const matchesTag = !filterTag || c.tags.includes(filterTag)
    return matchesSearch && matchesTag
  })

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id))
    if (selectedCustomer?.id === id) setSelectedCustomer(null)
    addToast('success', 'Customer deleted')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{customers.length} total customers</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Customer
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterTag(null)}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${!filterTag ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
          >
            All
          </button>
          {allTags.slice(0, 4).map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(filterTag === tag ? null : tag)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors capitalize ${filterTag === tag ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Customer List */}
        <div className="flex-1 space-y-2">
          {filtered.length === 0 ? (
            <EmptyState
              type="customers"
              onAction={() => setShowCreateModal(true)}
            />
          ) : (
            filtered.map(customer => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedCustomer?.id === customer.id ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#111113] border-[#27272a] hover:border-[#3f3f46]'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm">{customer.name}</h3>
                      {customer.tags.includes('allergy-alert') && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/30 rounded">ALLERGY</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#71717a]">
                      <span className="flex items-center gap-1"><Mail size={12} />{customer.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12} />{customer.phone}</span>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {customer.tags.map(tag => (
                        <span key={tag} className={`px-2 py-0.5 text-[10px] font-medium rounded border capitalize ${tagColors[tag] || 'bg-[#18181b] text-[#71717a] border-[#27272a]'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#71717a]">{customer.service_history.length} jobs</p>
                    <p className="text-[10px] text-[#71717a] mt-1">
                      {customer.service_history.length > 0
                        ? `Last: ${new Date(customer.service_history[0].date).toLocaleDateString()}`
                        : 'No jobs yet'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Customer Detail Sidebar */}
        {selectedCustomer && (
          <div className="w-96 bg-[#111113] border border-[#27272a] rounded-lg p-6 h-fit sticky top-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">{selectedCustomer.name}</h2>
                <p className="text-xs text-[#71717a]">Customer since {new Date(selectedCustomer.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-[#18181b] rounded transition-colors">
                  <Edit2 size={14} className="text-[#71717a]" />
                </button>
                <button onClick={() => handleDelete(selectedCustomer.id)} className="p-1.5 hover:bg-red-500/10 rounded transition-colors">
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-[#71717a]" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-[#71717a]" />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-[#71717a]" />
                <span>{selectedCustomer.address}</span>
              </div>
            </div>

            {/* Notes */}
            {selectedCustomer.notes && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2">Notes</p>
                <p className="text-sm text-[#a1a1aa] bg-[#0a0a0b] p-3 rounded-lg">{selectedCustomer.notes}</p>
              </div>
            )}

            {/* Tags */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCustomer.tags.map(tag => (
                  <span key={tag} className={`px-2 py-1 text-xs font-medium rounded border capitalize ${tagColors[tag] || 'bg-[#18181b] text-[#71717a] border-[#27272a]'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Service History */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2">Service History</p>
              {selectedCustomer.service_history.length === 0 ? (
                <p className="text-sm text-[#71717a]">No service history yet.</p>
              ) : (
                <div className="space-y-2">
                  {selectedCustomer.service_history.map(record => (
                    <div key={record.id} className="p-3 bg-[#0a0a0b] rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{record.service_type}</span>
                        {record.rating && (
                          <span className="flex items-center gap-0.5 text-xs text-yellow-400">
                            <Star size={12} fill="currentColor" />
                            {record.rating}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#71717a]">
                        <span className="flex items-center gap-1"><Calendar size={11} />{new Date(record.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{record.duration}min</span>
                        <span>{record.cleaner}</span>
                      </div>
                      {record.notes && <p className="text-xs text-[#a1a1aa] mt-1">{record.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCustomerModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(customer) => {
            setCustomers(prev => [customer, ...prev])
            setShowCreateModal(false)
          }}
        />
      )}
    </div>
  )
}

function CreateCustomerModal({ onClose, onCreate }: { onClose: () => void; onCreate: (c: Customer) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onCreate({
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      tags,
      service_history: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()])
      setTagInput('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Add Customer</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#18181b] rounded transition-colors">
            <X size={18} className="text-[#71717a]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full name or company"
              className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 555-0123"
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Address</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Service address"
              className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Special instructions, allergies, access codes..."
              rows={3}
              className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-1.5">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                placeholder="Add tag and press Enter"
                className="flex-1 px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <button type="button" onClick={addTag} className="px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm hover:bg-[#27272a] transition-colors">
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs bg-[#18181b] border border-[#27272a] rounded">
                    {tag}
                    <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))} className="text-[#71717a] hover:text-red-400">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
              Create Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
