"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, Share2, Download, ArrowLeft, Palette, Loader2 } from "lucide-react"
import Link from "next/link"
import mermaid from "mermaid"

interface SharedFlowchart {
  id: string
  flowchartCode: string
  svgContent: string
  isPublic: boolean
  createdAt: string
  views: number
  title: string
}

export default function SharedFlowchartPage() {
  const params = useParams()
  const [flowchart, setFlowchart] = useState<SharedFlowchart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [renderedSvg, setRenderedSvg] = useState<string | null>(null)

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: "base",
      securityLevel: "loose",
      fontFamily: "Inter, system-ui, sans-serif",
      themeVariables: {
        primaryColor: "#3b82f6",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#1d4ed8",
        lineColor: "#6b7280",
        sectionBkgColor: "#f8fafc",
        altSectionBkgColor: "#f1f5f9",
        gridColor: "#e2e8f0",
        tertiaryColor: "#ffffff",
      },
    })
  }, [])

  useEffect(() => {
    const fetchFlowchart = async () => {
      if (!params.id) {
        setError("No share ID provided")
        setLoading(false)
        return
      }

      try {
        console.log("Fetching flowchart with ID:", params.id)

        const response = await fetch(`/api/share?id=${params.id}`)
        const data = await response.json()

        console.log("API Response:", data)

        if (data.success && data.flowchart) {
          setFlowchart(data.flowchart)

          // Render the flowchart if we have the code
          if (data.flowchart.flowchartCode) {
            try {
              const diagramId = `shared-diagram-${Date.now()}`
              const { svg } = await mermaid.render(diagramId, data.flowchart.flowchartCode)
              setRenderedSvg(svg)
            } catch (renderError) {
              console.error("Failed to render flowchart:", renderError)
              // Fallback to stored SVG if available
              if (data.flowchart.svgContent) {
                setRenderedSvg(data.flowchart.svgContent)
              }
            }
          }
        } else {
          setError(data.error || "Flowchart not found")
        }
      } catch (err) {
        console.error("Fetch error:", err)
        setError("Failed to load flowchart")
      } finally {
        setLoading(false)
      }
    }

    fetchFlowchart()
  }, [params.id])

  const downloadSvg = () => {
    if (!renderedSvg) return

    const blob = new Blob([renderedSvg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${flowchart?.title || "flowchart"}-${Date.now()}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="animate-spin h-12 w-12 mx-auto mb-4 text-blue-400" />
          <p className="text-lg">Loading shared flowchart...</p>
          <p className="text-sm text-slate-400 mt-2">Share ID: {params.id}</p>
        </div>
      </div>
    )
  }

  if (error || !flowchart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-white mb-2">Flowchart Not Found</h2>
            <p className="text-slate-400 mb-4">
              {error || "This flowchart may have been deleted or the link is invalid."}
            </p>
            <p className="text-xs text-slate-500 mb-6">Share ID: {params.id}</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to FlowSketch
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to FlowSketch
            </Button>
          </Link>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3">
                    <Share2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">{flowchart.title}</h1>
                    <p className="text-sm text-slate-400">Shared FlowSketch Diagram</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {flowchart.views} views
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(flowchart.createdAt).toLocaleDateString()}
                  </div>
                  <Badge variant={flowchart.isPublic ? "default" : "secondary"}>
                    {flowchart.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Flowchart Display */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Palette className="h-5 w-5 mr-2 text-blue-400" />
                Shared Flowchart
              </h3>
              <Button
                onClick={downloadSvg}
                disabled={!renderedSvg}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download SVG
              </Button>
            </div>

            <div className="border border-white/20 rounded-xl p-6 min-h-[500px] bg-white/95 backdrop-blur-sm">
              {renderedSvg ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div dangerouslySetInnerHTML={{ __html: renderedSvg }} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <Palette className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                    <p className="text-lg font-medium">Unable to render flowchart</p>
                    <p className="text-sm mt-1">The flowchart data may be corrupted</p>
                  </div>
                </div>
              )}
            </div>

            {/* Flowchart Code */}
            <details className="mt-6">
              <summary className="text-sm text-slate-400 cursor-pointer hover:text-slate-300 flex items-center">
                <span>View Mermaid Code</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  Advanced
                </Badge>
              </summary>
              <div className="mt-3 p-4 bg-slate-900/50 border border-white/10 rounded-lg">
                <pre className="text-xs text-slate-300 overflow-auto whitespace-pre-wrap">
                  {flowchart.flowchartCode}
                </pre>
              </div>
            </details>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>Created with ❤️ using FlowSketch PRO</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Create your own flowchart →
          </Link>
        </div>
      </div>
    </div>
  )
}
