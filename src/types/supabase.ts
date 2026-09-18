export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          address: string | null
          notes: string | null
          tags: string[]
          organization_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          notes?: string | null
          tags?: string[]
          organization_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          notes?: string | null
          tags?: string[]
          organization_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          customer_id: string
          service_type: string
          date: string
          time: string
          duration: number
          cleaner_id: string | null
          status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
          notes: string | null
          address: string
          organization_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          service_type: string
          date: string
          time: string
          duration: number
          cleaner_id?: string | null
          status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
          notes?: string | null
          address: string
          organization_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          service_type?: string
          date?: string
          time?: string
          duration?: number
          cleaner_id?: string | null
          status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
          notes?: string | null
          address?: string
          organization_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      cleaners: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          status: 'active' | 'inactive'
          rating: number | null
          jobs_completed: number
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          status?: 'active' | 'inactive'
          rating?: number | null
          jobs_completed?: number
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          status?: 'active' | 'inactive'
          rating?: number | null
          jobs_completed?: number
          organization_id?: string
          created_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          customer_id: string
          amount: number
          status: 'draft' | 'sent' | 'paid' | 'overdue'
          due_date: string
          paid_at: string | null
          items: Json[]
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          amount: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue'
          due_date: string
          paid_at?: string | null
          items?: Json[]
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          amount?: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue'
          due_date?: string
          paid_at?: string | null
          items?: Json[]
          organization_id?: string
          created_at?: string
        }
      }
      inventory: {
        Row: {
          id: string
          name: string
          sku: string
          category: string
          quantity: number
          min_stock: number
          unit: string
          location: string
          cost_per_unit: number
          supplier: string | null
          last_restocked: string | null
          status: 'in-stock' | 'low-stock' | 'out-of-stock'
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          sku: string
          category: string
          quantity: number
          min_stock: number
          unit: string
          location: string
          cost_per_unit: number
          supplier?: string | null
          last_restocked?: string | null
          status?: 'in-stock' | 'low-stock' | 'out-of-stock'
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          sku?: string
          category?: string
          quantity?: number
          min_stock?: number
          unit?: string
          location?: string
          cost_per_unit?: number
          supplier?: string | null
          last_restocked?: string | null
          status?: 'in-stock' | 'low-stock' | 'out-of-stock'
          organization_id?: string
          created_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          plan: 'free' | 'pro' | 'enterprise'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          plan?: 'free' | 'pro' | 'enterprise'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          plan?: 'free' | 'pro' | 'enterprise'
          created_at?: string
        }
      }
      checklist_templates: {
        Row: {
          id: string
          title: string
          room: string
          items: Json[]
          organization_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          room: string
          items?: Json[]
          organization_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          room?: string
          items?: Json[]
          organization_id?: string
          created_at?: string
        }
      }
    }
  }
}
