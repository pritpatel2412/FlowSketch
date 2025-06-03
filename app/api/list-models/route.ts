import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Listing available models...")

    // List available models
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const responseText = await response.text()
    console.log("Models response:", responseText)

    let parsedResponse = null
    try {
      parsedResponse = JSON.parse(responseText)
    } catch (parseError) {
      console.log("Response is not JSON")
    }

    return NextResponse.json({
      status: response.status,
      success: response.ok,
      models: parsedResponse,
    })
  } catch (error) {
    console.error("List models error:", error)
    return NextResponse.json(
      { error: `Failed to list models: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
