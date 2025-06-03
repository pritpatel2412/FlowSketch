"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Zap, CheckCircle, Lightbulb, TrendingUp } from "lucide-react"

interface AnalysisProps {
  flowchartCode: string
}

export function AIAnalysis({ flowchartCode }: AnalysisProps) {
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeFlowchart = async () => {
    if (!flowchartCode) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const nodeCount = (flowchartCode.match(/[A-Z]\[/g) || []).length
      const decisionCount = (flowchartCode.match(/\{.*\}/g) || []).length
      const connectionCount = (flowchartCode.match(/-->/g) || []).length

      const complexity = nodeCount > 10 ? "High" : nodeCount > 5 ? "Medium" : "Low"
      const score = Math.min(100, Math.max(60, 100 - nodeCount * 2 - decisionCount * 3))

      setAnalysis({
        score,
        complexity,
        metrics: {
          nodes: nodeCount,
          decisions: decisionCount,
          connections: connectionCount,
          depth: Math.ceil(nodeCount / 3),
        },
        suggestions: [
          "Consider adding error handling paths",
          "Group related processes into sub-flows",
          "Add validation steps for user inputs",
          "Include timeout handling for external services",
        ],
        strengths: ["Clear decision points", "Logical flow structure", "Good use of color coding"],
        improvements: [
          "Add more descriptive labels",
          "Consider parallel processing paths",
          "Include rollback procedures",
        ],
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  if (!flowchartCode) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <Brain className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-400">Generate a flowchart to see AI analysis</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-400" />
            AI Flowchart Analysis
          </div>
          <Button
            onClick={analyzeFlowchart}
            disabled={isAnalyzing}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isAnalyzing ? (
              <>
                <Zap className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Analyze
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!analysis && !isAnalyzing && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-slate-400">Click "Analyze" to get AI insights about your flowchart</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl mb-2 animate-bounce">🧠</div>
              <p className="text-white font-medium">AI is analyzing your flowchart...</p>
              <p className="text-slate-400 text-sm">Checking structure, complexity, and optimization opportunities</p>
            </div>
            <Progress value={75} className="w-full" />
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-lg">
              <div className="text-4xl font-bold text-white mb-2">{analysis.score}/100</div>
              <div className="text-lg text-slate-300 mb-2">Flowchart Quality Score</div>
              <Badge
                className={
                  analysis.score >= 80
                    ? "bg-green-500/20 text-green-400"
                    : analysis.score >= 60
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }
              >
                {analysis.complexity} Complexity
              </Badge>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{analysis.metrics.nodes}</div>
                <div className="text-xs text-slate-400">Nodes</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{analysis.metrics.decisions}</div>
                <div className="text-xs text-slate-400">Decisions</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{analysis.metrics.connections}</div>
                <div className="text-xs text-slate-400">Connections</div>
              </div>
              <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{analysis.metrics.depth}</div>
                <div className="text-xs text-slate-400">Max Depth</div>
              </div>
            </div>

            {/* Strengths */}
            <div className="space-y-3">
              <h4 className="text-white font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Strengths
              </h4>
              <div className="space-y-2">
                {analysis.strengths.map((strength: string, index: number) => (
                  <div key={index} className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    {strength}
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-3">
              <h4 className="text-white font-medium flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
                AI Suggestions
              </h4>
              <div className="space-y-2">
                {analysis.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="space-y-3">
              <h4 className="text-white font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
                Potential Improvements
              </h4>
              <div className="space-y-2">
                {analysis.improvements.map((improvement: string, index: number) => (
                  <div key={index} className="flex items-center text-sm text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {improvement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
