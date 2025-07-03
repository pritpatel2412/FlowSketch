"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Lock, Star, Rocket, Crown, Gem } from "lucide-react"
import { useStats } from "@/hooks/use-stats"

interface CollaborationPanelProps {
  flowchartCode: string
  svgContent: string | null
}

export function CollaborationPanel({ flowchartCode, svgContent }: CollaborationPanelProps) {
  const { stats, loading } = useStats()
  const [glowIntensity, setGlowIntensity] = useState(0)
  const [currentHint, setCurrentHint] = useState(0)

  const mysteriousHints = [
    "What if flowcharts could think, learn, and evolve with you?",
    "Imagine AI that predicts your next step before you do...",
    "What if collaboration felt like magic?",
    "Picture workflows that optimize themselves...",
    "What if your flowcharts could talk to each other?",
  ]

  useEffect(() => {
    // Breathing glow effect
    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => (prev + 1) % 100)
    }, 50)

    // Rotating hints
    const hintInterval = setInterval(() => {
      setCurrentHint((prev) => (prev + 1) % mysteriousHints.length)
    }, 4000)

    return () => {
      clearInterval(glowInterval)
      clearInterval(hintInterval)
    }
  }, [])

  return (
    <Card className="relative shadow-2xl bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-pink-900/20 border-0 backdrop-blur-xl overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10"></div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-ping"></div>

        {/* Breathing glow */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 transition-opacity duration-1000"
          style={{ opacity: 0.3 + Math.sin(glowIntensity * 0.1) * 0.2 }}
        ></div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 p-[1px]">
          <div className="w-full h-full bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-pink-900/20 rounded-xl"></div>
        </div>
      </div>

      <CardHeader className="relative pb-4 z-10">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <div className="relative p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl mr-4 shadow-2xl">
              <Sparkles className="h-6 w-6 text-white animate-spin" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl animate-pulse opacity-50"></div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Something Extraordinary
              </span>
              <p className="text-sm text-slate-300 font-normal flex items-center">
                <Gem className="h-3 w-3 mr-1 text-purple-400" />
                is being forged in our digital foundry...
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 animate-bounce shadow-lg">
              <Crown className="h-3 w-3 mr-1" />
              Soon™
            </Badge>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative space-y-8 z-10">
        {/* Enhanced Mystery Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group relative p-5 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-blue-600/20 border border-blue-400/30 rounded-2xl cursor-pointer hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce group-hover:scale-125 transition-all duration-300">
                🔗
              </div>
              <div className="text-sm font-bold text-white group-hover:text-blue-200">Quantum Links</div>
              <div className="text-xs text-slate-400 mt-1 group-hover:text-blue-300">Instant telepathy</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>

          <div className="group relative p-5 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-green-600/20 border border-green-400/30 rounded-2xl cursor-pointer hover:scale-110 hover:-rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative text-center">
              <div className="text-4xl mb-3 group-hover:animate-spin group-hover:scale-125 transition-all duration-300">
                👥
              </div>
              <div className="text-sm font-bold text-white group-hover:text-green-200">Hive Mind</div>
              <div className="text-xs text-slate-400 mt-1 group-hover:text-green-300">Collective genius</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>

          <div className="group relative p-5 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-purple-600/20 border border-purple-400/30 rounded-2xl cursor-pointer hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative text-center">
              <div className="text-4xl mb-3 group-hover:animate-pulse group-hover:scale-125 transition-all duration-300">
                🎨
              </div>
              <div className="text-sm font-bold text-white group-hover:text-purple-200">Reality Export</div>
              <div className="text-xs text-slate-400 mt-1 group-hover:text-purple-300">Beyond formats</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>

          <div className="group relative p-5 bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-yellow-600/20 border border-yellow-400/30 rounded-2xl cursor-pointer hover:scale-110 hover:-rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative text-center">
              <div className="text-4xl mb-3 group-hover:animate-bounce group-hover:scale-125 transition-all duration-300">
                🤖
              </div>
              <div className="text-sm font-bold text-white group-hover:text-yellow-200">Neural AI</div>
              <div className="text-xs text-slate-400 mt-1 group-hover:text-yellow-300">Mind reading</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Curiosity Section */}
        <div className="relative p-8 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 border border-white/20 rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all duration-700">
          {/* Multiple animated backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-ping opacity-20"></div>

          {/* Floating particles */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-80"></div>
          <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-70"></div>

          <div className="relative text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <Lock className="h-6 w-6 text-purple-400 animate-pulse" />
              <Star className="h-4 w-4 text-yellow-400 animate-spin" style={{ animationDuration: "4s" }} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                The Future Awakens
              </h3>
              <Star
                className="h-4 w-4 text-yellow-400 animate-spin"
                style={{ animationDuration: "4s", animationDirection: "reverse" }}
              />
              <Lock className="h-6 w-6 text-purple-400 animate-pulse" />
            </div>

            <p className="text-slate-200 text-base leading-relaxed max-w-lg mx-auto group-hover:text-white transition-colors duration-500">
              We're crafting something that will
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold animate-pulse">
                {" "}
                revolutionize{" "}
              </span>
              how you think about flowcharts forever.
            </p>

            {/* Rotating mysterious hints */}
            <div className="h-12 flex items-center justify-center">
              <p
                key={currentHint}
                className="text-sm text-purple-300 italic animate-fade-in max-w-md mx-auto transition-all duration-1000"
              >
                "{mysteriousHints[currentHint]}"
              </p>
            </div>

            {/* Enhanced status indicators */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center group/status hover:scale-110 transition-transform duration-300">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-ping"></div>
                <span className="text-green-300 group-hover/status:text-green-200">Neural Networks Active</span>
              </div>
              <div className="flex items-center group/status hover:scale-110 transition-transform duration-300">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-blue-300 group-hover/status:text-blue-200">Quantum Testing</span>
              </div>
              <div className="flex items-center group/status hover:scale-110 transition-transform duration-300">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-2 animate-bounce"></div>
                <span className="text-purple-300 group-hover/status:text-purple-200">Reality Bending</span>
              </div>
            </div>

            {/* Enhanced CTA button */}
            <div className="relative">
              <Button
                disabled
                className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 cursor-not-allowed overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                <Rocket className="mr-3 h-5 w-5 animate-bounce" />
                <span className="relative z-10">Unlock the Impossible</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </Button>

              {/* Floating countdown */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg">
                Soon™
              </div>
            </div>

            {/* Final mystery hook */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-slate-400 italic animate-pulse">
                <span className="text-purple-400 font-medium">Classified Intel:</span>
                It learns from every flowchart ever created...
                <span className="text-pink-400"> and dreams of new possibilities.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Visualization */}
        <div className="relative p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-sm">
          <div className="text-center space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center justify-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-400 animate-pulse" />
              Development Intensity
            </h4>

            {/* Animated progress bars */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">AI Intelligence</span>
                <span className="text-purple-400 font-mono">94%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"
                  style={{ width: "94%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Magic Coefficient</span>
                <span className="text-blue-400 font-mono">87%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"
                  style={{ width: "87%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Reality Distortion</span>
                <span className="text-green-400 font-mono">91%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"
                  style={{ width: "91%" }}
                ></div>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic pt-2">
              "When all bars reach 100%, the impossible becomes inevitable..."
            </p>
          </div>
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </Card>
  )
}
