export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  notes: string
  tags: string[]
  service_history: ServiceRecord[]
  created_at: string
  updated_at: string
}

export interface ServiceRecord {
  id: string
  customer_id: string
  service_type: string
  date: string
  duration: number
  cleaner: string
  notes: string
  rating: number | null
  status: 'completed' | 'cancelled' | 'no-show'
}

export interface Job {
  id: string
  customer_id: string
  customer_name: string
  service_type: string
  date: string
  time: string
  duration: number
  cleaner_id: string | null
  cleaner_name: string | null
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  notes: string
  address: string
  created_at: string
}

export interface Cleaner {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  jobs_completed: number
  rating: number | null
}

export interface Checklist {
  id: string
  job_id: string
  title: string
  room: string
  items: ChecklistItem[]
  completed: boolean
  completed_at: string | null
  completed_by: string | null
  photos: string[]
  notes: string
}

export interface ChecklistItem {
  id: string
  label: string
  completed: boolean
  photo_required: boolean
  photo_url: string | null
}

export type Track = 'core' | 'ops' | 'growth'
export type Quarter = 'Q1' | 'Q2'
export type Status = 'done' | 'in-progress' | 'planned'

export interface RoadmapItem {
  id: number
  title: string
  description: string
  quarter: Quarter
  track: Track
  status: Status
}
