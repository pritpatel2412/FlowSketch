import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Testing Gemini API connection...")

    // Test the API connection with the correct model name
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
                  text: "Say hello",
                },
              ],
            },
          ],
        }),
      },
    )

    const responseText = await response.text()
    console.log("Raw response text:", responseText)

    let parsedResponse = null
    try {
      parsedResponse = JSON.parse(responseText)
    } catch (parseError) {
      console.log("Response is not JSON, returning as text")
    }

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      bodyText: responseText.substring(0, 1000),
      bodyParsed: parsedResponse,
      success: response.ok,
      modelUsed: "gemini-1.5-flash",
    })
  } catch (error) {
    console.error("Test API error:", error)
    return NextResponse.json(
      { error: `Test failed: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
