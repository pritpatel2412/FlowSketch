"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Presentation, Play, Pause, SkipForward, SkipBack, X, Volume2, Settings, Zap } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface PresentationModeProps {
  svgContent: string | null
  flowchartCode: string
  title: string
}

export function PresentationMode({ svgContent, flowchartCode, title }: PresentationModeProps) {
  const [isPresenting, setIsPresenting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(2000)

  // Extract nodes from flowchart code for step-by-step presentation
  const extractSteps = (code: string) => {
    const lines = code.split("\n").filter((line) => line.trim())
    const steps = []

    // Extract node definitions
    const nodeLines = lines.filter(
      (line) => (line.includes("[") || line.includes("{")) && !line.startsWith("classDef") && !line.startsWith("graph"),
    )

    // Extract connections
    const connectionLines = lines.filter((line) => line.includes("-->"))

    // Combine for presentation steps
    steps.push({
      type: "intro",
      content: "Welcome to the interactive flowchart presentation!",
      highlight: null,
    })

    nodeLines.forEach((line, index) => {
      const match = line.match(/([A-Z])\[([^\]]+)\]/)
      if (match) {
        steps.push({
          type: "node",
          content: `Step ${index + 1}: ${match[2]}`,
          highlight: match[1],
          description: `This represents: ${match[2]}`,
        })
      }
    })

    connectionLines.forEach((line, index) => {
      steps.push({
        type: "connection",
        content: `Flow ${index + 1}: ${line.trim()}`,
        highlight: null,
        description: "This shows the process flow between steps",
      })
    })

    steps.push({
      type: "conclusion",
      content: "Presentation complete! This is your complete flowchart.",
      highlight: null,
    })

    return steps
  }

  const steps = flowchartCode ? extractSteps(flowchartCode) : []

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && isPresenting) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, animationSpeed)
    }
    return () => clearInterval(interval)
  }, [isPlaying, isPresenting, steps.length, animationSpeed])

  const startPresentation = () => {
    setIsPresenting(true)
    setCurrentStep(0)
    setIsPlaying(true)
  }

  const stopPresentation = () => {
    setIsPresenting(false)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (!svgContent) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <Presentation className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-400">Generate a flowchart to enable presentation mode</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Presentation className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Presentation Mode</h3>
                <p className="text-slate-400 text-sm">Interactive step-by-step flowchart presentation</p>
              </div>
            </div>
            <Badge variant="outline" className="border-orange-400 text-orange-400">
              <Zap className="h-3 w-3 mr-1" />
              Interactive
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-300">Preview</span>
                <span className="text-xs text-slate-400">{steps.length} steps</span>
              </div>
              <div className="bg-white/90 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                <div dangerouslySetInnerHTML={{ __html: svgContent }} className="max-w-full max-h-full" />
              </div>
            </div>

            <div className="flex space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={startPresentation}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Presentation
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl h-[90vh] bg-slate-900 border-white/20">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between text-white">
                      <span>{title || "Flowchart Presentation"}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          Step {currentStep + 1} of {steps.length}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={stopPresentation}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex-1 flex flex-col space-y-4">
                    {/* Current Step Info */}
                    {steps[currentStep] && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              steps[currentStep].type === "intro"
                                ? "bg-blue-400"
                                : steps[currentStep].type === "node"
                                  ? "bg-green-400"
                                  : steps[currentStep].type === "connection"
                                    ? "bg-purple-400"
                                    : "bg-orange-400"
                            }`}
                          ></div>
                          <h4 className="text-lg font-semibold text-white">{steps[currentStep].content}</h4>
                        </div>
                        {steps[currentStep].description && (
                          <p className="text-slate-300 text-sm">{steps[currentStep].description}</p>
                        )}
                      </div>
                    )}

                    {/* Flowchart Display */}
                    <div className="flex-1 bg-white/90 rounded-xl p-6 flex items-center justify-center">
                      <div
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                        className="max-w-full max-h-full"
                        style={{
                          filter: steps[currentStep]?.highlight
                            ? `brightness(0.3) sepia(1) hue-rotate(${currentStep * 30}deg)`
                            : "none",
                        }}
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="border-white/20 bg-white/5 text-white"
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={togglePlayPause}
                        className="border-white/20 bg-white/5 text-white"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextStep}
                        disabled={currentStep === steps.length - 1}
                        className="border-white/20 bg-white/5 text-white"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center space-x-2 text-white text-sm">
                        <Volume2 className="h-4 w-4" />
                        <span>Speed:</span>
                        <select
                          value={animationSpeed}
                          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                          className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs"
                        >
                          <option value={1000}>Fast</option>
                          <option value={2000}>Normal</option>
                          <option value={3000}>Slow</option>
                        </select>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
