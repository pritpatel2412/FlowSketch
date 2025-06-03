import FlowchartGenerator from "@/components/flowchart-generator"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <FlowchartGenerator />
      </div>
    </ThemeProvider>
  )
}
