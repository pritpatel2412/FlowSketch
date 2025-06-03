"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Share2, Users, Link, Download, Globe, Lock, Sparkles, Zap } from "lucide-react"
import { useStats } from "@/hooks/use-stats"
import { NewsletterSignup } from "./newsletter-signup"

interface CollaborationPanelProps {
  flowchartCode: string
  svgContent: string | null
}

export function CollaborationPanel({ flowchartCode, svgContent }: CollaborationPanelProps) {
  const [isPublic, setIsPublic] = useState(true)
  const { stats, loading } = useStats()

  const shareFeatures = [
    { name: "Share Links", icon: "🔗", description: "Generate secure shareable URLs" },
    { name: "QR Codes", icon: "📱", description: "Mobile-friendly sharing" },
    { name: "Public/Private", icon: "🔒", description: "Control access permissions" },
    { name: "View Analytics", icon: "📊", description: "Track engagement metrics" },
  ]

  const exportFormats = [
    { name: "SVG", icon: "🎨", description: "Vector graphics" },
    { name: "PNG", icon: "🖼️", description: "High-res image" },
    { name: "PDF", icon: "📄", description: "Document format" },
    { name: "JSON", icon: "💾", description: "Data export" },
  ]

  const collaborationFeatures = [
    { name: "Real-time Comments", icon: "💬", description: "Add feedback directly on nodes" },
    { name: "Version History", icon: "📝", description: "Track and restore changes" },
    { name: "Live Collaboration", icon: "👥", description: "Edit together in real-time" },
    { name: "AI Suggestions", icon: "✨", description: "Get improvement recommendations" },
  ]

  return (
    <Card className="shadow-2xl bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
            <Share2 className="h-5 w-5 text-white" />
          </div>
          Collaboration & Sharing Hub
          <Badge variant="outline" className="ml-2 text-xs border-purple-400 text-purple-400">
            Coming Soon
          </Badge>
        </CardTitle>
        <p className="text-slate-400 text-sm mt-2">
          Professional sharing and collaboration features are in development. Stay tuned for these exciting
          capabilities!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Share Link Generation */}
        <div className="space-y-4 opacity-60">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Link className="h-4 w-4 mr-2 text-blue-400" />
              Smart Sharing
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className={`border-white/20 ${
                  isPublic ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                }`}
              >
                {isPublic ? <Globe className="h-3 w-3 mr-1" /> : <Lock className="h-3 w-3 mr-1" />}
                {isPublic ? "Public" : "Private"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {shareFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center space-y-2"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div className="text-center">
                  <div className="font-medium text-white text-sm">{feature.name}</div>
                  <div className="text-slate-400 text-xs">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>

          <Button disabled className="w-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-60">
            <Zap className="mr-2 h-4 w-4" />
            Generate Shareable Link
          </Button>
        </div>

        <Separator className="bg-white/10" />

        {/* Export Options */}
        <div className="space-y-4 opacity-60">
          <h3 className="text-lg font-medium text-white flex items-center">
            <Download className="h-4 w-4 mr-2 text-green-400" />
            Export & Download
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {exportFormats.map((format, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center space-y-2"
              >
                <span className="text-2xl">{format.icon}</span>
                <div className="text-center">
                  <div className="font-medium text-white text-sm">{format.name}</div>
                  <div className="text-slate-400 text-xs">{format.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Collaboration Features */}
        <div className="space-y-4 opacity-60">
          <h3 className="text-lg font-medium text-white flex items-center">
            <Users className="h-4 w-4 mr-2 text-yellow-400" />
            Team Collaboration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collaborationFeatures.map((feature, index) => (
              <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">{feature.icon}</span>
                  <span className="text-sm font-medium text-white">{feature.name}</span>
                </div>
                <p className="text-xs text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Preview */}
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-lg">
          <h4 className="text-lg font-medium text-white mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
            Coming in Future Updates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">🔗</div>
              <div className="text-sm font-medium text-white">Smart Sharing</div>
              <div className="text-xs text-slate-400">Secure links & QR codes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-1">📥</div>
              <div className="text-sm font-medium text-white">Multi-Format Export</div>
              <div className="text-xs text-slate-400">SVG, PNG, PDF & more</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">👥</div>
              <div className="text-sm font-medium text-white">Team Collaboration</div>
              <div className="text-xs text-slate-400">Real-time editing & comments</div>
            </div>
          </div>
        </div>

        {/* Enhanced Newsletter Signup */}
        <NewsletterSignup variant="featured" />
      </CardContent>
    </Card>
  )
}
