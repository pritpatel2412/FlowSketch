"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Server,
  Zap,
  Clock,
  Cpu,
  HardDrive,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Users,
  BarChart3,
  Globe,
  Code,
} from "lucide-react"
import { useStats } from "@/hooks/use-stats"

interface PlatformStatus {
  platform: string
  api: string
  uptime: {
    hours: number
    minutes: number
    total: string
  }
  performance: {
    apiResponseTime: number
    memoryUsage: number
    serverLoad: number
  }
  environment: {
    runtime: string
    region: string
    nodeVersion: string
  }
  timestamp: string
  version: string
  region: string
}

export function PlatformStatus() {
  const [status, setStatus] = useState<PlatformStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { stats, loading: statsLoading } = useStats()

  const fetchStatus = async () => {
    try {
      setError(null)
      const response = await fetch("/api/status")
      const data = await response.json()

      if (data.success) {
        setStatus(data.status)
        setLastUpdated(new Date())
      } else {
        // Handle API error but still show partial status
        setError(data.error)
        if (data.status) {
          setStatus(data.status)
          setLastUpdated(new Date())
        }
      }
    } catch (error) {
      console.error("Failed to fetch platform status:", error)
      setError("Failed to fetch platform status")
      // Set fallback status
      setStatus({
        platform: "Unknown",
        api: "Unknown",
        uptime: { hours: 0, minutes: 0, total: "Unknown" },
        performance: {
          apiResponseTime: 0,
          memoryUsage: 0,
          serverLoad: 0,
        },
        environment: {
          runtime: "serverless",
          region: "unknown",
          nodeVersion: "unknown",
        },
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        region: "unknown",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    // Update status every 30 seconds
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (statusText: string) => {
    switch (statusText.toLowerCase()) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case "down":
      case "not configured":
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (statusText: string) => {
    switch (statusText.toLowerCase()) {
      case "operational":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "degraded":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "down":
      case "not configured":
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatMetric = (value: number, suffix = "") => {
    if (value === 0 && error) return "N/A"
    return `${value}${suffix}`
  }

  if (loading) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-400 mr-2" />
            <span className="text-white">Checking platform status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!status) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-red-400">
            <XCircle className="h-8 w-8 mx-auto mb-2" />
            <p>Unable to fetch platform status</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchStatus}
              className="mt-3 border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-400" />
            Live Platform Status
            {error && (
              <Badge variant="outline" className="ml-2 text-xs border-yellow-400 text-yellow-400">
                Partial Data
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStatus}
            className="border-white/20 bg-white/5 hover:bg-white/10"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm text-yellow-400">Some metrics may be unavailable: {error}</span>
            </div>
          </div>
        )}

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white flex items-center">
              <Server className="h-4 w-4 mr-2 text-blue-400" />
              System Health
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Platform</span>
                <Badge className={getStatusColor(status.platform)}>
                  {getStatusIcon(status.platform)}
                  <span className="ml-1">{status.platform}</span>
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">AI API</span>
                <Badge className={getStatusColor(status.api)}>
                  {getStatusIcon(status.api)}
                  <span className="ml-1">{status.api}</span>
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white flex items-center">
              <Clock className="h-4 w-4 mr-2 text-green-400" />
              Uptime & Info
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Uptime</span>
                <span className="text-sm text-white font-mono">{status.uptime.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Version</span>
                <span className="text-sm text-white font-mono">v{status.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Runtime</span>
                <span className="text-sm text-white font-mono">{status.environment.runtime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white flex items-center">
            <Zap className="h-4 w-4 mr-2 text-yellow-400" />
            Performance Metrics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-xs text-slate-400">API Response</span>
                </div>
                <span className="text-sm font-mono text-white">
                  {formatMetric(status.performance.apiResponseTime, "ms")}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HardDrive className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-xs text-slate-400">Memory</span>
                </div>
                <span className="text-sm font-mono text-white">
                  {formatMetric(status.performance.memoryUsage, "MB")}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 text-purple-400 mr-2" />
                  <span className="text-xs text-slate-400">Load</span>
                </div>
                <span className="text-sm font-mono text-white">{formatMetric(status.performance.serverLoad, "%")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Environment Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white flex items-center">
            <Globe className="h-4 w-4 mr-2 text-cyan-400" />
            Environment Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-cyan-400 mr-2" />
                  <span className="text-xs text-slate-400">Region</span>
                </div>
                <span className="text-sm font-mono text-white">{status.region}</span>
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Code className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-xs text-slate-400">Node.js</span>
                </div>
                <span className="text-sm font-mono text-white">{status.environment.nodeVersion}</span>
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Server className="h-4 w-4 text-purple-400 mr-2" />
                  <span className="text-xs text-slate-400">Runtime</span>
                </div>
                <span className="text-sm font-mono text-white">{status.environment.runtime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Usage Stats */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-purple-400" />
            Live Usage Analytics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-400">
                {statsLoading ? "..." : stats.flowchartsCreated.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Flowcharts Created</div>
            </div>

            <div className="p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg text-center">
              <div className="text-lg font-bold text-green-400">
                {statsLoading ? "..." : stats.activeUsers.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Active Users</div>
            </div>

            <div className="p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg text-center">
              <div className="text-lg font-bold text-purple-400">
                {statsLoading ? "..." : stats.totalSessions.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Total Sessions</div>
            </div>

            <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg text-center">
              <div className="text-lg font-bold text-yellow-400">{statsLoading ? "..." : `${stats.successRate}%`}</div>
              <div className="text-xs text-slate-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-white">Peak Users</span>
              </div>
              <span className="text-lg font-bold text-blue-400">{statsLoading ? "..." : stats.peakUsers}</span>
            </div>
            <div className="text-xs text-slate-400">Highest concurrent users</div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-sm font-medium text-white">API Calls</span>
              </div>
              <span className="text-lg font-bold text-green-400">
                {statsLoading ? "..." : stats.apiCalls.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-slate-400">Total generation requests</div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-xs text-slate-500">
            Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "Never"} • Region: {status.region} •
            Auto-refresh: 30s
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
