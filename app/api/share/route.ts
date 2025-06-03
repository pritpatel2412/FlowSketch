import { NextResponse } from "next/server"

// In-memory storage for demo (in production, use a database)
const sharedFlowcharts = new Map<
  string,
  {
    id: string
    flowchartCode: string
    svgContent: string
    isPublic: boolean
    createdAt: Date
    views: number
    title?: string
  }
>()

export async function POST(request: Request) {
  try {
    const { flowchartCode, svgContent, isPublic, title } = await request.json()

    if (!flowchartCode) {
      return NextResponse.json({ error: "Flowchart code is required" }, { status: 400 })
    }

    // Generate unique share ID
    const shareId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // Store the flowchart
    const flowchartData = {
      id: shareId,
      flowchartCode,
      svgContent: svgContent || "",
      isPublic,
      createdAt: new Date(),
      views: 0,
      title: title || "Untitled Flowchart",
    }

    sharedFlowcharts.set(shareId, flowchartData)

    // Use the environment variable for the base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const shareUrl = `${baseUrl}/share/${shareId}`

    console.log(`Created share link: ${shareUrl}`)
    console.log(`Stored flowchart with ID: ${shareId}`)
    console.log(`Total stored flowcharts: ${sharedFlowcharts.size}`)

    return NextResponse.json({
      success: true,
      shareId,
      shareUrl,
      message: "Share link created successfully!",
    })
  } catch (error) {
    console.error("Share creation error:", error)
    return NextResponse.json(
      { error: `Failed to create share link: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const shareId = url.searchParams.get("id")

    console.log(`Looking for flowchart with ID: ${shareId}`)
    console.log(`Available flowcharts: ${Array.from(sharedFlowcharts.keys()).join(", ")}`)

    if (!shareId) {
      return NextResponse.json({ error: "Share ID is required" }, { status: 400 })
    }

    const flowchart = sharedFlowcharts.get(shareId)

    if (!flowchart) {
      console.log(`Flowchart not found for ID: ${shareId}`)
      return NextResponse.json({ error: "Flowchart not found" }, { status: 404 })
    }

    // Increment view count
    flowchart.views += 1
    sharedFlowcharts.set(shareId, flowchart)

    console.log(`Flowchart ${shareId} viewed. Total views: ${flowchart.views}`)

    return NextResponse.json({
      success: true,
      flowchart: {
        id: flowchart.id,
        flowchartCode: flowchart.flowchartCode,
        svgContent: flowchart.svgContent,
        isPublic: flowchart.isPublic,
        createdAt: flowchart.createdAt,
        views: flowchart.views,
        title: flowchart.title,
      },
    })
  } catch (error) {
    console.error("Share retrieval error:", error)
    return NextResponse.json(
      { error: `Failed to retrieve flowchart: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
