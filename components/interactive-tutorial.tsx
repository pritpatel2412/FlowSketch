"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, ArrowRight, CheckCircle, Lightbulb, Zap, X, Play, BookOpen } from "lucide-react"

interface TutorialStep {
  id: string
  title: string
  description: string
  action: string
  tip: string
  completed: boolean
}

interface InteractiveTutorialProps {
  onComplete: () => void
}

export function InteractiveTutorial({ onComplete }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [steps, setSteps] = useState<TutorialStep[]>([
    {
      id: "1",
      title: "Welcome to FlowSketch PRO! 🎉",
      description: "Let's take a quick tour to help you create amazing flowcharts with AI.",
      action: 'Click "Next" to begin your journey',
      tip: "This tutorial will take about 2 minutes",
      completed: false,
    },
    {
      id: "2",
      title: "Describe Your Process 📝",
      description: "Simply describe your workflow in plain English. Our AI understands natural language!",
      action: 'Try typing: "User login process with validation"',
      tip: "Be specific about steps, decisions, and outcomes",
      completed: false,
    },
    {
      id: "3",
      title: "AI Magic Happens ✨",
      description: "Our advanced AI analyzes your description and creates a professional flowchart instantly.",
      action: 'Click the "Generate" button to see the magic',
      tip: "The AI adds colors, proper shapes, and professional styling",
      completed: false,
    },
    {
      id: "4",
      title: "Chat with AI Assistant 🤖",
      description: "Use our AI chat to refine your flowchart through conversation.",
      action: 'Ask questions like "Can you add error handling?"',
      tip: "The AI remembers context and helps improve your flowchart",
      completed: false,
    },
    {
      id: "5",
      title: "Present Your Flowchart 🎬",
      description: "Use presentation mode for step-by-step animated walkthroughs.",
      action: "Perfect for meetings and explanations",
      tip: "Control speed and highlight specific parts",
      completed: false,
    },
    {
      id: "6",
      title: "Save & Share 🚀",
      description: "Your flowcharts are automatically saved and ready to share.",
      action: "Export as SVG, share links, or present live",
      tip: "All your work is saved in the gallery",
      completed: false,
    },
  ])

  useEffect(() => {
    // Check if user has seen tutorial
    const hasSeenTutorial = localStorage.getItem("flowsketch-tutorial-completed")
    if (!hasSeenTutorial) {
      setIsVisible(true)
    }
  }, [])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const newSteps = [...steps]
      newSteps[currentStep].completed = true
      setSteps(newSteps)
      setCurrentStep((prev) => prev + 1)
    } else {
      completeTutorial()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const skipTutorial = () => {
    localStorage.setItem("flowsketch-tutorial-completed", "true")
    setIsVisible(false)
    onComplete()
  }

  const completeTutorial = () => {
    localStorage.setItem("flowsketch-tutorial-completed", "true")
    const newSteps = [...steps]
    newSteps[currentStep].completed = true
    setSteps(newSteps)
    setIsVisible(false)
    onComplete()
  }

  if (!isVisible) return null

  const progress = ((currentStep + 1) / steps.length) * 100
  const currentStepData = steps[currentStep]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-900 border-white/20 shadow-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Interactive Tutorial</h2>
                <p className="text-slate-400">Learn FlowSketch PRO in 2 minutes</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={skipTutorial} className="text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-slate-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step */}
          <div className="mb-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex-shrink-0">
                {currentStep === 0 && <Play className="h-6 w-6 text-white" />}
                {currentStep === 1 && <BookOpen className="h-6 w-6 text-white" />}
                {currentStep === 2 && <Zap className="h-6 w-6 text-white" />}
                {currentStep === 3 && <Lightbulb className="h-6 w-6 text-white" />}
                {currentStep === 4 && <Play className="h-6 w-6 text-white" />}
                {currentStep === 5 && <CheckCircle className="h-6 w-6 text-white" />}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{currentStepData.title}</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">{currentStepData.description}</p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <ArrowRight className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm font-medium text-blue-400">Action:</span>
                  </div>
                  <p className="text-sm text-slate-300">{currentStepData.action}</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 text-yellow-400 mr-2" />
                    <span className="text-xs font-medium text-yellow-400">Tip:</span>
                    <span className="text-xs text-slate-300 ml-2">{currentStepData.tip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentStep ? "bg-green-400" : index === currentStep ? "bg-blue-400" : "bg-slate-600"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={skipTutorial}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Skip Tutorial
              </Button>
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Tutorial
                  </>
                ) : (
                  <>
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
