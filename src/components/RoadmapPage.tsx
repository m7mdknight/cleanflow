interface RoadmapPageProps {
  title: string
  description: string
  quarter: string
  track: string
  status: 'done' | 'in-progress' | 'planned'
}

export default function RoadmapPage({ title, description, quarter, track, status }: RoadmapPageProps) {
  const statusConfig = {
    done: { label: 'Done', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
    'in-progress': { label: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    planned: { label: 'Planned', color: 'text-[#71717a]', bg: 'bg-[#18181b] border-[#27272a]' },
  }

  const s = statusConfig[status]

  return (
    <div className="min-h-full p-8">
      <div className="max-w-3xl">
        {/* Status badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-6 ${s.bg} ${s.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'done' ? 'bg-green-400' : status === 'in-progress' ? 'bg-blue-400 animate-pulse' : 'bg-[#71717a]'}`} />
          {s.label}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight mb-3">{title}</h1>
        <p className="text-[#a1a1aa] text-base mb-8">{description}</p>

        {/* Meta */}
        <div className="flex gap-6 mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Quarter</p>
            <p className="text-sm">{quarter}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Track</p>
            <p className="text-sm">{track}</p>
          </div>
        </div>

        {/* Coming soon / placeholder */}
        {status === 'planned' && (
          <div className="border border-[#27272a] rounded-lg p-6 bg-[#111113]">
            <p className="text-sm text-[#71717a]">Coming in {quarter}. Building starts after previous items ship.</p>
          </div>
        )}

        {status === 'in-progress' && (
          <div className="border border-blue-500/30 rounded-lg p-6 bg-blue-500/5">
            <p className="text-sm text-blue-400 mb-2">Now building.</p>
            <div className="space-y-2">
              <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '35%' }} />
              </div>
              <p className="text-xs text-[#71717a]">Active development — scaffolding, schema, and core UI</p>
            </div>
          </div>
        )}

        {status === 'done' && (
          <div className="border border-green-500/30 rounded-lg p-6 bg-green-500/5">
            <p className="text-sm text-green-400">Shipped and verified.</p>
          </div>
        )}
      </div>
    </div>
  )
}
