"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { HeroSection } from "./hero-section"
import { EnhancedTemplates } from "./enhanced-templates"
import { FlowchartGallery } from "./flowchart-gallery"
import { AIAnalysis } from "./ai-analysis"
import { AIChatAssistant } from "./ai-chat-assistant"
import { PresentationMode } from "./presentation-mode"
import { InteractiveTutorial } from "./interactive-tutorial"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2,
  Copy,
  Download,
  RefreshCw,
  TestTube,
  Palette,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Code,
  Share2,
  Eye,
  MessageCircle,
  Presentation,
  GraduationCap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import mermaid from "mermaid"
import { CollaborationPanel } from "./collaboration-panel"
import { useStats } from "@/hooks/use-stats"

const FlowchartGenerator = () => {
  const [prompt, setPrompt] = useState("User registration process with email verification")
  const [flowchart, setFlowchart] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [generationTime, setGenerationTime] = useState<number | null>(null)
  const [syntaxErrors, setSyntaxErrors] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("create")
  const [showTutorial, setShowTutorial] = useState(false)
  const { toast } = useToast()
  const { trackFlowchartCreated, trackApiCall, trackGenerationError } = useStats()
  const createSectionRef = useRef<HTMLDivElement>(null)

  const scrollToCreate = () => {
    createSectionRef.current?.scrollIntoView({ behavior: "smooth" })
    setActiveTab("create")
  }

  const testApiConnection = async () => {
    setIsTesting(true)
    try {
      const response = await fetch("/api/test")
      const data = await response.json()

      if (data.success) {
        toast({
          title: "API Connection Successful! ✅",
          description: `Ready to generate flowcharts`,
        })
      } else {
        toast({
          title: "API Connection Failed ❌",
          description: `Please check your configuration`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Connection Test Failed ❌",
        description: "Unable to reach the API",
        variant: "destructive",
      })
    } finally {
      setIsTesting(false)
    }
  }

  const validateMermaidSyntax = (code: string): string[] => {
    const errors: string[] = []
    const lines = code.split("\n")

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // Check for common syntax issues
      if (line.includes(":::") && line.includes("[") && !line.match(/^[A-Z]\[.*\]:::[\w]+$/)) {
        if (line.match(/:::\w+[A-Z]\[/)) {
          errors.push(`Line ${i + 1}: Concatenated node definition detected`)
        }
      }

      // Check for proper node ID format
      if ((line.includes("[") || line.includes("{")) && !line.match(/^\s*[A-Z]\s*[[{]/)) {
        errors.push(`Line ${i + 1}: Invalid node ID format`)
      }

      // Check for semicolons
      if (line.includes(";")) {
        errors.push(`Line ${i + 1}: Semicolons not allowed in Mermaid syntax`)
      }
    }

    return errors
  }

  const renderMermaidDiagram = async (mermaidCode: string): Promise<string> => {
    try {
      // Validate syntax first
      const syntaxIssues = validateMermaidSyntax(mermaidCode)
      setSyntaxErrors(syntaxIssues)

      if (syntaxIssues.length > 0) {
        console.warn("Syntax issues detected:", syntaxIssues)
      }

      const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const { svg } = await mermaid.render(diagramId, mermaidCode)
      return svg
    } catch (error) {
      console.error("Mermaid render error:", error)
      throw error
    }
  }

  const generateFlowchart = async (customPrompt?: string) => {
    const promptToUse = customPrompt || prompt
    if (!promptToUse.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description for your flowchart.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)
    setSvgContent(null)
    setSyntaxErrors([])
    const startTime = Date.now()

    // Track API call
    await trackApiCall()

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptToUse }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()

      if (!data.flowchart) {
        throw new Error("No flowchart data received from API")
      }

      setFlowchart(data.flowchart)

      try {
        const svg = await renderMermaidDiagram(data.flowchart)
        setSvgContent(svg)
        const endTime = Date.now()
        setGenerationTime(endTime - startTime)

        // Track successful flowchart creation
        await trackFlowchartCreated()

        toast({
          title: "Flowchart Generated! 🎉",
          description: `Created in ${((endTime - startTime) / 1000).toFixed(1)}s`,
        })

        // Auto-save to gallery (removed manual save feature)
        setTimeout(() => {
          autoSaveToGallery(data.flowchart, svg, promptToUse)
        }, 1000)
      } catch (mermaidError) {
        console.error("Mermaid error details:", mermaidError)

        // Try advanced syntax fixing
        const fixedCode = attemptAdvancedSyntaxFix(data.flowchart)
        if (fixedCode !== data.flowchart) {
          try {
            const svg = await renderMermaidDiagram(fixedCode)
            setSvgContent(svg)
            setFlowchart(fixedCode)
            const endTime = Date.now()
            setGenerationTime(endTime - startTime)

            // Track successful flowchart creation
            await trackFlowchartCreated()

            toast({
              title: "Flowchart Generated! 🎉",
              description: `Created with auto-fix in ${((endTime - startTime) / 1000).toFixed(1)}s`,
            })

            // Auto-save to gallery
            setTimeout(() => {
              autoSaveToGallery(fixedCode, svg, promptToUse)
            }, 1000)
            return
          } catch (secondError) {
            console.error("Second attempt failed:", secondError)
          }
        }

        // Track generation error
        await trackGenerationError()

        setError(`Mermaid syntax error: ${mermaidError instanceof Error ? mermaidError.message : "Unknown error"}`)
        toast({
          title: "Syntax Error Detected",
          description: "The generated code has syntax issues. Try a simpler prompt.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      // Track generation error
      await trackGenerationError()

      setError(error.message || "Failed to generate the flowchart")
      toast({
        title: "Generation Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Auto-save function (replaces manual save)
  const autoSaveToGallery = (code: string, svg: string, usedPrompt: string) => {
    if (!code || !svg) return

    const title = usedPrompt.slice(0, 40) + (usedPrompt.length > 40 ? "..." : "")
    const saved = localStorage.getItem("flowsketch-saved") || "[]"
    const existing = JSON.parse(saved)

    // Check if this exact flowchart already exists
    const duplicate = existing.find((f: any) => f.code === code)
    if (duplicate) return

    const newFlowchart = {
      id: Date.now().toString(),
      title,
      description: usedPrompt,
      code,
      svgContent: svg,
      createdAt: new Date(),
      category: "business",
      isStarred: false,
      views: 0,
    }

    const updated = [newFlowchart, ...existing]
    localStorage.setItem("flowsketch-saved", JSON.stringify(updated))
  }

  const attemptAdvancedSyntaxFix = (code: string): string => {
    const fixed = code

    // Split into lines and process each one
    const lines = fixed
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    const processedLines: string[] = []
    const nodeDefinitions: string[] = []
    const connections: string[] = []
    const classDefinitions: string[] = []

    let graphLine = ""

    for (let line of lines) {
      // Handle graph declaration
      if (line.startsWith("graph")) {
        graphLine = line
        continue
      }

      // Handle class definitions
      if (line.startsWith("classDef")) {
        classDefinitions.push(line)
        continue
      }

      // Clean the line
      line = line.replace(/;/g, "") // Remove semicolons
      line = line.replace(/\s+/g, " ") // Normalize spaces

      // Check if it's a connection line (contains -->)
      if (line.includes("-->")) {
        // Fix spacing around arrows
        line = line.replace(/\s*-->\s*/g, " --> ")
        connections.push(line)
      } else if (line.includes("[") || line.includes("{")) {
        // This is a node definition - fix concatenated issues
        const fixedNodes = fixConcatenatedNodes(line)
        nodeDefinitions.push(...fixedNodes)
      }
    }

    // Reconstruct the flowchart
    const result: string[] = []

    // Add graph declaration
    if (graphLine) {
      result.push(graphLine)
    } else {
      result.push("graph TD")
    }

    // Add node definitions
    if (nodeDefinitions.length > 0) {
      nodeDefinitions.forEach((node) => {
        result.push("    " + node)
      })
      result.push("") // Empty line for separation
    }

    // Add connections
    if (connections.length > 0) {
      connections.forEach((connection) => {
        result.push("    " + connection)
      })
      result.push("") // Empty line for separation
    }

    // Add class definitions
    if (classDefinitions.length === 0) {
      // Add default professional styling
      result.push("    classDef startNode fill:#10b981,stroke:#059669,stroke-width:3px,color:#000,font-weight:bold")
      result.push("    classDef processNode fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff,font-weight:500")
      result.push("    classDef decisionNode fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff,font-weight:500")
      result.push("    classDef endNode fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff,font-weight:bold")
      result.push("    classDef errorNode fill:#991b1b,stroke:#7f1d1d,stroke-width:2px,color:#fff,font-weight:500")
      result.push("    classDef successNode fill:#22c55e,stroke:#16a34a,stroke-width:2px,color:#000,font-weight:bold")
    } else {
      classDefinitions.forEach((classDef) => {
        result.push("    " + classDef)
      })
    }

    return result.join("\n")
  }

  const fixConcatenatedNodes = (line: string): string[] => {
    const nodes: string[] = []

    // Pattern: A["Label"]:::classNameB["Next Label"]:::className2
    // Split on class definitions and handle concatenation
    const parts = line.split(":::")

    if (parts.length === 1) {
      // No class definition, just return the line
      return [line]
    }

    let currentNode = parts[0].trim()

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i].trim()

      // Check if this part has a node definition concatenated
      const match = part.match(/^([a-zA-Z]+)([A-Z][[{].*)$/)
      if (match) {
        // Split: className + nextNodeDefinition
        const className = match[1]
        const nextNode = match[2]

        // Complete the current node with its class
        nodes.push(currentNode + ":::" + className)

        // Start the next node
        currentNode = nextNode
      } else {
        // Just a class name for the current node
        nodes.push(currentNode + ":::" + part)
        currentNode = ""
      }
    }

    // Add any remaining node
    if (currentNode) {
      nodes.push(currentNode)
    }

    return nodes
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(flowchart)
    toast({
      title: "Copied! 📋",
      description: "Flowchart code copied to clipboard",
    })
  }

  const downloadSvg = () => {
    if (!svgContent) return

    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `flowchart-${Date.now()}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded! 💾",
      description: "Professional flowchart saved",
    })
  }

  // Load from gallery function
  const handleLoadFromGallery = (code: string, description: string) => {
    setFlowchart(code)
    setPrompt(description)
    setActiveTab("create")

    // If there's code, try to render it
    if (code) {
      renderMermaidDiagram(code)
        .then((svg) => {
          setSvgContent(svg)
          toast({
            title: "Flowchart Loaded! ✏️",
            description: "Ready for editing",
          })
        })
        .catch((error) => {
          console.error("Failed to render loaded flowchart:", error)
          toast({
            title: "Load Warning",
            description: "Flowchart loaded but preview failed to render",
            variant: "destructive",
          })
        })
    }
  }

  const shareFlowchart = async () => {
    if (!flowchart || !svgContent) return

    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flowchartCode: flowchart,
          svgContent,
          isPublic: true,
          title: prompt.slice(0, 50),
        }),
      })

      const data = await response.json()

      if (data.success) {
        navigator.clipboard.writeText(data.shareUrl)
        toast({
          title: "Share Link Created! 🔗",
          description: "Link copied to clipboard",
        })
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to create share link",
        variant: "destructive",
      })
    }
  }

  const retryGeneration = () => {
    if (prompt.trim()) {
      generateFlowchart()
    }
  }

  const handleTemplateSelect = (templatePrompt: string) => {
    setPrompt(templatePrompt)
    setActiveTab("create")
    toast({
      title: "Template Selected! ✨",
      description: "Ready to generate professional flowchart",
    })
  }

  const handleTutorialComplete = () => {
    toast({
      title: "Tutorial Complete! 🎉",
      description: "You're ready to create amazing flowcharts!",
    })
  }

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <InteractiveTutorial onComplete={handleTutorialComplete} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        {/* Hero Section */}
        <HeroSection onGetStarted={scrollToCreate} />

        {/* Tutorial Button */}
        <div className="mb-8 text-center">
          <Button
            onClick={() => {
              localStorage.removeItem("flowsketch-tutorial-completed")
              window.location.reload()
            }}
            variant="outline"
            className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Restart Tutorial
          </Button>
        </div>

        {/* Main Content */}
        <div ref={createSectionRef}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-6 bg-white/5 border border-white/10 backdrop-blur-sm">
              <TabsTrigger value="create" className="data-[state=active]:bg-white/10 transition-all duration-200">
                <Zap className="h-4 w-4 mr-2" />
                Create
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-white/10 transition-all duration-200">
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-white/10 transition-all duration-200">
                <Sparkles className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-white/10 transition-all duration-200">
                <Eye className="h-4 w-4 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="present" className="data-[state=active]:bg-white/10 transition-all duration-200">
                <Presentation className="h-4 w-4 mr-2" />
                Present
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-white/10 transition-all duration-200">
                <Code className="h-4 w-4 mr-2" />
                Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-8">
              {/* Input Section */}
              <Card className="shadow-2xl bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Header with API Test */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                          <Palette className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">Create Your Flowchart</h2>
                          <p className="text-slate-400">Describe your process and watch AI create magic</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={testApiConnection}
                        disabled={isTesting}
                        className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
                      >
                        {isTesting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Testing...
                          </>
                        ) : (
                          <>
                            <TestTube className="mr-2 h-4 w-4" />
                            Test API
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Input Area */}
                    <div className="space-y-4">
                      <label htmlFor="prompt" className="block text-sm font-medium text-slate-300">
                        Describe your process or workflow
                      </label>
                      <Textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Example: User registration process with email verification, password validation, and welcome email..."
                        className="min-h-[120px] resize-none bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                      />
                      <Button
                        onClick={() => generateFlowchart()}
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                            Generating Professional Flowchart...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-3 h-5 w-5" />
                            Generate Professional Flowchart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Output Section */}
              <Card className="shadow-2xl bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Header with Actions */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Your Professional Flowchart</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          {generationTime && (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Generated in {(generationTime / 1000).toFixed(1)}s
                            </div>
                          )}
                          {svgContent && (
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
                              Auto-saved to gallery
                            </div>
                          )}
                          {syntaxErrors.length > 0 && (
                            <div className="flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1 text-yellow-400" />
                              {syntaxErrors.length} syntax warning{syntaxErrors.length > 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {error && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={retryGeneration}
                          className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 transition-all duration-200 bg-transparent"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={shareFlowchart}
                        disabled={!flowchart || !svgContent}
                        className="border-green-500/50 text-green-400 hover:bg-green-500/10 transition-all duration-200 bg-transparent"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        disabled={!flowchart}
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-all duration-200 bg-transparent"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadSvg}
                        disabled={!svgContent}
                        className="border-green-500/50 text-green-400 hover:bg-green-500/10 transition-all duration-200 bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download SVG
                      </Button>
                    </div>
                  </div>

                  {/* Syntax Warnings */}
                  {syntaxErrors.length > 0 && (
                    <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center mb-2">
                        <Code className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="text-sm font-medium text-yellow-400">Syntax Warnings Detected</span>
                      </div>
                      <ul className="text-xs text-yellow-300 space-y-1">
                        {syntaxErrors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Flowchart Display */}
                  <div className="relative">
                    <div className="border border-white/20 rounded-2xl p-6 min-h-[500px] bg-white/95 backdrop-blur-sm shadow-inner">
                      {error ? (
                        <div className="w-full h-full flex flex-col items-center justify-center text-red-500 space-y-4">
                          <AlertCircle className="h-16 w-16" />
                          <div className="text-center">
                            <p className="font-medium text-lg">{error}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={retryGeneration}
                              className="mt-4 border-red-500/50 text-red-500 hover:bg-red-500/10 bg-transparent"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Try Again
                            </Button>
                          </div>
                        </div>
                      ) : svgContent ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                          <div className="text-center space-y-6">
                            <div className="relative">
                              <Palette className="mx-auto h-20 w-20 text-slate-400" />
                              <div className="absolute inset-0 h-20 w-20 mx-auto text-slate-400 animate-pulse"></div>
                            </div>
                            <div>
                              <p className="text-xl font-semibold">Ready to create something amazing?</p>
                              <p className="text-sm mt-2 text-slate-400">
                                Your professional flowchart will appear here
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Color Legend */}
                  {svgContent && (
                    <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Palette className="h-5 w-5 mr-2 text-blue-400" />
                        Professional Color Scheme
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                          { color: "bg-emerald-500", label: "Start Nodes", desc: "Process beginnings" },
                          { color: "bg-blue-500", label: "Process Nodes", desc: "Main operations" },
                          { color: "bg-amber-500", label: "Decision Nodes", desc: "Choice points" },
                          { color: "bg-red-500", label: "End Nodes", desc: "Process endings" },
                          { color: "bg-green-600", label: "Success Nodes", desc: "Positive outcomes" },
                          { color: "bg-red-800", label: "Error Nodes", desc: "Error handling" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className={`w-4 h-4 ${item.color} rounded-full shadow-lg`}></div>
                            <div>
                              <div className="text-sm font-medium text-white">{item.label}</div>
                              <div className="text-xs text-slate-400">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Debug Code View */}
                  {flowchart && (
                    <details className="mt-6">
                      <summary className="text-sm text-slate-400 cursor-pointer hover:text-slate-300 flex items-center transition-colors duration-200">
                        <span>View Generated Mermaid Code</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          Advanced
                        </Badge>
                      </summary>
                      <div className="mt-3 p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                        <pre className="text-xs text-slate-300 overflow-auto whitespace-pre-wrap">{flowchart}</pre>
                      </div>
                    </details>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <AIChatAssistant onGenerateFlowchart={generateFlowchart} currentPrompt={prompt} />
            </TabsContent>

            <TabsContent value="templates">
              <EnhancedTemplates onSelectTemplate={handleTemplateSelect} />
            </TabsContent>

            <TabsContent value="gallery">
              <FlowchartGallery onLoadFlowchart={handleLoadFromGallery} />
            </TabsContent>

            <TabsContent value="present">
              <PresentationMode svgContent={svgContent} flowchartCode={flowchart} title={prompt.slice(0, 50)} />
            </TabsContent>

            <TabsContent value="analysis">
              <AIAnalysis flowchartCode={flowchart} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Collaboration & Sharing Panel */}
        <div className="mt-12">
          <CollaborationPanel flowchartCode={flowchart} svgContent={svgContent} />
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default FlowchartGenerator
