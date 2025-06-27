
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Dataset = Database['public']['Tables']['datasets']['Row']
type PipelineRun = Database['public']['Tables']['pipeline_runs']['Row']
type Metric = Database['public']['Tables']['metrics']['Row']
type AgentLog = Database['public']['Tables']['agent_logs']['Row']
type Explainability = Database['public']['Tables']['explainability']['Row']

export const useHarmonyData = (datasetId?: string) => {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [currentDataset, setCurrentDataset] = useState<Dataset | null>(null)
  const [pipelineRuns, setPipelineRuns] = useState<PipelineRun[]>([])
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([])
  const [explainability, setExplainability] = useState<Explainability[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch datasets
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const { data, error } = await supabase
          .from('datasets')
          .select('*')
          .order('uploaded_at', { ascending: false })

        if (error) throw error
        setDatasets(data || [])
        
        if (datasetId && data) {
          const dataset = data.find(d => d.id === datasetId)
          setCurrentDataset(dataset || null)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch datasets')
      }
    }

    fetchDatasets()
  }, [datasetId])

  // Fetch pipeline runs for current dataset
  useEffect(() => {
    if (!datasetId) return

    const fetchPipelineRuns = async () => {
      try {
        const { data, error } = await supabase
          .from('pipeline_runs')
          .select('*')
          .eq('dataset_id', datasetId)
          .order('started_at', { ascending: false })

        if (error) throw error
        setPipelineRuns(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pipeline runs')
      }
    }

    fetchPipelineRuns()
  }, [datasetId])

  // Fetch metrics for current dataset
  useEffect(() => {
    if (!datasetId || pipelineRuns.length === 0) return

    const fetchMetrics = async () => {
      try {
        const runIds = pipelineRuns.map(run => run.id)
        const { data, error } = await supabase
          .from('metrics')
          .select('*')
          .in('pipeline_run_id', runIds)
          .order('created_at', { ascending: false })

        if (error) throw error
        setMetrics(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics')
      }
    }

    fetchMetrics()
  }, [datasetId, pipelineRuns])

  // Fetch agent logs for current dataset
  useEffect(() => {
    if (!datasetId) return

    const fetchAgentLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('agent_logs')
          .select('*')
          .eq('dataset_id', datasetId)
          .order('timestamp', { ascending: false })
          .limit(50)

        if (error) throw error
        setAgentLogs(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch agent logs')
      }
    }

    fetchAgentLogs()
  }, [datasetId])

  // Fetch explainability data for current dataset
  useEffect(() => {
    if (!datasetId || pipelineRuns.length === 0) return

    const fetchExplainability = async () => {
      try {
        const runIds = pipelineRuns.map(run => run.id)
        const { data, error } = await supabase
          .from('explainability')
          .select('*')
          .in('pipeline_run_id', runIds)
          .order('created_at', { ascending: false })

        if (error) throw error
        setExplainability(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch explainability data')
      }
    }

    fetchExplainability()
  }, [datasetId, pipelineRuns])

  // Set up real-time subscriptions
  useEffect(() => {
    if (!datasetId) return

    const channel = supabase
      .channel('harmony-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'datasets',
          filter: `id=eq.${datasetId}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setCurrentDataset(payload.new as Dataset)
            setDatasets(prev => prev.map(d => d.id === datasetId ? payload.new as Dataset : d))
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agent_logs',
          filter: `dataset_id=eq.${datasetId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAgentLogs(prev => [payload.new as AgentLog, ...prev.slice(0, 49)])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [datasetId])

  const retryAgent = async (agentName: string) => {
    if (!datasetId) return

    try {
      const { data, error } = await supabase.functions.invoke('retry-agent', {
        body: { dataset_id: datasetId, agent_name: agentName }
      })

      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to retry agent')
      throw err
    }
  }

  const getPipelineStatus = () => {
    return currentDataset?.agent_status_map || {}
  }

  const getMetricsByAgent = (agent: string) => {
    return metrics.filter(m => m.agent === agent)
  }

  const getErrorLogs = () => {
    return agentLogs.filter(log => log.log_level === 'error')
  }

  useEffect(() => {
    setLoading(false)
  }, [datasets, currentDataset, pipelineRuns, metrics, agentLogs, explainability])

  return {
    datasets,
    currentDataset,
    pipelineRuns,
    metrics,
    agentLogs,
    explainability,
    loading,
    error,
    retryAgent,
    getPipelineStatus,
    getMetricsByAgent,
    getErrorLogs
  }
}
