import { NextResponse } from "next/server"

// In-memory storage for demo (in production, use a database)
const subscribers = new Map<
  string,
  {
    email: string
    subscribedAt: Date
    confirmed: boolean
    interests: string[]
  }
>()

export async function POST(request: Request) {
  try {
    const { email, interests = [] } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if already subscribed
    if (subscribers.has(email)) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed! We'll notify you when collaboration features are ready.",
        alreadySubscribed: true,
      })
    }

    // Add subscriber
    subscribers.set(email, {
      email,
      subscribedAt: new Date(),
      confirmed: true, // Auto-confirm for demo
      interests,
    })

    console.log(`New subscriber: ${email}`)
    console.log(`Total subscribers: ${subscribers.size}`)

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed! You'll be the first to know when collaboration features are available.",
      subscriberCount: subscribers.size,
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: `Failed to subscribe: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      stats: {
        totalSubscribers: subscribers.size,
        recentSubscribers: Array.from(subscribers.values())
          .sort((a, b) => b.subscribedAt.getTime() - a.subscribedAt.getTime())
          .slice(0, 5)
          .map((sub) => ({
            email: sub.email.replace(/(.{2}).*(@.*)/, "$1***$2"), // Mask email for privacy
            subscribedAt: sub.subscribedAt,
          })),
      },
    })
  } catch (error) {
    console.error("Newsletter stats error:", error)
    return NextResponse.json(
      { error: `Failed to get stats: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
