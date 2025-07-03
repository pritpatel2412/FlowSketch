import FlowchartGenerator from "@/components/flowchart-generator"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FlowSketch - Create Professional Flowcharts with AI | Free Online Tool",
  description:
    "Generate stunning flowcharts instantly with FlowSketch's AI-powered diagram maker. Transform your ideas into professional workflows, process maps, and business diagrams. Start free today!",
  keywords:
    "flowchart maker, AI diagram generator, workflow creator, process mapping tool, business flowcharts, free diagram software, visual planning, FlowSketch",
  openGraph: {
    title: "FlowSketch - AI Flowchart Generator | Create Diagrams Instantly",
    description:
      "Transform your ideas into professional flowcharts with AI. FlowSketch makes diagram creation effortless and beautiful.",
    images: ["/og-home.png"],
  },
  twitter: {
    title: "FlowSketch - AI Flowchart Generator",
    description: "Create professional flowcharts instantly with AI. Free online diagram maker.",
    images: ["/twitter-home.png"],
  },
}

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <FlowchartGenerator />
      </div>
    </ThemeProvider>
  )
}
