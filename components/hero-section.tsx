"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Sparkles, ArrowRight, Play, Download, Share2, Palette, Code, Rocket } from "lucide-react"

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const [currentDemo, setCurrentDemo] = useState(0)

  const demoFlowcharts = [
    {
      title: "User Authentication",
      description: "Secure login and registration flow",
      preview: "Login → Validate → Dashboard",
      icon: "🔐",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "E-commerce Checkout",
      description: "Complete payment processing",
      preview: "Cart → Payment → Confirmation",
      icon: "🛒",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Bug Resolution",
      description: "Issue tracking and fixing",
      preview: "Report → Triage → Fix → Deploy",
      icon: "🐛",
      color: "from-purple-500 to-violet-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoFlowcharts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden mb-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative backdrop-blur-sm bg-gradient-to-r from-white/5 via-white/10 to-white/5 border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <div className="flex justify-center lg:justify-start">
                  <Badge className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 px-6 py-3 text-sm font-semibold shadow-lg">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI-Powered • Professional • Instant Results
                  </Badge>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Create Stunning
                  </span>
                  <br />
                  <span className="text-white">Flowcharts</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Instantly
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                  Transform your ideas into beautiful, professional flowcharts with the power of AI. No design skills
                  required – just describe your process and watch the magic happen.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
                >
                  <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                  Start Creating Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Play className="mr-3 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                <div className="flex items-center justify-center lg:justify-start space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">AI-Powered</div>
                    <div className="text-xs text-slate-400">Smart Generation</div>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Palette className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Beautiful</div>
                    <div className="text-xs text-slate-400">Professional Design</div>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Download className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Export Ready</div>
                    <div className="text-xs text-slate-400">Multiple Formats</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Demo Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <span className="text-2xl mr-2">{demoFlowcharts[currentDemo].icon}</span>
                    Live Preview
                  </h3>
                  <div className="flex space-x-2">
                    {demoFlowcharts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          index === currentDemo
                            ? `bg-gradient-to-r ${demoFlowcharts[currentDemo].color} w-8`
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-white mb-2">{demoFlowcharts[currentDemo].title}</h4>
                    <p className="text-slate-300">{demoFlowcharts[currentDemo].description}</p>
                  </div>

                  <div className={`bg-gradient-to-br ${demoFlowcharts[currentDemo].color} p-1 rounded-2xl`}>
                    <div className="bg-white/95 rounded-xl p-6 min-h-[200px] flex items-center justify-center">
                      <div className="text-slate-700 text-center space-y-4">
                        <div className="text-5xl">{demoFlowcharts[currentDemo].icon}</div>
                        <div className="font-semibold text-lg">{demoFlowcharts[currentDemo].title}</div>
                        <div className="text-sm bg-slate-100 px-4 py-2 rounded-lg font-mono">
                          {demoFlowcharts[currentDemo].preview}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-bounce">
                ✨ AI Magic
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                🚀 Instant Results
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
