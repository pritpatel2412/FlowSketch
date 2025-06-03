"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Eye, Download, Share2, Clock, Palette, Trash2, Star, Search, Edit, Copy, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import mermaid from "mermaid"

interface SavedFlowchart {
  id: string
  title: string
  description: string
  code: string
  svgContent: string
  createdAt: Date
  category: string
  isStarred: boolean
  views: number
}

interface FlowchartGalleryProps {
  onLoadFlowchart?: (code: string, description: string) => void
}

export function FlowchartGallery({ onLoadFlowchart }: FlowchartGalleryProps) {
  const [savedFlowcharts, setSavedFlowcharts] = useState<SavedFlowchart[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [previewSvgs, setPreviewSvgs] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()

  const categories = ["all", "business", "tech", "education", "personal", "workflow"]

  useEffect(() => {
    loadSavedFlowcharts()
  }, [])

  useEffect(() => {
    // Generate previews for all flowcharts
    generatePreviews()
  }, [savedFlowcharts])

  const loadSavedFlowcharts = () => {
    try {
      const saved = localStorage.getItem("flowsketch-saved")
      if (saved) {
        const parsed = JSON.parse(saved).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }))
        setSavedFlowcharts(parsed)
      }
    } catch (error) {
      console.error("Failed to load saved flowcharts:", error)
      toast({
        title: "Load Error",
        description: "Failed to load saved flowcharts",
        variant: "destructive",
      })
    }
  }

  const generatePreviews = async () => {
    const newPreviews: { [key: string]: string } = {}

    for (const flowchart of savedFlowcharts) {
      if (flowchart.svgContent) {
        // Use existing SVG if available
        newPreviews[flowchart.id] = flowchart.svgContent
      } else if (flowchart.code) {
        // Generate new SVG from code
        try {
          const diagramId = `preview-${flowchart.id}-${Date.now()}`
          const { svg } = await mermaid.render(diagramId, flowchart.code)
          newPreviews[flowchart.id] = svg

          // Update the flowchart with the generated SVG
          updateFlowchartSvg(flowchart.id, svg)
        } catch (error) {
          console.error(`Failed to generate preview for ${flowchart.id}:`, error)
          // Create a fallback preview
          newPreviews[flowchart.id] = createFallbackSvg(flowchart.title)
        }
      }
    }

    setPreviewSvgs(newPreviews)
  }

  const createFallbackSvg = (title: string) => {
    return `
      <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="100" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" rx="8"/>
        <text x="100" y="40" textAnchor="middle" fill="#64748b" fontFamily="Inter, sans-serif" fontSize="12">
          📊 Flowchart
        </text>
        <text x="100" y="60" textAnchor="middle" fill="#94a3b8" fontFamily="Inter, sans-serif" fontSize="10">
          ${title.slice(0, 20)}${title.length > 20 ? "..." : ""}
        </text>
      </svg>
    `
  }

  const updateFlowchartSvg = (id: string, svg: string) => {
    const updated = savedFlowcharts.map((f) => (f.id === id ? { ...f, svgContent: svg } : f))
    setSavedFlowcharts(updated)
    localStorage.setItem("flowsketch-saved", JSON.stringify(updated))
  }

  const deleteFlowchart = (id: string) => {
    const updated = savedFlowcharts.filter((f) => f.id !== id)
    setSavedFlowcharts(updated)
    localStorage.setItem("flowsketch-saved", JSON.stringify(updated))

    // Remove from previews
    const newPreviews = { ...previewSvgs }
    delete newPreviews[id]
    setPreviewSvgs(newPreviews)

    toast({
      title: "Flowchart Deleted",
      description: "Removed from your gallery",
    })
  }

  const toggleStar = (id: string) => {
    const updated = savedFlowcharts.map((f) => (f.id === id ? { ...f, isStarred: !f.isStarred } : f))
    setSavedFlowcharts(updated)
    localStorage.setItem("flowsketch-saved", JSON.stringify(updated))
  }

  const incrementViews = (id: string) => {
    const updated = savedFlowcharts.map((f) => (f.id === id ? { ...f, views: f.views + 1 } : f))
    setSavedFlowcharts(updated)
    localStorage.setItem("flowsketch-saved", JSON.stringify(updated))
  }

  const editFlowchart = (flowchart: SavedFlowchart) => {
    if (onLoadFlowchart) {
      onLoadFlowchart(flowchart.code, flowchart.description)
      toast({
        title: "Flowchart Loaded! ✏️",
        description: "Ready for editing in the Create tab",
      })
    }
  }

  const shareFlowchart = async (flowchart: SavedFlowchart) => {
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flowchartCode: flowchart.code,
          svgContent: flowchart.svgContent,
          isPublic: true,
          title: flowchart.title,
        }),
      })

      const data = await response.json()

      if (data.success) {
        navigator.clipboard.writeText(data.shareUrl)
        toast({
          title: "Share Link Created! 🔗",
          description: "Link copied to clipboard",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to create share link",
        variant: "destructive",
      })
    }
  }

  const downloadFlowchart = (flowchart: SavedFlowchart) => {
    if (!flowchart.svgContent) {
      toast({
        title: "Download Failed",
        description: "No SVG content available",
        variant: "destructive",
      })
      return
    }

    const blob = new Blob([flowchart.svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${flowchart.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}-${flowchart.id}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded! 💾",
      description: `${flowchart.title} saved as SVG`,
    })
  }

  const copyCode = (flowchart: SavedFlowchart) => {
    navigator.clipboard.writeText(flowchart.code)
    toast({
      title: "Code Copied! 📋",
      description: "Mermaid code copied to clipboard",
    })
  }

  const filteredFlowcharts = savedFlowcharts.filter((f) => {
    const matchesCategory = selectedCategory === "all" || f.category === selectedCategory
    const matchesSearch =
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort by starred first, then by creation date
  const sortedFlowcharts = filteredFlowcharts.sort((a, b) => {
    if (a.isStarred && !b.isStarred) return -1
    if (!a.isStarred && b.isStarred) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  if (savedFlowcharts.length === 0) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Saved Flowcharts Yet</h3>
          <p className="text-slate-400 mb-4">Your generated flowcharts will appear here automatically!</p>
          <Button
            onClick={() => onLoadFlowchart?.("", "User registration process with email verification")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Flowchart
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <Palette className="h-5 w-5 mr-2 text-purple-400" />
            Your Flowchart Gallery
            <Badge variant="outline" className="ml-2 text-xs">
              {savedFlowcharts.length} saved
            </Badge>
          </div>
          <Button
            onClick={() => onLoadFlowchart?.("", "")}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search flowcharts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600"
                    : "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Flowchart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFlowcharts.map((flowchart) => (
            <Card key={flowchart.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header with proper text truncation */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm leading-tight flex items-center gap-1">
                          {flowchart.isStarred && (
                            <Star className="h-3 w-3 text-yellow-400 fill-current flex-shrink-0" />
                          )}
                          <span className="truncate" title={flowchart.title}>
                            {flowchart.title}
                          </span>
                        </h4>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStar(flowchart.id)}
                        className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      >
                        <Star
                          className={`h-3 w-3 ${flowchart.isStarred ? "text-yellow-400 fill-current" : "text-slate-400"}`}
                        />
                      </Button>
                    </div>

                    {/* Description with proper line clamping */}
                    <p
                      className="text-xs text-slate-400 leading-relaxed line-clamp-2 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      title={flowchart.description}
                    >
                      {flowchart.description}
                    </p>

                    <Badge variant="outline" className="text-xs border-white/20 text-slate-400 w-fit">
                      {flowchart.category}
                    </Badge>
                  </div>

                  {/* Preview */}
                  <div
                    className="bg-white/90 rounded-lg p-3 min-h-[120px] flex items-center justify-center cursor-pointer hover:bg-white/95 transition-colors"
                    onClick={() => editFlowchart(flowchart)}
                  >
                    {previewSvgs[flowchart.id] ? (
                      <div
                        className="w-full h-full flex items-center justify-center overflow-hidden"
                        style={{ maxHeight: "100px" }}
                        dangerouslySetInnerHTML={{
                          __html: previewSvgs[flowchart.id]
                            .replace(/width="[^"]*"/, 'width="100%"')
                            .replace(/height="[^"]*"/, 'height="auto"'),
                        }}
                      />
                    ) : (
                      <div className="text-slate-600 text-center">
                        <div className="text-2xl mb-1">📊</div>
                        <div className="text-xs">Loading preview...</div>
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="truncate">{flowchart.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {flowchart.views}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editFlowchart(flowchart)}
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadFlowchart(flowchart)}
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      SVG
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => shareFlowchart(flowchart)}
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs"
                    >
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyCode(flowchart)}
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 text-xs"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Code
                    </Button>
                  </div>

                  {/* Delete Action */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteFlowchart(flowchart.id)}
                    className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedFlowcharts.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400">No flowcharts found matching your criteria</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="mt-3 border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
