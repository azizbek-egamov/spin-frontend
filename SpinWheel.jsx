"use client"

import { useState, useRef, useEffect } from "react"

export default function SpinWheel({ prizes = [], onWin, userId = 1 }) {
  // Add a mounted state to prevent rendering until client-side
  const [mounted, setMounted] = useState(false)

  // States
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState(null)
  const [showVictory, setShowVictory] = useState(false)
  const [wheelHighlight, setWheelHighlight] = useState(false)
  const [theme, setTheme] = useState("purple") // purple, gold, blue, rainbow
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [spinsRemaining, setSpinsRemaining] = useState(3)
  const [lastSpinDate, setLastSpinDate] = useState(null)
  const [spinLimitReached, setSpinLimitReached] = useState(false)

  // Refs
  const wheelRef = useRef(null)
  const pointerRef = useRef(null)
  const spinAudioRef = useRef(null)
  const winAudioRef = useRef(null)
  const loseAudioRef = useRef(null)

  // Theme colors
  const themes = {
    purple: {
      primary: "linear-gradient(135deg, #8a2be2, #4b0082)",
      secondary: "#ffd700",
      accent: "#ff4500",
      text: "#ffffff",
      button: "linear-gradient(135deg, #9c27b0, #673ab7)",
      segments: [
        "rgba(138, 43, 226, 0.8)",
        "rgba(123, 31, 162, 0.8)",
        "rgba(106, 27, 154, 0.8)",
        "rgba(74, 20, 140, 0.8)",
      ],
    },
    gold: {
      primary: "linear-gradient(135deg, #ffd700, #b8860b)",
      secondary: "#ff4500",
      accent: "#8a2be2",
      text: "#000000",
      button: "linear-gradient(135deg, #ffa000, #ff6f00)",
      segments: [
        "rgba(255, 215, 0, 0.8)",
        "rgba(218, 165, 32, 0.8)",
        "rgba(184, 134, 11, 0.8)",
        "rgba(205, 133, 63, 0.8)",
      ],
    },
    blue: {
      primary: "linear-gradient(135deg, #1e88e5, #0d47a1)",
      secondary: "#00e676",
      accent: "#ff4081",
      text: "#ffffff",
      button: "linear-gradient(135deg, #039be5, #01579b)",
      segments: [
        "rgba(30, 136, 229, 0.8)",
        "rgba(21, 101, 192, 0.8)",
        "rgba(13, 71, 161, 0.8)",
        "rgba(25, 118, 210, 0.8)",
      ],
    },
    rainbow: {
      primary: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      secondary: "#a18cd1",
      accent: "#ff6b6b",
      text: "#333333",
      button: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      segments: [
        "rgba(255, 154, 158, 0.8)",
        "rgba(250, 208, 196, 0.8)",
        "rgba(161, 140, 209, 0.8)",
        "rgba(255, 107, 107, 0.8)",
      ],
    },
  }

  // Current theme
  const currentTheme = themes[theme]

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  // Initialize audio elements - only run on client
  useEffect(() => {
    if (!mounted) return

    // Create audio elements
    if (!spinAudioRef.current) {
      spinAudioRef.current = new Audio("/spin-232536.mp3")
      spinAudioRef.current.preload = "auto"
    }

    if (!winAudioRef.current) {
      winAudioRef.current = new Audio("/tadaa-47995.mp3")
      winAudioRef.current.preload = "auto"
    }

    if (!loseAudioRef.current) {
      loseAudioRef.current = new Audio("/losing-horn-313723.mp3")
      loseAudioRef.current.preload = "auto"
    }

    // Clean up function
    return () => {
      if (spinAudioRef.current) {
        spinAudioRef.current.pause()
        spinAudioRef.current = null
      }
      if (winAudioRef.current) {
        winAudioRef.current.pause()
        winAudioRef.current = null
      }
      if (loseAudioRef.current) {
        loseAudioRef.current.pause()
        loseAudioRef.current = null
      }
    }
  }, [mounted])

  // Animate pointer during spinning
  useEffect(() => {
    if (!mounted) return

    if (isSpinning && pointerRef.current) {
      pointerRef.current.classList.add("pointer-animation")
    } else if (pointerRef.current) {
      pointerRef.current.classList.remove("pointer-animation")
    }
  }, [isSpinning, mounted])

  // Hide victory message after 5-6 seconds
  useEffect(() => {
    if (!mounted) return

    let timer
    if (showVictory) {
      timer = setTimeout(() => {
        setShowVictory(false)
      }, 5500) // 5.5 seconds
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [showVictory, mounted])

  // Cycle through themes every 30 seconds for demo effect
  useEffect(() => {
    if (!mounted) return

    const themeInterval = setInterval(() => {
      if (!isSpinning) {
        setTheme((prevTheme) => {
          const themes = ["purple", "gold", "blue", "rainbow"]
          const currentIndex = themes.indexOf(prevTheme)
          const nextIndex = (currentIndex + 1) % themes.length
          return themes[nextIndex]
        })
      }
    }, 30000)

    return () => clearInterval(themeInterval)
  }, [isSpinning, mounted])

  useEffect(() => {
    if (!mounted) return

    const loadSpinData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
        console.log("Attempting to fetch user data from:", `${apiUrl}/user/${userId}`)

        const response = await fetch(`${apiUrl}/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa("admin:admin"),
            "Content-Type": "application/json",
          },
        })

        console.log("API response status:", response.status)

        if (response.ok) {
          const userData = await response.json()
          console.log("User data received:", userData)
          const remaining = userData.data?.rotations || userData.rotations || 0
          setSpinsRemaining(remaining)
          setSpinLimitReached(remaining <= 0)
        } else {
          console.error("Failed to fetch user data. Status:", response.status)
          setSpinsRemaining(0)
          setSpinLimitReached(true)
        }
      } catch (error) {
        console.error("Error loading spin data from backend:", error.message)
        setSpinsRemaining(0)
        setSpinLimitReached(true)
      }
    }

    loadSpinData()
  }, [mounted, userId])

  // Calculate segment angle
  const segmentAngle = 360 / prizes.length

  // Function to check if a prize is a losing prize (0 so'm)
  const isLosingPrize = (prize) => {
    if (!prize) return true

    // Check if the prize name contains "0" and "so'm" or is "Omadsiz"
    const prizeName = prize.name ? prize.name.toLowerCase() : ""

    // Check for exact "0 so'm" or variations
    if (prizeName === "0 so'm" || prizeName === "0so'm" || prizeName === "omadsiz" || prizeName === "0") {
      return true
    }

    // Check for prize value - if it contains a number
    const prizeValue = prizeName.match(/(\d+)/)
    if (prizeValue && Number.parseInt(prizeValue[0]) === 0) {
      return true
    }

    return false
  }

  // Function to play audio safely
  const playAudio = (audioRef) => {
    if (!audioRef.current || !audioEnabled) return

    try {
      // Reset to beginning
      audioRef.current.currentTime = 0

      // Create user interaction to play audio
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play error:", error)
        })
      }
    } catch (error) {
      console.log("Error playing audio:", error)
    }
  }

  // Function to play appropriate sound based on result
  const playResultSound = (prize) => {
    // Stop spinning sound
    if (spinAudioRef.current) {
      try {
        spinAudioRef.current.pause()
        spinAudioRef.current.currentTime = 0
      } catch (error) {
        console.log("Error stopping spinning audio:", error)
      }
    }

    // Determine if it's a losing prize
    const isLosing = isLosingPrize(prize)

    // Play win or lose sound
    if (isLosing) {
      playAudio(loseAudioRef)
    } else {
      playAudio(winAudioRef)
    }
  }

  const spinWheel = async () => {
    // Check if user has reached daily limit
    if (spinLimitReached || spinsRemaining <= 0) {
      alert("Siz bugun uchun aylantirishlar limitiga yetdingiz. Ertaga qayta urinib ko'ring!")
      return
    }

    if (isSpinning || prizes.length === 0) return

    try {
      const newSpinsRemaining = spinsRemaining - 1
      setSpinsRemaining(newSpinsRemaining)

      // Check if limit reached
      if (newSpinsRemaining <= 0) {
        setSpinLimitReached(true)
      }

      // Highlight wheel before spinning
      setWheelHighlight(true)
      setTimeout(() => setWheelHighlight(false), 1000)

      // Play spinning sound
      playAudio(spinAudioRef)

      setIsSpinning(true)
      setResult(null)
      setShowVictory(false)

      // Random number of full rotations (between 3 and 5)
      const fullRotations = 3 + Math.floor(Math.random() * 3)

      // Random segment for the final position
      const randomSegment = Math.floor(Math.random() * prizes.length)
      const randomAngle = randomSegment * segmentAngle

      // Calculate total rotation (full rotations + random angle + small offset)
      const spinAngle = fullRotations * 360 + randomAngle + Math.random() * (segmentAngle / 2)

      // Set new rotation (add to current rotation for continuous spinning)
      const newRotation = rotation + spinAngle
      setRotation(newRotation)

      // Determine the result after spinning is complete
      setTimeout(() => {
        // Stop spinning sound if it's still playing
        if (spinAudioRef.current) {
          try {
            spinAudioRef.current.pause()
            spinAudioRef.current.currentTime = 0
          } catch (error) {
            console.log("Error stopping spinning sound:", error)
          }
        }

        // Calculate which segment is at the top position (0 degrees)
        const normalizedRotation = newRotation % 360

        // Calculate the pointer angle and segment index
        const pointerAngle = (397 - normalizedRotation) % 397
        const segmentIndex = Math.floor(pointerAngle / segmentAngle) % prizes.length

        const winningPrize = prizes[segmentIndex]
        setResult(winningPrize)
        setIsSpinning(false)

        // Play appropriate sound based on result
        playResultSound(winningPrize)

        // Only show victory animation for winning prizes
        if (!isLosingPrize(winningPrize)) {
          setShowVictory(true)
        }

        // Send result to backend
        if (onWin && winningPrize) {
          try {
            onWin(winningPrize.id, userId)
          } catch (error) {
            console.error("Error sending result to backend:", error)
          }
        }
      }, 5000) // 5 seconds spin animation
    } catch (error) {
      console.error("Error in spin function:", error)
      setSpinsRemaining(spinsRemaining)
      setSpinLimitReached(spinsRemaining <= 1)
      alert("Aylantirishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    }
  }

  // Function to change theme
  const changeTheme = () => {
    const themes = ["purple", "gold", "blue", "rainbow"]
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Return null during server-side rendering or before mounting
  if (!mounted) {
    return null
  }

  return (
    <div className="spin-wheel-container">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        .spin-wheel-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          position: relative;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          position: relative;
        }

        .title-container {
          flex: 1;
          text-align: center;
        }

        .controls-container {
          display: flex;
          gap: 10px;
          position: absolute;
          right: 0;
        }

        .wheel-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 8px;
          background: ${currentTheme.primary};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          letter-spacing: -1px;
          transform: scale(1);
          transition: transform 0.3s ease;
          animation: pulse-title 2s infinite alternate;
        }

        @keyframes pulse-title {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }

        .wheel-subtitle {
          font-size: 1rem;
          color: #888;
          margin-bottom: 20px;
          font-weight: 500;
          max-width: 80%;
          margin-left: auto;
          margin-right: auto;
        }

        .wheel-container {
          position: relative;
          width: 350px;
          height: 350px;
          margin: 0 auto 30px;
          perspective: 1000px;
        }

        .wheel-outer-border {
          position: absolute;
          width: 110%;
          height: 110%;
          border-radius: 50%;
          top: -5%;
          left: -5%;
          background: ${currentTheme.primary};
          z-index: -1;
          opacity: 0.3;
          filter: blur(10px);
          animation: rotate-slow 10s linear infinite;
          transition: all 0.5s ease;
        }

        .wheel-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
          z-index: 1;
          opacity: ${wheelHighlight ? "0.8" : "0.3"};
          transform: ${wheelHighlight ? "scale(1.1)" : "scale(1)"};
          transition: all 0.5s ease;
          pointer-events: none;
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Add touch-friendly styles */
        .wheel-center {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .audio-toggle, .theme-switcher {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Optimize for mobile devices */
        html, body {
          overscroll-behavior: none;
          touch-action: manipulation;
          -webkit-overflow-scrolling: touch;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .spin-wheel-container {
            padding: 10px;
            max-width: 100%;
          }
          
          .wheel-container {
            width: 320px;
            height: 320px;
          }
          
          .wheel-center {
            width: 100px;
            height: 100px;
          }
          
          .segment-text {
            font-size: 11px;
            max-width: 90px;
            top: 30px;
            left: 10px;
            padding: 3px 6px;
          }
          
          .wheel-title {
            font-size: 1.8rem;
          }
          
          .wheel-subtitle {
            font-size: 0.9rem;
          }
          
          .result-container {
            padding: 20px;
          }
          
          .result-prize {
            font-size: 1.6rem;
          }
          
          .victory-text {
            font-size: 2.5rem;
            padding: 15px 30px;
          }
        }

        @media (max-width: 480px) {
          .wheel-container {
            width: 340px;
            height: 340px;
            margin-bottom: 20px;
          }
          
          .wheel-center {
            width: 90px;
            height: 90px;
          }
          
          .segment-text {
            font-size: 10px;
            max-width: 80px;
            top: 25px;
            left: 8px;
            padding: 3px 6px;
          }
          
          .wheel-title {
            font-size: 1.6rem;
          }
          
          .wheel-subtitle {
            font-size: 0.8rem;
            margin-bottom: 15px;
          }
          
          .victory-text {
            font-size: 1.8rem;
            padding: 10px 20px;
          }
          
          .audio-toggle, .theme-switcher {
            width: 36px;
            height: 36px;
          }
        }

        @media (max-width: 360px) {
          .wheel-container {
            width: 300px;
            height: 300px;
          }
          
          .wheel-center {
            width: 80px;
            height: 80px;
          }
          
          .segment-text {
            font-size: 9px;
            max-width: 70px;
            top: 22px;
          }
        }
        
        .wheel {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: ${currentTheme.primary};
          overflow: hidden;
          box-shadow: 
            0 0 20px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(0, 0, 0, 0.3) inset;
          transition: transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99), box-shadow 0.3s ease;
          transform: rotate(${rotation}deg);
          z-index: 2;
        }
        
        .wheel-segment {
          position: absolute;
          width: 50%;
          height: 50%;
          transform-origin: bottom right;
          left: 0;
          top: 0;
          overflow: hidden;
          transition: background 0.3s ease;
        }
        
        .segment-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 32px;
          transform-origin: bottom right;
        }
        
        .segment-text {
          color: white;
          font-size: 14px;
          font-weight: 600;
          transform: rotate(50deg);
          position: relative;
          left: 15px;
          top: 35px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
          background: rgba(0, 0, 0, 0.2);
          padding: 5px 8px;
          border-radius: 10px;
          max-width: 120px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: all 0.3s ease;
          line-height: 1.2;
        }
        
        .wheel-center {
          position: absolute;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, ${currentTheme.secondary}, ${currentTheme.accent});
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          border: 5px solid rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          transition: all 0.3s ease;
          animation: pulse-center 2s infinite alternate;
          overflow: hidden;
        }
        
        @keyframes pulse-center {
          0% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 0 0 25px rgba(0, 0, 0, 0.7);
          }
        }
        
        .wheel-center:hover {
          transform: translate(-50%, -50%) scale(1.05);
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.7);
        }
        
        .wheel-center:active {
          transform: translate(-50%, -50%) scale(0.95);
        }
        
        .spin-button-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transform: scale(1);
          transition: transform 0.3s ease;
        }
        
        .wheel-center:hover .spin-button-image {
          transform: scale(1.05);
        }
        
        .wheel-center:active .spin-button-image {
          transform: scale(0.95);
        }
        
        .wheel-pointer-container {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
        }
        
        .wheel-pointer {
          width: 35px;
          height: 35px;
          background: ${currentTheme.secondary};
          clip-path: polygon(50% 100%, 0 0, 100% 0);
          transition: all 0.3s ease;
        }
        
        .pointer-animation {
          animation: pointer-bounce 0.5s infinite alternate;
        }
        
        @keyframes pointer-bounce {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-5px);
          }
        }
        
        .result-container {
          margin-top: 30px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          animation: fadeIn 0.5s ease;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .result-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .result-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${currentTheme.primary};
          opacity: 0.1;
          z-index: -1;
        }
        
        .result-container h2 {
          margin-bottom: 15px;
          color: ${currentTheme.secondary};
          font-size: 2rem;
          font-weight: 800;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }
        
        .result-container p {
          font-size: 1.2rem;
          color: white;
          font-weight: 500;
          margin-bottom: 10px;
        }
        
        .result-prize {
          font-weight: 800;
          font-size: 2rem;
          color: ${currentTheme.secondary};
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          display: inline-block;
          animation: prize-pulse 1.5s infinite alternate;
          padding: 10px 20px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          margin: 10px 0;
        }

        .result-prize.losing {
          color: ${currentTheme.accent};
        }
        
        @keyframes prize-pulse {
          0% {
            transform: scale(1);
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          }
          100% {
            transform: scale(1.05);
            text-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Victory animation */
        .victory-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #f00;
          border-radius: 50%;
          animation: confetti-fall 5s linear forwards;
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .victory-text {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          font-weight: 800;
          color: ${currentTheme.secondary};
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          animation: victory-pulse 1s infinite alternate;
          z-index: 200;
          background: rgba(0, 0, 0, 0.5);
          padding: 20px 40px;
          border-radius: 20px;
          white-space: nowrap;
        }
        
        @keyframes victory-pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.1);
            text-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
          }
        }
        
        .theme-switcher, .audio-toggle {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-size: 20px;
          backdrop-filter: blur(5px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        
        .theme-switcher:hover, .audio-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
        }
        
        .spin-count {
          margin: 0 auto 20px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 30px;
          padding: 10px 20px;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          z-index: 5;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .spin-count:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
        }

        .spin-count-icon {
          font-size: 1.2rem;
        }

        .spin-count-number {
          font-weight: 700;
          font-size: 1.1rem;
          color: ${currentTheme.secondary};
          background: rgba(0, 0, 0, 0.3);
          padding: 2px 8px;
          border-radius: 15px;
          min-width: 28px;
          text-align: center;
        }

        .spin-count-text {
          margin-right: 5px;
        }

        @media (max-width: 480px) {
          .spin-count {
            padding: 8px 15px;
            font-size: 0.9rem;
          }
          
          .spin-count-number {
            font-size: 1rem;
            padding: 1px 6px;
          }
          
          .controls-container {
            gap: 5px;
          }
          
          .theme-switcher, .audio-toggle {
            width: 36px;
            height: 36px;
          }
        }

        .spin-instructions {
          margin-top: 20px;
          font-size: 0.9rem;
          color: #aaa;
          max-width: 80%;
          margin-left: auto;
          margin-right: auto;
        }

        .wheel-center.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .wheel-center.disabled:hover {
          transform: translate(-50%, -50%);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      <div className="header-container">
        <div className="title-container">
          <h1 className="wheel-title">Omad Charxi</h1>
        </div>
        <div className="controls-container">
          <button
            className="audio-toggle"
            onClick={() => setAudioEnabled(!audioEnabled)}
            title={audioEnabled ? "Ovozni o'chirish" : "Ovozni yoqish"}
          >
            {audioEnabled ? "🔊" : "🔇"}
          </button>
          <button className="theme-switcher" onClick={changeTheme} title="Mavzuni o'zgartirish">
            🎨
          </button>
        </div>
      </div>

      <p className="wheel-subtitle">Aylantirib katta sovg'alarni yutib oling!</p>

      <div className="wheel-container">
        <div className="wheel-outer-border"></div>
        <div className="wheel-glow"></div>

        {/* Wheel */}
        <div ref={wheelRef} className="wheel">
          {prizes.map((prize, index) => {
            const angle = index * segmentAngle
            const segmentColorIndex = index % currentTheme.segments.length
            return (
              <div
                key={prize.id}
                className="wheel-segment"
                style={{
                  transform: `rotate(${angle}deg) skewY(${90 - segmentAngle}deg)`,
                  background: currentTheme.segments[segmentColorIndex],
                  borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <div
                  className="segment-content"
                  style={{
                    transform: `skewY(${-(90 - segmentAngle)}deg) rotate(${segmentAngle / 2}deg)`,
                  }}
                >
                  <div className="segment-text">{prize.name}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Wheel center button with image */}
        <div
          className={`wheel-center ${spinLimitReached || spinsRemaining <= 0 ? "disabled" : ""}`}
          onClick={!isSpinning && !spinLimitReached && spinsRemaining > 0 ? spinWheel : undefined}
        >
          <img src="/spin-button.png" alt="Spin" className="spin-button-image" />
        </div>

        {/* Pointer/indicator */}
        <div className="wheel-pointer-container">
          <div ref={pointerRef} className="wheel-pointer"></div>
        </div>
      </div>

      {/* Spin counter */}
      <div className="spin-count">
        <span className="spin-count-icon">🎮</span>
        <span className="spin-count-text">Bugungi aylanishlar:</span>
        <span className="spin-count-number">{spinsRemaining}</span> / 3
      </div>

      {/* Result display */}
      {result && (
        <div className="result-container">
          <h2>{isLosingPrize(result) ? "Afsuski!" : "Tabriklaymiz!"}</h2>
          <p>{isLosingPrize(result) ? "Siz yutqazdingiz:" : "Siz yutdingiz:"}</p>
          <span className={`result-prize ${isLosingPrize(result) ? "losing" : ""}`}>{result.name}</span>
        </div>
      )}

      {/* Victory animation */}
      {showVictory && (
        <div className="victory-animation">
          {Array.from({ length: 150 }).map((_, i) => {
            const left = Math.random() * 100
            const animationDuration = 3 + Math.random() * 2
            const size = 5 + Math.random() * 15
            const colors = [currentTheme.secondary, currentTheme.accent, "#ffffff", "#ff4500", "#00ff00", "#ff00ff"]
            const color = colors[Math.floor(Math.random() * colors.length)]

            return (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  animationDuration: `${animationDuration}s`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            )
          })}
          <div className="victory-text">Siz yutdingiz!</div>
        </div>
      )}
    </div>
  )
}
