"use client"

import { MoonIcon, SunIcon, Github, Twitter, Linkedin, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl blur-xl"></div>

      <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start mb-2">
              <div className="relative">
                <Zap className="h-8 w-8 text-blue-400 mr-3" />
                <div className="absolute inset-0 h-8 w-8 text-blue-400 animate-pulse mr-3"></div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                FlowSketch
              </h1>
              <span className="ml-2 px-2 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                PRO
              </span>
            </div>
            <p className="text-slate-300 text-lg font-medium">
              Transform your ideas into stunning, professional flowcharts instantly
            </p>
            <p className="text-slate-400 text-sm mt-1">Powered by AI • Beautiful Colors • Export Ready</p>

            {/* Creator Attribution */}
            <div className="mt-3 flex items-center justify-center lg:justify-start text-sm text-slate-400">
              <span className="mr-2">Created by</span>
              <a
                href="https://github.com/Prit123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Prit Patel
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Social Links */}
            <div className="flex items-center space-x-2 mr-4">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm group"
              >
                <a
                  href="https://github.com/Prit123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm group"
              >
                <a
                  href="https://x.com/Prit__2412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Twitter className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="icon"
                asChild
                className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm group"
              >
                <a
                  href="https://www.linkedin.com/in/prit-patel-904272307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
