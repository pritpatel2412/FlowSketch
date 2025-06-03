"use client"

import { useState, useEffect } from "react"

interface Stats {
  flowchartsCreated: number
  activeUsers: number
  totalSessions: number
  peakUsers: number
  apiCalls: number
  successfulGenerations: number
  errorCount: number
  lastReset: string
  successRate: number
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    flowchartsCreated: 0,
    activeUsers: 0,
    totalSessions: 0,
    peakUsers: 0,
    apiCalls: 0,
    successfulGenerations: 0,
    errorCount: 0,
    lastReset: new Date().toISOString(),
    successRate: 100,
  })
  const [loading, setLoading] = useState(true)

  // Generate a simple user ID for this session
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats")
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const trackFlowchartCreated = async () => {
    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "flowchart_created",
          userId,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to track flowchart creation:", error)
    }
  }

  const trackUserActive = async () => {
    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "user_active",
          userId,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to track user activity:", error)
    }
  }

  const trackApiCall = async () => {
    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "api_call",
          userId,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to track API call:", error)
    }
  }

  const trackGenerationError = async () => {
    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "generation_error",
          userId,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to track generation error:", error)
    }
  }

  const getPlatformStatus = async () => {
    try {
      const response = await fetch("/api/status")
      const data = await response.json()
      if (data.success) {
        return data.status
      }
    } catch (error) {
      console.error("Failed to fetch platform status:", error)
    }
    return null
  }

  useEffect(() => {
    fetchStats()
    trackUserActive() // Track that this user is active

    // Refresh stats every 10 seconds
    const interval = setInterval(fetchStats, 10000)
    return () => clearInterval(interval)
  }, [])

  return {
    stats,
    loading,
    trackFlowchartCreated,
    trackUserActive,
    trackApiCall,
    trackGenerationError,
    refreshStats: fetchStats,
    getPlatformStatus,
  }
}
