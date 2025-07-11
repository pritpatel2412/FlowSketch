"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowLeft,
  Code,
  Database,
  Shield,
  Clock,
  Zap,
  Brain,
  Globe,
  BarChart3,
  Star,
  TrendingUp,
  Award,
  Rocket,
  Github,
} from "lucide-react"

export default function MoreAbout() {
  const [isVisible, setIsVisible] = useState(false)
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  useEffect(() => {
    setIsVisible(true)
    // Auto-flip cards in sequence
    const timer = setTimeout(() => {
      setFlippedCards([0, 1, 2])
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const coreFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Scrape hundreds of URLs at once",
      color: "text-yellow-400",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Extract clean, usable data without the mess",
      color: "text-purple-400",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Skip complex setups or bloated tools",
      color: "text-blue-400",
    },
  ]

  const aboutFeatures = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "No-Code Solution",
      description: "Build scrapers without writing a single line of code",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Smart Data Extraction",
      description: "AI identifies and extracts the data you need automatically",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Anti-Detection",
      description: "Advanced techniques to bypass bot detection systems",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-Time Monitoring",
      description: "Track your scraping jobs with live status updates",
      color: "from-orange-400 to-red-400",
    },
  ]

  const proFeatures = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Bulk Scraping at Scale",
      description: "Process thousands of URLs simultaneously",
      detail: "Enterprise-grade infrastructure for massive data extraction projects",
      color: "from-blue-400 via-cyan-400 to-teal-400",
      bgColor: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Auto-Cleaning",
      description: "AI-powered data structuring",
      detail: "Advanced algorithms automatically clean and format your scraped data",
      color: "from-purple-400 via-pink-400 to-rose-400",
      bgColor: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "API & Dashboard",
      description: "Full analytics and control",
      detail: "RESTful API access with comprehensive dashboard and real-time analytics",
      color: "from-green-400 via-emerald-400 to-teal-400",
      bgColor: "from-green-500/20 to-emerald-500/20",
    },
  ]

  const stats = [
    {
      number: "1,000+",
      label: "URLs processed in 3 days",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-400 to-emerald-400",
    },
    {
      number: "#1",
      label: "on Lovable Launched",
      icon: <Award className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-400",
    },
    {
      number: "300+",
      label: "URLs scraped in one day",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-purple-400 to-pink-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-4000"></div>

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
      </div>

      {/* Navigation */}
      <nav className="relative z-20 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
            <ArrowLeft className="w-5 h-5" />
            <img src="/scraply-logo.png" alt="Scraply" className="w-8 h-8" />
            <span className="text-xl font-bold">Back to Waitlist</span>
          </Link>
          <div className="flex items-center space-x-6">
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
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="mb-8 flex justify-center">
              <img src="/scraply-logo.png" alt="Scraply Logo" className="w-16 h-16 animate-float-gentle" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-text-shimmer">
              More About Scraply
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to know about the future of web scraping
            </p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div
          className={`max-w-5xl mx-auto mb-20 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Journey So Far</h2>
            <p className="text-gray-400">Real numbers, real impact</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div
                    className={`text-transparent bg-gradient-to-r ${stat.color} bg-clip-text mb-4 flex justify-center`}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                  >
                    {stat.number}
                  </div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed What is Scraply */}
        <div
          className={`max-w-6xl mx-auto mb-20 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  📌 What is Scraply?
                </h2>
              </div>

              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  🧠 Scraply is a{" "}
                  <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-bold">
                    blazing-fast, open-source
                  </span>{" "}
                  web scraping tool designed for developers, indie hackers, and data pros who want clean, structured
                  data — instantly.
                </p>

                <div className="mb-8">
                  <p className="text-lg text-gray-400 mb-6">With just a few clicks, Scraply lets you:</p>
                  <div className="space-y-4">
                    {coreFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="group flex items-center space-x-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                      >
                        <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                          {feature.icon}
                        </div>
                        <span className="text-gray-300 text-lg font-medium">{feature.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/20">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    In only{" "}
                    <span className="text-purple-400 font-bold">3 days, Scraply processed over 1,000+ URLs</span> — and
                    that's just the beginning. It ranked{" "}
                    <span className="text-blue-400 font-bold">#1 on Lovable Launched</span> this week, with users
                    scraping <span className="text-green-400 font-bold">300+ URLs in just one day</span>. The traction
                    is organic, real, and growing fast.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Features Grid */}
        <div
          className={`max-w-6xl mx-auto mb-20 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Core Features</h2>
            <p className="text-gray-400">What makes Scraply special</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <CardContent className="p-6 text-center h-full flex flex-col relative z-10">
                  <div
                    className={`text-transparent bg-gradient-to-r ${feature.color} bg-clip-text mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* The Hype is Real Section */}
        <div
          className={`max-w-6xl mx-auto mb-20 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  🔥 The Hype is Real
                </h2>
              </div>

              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  🎯 Scraply is{" "}
                  <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text font-bold">
                    catching fire without a single ad
                  </span>
                  . Devs love the speed, simplicity, and open-source trust. Its clean results and no-login simplicity
                  make it instantly usable.
                </p>

                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-8 border border-orange-500/20 mb-8">
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    This isn't just another tool —{" "}
                    <span className="text-orange-400 font-bold">it's the future of fast, clean web scraping.</span>
                  </p>

                  <div className="space-y-4">
                    <p className="text-lg text-gray-400 mb-4">
                      🚀 <span className="font-semibold">Scraply Pro is coming soon</span> with premium features like:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "🌐 Bulk scraping at scale",
                        "🧠 Smart auto-cleaning",
                        "🔌 API access",
                        "📊 Dashboard & analytics",
                        "📄 Export to CSV/JSON",
                        "✨ And more surprises...",
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                          <span className="text-gray-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scraply Pro Features with Flip Cards */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Scraply Pro Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Premium features designed for enterprise-scale web scraping
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {proFeatures.map((feature, index) => (
              <div
                key={index}
                className={`flip-card transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 200 + 800}ms` }}
              >
                <div className={`flip-card-inner ${flippedCards.includes(index) ? "flipped" : ""}`}>
                  {/* Front */}
                  <Card className="flip-card-front backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl h-80 relative overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                    <CardContent className="p-8 text-center h-full flex flex-col justify-center relative z-10">
                      <div
                        className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-400 text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>

                  {/* Back */}
                  <Card className="flip-card-back backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl h-80 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgColor} opacity-50`}></div>
                    <CardContent className="p-8 text-center h-full flex flex-col justify-center relative z-10">
                      <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
                      <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{feature.detail}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Join Waitlist */}
        <div
          className={`max-w-2xl mx-auto mb-16 text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
            <CardContent className="p-10">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Join the Revolution?</h2>
              <p className="text-gray-400 mb-6">
                Don't miss out on early access to Scraply Pro. Join thousands of developers already on the waitlist.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg">
                  Join the Waitlist Now
                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-400 mb-3">Built with ❤️ by the Scraply Team</p>
            <p className="text-gray-500 text-sm">Open source, developer-first, blazing fast</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .animate-float-gentle {
          animation: floatGentle 6s ease-in-out infinite;
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
        
        .animate-text-shimmer {
          animation: textShimmer 3s ease-in-out infinite;
        }
        
        .flip-card {
          background-color: transparent;
          perspective: 1000px;
          height: 320px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        @keyframes floatGentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
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
        
        @keyframes textShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  )
}
