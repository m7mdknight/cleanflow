'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('cleanflow-theme') as Theme | null
    if (saved) {
      setTheme(saved)
      applyTheme(saved)
    }
  }, [])

  const applyTheme = (t: Theme) => {
    const root = document.documentElement
    if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.style.setProperty('--bg-base', '#0a0a0b')
      root.style.setProperty('--bg-surface', '#111113')
      root.style.setProperty('--bg-surface-2', '#18181b')
      root.style.setProperty('--border', '#27272a')
      root.style.setProperty('--text', '#fafafa')
      root.style.setProperty('--text-muted', '#a1a1aa')
      root.style.setProperty('--text-dim', '#71717a')
    } else {
      root.style.setProperty('--bg-base', '#ffffff')
      root.style.setProperty('--bg-surface', '#f5f5f5')
      root.style.setProperty('--bg-surface-2', '#e5e5e5')
      root.style.setProperty('--border', '#d4d4d4')
      root.style.setProperty('--text', '#171717')
      root.style.setProperty('--text-muted', '#525252')
      root.style.setProperty('--text-dim', '#737373')
    }
  }

  const handleThemeChange = (t: Theme) => {
    setTheme(t)
    localStorage.setItem('cleanflow-theme', t)
    applyTheme(t)
  }

  if (!mounted) return null

  const icons = {
    light: <Sun size={14} />,
    dark: <Moon size={14} />,
    system: <Monitor size={14} />,
  }

  return (
    <div className="flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-1">
      {(['light', 'dark', 'system'] as Theme[]).map(t => (
        <button
          key={t}
          onClick={() => handleThemeChange(t)}
          className={`flex items-center justify-center w-7 h-7 rounded transition-colors ${
            theme === t
              ? 'bg-[var(--bg-surface-2)] text-[var(--text)]'
              : 'text-[var(--text-dim)] hover:text-[var(--text-muted)]'
          }`}
          title={t.charAt(0).toUpperCase() + t.slice(1)}
        >
          {icons[t]}
        </button>
      ))}
    </div>
  )
}
