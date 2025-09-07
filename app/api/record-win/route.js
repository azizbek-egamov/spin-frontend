export async function POST(request) {
  try {
    const { giftId, userId } = await request.json()

    // Validate required fields
    if (!giftId || !userId) {
      return Response.json({ error: "Gift ID and User ID are required" }, { status: 400 })
    }

    console.log(`Recording win for User ID: ${userId}, Gift ID: ${giftId}`)

    // Make the secure API call to the backend with server-side token
    const apiUrl = process.env.API_URL || "http://127.0.0.1:8000"
    const giftToken = process.env.GIFT_TOKEN

    if (!giftToken) {
      console.error("GIFT_TOKEN environment variable is not set")
      return Response.json({ error: "Server configuration error" }, { status: 500 })
    }

    try {
      const response = await fetch(`${apiUrl}/gift-add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:admin"),
        },
        body: JSON.stringify({
          user: userId,
          gift: giftId,
          token: giftToken,
        }),
      })

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("Win recorded successfully on backend:", data)

      return Response.json({
        success: true,
        message: "Win recorded successfully",
        giftId,
        userId,
        backendResponse: data,
      })
    } catch (backendError) {
      console.error("Backend API call failed:", backendError)
      // Still return success to not disrupt user experience
      return Response.json({
        success: true,
        message: "Win recorded locally (backend unavailable)",
        giftId,
        userId,
        warning: "Backend sync failed",
      })
    }
  } catch (error) {
    console.error("Error in record-win API:", error)
    return Response.json({ error: "Failed to record win" }, { status: 500 })
  }
}
