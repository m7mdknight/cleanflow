'use client'

import { useState } from 'react'
import { CreditCard, DollarSign, FileText, Plus, Download, Send, Check, X, Clock, AlertTriangle, TrendingUp, Calendar, Users, Receipt, Settings } from 'lucide-react'
import { useToast } from '@/components/Toast'
import EmptyState from '@/components/EmptyState'

interface Invoice {
  id: string
  customer: string
  customer_email: string
  service: string
  date: string
  due_date: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  items: InvoiceItem[]
  payment_method?: string
  paid_at?: string
}

interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
}

interface PaymentMethod {
  id: string
  type: 'card' | 'bank'
  last4: string
  brand?: string
  expiry?: string
  is_default: boolean
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    customer: 'Sarah Johnson',
    customer_email: 'sarah@example.com',
    service: 'Deep Clean',
    date: '2026-09-18',
    due_date: '2026-09-25',
    amount: 250,
    status: 'paid',
    items: [
      { description: 'Deep Clean - 3BR/2BA Home', quantity: 1, rate: 200, amount: 200 },
      { description: 'Inside Oven Add-on', quantity: 1, rate: 35, amount: 35 },
      { description: 'Window Cleaning (interior)', quantity: 1, rate: 15, amount: 15 },
    ],
    payment_method: 'Visa •••• 4242',
    paid_at: '2026-09-18T14:30:00Z',
  },
  {
    id: 'INV-002',
    customer: 'TechStart Inc.',
    customer_email: 'office@techstart.io',
    service: 'Office Clean',
    date: '2026-09-15',
    due_date: '2026-09-22',
    amount: 200,
    status: 'sent',
    items: [
      { description: 'Office Clean - 3 floors', quantity: 1, rate: 200, amount: 200 },
    ],
  },
  {
    id: 'INV-003',
    customer: 'Michael Chen',
    customer_email: 'mchen@email.com',
    service: 'Regular Clean',
    date: '2026-09-12',
    due_date: '2026-09-19',
    amount: 120,
    status: 'overdue',
    items: [
      { description: 'Regular Clean - 2BR/1BA', quantity: 1, rate: 120, amount: 120 },
    ],
  },
  {
    id: 'INV-004',
    customer: 'Green Valley HOA',
    customer_email: 'admin@greenvalleyhoa.com',
    service: 'Common Area Clean',
    date: '2026-09-10',
    due_date: '2026-09-17',
    amount: 300,
    status: 'paid',
    items: [
      { description: 'Common Area Clean - Pool house', quantity: 1, rate: 150, amount: 150 },
      { description: 'Common Area Clean - Gym', quantity: 1, rate: 100, amount: 100 },
      { description: 'Common Area Clean - Lobby', quantity: 1, rate: 50, amount: 50 },
    ],
    payment_method: 'ACH Transfer',
    paid_at: '2026-09-10T09:15:00Z',
  },
  {
    id: 'INV-005',
    customer: 'Sarah Johnson',
    customer_email: 'sarah@example.com',
    service: 'Regular Clean',
    date: '2026-09-25',
    due_date: '2026-10-02',
    amount: 120,
    status: 'draft',
    items: [
      { description: 'Regular Clean - 3BR/2BA', quantity: 1, rate: 120, amount: 120 },
    ],
  },
]

const mockPaymentMethods: PaymentMethod[] = [
  { id: 'pm1', type: 'card', last4: '4242', brand: 'Visa', expiry: '12/27', is_default: true },
  { id: 'pm2', type: 'card', last4: '8888', brand: 'Mastercard', expiry: '03/28', is_default: false },
  { id: 'pm3', type: 'bank', last4: '1234', is_default: false },
]

const statusConfig = {
  draft: { label: 'Draft', color: 'text-[#71717a]', bg: 'bg-[#18181b]' },
  sent: { label: 'Sent', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  paid: { label: 'Paid', color: 'text-green-400', bg: 'bg-green-500/10' },
  overdue: { label: 'Overdue', color: 'text-red-400', bg: 'bg-red-500/10' },
  cancelled: { label: 'Cancelled', color: 'text-[#71717a]', bg: 'bg-[#18181b]' },
}

export default function InvoicingPage() {
  const { addToast } = useToast()
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPayModal, setShowPayModal] = useState(false)
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null)

  const filtered = filterStatus ? invoices.filter(i => i.status === filterStatus) : invoices

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
  const pendingAmount = invoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0)

  const handleMarkPaid = (id: string) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'paid' as const, paid_at: new Date().toISOString() } : i))
    addToast('success', 'Invoice marked as paid')
  }

  const handleSend = (id: string) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'sent' as const } : i))
    addToast('success', 'Invoice sent to customer')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invoicing & Payments</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{invoices.length} invoices · ${totalRevenue} collected</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold text-green-400">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Pending</p>
          <p className="text-2xl font-semibold text-blue-400">${pendingAmount.toLocaleString()}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Overdue</p>
          <p className={`text-2xl font-semibold ${overdueAmount > 0 ? 'text-red-400' : ''}`}>${overdueAmount.toLocaleString()}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Collection Rate</p>
          <p className="text-2xl font-semibold">{invoices.length > 0 ? Math.round((invoices.filter(i => i.status === 'paid').length / invoices.length) * 100) : 0}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilterStatus(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${!filterStatus ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          All ({invoices.length})
        </button>
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = invoices.filter(i => i.status === status).length
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(filterStatus === status ? null : status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${filterStatus === status ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
            >
              {config.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Invoices Table */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#27272a] text-left">
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Invoice</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Service</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Due</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(invoice => {
              const status = statusConfig[invoice.status]
              return (
                <tr key={invoice.id} className="border-b border-[#1e1e22] last:border-b-0 hover:bg-[#18181b]/50">
                  <td className="px-4 py-3 font-mono text-xs">{invoice.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{invoice.customer}</p>
                      <p className="text-xs text-[#71717a]">{invoice.customer_email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{invoice.service}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{new Date(invoice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{new Date(invoice.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  <td className="px-4 py-3 font-medium">${invoice.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded ${status.bg} ${status.color}`}>
                      {invoice.status === 'overdue' && <AlertTriangle size={10} />}
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      {invoice.status === 'draft' && (
                        <button onClick={() => handleSend(invoice.id)} className="p-1.5 hover:bg-blue-500/10 rounded transition-colors" title="Send">
                          <Send size={14} className="text-blue-400" />
                        </button>
                      )}
                      {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                        <button onClick={() => handleMarkPaid(invoice.id)} className="p-1.5 hover:bg-green-500/10 rounded transition-colors" title="Mark Paid">
                          <Check size={14} className="text-green-400" />
                        </button>
                      )}
                      <button className="p-1.5 hover:bg-[#18181b] rounded transition-colors" title="Download">
                        <Download size={14} className="text-[#71717a]" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <EmptyState
            type="invoices"
            onAction={() => setShowCreateModal(true)}
          />
        )}
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <CreateInvoiceModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(invoice) => {
            setInvoices(prev => [invoice, ...prev])
            setShowCreateModal(false)
          }}
        />
      )}
    </div>
  )
}

function CreateInvoiceModal({ onClose, onCreate }: { onClose: () => void; onCreate: (i: Invoice) => void }) {
  const [customer, setCustomer] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('2026-09-18')
  const [dueDate, setDueDate] = useState('2026-09-25')
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 },
  ])

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(prev => prev.map((item, i) => {
      if (i !== index) return item
      const updated = { ...item, [field]: value }
      if (field === 'quantity' || field === 'rate') {
        updated.amount = updated.quantity * updated.rate
      }
      return updated
    }))
  }

  const addItem = () => {
    setItems(prev => [...prev, { description: '', quantity: 1, rate: 0, amount: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const total = items.reduce((sum, item) => sum + item.amount, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer.trim() || items.length === 0) return
    onCreate({
      id: `INV-${String(Date.now()).slice(-3)}`,
      customer: customer.trim(),
      customer_email: '',
      service: service.trim() || 'Cleaning Service',
      date,
      due_date: dueDate,
      amount: total,
      status: 'draft',
      items,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">New Invoice</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#18181b] rounded transition-colors">
            <X size={18} className="text-[#71717a]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Customer *</label>
              <input
                type="text"
                value={customer}
                onChange={e => setCustomer(e.target.value)}
                placeholder="Customer name"
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Service</label>
              <input
                type="text"
                value={service}
                onChange={e => setService(e.target.value)}
                placeholder="e.g., Deep Clean"
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Invoice Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <label className="block text-xs text-[#71717a] font-medium mb-2">Line Items</label>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={item.description}
                    onChange={e => updateItem(index, 'description', e.target.value)}
                    placeholder="Description"
                    className="flex-1 px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    placeholder="Qty"
                    min="1"
                    className="w-16 px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={item.rate}
                    onChange={e => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    placeholder="Rate"
                    min="0"
                    step="0.01"
                    className="w-24 px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={`$${item.amount.toFixed(2)}`}
                    readOnly
                    className="w-24 px-3 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-[#71717a]"
                  />
                  {items.length > 1 && (
                    <button type="button" onClick={() => removeItem(index)} className="p-2 hover:bg-red-500/10 rounded transition-colors">
                      <X size={14} className="text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addItem} className="mt-2 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
              <Plus size={14} /> Add Line Item
            </button>
          </div>

          {/* Total */}
          <div className="flex justify-end pt-4 border-t border-[#27272a]">
            <div className="text-right">
              <p className="text-xs text-[#71717a]">Total</p>
              <p className="text-2xl font-semibold">${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
