"use client"

import { Heart, Github, Twitter, Linkedin, ExternalLink, Code, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="mt-16 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-2xl blur-xl"></div>

      <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center justify-center md:justify-start">
                <Palette className="h-5 w-5 mr-2 text-blue-400" />
                FlowSketch PRO
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Professional AI-powered flowchart generator that transforms your ideas into beautiful, color-coded
                diagrams instantly. Perfect for business, development, and documentation.
              </p>
            </div>

            {/* Features */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center justify-center">
                  <Code className="h-3 w-3 mr-2 text-green-400" />
                  AI-Powered Generation
                </li>
                <li className="flex items-center justify-center">
                  <Palette className="h-3 w-3 mr-2 text-blue-400" />
                  Professional Colors
                </li>
                <li className="flex items-center justify-center">
                  <ExternalLink className="h-3 w-3 mr-2 text-purple-400" />
                  Export Ready SVG
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-white mb-3">Connect with Prit</h3>
              <div className="flex justify-center md:justify-end space-x-3 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm group"
                >
                  <a
                    href="https://github.com/pritpatel2412"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    GitHub
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm group"
                >
                  <a
                    href="https://x.com/Prit__2412"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Twitter className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Twitter
                  </a>
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm group w-full md:w-auto"
              >
                <a
                  href="https://www.linkedin.com/in/prit-patel-904272307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Linkedin className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  LinkedIn Profile
                </a>
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center text-sm text-slate-400">
                <span>Made with</span>
                <Heart className="h-4 w-4 mx-2 text-red-400 animate-pulse" />
                <span>by</span>
                <a
                  href="https://github.com/pritpatel2412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Prit Patel
                </a>
              </div>

              <div className="text-sm text-slate-400">© 2025 FlowSketch PRO. Powered by AI & Creativity.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
