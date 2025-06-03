"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Clock, Zap } from "lucide-react"

interface Template {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  popularity: number
  preview: string
  prompt: string
  tags: string[]
  icon: string
}

const templates: Template[] = [
  {
    id: "user-auth",
    title: "User Authentication Flow",
    description: "Complete login, registration, and password reset workflow",
    category: "Authentication",
    difficulty: "Beginner",
    estimatedTime: "2 min",
    popularity: 95,
    preview: "Login → Validate → Dashboard",
    prompt:
      "User authentication system with login, registration, email verification, password reset, and security checks",
    tags: ["security", "user-management", "web-app"],
    icon: "🔐",
  },
  {
    id: "ecommerce-checkout",
    title: "E-commerce Checkout Process",
    description: "Shopping cart to payment completion with error handling",
    category: "E-commerce",
    difficulty: "Intermediate",
    estimatedTime: "3 min",
    popularity: 88,
    preview: "Cart → Payment → Confirmation",
    prompt:
      "E-commerce checkout process with cart review, payment processing, inventory check, order confirmation, and shipping",
    tags: ["payment", "shopping", "business"],
    icon: "🛒",
  },
  {
    id: "ci-cd-pipeline",
    title: "CI/CD Deployment Pipeline",
    description: "Automated testing, building, and deployment workflow",
    category: "DevOps",
    difficulty: "Advanced",
    estimatedTime: "4 min",
    popularity: 82,
    preview: "Code → Test → Deploy",
    prompt:
      "CI/CD pipeline with code commit, automated testing, build process, staging deployment, approval gates, and production release",
    tags: ["devops", "automation", "deployment"],
    icon: "🚀",
  },
  {
    id: "customer-support",
    title: "Customer Support Ticket System",
    description: "Ticket creation, assignment, and resolution process",
    category: "Support",
    difficulty: "Intermediate",
    estimatedTime: "3 min",
    popularity: 76,
    preview: "Ticket → Assign → Resolve",
    prompt:
      "Customer support workflow with ticket creation, priority assignment, agent routing, escalation procedures, and resolution tracking",
    tags: ["support", "helpdesk", "customer-service"],
    icon: "🎧",
  },
  {
    id: "employee-onboarding",
    title: "Employee Onboarding Process",
    description: "Complete new hire workflow from offer to first day",
    category: "HR",
    difficulty: "Beginner",
    estimatedTime: "2 min",
    popularity: 71,
    preview: "Offer → Setup → Training",
    prompt:
      "Employee onboarding process with offer acceptance, documentation, account setup, equipment assignment, training schedule, and first-day orientation",
    tags: ["hr", "onboarding", "training"],
    icon: "🏢",
  },
  {
    id: "bug-resolution",
    title: "Software Bug Resolution",
    description: "Bug reporting, triage, fixing, and verification workflow",
    category: "Development",
    difficulty: "Intermediate",
    estimatedTime: "3 min",
    popularity: 84,
    preview: "Report → Triage → Fix → Test",
    prompt:
      "Software bug resolution workflow with bug reporting, severity assessment, developer assignment, fixing process, testing, and deployment",
    tags: ["development", "quality-assurance", "testing"],
    icon: "🐛",
  },
  {
    id: "content-approval",
    title: "Content Approval Workflow",
    description: "Content creation, review, and publishing process",
    category: "Content",
    difficulty: "Beginner",
    estimatedTime: "2 min",
    popularity: 68,
    preview: "Create → Review → Publish",
    prompt:
      "Content approval workflow with creation, editorial review, legal compliance check, stakeholder approval, and publishing",
    tags: ["content", "publishing", "approval"],
    icon: "📝",
  },
  {
    id: "data-processing",
    title: "Data Processing Pipeline",
    description: "ETL process with validation and error handling",
    category: "Data",
    difficulty: "Advanced",
    estimatedTime: "4 min",
    popularity: 79,
    preview: "Extract → Transform → Load",
    prompt:
      "Data processing pipeline with extraction from multiple sources, transformation rules, validation checks, error handling, and loading to data warehouse",
    tags: ["data", "etl", "analytics"],
    icon: "📊",
  },
]

export function EnhancedTemplates({ onSelectTemplate }: { onSelectTemplate: (prompt: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const categories = ["all", ...Array.from(new Set(templates.map((t) => t.category)))]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || template.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      Authentication: "🔐",
      "E-commerce": "🛒",
      DevOps: "🚀",
      Support: "🎧",
      HR: "🏢",
      Development: "🐛",
      Content: "📝",
      Data: "📊",
    }
    return icons[category] || "📋"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Zap className="h-5 w-5 mr-2 text-yellow-400" />
          Professional Templates
          <Badge variant="outline" className="ml-2 text-xs">
            {templates.length} templates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      : "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                  }
                >
                  {category === "all" ? "All" : `${getCategoryIcon(category)} ${category}`}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className={
                  selectedDifficulty === difficulty
                    ? "bg-gradient-to-r from-green-600 to-blue-600"
                    : "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                }
              >
                {difficulty === "all" ? "All Levels" : difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
              onClick={() => onSelectTemplate(template.prompt)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <h4 className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors">
                          {template.title}
                        </h4>
                        <p className="text-xs text-slate-400">{template.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-yellow-400">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {template.popularity}%
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">{template.description}</p>

                  {/* Preview */}
                  <div className="bg-white/10 rounded-lg p-2 text-center">
                    <div className="text-xs text-slate-400 font-mono">{template.preview}</div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(template.difficulty)}>{template.difficulty}</Badge>
                    <div className="flex items-center text-xs text-slate-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {template.estimatedTime}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-white/20 text-slate-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400">No templates found matching your criteria</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedDifficulty("all")
              }}
              className="mt-3 border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
