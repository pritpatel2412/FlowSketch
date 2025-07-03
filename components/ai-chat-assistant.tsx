"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Sparkles, Lightbulb, Zap, RefreshCw, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIChatAssistantProps {
  onGenerateFlowchart: (prompt: string) => void
  currentPrompt: string
}

export function AIChatAssistant({ onGenerateFlowchart, currentPrompt }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "👋 Hi! I'm your AI Flowchart Assistant. I can help you create amazing flowcharts by asking the right questions and providing suggestions. What process would you like to visualize today?",
      timestamp: new Date(),
      suggestions: [
        "User registration process",
        "E-commerce checkout flow",
        "Bug resolution workflow",
        "Employee onboarding process",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const smartSuggestions = [
    "Can you make it more detailed?",
    "Add error handling steps",
    "Include validation processes",
    "Add user feedback loops",
    "Make it more visual",
    "Simplify the workflow",
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  const simulateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const responses = [
      {
        content:
          "Great idea! Let me help you refine that. What specific steps should be included in this process? For example, are there any validation steps, error handling, or user notifications?",
        suggestions: [
          "Add validation steps",
          "Include error handling",
          "Add user notifications",
          "Make it more detailed",
        ],
      },
      {
        content:
          "That sounds like a complex workflow! To make it clearer, should we break it down into main phases? What's the starting point and what's the desired end result?",
        suggestions: [
          "Break into phases",
          "Define start/end points",
          "Add decision points",
          "Include parallel processes",
        ],
      },
      {
        content:
          "Excellent! I can see this workflow has multiple decision points. Would you like me to suggest some best practices for this type of process?",
        suggestions: [
          "Add best practices",
          "Include security checks",
          "Add performance optimizations",
          "Make it user-friendly",
        ],
      },
      {
        content:
          "Perfect! This process could benefit from some additional considerations. Should we include any approval steps, notifications, or rollback procedures?",
        suggestions: ["Add approval steps", "Include notifications", "Add rollback procedures", "Include monitoring"],
      },
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: randomResponse.content,
      timestamp: new Date(),
      suggestions: randomResponse.suggestions,
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const aiResponse = await simulateAIResponse(inputValue)
      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("AI response error:", error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleGenerateFromChat = async () => {
    const conversationContext = messages
      .filter((m) => m.type === "user")
      .map((m) => m.content)
      .join(" ")

    const enhancedPrompt = conversationContext || currentPrompt
    setIsGenerating(true)

    try {
      await onGenerateFlowchart(enhancedPrompt)
      toast({
        title: "Flowchart Generated! 🎉",
        description: "Created from our conversation context",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied! 📋",
      description: "Message copied to clipboard",
    })
  }

  return (
    <Card className="h-[600px] bg-white/5 border-white/10 backdrop-blur-sm flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-white">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          AI Flowchart Assistant
          <Badge variant="outline" className="ml-2 text-xs border-green-400 text-green-400">
            <Sparkles className="h-3 w-3 mr-1" />
            Smart
          </Badge>
        </CardTitle>
        <p className="text-slate-400 text-sm">Chat with AI to create better flowcharts through guided conversation</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/10 border border-white/20 text-white"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className={`p-1 rounded-full ${message.type === "user" ? "bg-white/20" : "bg-purple-500/20"}`}>
                      {message.type === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4 text-purple-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyMessage(message.content)}
                          className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs opacity-70">Quick suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs border-white/20 bg-white/5 hover:bg-white/10 text-white h-7"
                          >
                            <Lightbulb className="h-3 w-3 mr-1" />
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 rounded-full bg-purple-500/20">
                      <Bot className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Smart Suggestions Bar */}
        <div className="space-y-2">
          <p className="text-xs text-slate-400">Smart suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {smartSuggestions.slice(0, 3).map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs border-white/20 bg-white/5 hover:bg-white/10 text-white"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your flowchart..."
              className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateFromChat}
            disabled={isGenerating || messages.filter((m) => m.type === "user").length === 0}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating from Chat...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Generate Flowchart from Chat
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
