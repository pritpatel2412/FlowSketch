import { NextResponse } from "next/server"

// In-memory storage for demo (in production, use a database)
const stats = {
  flowchartsCreated: 0,
  activeUsers: new Set<string>(),
  lastReset: new Date(),
  totalSessions: 0,
  peakUsers: 0,
  apiCalls: 0,
  successfulGenerations: 0,
  errorCount: 0,
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      stats: {
        flowchartsCreated: stats.flowchartsCreated,
        activeUsers: stats.activeUsers.size,
        totalSessions: stats.totalSessions,
        peakUsers: stats.peakUsers,
        apiCalls: stats.apiCalls,
        successfulGenerations: stats.successfulGenerations,
        errorCount: stats.errorCount,
        lastReset: stats.lastReset,
        successRate: stats.apiCalls > 0 ? Math.round((stats.successfulGenerations / stats.apiCalls) * 100) : 100,
      },
    })
  } catch (error) {
    console.error("Stats retrieval error:", error)
    return NextResponse.json(
      { error: `Failed to retrieve stats: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const { action, userId } = await request.json()

    // Generate a simple user ID if not provided
    const userIdentifier = userId || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    switch (action) {
      case "flowchart_created":
        stats.flowchartsCreated += 1
        stats.activeUsers.add(userIdentifier)
        stats.successfulGenerations += 1
        stats.apiCalls += 1

        // Update peak users
        if (stats.activeUsers.size > stats.peakUsers) {
          stats.peakUsers = stats.activeUsers.size
        }

        console.log(
          `✅ Flowchart created successfully. Total: ${stats.flowchartsCreated}, Active users: ${stats.activeUsers.size}`,
        )
        break

      case "user_active":
        const wasNew = !stats.activeUsers.has(userIdentifier)
        stats.activeUsers.add(userIdentifier)

        if (wasNew) {
          stats.totalSessions += 1
        }

        // Update peak users
        if (stats.activeUsers.size > stats.peakUsers) {
          stats.peakUsers = stats.activeUsers.size
        }

        console.log(
          `👤 User active. Total active users: ${stats.activeUsers.size}, Total sessions: ${stats.totalSessions}`,
        )
        break

      case "api_call":
        stats.apiCalls += 1
        console.log(`🔄 API call made. Total calls: ${stats.apiCalls}`)
        break

      case "generation_error":
        stats.errorCount += 1
        stats.apiCalls += 1
        console.log(`❌ Generation error. Total errors: ${stats.errorCount}`)
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      stats: {
        flowchartsCreated: stats.flowchartsCreated,
        activeUsers: stats.activeUsers.size,
        totalSessions: stats.totalSessions,
        peakUsers: stats.peakUsers,
        apiCalls: stats.apiCalls,
        successfulGenerations: stats.successfulGenerations,
        errorCount: stats.errorCount,
        lastReset: stats.lastReset,
        successRate: stats.apiCalls > 0 ? Math.round((stats.successfulGenerations / stats.apiCalls) * 100) : 100,
      },
    })
  } catch (error) {
    console.error("Stats update error:", error)
    return NextResponse.json(
      { error: `Failed to update stats: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
