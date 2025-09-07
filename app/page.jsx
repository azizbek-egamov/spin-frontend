"use client"

import { useState, useEffect } from "react"
import SpinWheel from "../SpinWheel"

export default function Home() {
  // Add a mounted state to prevent rendering until client-side
  const [mounted, setMounted] = useState(false)
  const [prizes, setPrizes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(1)

  // Fallback prizes to use when API is not available
  const fallbackPrizes = [
    { id: 1, name: "10,000 so'm" },
    { id: 2, name: "5,000 so'm" },
    { id: 3, name: "1,000 so'm" },
    { id: 4, name: "0 so'm" },
    { id: 5, name: "20,000 so'm" },
    { id: 6, name: "0 so'm" },
    { id: 7, name: "15,000 so'm" },
    { id: 8, name: "0 so'm" },
  ]

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)

    // Add meta viewport tag for mobile devices
    if (typeof document !== "undefined") {
      const meta = document.createElement("meta")
      meta.name = "viewport"
      meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      document.getElementsByTagName("head")[0].appendChild(meta)
    }
  }, [])

  // Get user ID from URL query parameter - only run on client
  useEffect(() => {
    if (!mounted) return

    const urlParams = new URLSearchParams(window.location.search)
    const userParam = urlParams.get("user")
    if (userParam && !isNaN(Number.parseInt(userParam))) {
      setUserId(Number.parseInt(userParam))
    }
  }, [mounted])

  // Fetch prizes from backend - only run on client
  useEffect(() => {
    if (!mounted) return

    const fetchPrizes = async () => {
      try {
        setLoading(true)

        // Try to fetch gifts from the provided API with a timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/gifts/`, {
            signal: controller.signal,
            headers: {
              Authorization: "Basic " + btoa("admin:admin"), // Default basic auth
              "Content-Type": "application/json",
            },
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
          }

          const data = await response.json()

          // Check if data is in the expected format
          if (!Array.isArray(data)) {
            throw new Error("Invalid data format from API")
          }

          setPrizes(data)
          setLoading(false)
        } catch (fetchError) {
          console.warn("API fetch failed, using fallback data:", fetchError)
          // Use fallback prizes if API is not available
          setPrizes(fallbackPrizes)
          setLoading(false)
        }
      } catch (err) {
        console.error("Error in fetch prizes function:", err)
        // Use fallback prizes if there's any error
        setPrizes(fallbackPrizes)
        setError("Sovg'alarni yuklashda xatolik yuz berdi, ammo siz o'yinni davom ettirishingiz mumkin.")
        setLoading(false)
      }
    }

    fetchPrizes()
  }, [mounted])

  // Handle win
  const handleWin = async (giftId, userId) => {
    try {
      console.log(`Sending win data: User ID: ${userId}, Gift ID: ${giftId}`)

      try {
        const response = await fetch("/api/record-win", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            giftId: giftId,
            userId: userId,
          }),
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        console.log("Win recorded successfully:", data)
      } catch (apiError) {
        // Just log the error but don't disrupt the user experience
        console.warn("Could not record win to API:", apiError)
      }
    } catch (err) {
      console.error("Error in handleWin function:", err)
    }
  }

  // Return null during server-side rendering or before mounting
  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Yuklanmoqda...</p>

        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100%;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: white;
            padding: 20px;
            box-sizing: border-box;
          }
          
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #8a2be2;
            animation: spin 1s ease-in-out infinite;
            margin-bottom: 20px;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // If we have prizes (either from API or fallback), show the wheel
  return (
    <main className="main-container">
      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      <SpinWheel prizes={prizes} onWin={handleWin} userId={userId} />

      <style jsx>{`
        .main-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          padding: 5px;
          box-sizing: border-box;
          overflow-x: hidden;
        }
        
        .error-banner {
          background: rgba(255, 0, 0, 0.1);
          border-left: 4px solid #ff4500;
          padding: 10px 15px;
          margin-bottom: 20px;
          border-radius: 4px;
          color: white;
          max-width: 100%;
          width: calc(100% - 20px);
          box-sizing: border-box;
        }
      `}</style>
    </main>
  )
}
