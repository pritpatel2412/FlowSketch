"use client"

import { Zap, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="relative mb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl animate-pulse"></div>

      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute inset-0 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-ping opacity-20"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  FlowSketch
                </h1>
                <div className="flex items-center mt-1">
                  <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg">
                    PRO
                  </span>
                  <span className="ml-2 px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    AI-Powered
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xl lg:text-2xl text-slate-200 font-medium">
                Transform Ideas Into Professional Flowcharts
              </p>
              <p className="text-slate-400 text-sm lg:text-base">
                Powered by Advanced AI • Beautiful Design • Export Ready
              </p>
            </div>

            {/* Creator Attribution */}
            <div className="mt-4 flex items-center justify-center lg:justify-start text-sm">
              <span className="text-slate-400 mr-2">Created by</span>
              <a
                href="https://github.com/Prit123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
              >
                Prit Patel
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110 group"
              >
                <a
                  href="https://github.com/pritpatel2412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Github className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110 group"
              >
                <a
                  href="https://x.com/Prit__2412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Twitter className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110 group"
              >
                <a
                  href="https://www.linkedin.com/in/prit-patel-904272307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Linkedin className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="group">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                10K+
              </div>
              <div className="text-sm text-slate-400 font-medium">Flowcharts Created</div>
            </div>
            <div className="group">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                50+
              </div>
              <div className="text-sm text-slate-400 font-medium">Professional Templates</div>
            </div>
            <div className="group">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                99%
              </div>
              <div className="text-sm text-slate-400 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
