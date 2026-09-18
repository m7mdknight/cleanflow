'use client'

import { useState } from 'react'
import { CheckSquare, Square, Trash2, X, MoreHorizontal } from 'lucide-react'
import { useToast } from '@/components/Toast'

interface BulkActionBarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onDelete: () => void
  deleteLabel?: string
}

export function BulkActionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDelete,
  deleteLabel = 'Delete',
}: BulkActionBarProps) {
  const { addToast } = useToast()

  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-3 bg-[#111113] border border-[#27272a] rounded-xl shadow-2xl animate-slide-up">
      <span className="text-sm font-medium">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onSelectAll}
          className="px-3 py-1.5 text-xs font-medium bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-colors"
        >
          Select all {totalCount}
        </button>
        <button
          onClick={onClearSelection}
          className="px-3 py-1.5 text-xs font-medium bg-[#18181b] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-colors"
        >
          Clear
        </button>
        <div className="w-px h-4 bg-[#27272a]" />
        <button
          onClick={() => {
            onDelete()
            addToast('success', `${selectedCount} items deleted`)
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors"
        >
          <Trash2 size={12} />
          {deleteLabel}
        </button>
      </div>
    </div>
  )
}

interface SelectableRowProps {
  selected: boolean
  onToggle: () => void
  children: React.ReactNode
  className?: string
}

export function SelectableRow({ selected, onToggle, children, className = '' }: SelectableRowProps) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      onClick={onToggle}
    >
      <button
        className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
          selected
            ? 'bg-blue-500 border-blue-500'
            : 'border-[#3f3f46] hover:border-[#71717a]'
        }`}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
      >
        {selected && <CheckSquare size={12} className="text-white" />}
        {!selected && <Square size={12} className="text-transparent" />}
      </button>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  )
}

const slideUp = `
  @keyframes slideUp {
    from { transform: translate(-50%, 100%); opacity: 0; }
    to { transform: translate(-50%, 0); opacity: 1; }
  }
  .animate-slide-up {
    animation: slideUp 0.2s ease-out;
  }
`

// Inject the animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = slideUp
  document.head.appendChild(style)
}
