import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Generate QR code using a simple API (in production, use a proper QR library)
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`

    return NextResponse.json({
      success: true,
      qrCodeUrl: qrApiUrl,
      message: "QR code generated successfully!",
    })
  } catch (error) {
    console.error("QR generation error:", error)
    return NextResponse.json(
      { error: `Failed to generate QR code: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
