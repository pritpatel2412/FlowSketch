"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Sparkles, ArrowRight, Play, Download, Share2 } from "lucide-react"

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const [currentDemo, setCurrentDemo] = useState(0)

  const demoFlowcharts = [
    {
      title: "User Authentication",
      description: "Login and registration flow",
      preview:
        "graph TD\n    A[Start] --> B[Login Form]\n    B --> C{Valid?}\n    C -->|Yes| D[Dashboard]\n    C -->|No| E[Error]",
    },
    {
      title: "E-commerce Checkout",
      description: "Payment processing workflow",
      preview: "graph TD\n    A[Cart] --> B[Checkout]\n    B --> C[Payment]\n    C --> D[Confirmation]",
    },
    {
      title: "Bug Resolution",
      description: "Issue tracking and fixing",
      preview: "graph TD\n    A[Bug Report] --> B[Triage]\n    B --> C[Assign]\n    C --> D[Fix]",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoFlowcharts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered • Professional • Instant
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Transform Ideas
                  </span>
                  <br />
                  <span className="text-white">Into Flowcharts</span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                  Describe your process in plain English and watch AI create stunning, professional flowcharts
                  instantly. No design skills required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Create Your First Flowchart
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">10K+</div>
                  <div className="text-sm text-slate-400">Flowcharts Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-slate-400">Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">99%</div>
                  <div className="text-sm text-slate-400">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Demo Preview */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Live Preview</h3>
                  <div className="flex space-x-2">
                    {demoFlowcharts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentDemo ? "bg-blue-400 w-6" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-white font-medium">{demoFlowcharts[currentDemo].title}</h4>
                    <p className="text-slate-400 text-sm">{demoFlowcharts[currentDemo].description}</p>
                  </div>

                  <div className="bg-white/95 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                    <div className="text-slate-600 text-center">
                      <div className="text-4xl mb-2">🎨</div>
                      <div className="text-sm">Beautiful flowchart renders here</div>
                      <div className="text-xs text-slate-500 mt-1">{demoFlowcharts[currentDemo].title}</div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-2">
                    <Button size="sm" variant="outline" className="border-white/20 bg-white/5 text-white">
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 bg-white/5 text-white">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce">
                ✨ AI Powered
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                🚀 Instant Results
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
