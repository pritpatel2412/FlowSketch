import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Making request to Gemini API...")

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Create a professional, colorful mermaid.js flowchart diagram based on this description: "${prompt}". 

CRITICAL SYNTAX REQUIREMENTS:
1. Return ONLY the mermaid code without any explanation or markdown formatting
2. Start with "graph TD" (top-down) or "graph LR" (left-right) 
3. Use SINGLE LETTER node IDs: A, B, C, D, E, F, G, H, etc.
4. Use square brackets for process nodes: A["Label text"]
5. Use curly braces for decision nodes: B{"Question?"}
6. ALWAYS add space before and after arrows: A --> B
7. Add CSS classes using :::className syntax with proper spacing
8. NO SEMICOLONS anywhere in the diagram
9. Each connection must be on its own line
10. Node IDs must be single letters followed by proper spacing
11. NEVER concatenate node IDs with brackets or braces
12. ALWAYS separate node definitions from connections

CORRECT SYNTAX EXAMPLES:
- Process node: A["Start Process"]:::startNode
- Decision node: B{"Is Valid?"}:::decisionNode  
- Connection: A --> B
- Conditional: B -->|Yes| C["Success"]:::successNode
- Conditional: B -->|No| D["Error"]:::errorNode

REQUIRED PROFESSIONAL COLOR CLASSES:
- startNode: Emerald green for start points
- processNode: Professional blue for main processes  
- decisionNode: Amber orange for decision points
- endNode: Clean red for endpoints
- errorNode: Dark red for error handling
- successNode: Bright green for success states

EXAMPLE FORMAT:
graph TD
    A["Start Process"]:::startNode
    B["Validate Input"]:::processNode
    C{"Valid?"}:::decisionNode
    D["Process Data"]:::processNode
    E["Show Error"]:::errorNode
    F["Success"]:::successNode
    G["End"]:::endNode
    
    A --> B
    B --> C
    C -->|Yes| D
    C -->|No| E
    D --> F
    E --> G
    F --> G

    classDef startNode fill:#10b981,stroke:#059669,stroke-width:3px,color:#000
    classDef processNode fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff
    classDef decisionNode fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    classDef endNode fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    classDef errorNode fill:#991b1b,stroke:#7f1d1d,stroke-width:2px,color:#fff
    classDef successNode fill:#22c55e,stroke:#16a34a,stroke-width:2px,color:#000

Generate the professional flowchart now:`,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API request failed:", response.status, errorText)
      return NextResponse.json({ error: `API request failed: ${response.status}` }, { status: 500 })
    }

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Unexpected response structure:", data)
      return NextResponse.json({ error: "Unexpected response structure from API" }, { status: 500 })
    }

    let flowchartText = data.candidates[0].content.parts[0].text

    // Clean up the response
    flowchartText = flowchartText
      .replace(/```mermaid/g, "")
      .replace(/```/g, "")
      .trim()

    // Enhanced syntax fixing
    const cleanedFlowchart = fixMermaidSyntax(flowchartText)

    return NextResponse.json({ flowchart: cleanedFlowchart })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}

function fixMermaidSyntax(mermaidCode: string): string {
  console.log("Original code:", mermaidCode)

  const fixed = mermaidCode

  // Split into lines and clean each one
  const lines = fixed
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const processedLines: string[] = []
  const nodeDefinitions: string[] = []
  const connections: string[] = []
  const classDefinitions: string[] = []

  let graphLine = ""

  for (let line of lines) {
    // Handle graph declaration
    if (line.startsWith("graph")) {
      graphLine = line
      continue
    }

    // Handle class definitions
    if (line.startsWith("classDef")) {
      classDefinitions.push(line)
      continue
    }

    // Clean the line
    line = line.replace(/;/g, "") // Remove semicolons
    line = line.replace(/\s+/g, " ") // Normalize spaces

    // Check if it's a connection line (contains -->)
    if (line.includes("-->")) {
      // Fix spacing around arrows
      line = line.replace(/\s*-->\s*/g, " --> ")

      // Handle conditional connections with labels
      line = line.replace(/-->\s*\|\s*([^|]+)\s*\|\s*/g, " -->|$1| ")

      connections.push(line)
    } else if (line.includes("[") || line.includes("{")) {
      // This is a node definition
      // Fix concatenated node IDs and class definitions
      line = fixNodeDefinition(line)
      nodeDefinitions.push(line)
    }
  }

  // Reconstruct the flowchart
  const result: string[] = []

  // Add graph declaration
  if (graphLine) {
    result.push(graphLine)
  } else {
    result.push("graph TD")
  }

  // Add node definitions
  if (nodeDefinitions.length > 0) {
    nodeDefinitions.forEach((node) => {
      result.push("    " + node)
    })
    result.push("") // Empty line for separation
  }

  // Add connections
  if (connections.length > 0) {
    connections.forEach((connection) => {
      result.push("    " + connection)
    })
    result.push("") // Empty line for separation
  }

  // Add class definitions
  if (classDefinitions.length === 0) {
    // Add default professional styling
    result.push("    classDef startNode fill:#10b981,stroke:#059669,stroke-width:3px,color:#000,font-weight:bold")
    result.push("    classDef processNode fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff,font-weight:500")
    result.push("    classDef decisionNode fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff,font-weight:500")
    result.push("    classDef endNode fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff,font-weight:bold")
    result.push("    classDef errorNode fill:#991b1b,stroke:#7f1d1d,stroke-width:2px,color:#fff,font-weight:500")
    result.push("    classDef successNode fill:#22c55e,stroke:#16a34a,stroke-width:2px,color:#000,font-weight:bold")
  } else {
    classDefinitions.forEach((classDef) => {
      result.push("    " + classDef)
    })
  }

  const finalCode = result.join("\n")
  console.log("Fixed code:", finalCode)

  return finalCode
}

function fixNodeDefinition(line: string): string {
  // Handle concatenated patterns like: A["Label"]:::classNameB["Next"]
  // Split on class definitions first
  const parts = line.split(":::")

  if (parts.length === 1) {
    // No class definition, just return the line
    return line
  }

  const result: string[] = []

  for (let i = 0; i < parts.length; i++) {
    if (i === 0) {
      // First part contains the node definition
      result.push(parts[i].trim())
    } else {
      // Subsequent parts contain class name and possibly next node
      const part = parts[i].trim()

      // Check if this part has a node definition concatenated
      const match = part.match(/^([a-zA-Z]+)([A-Z]\[.*)$/)
      if (match) {
        // Split: className + nextNodeDefinition
        const className = match[1]
        const nextNode = match[2]

        // Complete the previous node with its class
        result[result.length - 1] += ":::" + className

        // Add the next node
        result.push(nextNode)
      } else {
        // Just a class name
        result[result.length - 1] += ":::" + part
      }
    }
  }

  return result.join("\n    ")
}
