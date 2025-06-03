"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Loader2, CheckCircle, Users, Sparkles, Bell, Share2, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NewsletterSignupProps {
  variant?: "default" | "compact" | "featured"
  className?: string
}

export function NewsletterSignup({ variant = "default", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)
  const { toast } = useToast()

  const featureInterests = [
    { id: "sharing", label: "Smart Sharing & QR Codes", icon: "🔗" },
    { id: "collaboration", label: "Real-time Collaboration", icon: "👥" },
    { id: "export", label: "Multi-format Export", icon: "📥" },
    { id: "templates", label: "Premium Templates", icon: "✨" },
  ]

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setInterests((prev) => [...prev, interestId])
    } else {
      setInterests((prev) => prev.filter((id) => id !== interestId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          interests,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubscribed(true)
        setSubscriberCount(data.subscriberCount)

        toast({
          title: data.alreadySubscribed ? "Already Subscribed! 📧" : "Successfully Subscribed! 🎉",
          description: data.message,
        })

        if (!data.alreadySubscribed) {
          // Reset form for new subscription
          setEmail("")
          setInterests([])
        }
      } else {
        throw new Error(data.error || "Subscription failed")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
          disabled={isSubmitting || isSubscribed}
        />
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || isSubscribed || !email.trim()}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isSubscribed ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
        </Button>
      </div>
    )
  }

  if (variant === "featured") {
    return (
      <Card className={`bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 ${className}`}>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Be First to Know!</h3>
            <p className="text-slate-300">
              Get exclusive early access to collaboration features, premium templates, and advanced export options.
            </p>
            {subscriberCount && (
              <Badge variant="outline" className="mt-2 border-purple-400 text-purple-400">
                <Users className="h-3 w-3 mr-1" />
                {subscriberCount} early adopters
              </Badge>
            )}
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">What features interest you most?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featureInterests.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature.id}
                        checked={interests.includes(feature.id)}
                        onCheckedChange={(checked) => handleInterestChange(feature.id, !!checked)}
                        className="border-white/20 data-[state=checked]:bg-purple-600"
                        disabled={isSubmitting}
                      />
                      <label htmlFor={feature.id} className="text-sm text-slate-300 cursor-pointer flex items-center">
                        <span className="mr-2">{feature.icon}</span>
                        {feature.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Notify Me When Available
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-lg font-semibold text-white mb-1">You're All Set! 🎉</h4>
                <p className="text-sm text-slate-300">We'll email you as soon as collaboration features are ready.</p>
                {subscriberCount && (
                  <Badge variant="outline" className="mt-2 border-green-400 text-green-400">
                    <Users className="h-3 w-3 mr-1" />
                    {subscriberCount} subscribers and growing!
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-white/5 rounded-lg">
                  <Share2 className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400">Smart Sharing</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <Users className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400">Collaboration</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <Download className="h-5 w-5 text-green-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400">Export Options</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <div className={`text-center p-4 bg-white/5 border border-white/10 rounded-lg ${className}`}>
      <h4 className="text-white font-medium mb-2 flex items-center justify-center">
        <Bell className="h-4 w-4 mr-2 text-purple-400" />
        Stay Updated
      </h4>
      <p className="text-slate-400 text-sm mb-4">Be the first to know when collaboration features are released!</p>

      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            variant="outline"
            className="w-full border-white/20 bg-white/5 hover:bg-white/10"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Notify Me When Available
              </>
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-center text-green-400">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Subscribed Successfully!</span>
          </div>
          {subscriberCount && (
            <Badge variant="outline" className="border-green-400 text-green-400">
              <Users className="h-3 w-3 mr-1" />
              {subscriberCount} subscribers
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
