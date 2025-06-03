import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        valid: false,
        error: "API key not found in environment variables",
      })
    }

    // Basic validation of API key format
    const isValidFormat = apiKey.startsWith("AIza") && apiKey.length === 39

    return NextResponse.json({
      valid: isValidFormat,
      length: apiKey.length,
      startsCorrectly: apiKey.startsWith("AIza"),
      expectedLength: apiKey.length === 39,
      firstTenChars: apiKey.substring(0, 10),
    })
  } catch (error) {
    return NextResponse.json({
      valid: false,
      error: `Validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
    })
  }
}
