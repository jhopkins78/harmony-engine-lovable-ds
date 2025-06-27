
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      datasets: {
        Row: {
          id: string
          name: string
          uploaded_at: string
          status: 'uploading' | 'processing' | 'completed' | 'failed'
          agent_status_map: Record<string, 'pending' | 'running' | 'completed' | 'failed'>
          file_refs: string[]
        }
        Insert: {
          id?: string
          name: string
          uploaded_at?: string
          status?: 'uploading' | 'processing' | 'completed' | 'failed'
          agent_status_map?: Record<string, 'pending' | 'running' | 'completed' | 'failed'>
          file_refs?: string[]
        }
        Update: {
          id?: string
          name?: string
          uploaded_at?: string
          status?: 'uploading' | 'processing' | 'completed' | 'failed'
          agent_status_map?: Record<string, 'pending' | 'running' | 'completed' | 'failed'>
          file_refs?: string[]
        }
      }
      pipeline_runs: {
        Row: {
          id: string
          dataset_id: string
          started_at: string
          completed_at: string | null
          status: 'running' | 'completed' | 'failed'
          agent_runtimes: Record<string, number>
        }
        Insert: {
          id?: string
          dataset_id: string
          started_at?: string
          completed_at?: string | null
          status?: 'running' | 'completed' | 'failed'
          agent_runtimes?: Record<string, number>
        }
        Update: {
          id?: string
          dataset_id?: string
          started_at?: string
          completed_at?: string | null
          status?: 'running' | 'completed' | 'failed'
          agent_runtimes?: Record<string, number>
        }
      }
      metrics: {
        Row: {
          id: string
          pipeline_run_id: string
          agent: string
          metric_key: string
          value: string
          type: 'number' | 'string' | 'chart'
          created_at: string
        }
        Insert: {
          id?: string
          pipeline_run_id: string
          agent: string
          metric_key: string
          value: string
          type: 'number' | 'string' | 'chart'
          created_at?: string
        }
        Update: {
          id?: string
          pipeline_run_id?: string
          agent?: string
          metric_key?: string
          value?: string
          type?: 'number' | 'string' | 'chart'
          created_at?: string
        }
      }
      agent_logs: {
        Row: {
          id: string
          agent: string
          dataset_id: string
          timestamp: string
          log_level: 'info' | 'warning' | 'error'
          message: string
        }
        Insert: {
          id?: string
          agent: string
          dataset_id: string
          timestamp?: string
          log_level: 'info' | 'warning' | 'error'
          message: string
        }
        Update: {
          id?: string
          agent?: string
          dataset_id?: string
          timestamp?: string
          log_level?: 'info' | 'warning' | 'error'
          message?: string
        }
      }
      explainability: {
        Row: {
          id: string
          pipeline_run_id: string
          agent: string
          shap_values: Record<string, number>
          summary_text: string
          created_at: string
        }
        Insert: {
          id?: string
          pipeline_run_id: string
          agent: string
          shap_values: Record<string, number>
          summary_text: string
          created_at?: string
        }
        Update: {
          id?: string
          pipeline_run_id?: string
          agent?: string
          shap_values?: Record<string, number>
          summary_text?: string
          created_at?: string
        }
      }
    }
  }
}
