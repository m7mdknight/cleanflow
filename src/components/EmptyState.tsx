'use client'

import { Plus, Inbox, Users, Calendar, Package, ClipboardCheck, FileText, Search } from 'lucide-react'

interface EmptyStateProps {
  type: 'customers' | 'jobs' | 'inventory' | 'checklists' | 'invoices' | 'generic'
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

const icons = {
  customers: Users,
  jobs: Calendar,
  inventory: Package,
  checklists: ClipboardCheck,
  invoices: FileText,
  generic: Inbox,
}

const labels = {
  customers: { title: 'No customers yet', description: 'Add your first customer to start scheduling jobs.', action: 'Add Customer' },
  jobs: { title: 'No jobs scheduled', description: 'Schedule your first cleaning job to get started.', action: 'Schedule Job' },
  inventory: { title: 'No inventory items', description: 'Add supplies and equipment to track your stock.', action: 'Add Item' },
  checklists: { title: 'No checklists', description: 'Create quality control checklists for your team.', action: 'Create Checklist' },
  invoices: { title: 'No invoices', description: 'Create your first invoice to start billing customers.', action: 'Create Invoice' },
  generic: { title: 'Nothing here yet', description: 'Get started by adding your first item.', action: 'Add Item' },
}

export default function EmptyState({ type, title, description, actionLabel, onAction }: EmptyStateProps) {
  const Icon = icons[type]
  const defaults = labels[type]

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 bg-[#18181b] rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-[#71717a]" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title || defaults.title}</h3>
      <p className="text-sm text-[#71717a] max-w-sm mb-6">{description || defaults.description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          {actionLabel || defaults.action}
        </button>
      )}
    </div>
  )
}
