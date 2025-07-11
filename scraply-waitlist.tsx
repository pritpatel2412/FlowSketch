"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Loader2,
  CheckCircle,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Rocket,
  Zap,
  Brain,
  BarChart3,
  ExternalLink,
  Github,
  Star,
} from "lucide-react"

export default function ScraplyWaitlist() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Scroll tracking for parallax
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setEmailError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setEmailError("")
    setIsSubmitting(true)

    try {
      const response = await fetch("https://hooks.zapier.com/hooks/catch/23751481/u3jn9k1/", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({ email }),
})


      if (response.ok) {
        setIsSubmitted(true)
        setEmail("")
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      setEmailError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const achievements = [
    {
      number: "1,000+",
      label: "URLs processed in just 3 days",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-green-400 to-emerald-400",
      description: "Lightning-fast processing power",
    },
    {
      number: "#1",
      label: "Product of the week on Lovable",
      icon: <Award className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-400",
      description: "Community favorite",
    },
    {
      number: "300+",
      label: "URLs scraped by users in one day",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-purple-400 to-pink-400",
      description: "Real user adoption",
    },
  ]

  const proFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Bulk Scraping at Scale",
      description: "Process thousands of URLs simultaneously with enterprise-grade infrastructure",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Auto-Cleaning",
      description: "Smart algorithms automatically structure and clean your scraped data",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "API & Advanced Dashboard",
      description: "Full API access with real-time analytics and team collaboration tools",
      color: "from-blue-400 to-cyan-500",
    },
  ]

  const testimonials = [
    {
      text: "Absolutely, I tried a website and the output was clean. Let's connect to get to know each other.",
      author: "Gursharan Sidhu",
      role: "LinkedIn",
      avatar: "GS",
      platform: "LinkedIn",
      verified: true,
    },
    {
      text: "Looks interesting. What are you using under the hood? And out of interest why make an open source tool and not sell it as a SaaS app (just genuinely curious)?",
      author: "Paul Towers",
      role: "Dev Community",
      avatar: "PT",
      platform: "Dev Community",
      verified: true,
    },
    {
      text: "The clean data output is exactly what I needed for my projects.",
      author: "Mike Rodriguez",
      role: "Indie Hacker",
      avatar: "MR",
      platform: "Twitter",
      verified: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white overflow-hidden relative">
      {/* Ultra Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-4000"></div>

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent animate-gradient-shift"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/scraply-logo.png" alt="Scraply" className="w-8 h-8" />
            <span className="text-xl font-bold">Scraply</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/more-about"
              className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1"
            >
              <span>More About</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/scraply"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <Badge className="mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white border-0 px-6 py-3 text-sm font-medium animate-glow hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
              Open Source • Blazing Fast • No Login Required
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent leading-tight tracking-tight animate-text-shimmer">
              Scraply Pro
            </h1>

            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-200 animate-fade-in-up animation-delay-500">
              Web Scraping, Reimagined
            </h2>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up animation-delay-700">
              The blazing-fast, open-source tool that's already processing{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text font-bold animate-pulse">
                thousands of URLs
              </span>{" "}
              with zero setup required
            </p>
          </div>
        </div>

        {/* What Scraply Did in 3 Days - Hero Stats */}
        <div
          className={`max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              🚀 What We Did in Just 3 Days
            </h2>
            <p className="text-xl text-gray-400">Organic growth that speaks for itself</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div
                    className={`text-transparent bg-gradient-to-r ${achievement.color} bg-clip-text mb-4 flex justify-center`}
                  >
                    {achievement.icon}
                  </div>
                  <div
                    className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent mb-3 animate-count-up`}
                  >
                    {achievement.number}
                  </div>
                  <p className="text-white font-semibold mb-2">{achievement.label}</p>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What is Scraply - Brief */}
        <div
          className={`max-w-4xl mx-auto mb-16 text-center transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
            <CardContent className="p-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                What is Scraply?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Scraply is the{" "}
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-bold">
                  blazing-fast, open-source
                </span>{" "}
                web scraping tool that turns any website into clean, structured data with just a few clicks.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">⚡ No Setup Required</Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">🧠 AI-Powered Cleaning</Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">🔓 Open Source</Badge>
              </div>
              <Link href="/more-about">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                  Learn More About Scraply
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Scraply Pro Preview */}
        <div
          className={`max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer">
              🔥 Coming Soon: Scraply Pro
            </h2>
            <p className="text-xl text-gray-400">Premium features for enterprise-scale scraping</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {proFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div
                    className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Proof - Testimonials */}
        <div
          className={`max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Developers Are Saying</h2>
            <div className="flex justify-center items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-400 ml-2">Loved by developers worldwide</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <p className="text-gray-300 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{testimonial.author}</p>
                        <p className="text-gray-400 text-sm">{testimonial.platform}</p>
                      </div>
                    </div>
                    {testimonial.verified && (
                      <div className="text-blue-400">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Waitlist Form - Main CTA */}
        <div
          className={`max-w-lg mx-auto mb-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="group backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <CardContent className="p-10 relative z-10">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-text-shimmer">
                      Join the Scraply Pro Waitlist
                    </h3>
                    <p className="text-gray-400 text-lg">Be the first to access premium scraping features</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-3">
                        Enter your email address
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailError("")
                          }}
                          placeholder="you@example.com"
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 h-14 text-lg backdrop-blur-sm hover:bg-white/15 focus:bg-white/15"
                          disabled={isSubmitting}
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      {emailError && <p className="text-red-400 text-sm mt-2 animate-shake">{emailError}</p>}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent text-lg group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                          Joining Waitlist...
                        </>
                      ) : (
                        <>
                          Join Waitlist - It's Free!
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </Button>
                  </form>
                  <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                      <Users className="w-4 h-4 inline mr-1" />
                      Join 5,000+ developers already on the waitlist
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center animate-fade-in py-8">
                  <div className="relative mb-6">
                    <CheckCircle className="w-24 h-24 text-green-400 mx-auto animate-bounce-gentle" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 bg-green-400/20 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-green-400 mb-4 animate-text-shimmer">🎉 You're In!</h3>
                  <p className="text-gray-300 text-xl mb-4">Welcome to the Scraply Pro waitlist</p>
                  <p className="text-gray-400 text-sm">We'll email you as soon as early access opens</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer
          className={`text-center transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="border-t border-white/10 pt-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"></div>
            <p className="text-gray-400 mb-3 text-lg relative z-10">Built with ❤️ by the Scraply Team</p>
            <p className="text-gray-500 text-sm mb-4 relative z-10">
              No spam, just early access to the future of web scraping
            </p>
            <div className="flex justify-center space-x-8 text-gray-500 text-sm relative z-10">
              <span className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                🔓 Open Source
              </span>
              <span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">⚡ Blazing Fast</span>
              <span className="hover:text-pink-400 transition-colors duration-300 cursor-pointer">
                🚀 Developer First
              </span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-float-gentle {
          animation: floatGentle 6s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          animation: gradientShift 8s ease-in-out infinite;
        }
        
        .animate-text-shimmer {
          animation: textShimmer 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        .animate-count-up {
          animation: countUp 2s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes floatGentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes bounceGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes textShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
          }
          to {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
          }
        }
        
        @keyframes countUp {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  )
}
