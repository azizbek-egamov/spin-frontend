"use client"

import { useState, useRef, useEffect } from "react"

// Custom icon components to replace lucide-react
const Icons = {
  Settings: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  VolumeOn: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  ),
  VolumeOff: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
  ),
  History: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Plus: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Trash: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  Edit: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Save: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  ),
  X: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  RefreshCw: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
}

export default function OmadCharxi() {
  // Main states
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [confetti, setConfetti] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [spinSpeed, setSpinSpeed] = useState(5) // seconds
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [editingSegment, setEditingSegment] = useState(null)
  const [spinHistory, setSpinHistory] = useState([])
  const [theme, setTheme] = useState("default") // default, neon, classic, dark

  // Audio states
  const [audioLoaded, setAudioLoaded] = useState({
    spin: false,
    tick: false,
  })

  // Refs
  const wheelRef = useRef(null)
  const audioRef = useRef(null)
  const tickRef = useRef(null)

  // Default wheel segments/prizes
  const defaultSegments = [
    {
      id: 1,
      text: "1 Million so'm",
      icon: "💰",
      color: "#FF5252",
      textColor: "#ffffff",
      description: "Naqd pul mukofoti",
      probability: 5,
    },
    {
      id: 2,
      text: "iPhone 15",
      icon: "📱",
      color: "#FF9800",
      textColor: "#ffffff",
      description: "Eng so'nggi model",
      probability: 3,
    },
    {
      id: 3,
      text: "MacBook Pro",
      icon: "💻",
      color: "#FFEB3B",
      textColor: "#333333",
      description: "16 dyumli, M2 protsessor",
      probability: 2,
    },
    {
      id: 4,
      text: "Omadsiz",
      icon: "😢",
      color: "#4CAF50",
      textColor: "#ffffff",
      description: "Keyingi safar omad tilaymiz",
      probability: 30,
    },
    {
      id: 5,
      text: "200,000 so'm",
      icon: "💵",
      color: "#2196F3",
      textColor: "#ffffff",
      description: "Naqd pul mukofoti",
      probability: 20,
    },
    {
      id: 6,
      text: "Samsung TV",
      icon: "📺",
      color: "#3F51B5",
      textColor: "#ffffff",
      description: "4K Ultra HD Smart TV",
      probability: 5,
    },
    {
      id: 7,
      text: "Velosiped",
      icon: "🚲",
      color: "#9C27B0",
      textColor: "#ffffff",
      description: "Sport velosipedi",
      probability: 10,
    },
    {
      id: 8,
      text: "5 Million so'm",
      icon: "💎",
      color: "#E91E63",
      textColor: "#ffffff",
      description: "Katta pul mukofoti!",
      probability: 1,
    },
  ]

  // Wheel themes
  const themes = {
    default: {
      background: "linear-gradient(to br, #0f0c29, #302b63, #24243e)",
      wheelBackground: "#222",
      titleGradient: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
      buttonGradient: "linear-gradient(135deg, #ff416c, #ff4b2b)",
      pointerColor: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    },
    neon: {
      background: "linear-gradient(to br, #000000, #150050)",
      wheelBackground: "#0a0a0a",
      titleGradient: "linear-gradient(45deg, #00f5a0 0%, #00d9f5 100%)",
      buttonGradient: "linear-gradient(135deg, #00f5a0, #00d9f5)",
      pointerColor: "linear-gradient(135deg, #00f5a0, #00d9f5)",
    },
    classic: {
      background: "linear-gradient(to br, #141e30, #243b55)",
      wheelBackground: "#1a1a1a",
      titleGradient: "linear-gradient(45deg, #ffd700 0%, #ffcc00 100%)",
      buttonGradient: "linear-gradient(135deg, #ffd700, #ffcc00)",
      pointerColor: "linear-gradient(135deg, #ffd700, #ffcc00)",
    },
    dark: {
      background: "linear-gradient(to br, #000000, #434343)",
      wheelBackground: "#111",
      titleGradient: "linear-gradient(45deg, #ffffff 0%, #cccccc 100%)",
      buttonGradient: "linear-gradient(135deg, #666666, #333333)",
      pointerColor: "linear-gradient(135deg, #ffffff, #cccccc)",
    },
  }

  // State for segments with local storage persistence
  const [segments, setSegments] = useState(() => {
    if (typeof window !== "undefined") {
      const savedSegments = localStorage.getItem("wheelSegments")
      return savedSegments ? JSON.parse(savedSegments) : defaultSegments
    }
    return defaultSegments
  })

  // Save segments to local storage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wheelSegments", JSON.stringify(segments))
    }
  }, [segments])

  const segmentAngle = 360 / segments.length

  // Handle audio loading
  useEffect(() => {
    // Set up audio error handling
    if (audioRef.current) {
      audioRef.current.addEventListener("canplaythrough", () => {
        setAudioLoaded((prev) => ({ ...prev, spin: true }))
      })

      audioRef.current.addEventListener("error", () => {
        console.log("Spin audio failed to load")
        setAudioLoaded((prev) => ({ ...prev, spin: false }))
      })
    }

    if (tickRef.current) {
      tickRef.current.addEventListener("canplaythrough", () => {
        setAudioLoaded((prev) => ({ ...prev, tick: true }))
      })

      tickRef.current.addEventListener("error", () => {
        console.log("Tick audio failed to load")
        setAudioLoaded((prev) => ({ ...prev, tick: false }))
      })
    }

    return () => {
      // Clean up event listeners
      if (audioRef.current) {
        audioRef.current.removeEventListener("canplaythrough", () => {})
        audioRef.current.removeEventListener("error", () => {})
      }

      if (tickRef.current) {
        tickRef.current.removeEventListener("canplaythrough", () => {})
        tickRef.current.removeEventListener("error", () => {})
      }
    }
  }, [])

  // Function to play tick sound
  const playTickSound = () => {
    if (tickRef.current && audioLoaded.tick && soundEnabled) {
      try {
        tickRef.current.currentTime = 0
        const playPromise = tickRef.current.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Tick sound play error:", error)
          })
        }
      } catch (error) {
        console.log("Error playing tick sound:", error)
      }
    }
  }

  // Function to create confetti effect
  const createConfetti = () => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 5000)
  }

  // Function to spin the wheel with weighted probability
  const spinWheel = () => {
    if (isSpinning) return

    // Play spinning sound
    if (audioRef.current && audioLoaded.spin && soundEnabled) {
      try {
        audioRef.current.currentTime = 0
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Spin sound play error:", error)
          })
        }
      } catch (error) {
        console.log("Error playing spin sound:", error)
      }
    }

    setIsSpinning(true)
    setResult(null)

    // Create weighted array based on probability
    const weightedSegments = []
    segments.forEach((segment) => {
      for (let i = 0; i < segment.probability; i++) {
        weightedSegments.push(segment)
      }
    })

    // Get random segment from weighted array
    const randomSegment = weightedSegments[Math.floor(Math.random() * weightedSegments.length)]
    const segmentIndex = segments.findIndex((s) => s.id === randomSegment.id)

    // Random number of full rotations (between 3 and 5)
    const fullRotations = 3 + Math.floor(Math.random() * 3)

    // Calculate angle for the selected segment
    const randomAngle = segmentIndex * segmentAngle

    // Calculate total rotation (full rotations + random angle + small offset)
    const spinAngle = fullRotations * 360 + randomAngle + Math.random() * segmentAngle

    // Set new rotation (add to current rotation for continuous spinning)
    const newRotation = rotation + spinAngle
    setRotation(newRotation)

    // Play tick sounds during spinning
    let tickCount = 0
    const tickInterval = setInterval(() => {
      playTickSound()
      tickCount++
      if (tickCount > 20) {
        clearInterval(tickInterval)
      }
    }, 200)

    // Determine the result after spinning is complete
    setTimeout(() => {
      // Calculate which segment is at the top position
      const normalizedRotation = newRotation % 360
      const resultSegmentIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length
      const resultSegment = segments[resultSegmentIndex]
      setResult(resultSegment)
      setIsSpinning(false)

      // Add to history
      const timestamp = new Date().toLocaleString()
      setSpinHistory((prev) =>
        [
          {
            id: Date.now(),
            segment: resultSegment,
            timestamp,
          },
          ...prev,
        ].slice(0, 10),
      ) // Keep only last 10 spins

      // Stop the sound
      if (audioRef.current && audioLoaded.spin && soundEnabled) {
        try {
          audioRef.current.pause()
        } catch (error) {
          console.log("Error pausing audio:", error)
        }
      }

      // Show confetti for big prizes
      if (
        resultSegment.text.includes("Million") ||
        resultSegment.text.includes("iPhone") ||
        resultSegment.text.includes("MacBook")
      ) {
        createConfetti()
      }
    }, spinSpeed * 1000) // Use the dynamic spin speed
  }

  // Function to add a new segment
  const addSegment = () => {
    const newId = Math.max(...segments.map((s) => s.id), 0) + 1
    const newSegment = {
      id: newId,
      text: "Yangi sovg'a",
      icon: "🎁",
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      textColor: "#ffffff",
      description: "Yangi sovg'a tavsifi",
      probability: 10,
    }
    setSegments([...segments, newSegment])
    setEditingSegment(newSegment)
  }

  // Function to delete a segment
  const deleteSegment = (id) => {
    if (segments.length <= 2) {
      alert("Kamida 2 ta segment bo'lishi kerak!")
      return
    }
    setSegments(segments.filter((s) => s.id !== id))
    if (editingSegment && editingSegment.id === id) {
      setEditingSegment(null)
    }
  }

  // Function to update a segment
  const updateSegment = (updatedSegment) => {
    setSegments(segments.map((s) => (s.id === updatedSegment.id ? updatedSegment : s)))
    setEditingSegment(null)
  }

  // Function to reset to default segments
  const resetToDefault = () => {
    if (window.confirm("Haqiqatan ham barcha segmentlarni asliga qaytarmoqchimisiz?")) {
      setSegments(defaultSegments)
      setEditingSegment(null)
    }
  }

  // Function to clear history
  const clearHistory = () => {
    if (window.confirm("Haqiqatan ham tarixni tozalamoqchimisiz?")) {
      setSpinHistory([])
    }
  }

  return (
    <div className="omad-charxi-container">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

        .omad-charxi-container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .omad-charxi-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 10px;
          color: #f0f0f0;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          background: ${themes[theme].titleGradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -1px;
        }

        .omad-charxi-subtitle {
          font-size: 1.3rem;
          color: #ddd;
          margin-bottom: 30px;
          font-weight: 500;
        }

        .wheel-outer-container {
          position: relative;
          width: 400px;
          height: 400px;
          margin: 0 auto 50px;
          perspective: 1000px;
        }

        .wheel-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .wheel-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
          z-index: -1;
          animation: glow 3s infinite alternate;
        }

        @keyframes glow {
          from {
            opacity: 0.5;
            transform: scale(1);
          }
          to {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .wheel {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: ${themes[theme].wheelBackground};
          overflow: hidden;
          box-shadow: 
            0 0 30px rgba(0, 0, 0, 0.7), 
            0 0 60px rgba(0, 0, 0, 0.4) inset,
            0 0 0 15px rgba(255, 255, 255, 0.05) inset;
          transition: transform ${spinSpeed}s cubic-bezier(0.17, 0.67, 0.12, 0.99);
          transform: rotate(0deg);
        }

        .wheel-segment {
          position: absolute;
          width: 50%;
          height: 50%;
          transform-origin: bottom right;
          left: 0;
          top: 0;
          border: 2px solid rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .segment-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding-top: 25px;
          font-weight: bold;
          transform-origin: bottom right;
        }

        .segment-icon {
          font-size: 24px;
          margin-bottom: 5px;
          filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3));
        }

        .segment-text {
          font-size: 14px;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          transform: rotate(180deg);
          text-align: center;
          max-width: 80px;
          line-height: 1.2;
        }

        .wheel-center {
          position: absolute;
          width: 70px;
          height: 70px;
          background: radial-gradient(circle, #f5f5f5, #e0e0e0);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          box-shadow: 
            0 0 10px rgba(0, 0, 0, 0.5),
            0 0 0 10px rgba(255, 255, 255, 0.1) inset;
          border: 5px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wheel-center::after {
          content: "";
          width: 20px;
          height: 20px;
          background: #333;
          border-radius: 50%;
        }

        .wheel-pointer-container {
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.3));
          width: 60px;
          height: 60px;
        }

        .wheel-pointer {
          width: 100%;
          height: 100%;
          background: ${themes[theme].pointerColor};
          clip-path: polygon(50% 100%, 0 0, 100% 0);
          animation: pointerPulse 1s infinite alternate;
        }

        @keyframes pointerPulse {
          from {
            transform: scaleY(1);
          }
          to {
            transform: scaleY(1.1);
          }
        }

        .spin-button {
          padding: 18px 50px;
          font-size: 1.4rem;
          font-weight: 700;
          background: ${themes[theme].buttonGradient};
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(255, 65, 108, 0.3);
          position: relative;
          overflow: hidden;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .spin-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.5s ease;
        }

        .spin-button:hover::before {
          left: 100%;
        }

        .spin-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 25px rgba(255, 65, 108, 0.4);
        }

        .spin-button:active {
          transform: translateY(1px);
          box-shadow: 0 5px 15px rgba(255, 65, 108, 0.3);
        }

        .spin-button.disabled {
          background: linear-gradient(135deg, #888, #666);
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .result-container {
          margin-top: 40px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          animation: fadeIn 0.5s ease;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .result-container h2 {
          margin-bottom: 15px;
          color: #f0f0f0;
          font-size: 2rem;
          font-weight: 800;
        }

        .result-icon {
          font-size: 4rem;
          margin-bottom: 15px;
          display: inline-block;
          animation: bounce 1s infinite alternate;
        }

        @keyframes bounce {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.2);
          }
        }

        .result-container p {
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .result-prize {
          font-weight: 800;
          font-size: 1.8rem;
          display: block;
          margin: 15px 0;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .result-description {
          font-size: 1.1rem;
          opacity: 0.8;
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

        /* Controls */
        .controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }

        .control-button {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
        }

        .control-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        .control-button.active {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Settings Panel */
        .settings-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 400px;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 100;
          padding: 20px;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
          overflow-y: auto;
          transform: translateX(${showSettings ? "0" : "100%"});
          transition: transform 0.3s ease;
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .settings-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
        }

        .close-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1.5rem;
        }

        .settings-section {
          margin-bottom: 30px;
        }

        .settings-section-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .settings-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .settings-label {
          color: #ddd;
          font-size: 1rem;
        }

        .settings-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          padding: 8px 12px;
          color: white;
          width: 100px;
        }

        .settings-select {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          padding: 8px 12px;
          color: white;
          width: 150px;
        }

        .theme-options {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .theme-option {
          width: 80px;
          height: 50px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .theme-option.active {
          border-color: white;
          transform: scale(1.05);
        }

        .theme-default {
          background: linear-gradient(to bottom right, #0f0c29, #302b63, #24243e);
        }

        .theme-neon {
          background: linear-gradient(to bottom right, #000000, #150050);
        }

        .theme-classic {
          background: linear-gradient(to bottom right, #141e30, #243b55);
        }

        .theme-dark {
          background: linear-gradient(to bottom right, #000000, #434343);
        }

        .segment-list {
          margin-top: 20px;
        }

        .segment-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 10px;
          transition: all 0.3s ease;
        }

        .segment-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .segment-item-color {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .segment-item-info {
          display: flex;
          align-items: center;
          flex: 1;
          text-align: left;
          color: white;
        }

        .segment-item-text {
          margin-left: 10px;
        }

        .segment-item-actions {
          display: flex;
          gap: 5px;
        }

        .segment-action-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .segment-action-button:hover {
          opacity: 1;
        }

        .add-segment-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px dashed rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 15px;
        }

        .add-segment-button:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .reset-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          background: rgba(255, 0, 0, 0.2);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .reset-button:hover {
          background: rgba(255, 0, 0, 0.3);
        }

        /* Edit Segment Modal */
        .edit-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: ${editingSegment ? "1" : "0"};
          pointer-events: ${editingSegment ? "all" : "none"};
          transition: opacity 0.3s ease;
        }

        .edit-modal-content {
          background: #1a1a1a;
          border-radius: 15px;
          padding: 25px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        }

        .edit-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .edit-modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .edit-form-group {
          margin-bottom: 15px;
          text-align: left;
        }

        .edit-label {
          display: block;
          color: #ddd;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .edit-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          padding: 10px 15px;
          color: white;
          font-size: 1rem;
        }

        .edit-input-row {
          display: flex;
          gap: 10px;
        }

        .edit-input-row .edit-form-group {
          flex: 1;
        }

        .color-preview {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-left: 10px;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .edit-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .edit-button {
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cancel-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .cancel-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .save-button {
          background: ${themes[theme].buttonGradient};
          color: white;
        }

        .save-button:hover {
          opacity: 0.9;
        }

        /* History Panel */
        .history-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 400px;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 100;
          padding: 20px;
          box-shadow: 5px 0 30px rgba(0, 0, 0, 0.5);
          overflow-y: auto;
          transform: translateX(${showHistory ? "0" : "-100%"});
          transition: transform 0.3s ease;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .history-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
        }

        .history-list {
          margin-top: 20px;
        }

        .history-item {
          display: flex;
          align-items: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .history-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .history-item-icon {
          font-size: 2rem;
          margin-right: 15px;
        }

        .history-item-info {
          flex: 1;
          text-align: left;
        }

        .history-item-prize {
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .history-item-time {
          color: #aaa;
          font-size: 0.8rem;
        }

        .clear-history-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          background: rgba(255, 0, 0, 0.2);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .clear-history-button:hover {
          background: rgba(255, 0, 0, 0.3);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .wheel-outer-container {
            width: 350px;
            height: 350px;
          }
          
          .omad-charxi-title {
            font-size: 3rem;
          }
          
          .segment-icon {
            font-size: 20px;
          }
          
          .segment-text {
            font-size: 12px;
            max-width: 70px;
          }

          .settings-panel, .history-panel {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .wheel-outer-container {
            width: 280px;
            height: 280px;
          }
          
          .omad-charxi-title {
            font-size: 2.5rem;
          }
          
          .segment-icon {
            font-size: 16px;
          }
          
          .segment-text {
            font-size: 10px;
            max-width: 60px;
          }
          
          .wheel-center {
            width: 50px;
            height: 50px;
          }
          
          .wheel-pointer-container {
            top: -30px;
            width: 40px;
            height: 40px;
          }

          .controls {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <h1 className="omad-charxi-title">Omad Charxi</h1>
      <p className="omad-charxi-subtitle">Katta sovg'alar yutib olish imkoniyati!</p>

      <div className="wheel-outer-container">
        <div className="wheel-glow"></div>
        <div className="wheel-container">
          {/* Wheel */}
          <div ref={wheelRef} className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
            {segments.map((segment, index) => {
              const angle = index * segmentAngle
              return (
                <div
                  key={segment.id}
                  className="wheel-segment"
                  style={{
                    transform: `rotate(${angle}deg) skewY(${90 - segmentAngle}deg)`,
                    background: segment.color,
                  }}
                >
                  <div
                    className="segment-content"
                    style={{
                      transform: `skewY(${-(90 - segmentAngle)}deg) rotate(${segmentAngle / 2}deg)`,
                      color: segment.textColor,
                    }}
                  >
                    <div className="segment-icon">{segment.icon}</div>
                    <div className="segment-text">{segment.text}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Wheel center */}
          <div className="wheel-center"></div>

          {/* Pointer/indicator */}
          <div className="wheel-pointer-container">
            <div className="wheel-pointer"></div>
          </div>
        </div>
      </div>

      {/* Spin button */}
      <button className={`spin-button ${isSpinning ? "disabled" : ""}`} onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? "Aylanmoqda..." : "Aylantirish"}
      </button>

      {/* Controls */}
      <div className="controls">
        <button
          className={`control-button ${soundEnabled ? "" : "active"}`}
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? "Ovozni o'chirish" : "Ovozni yoqish"}
        >
          {soundEnabled ? <Icons.VolumeOn size={20} /> : <Icons.VolumeOff size={20} />}
        </button>

        <button className="control-button" onClick={() => setShowSettings(true)} title="Sozlamalar">
          <Icons.Settings size={20} />
        </button>

        <button className="control-button" onClick={() => setShowHistory(true)} title="Tarix">
          <Icons.History size={20} />
        </button>
      </div>

      {/* Result display */}
      {result && (
        <div className="result-container">
          <h2>Tabriklaymiz!</h2>
          <div className="result-icon">{result.icon}</div>
          <p>Siz yutdingiz:</p>
          <span className="result-prize" style={{ color: result.color }}>
            {result.text}
          </span>
          <p className="result-description">{result.description}</p>
        </div>
      )}

      {/* Confetti effect */}
      {confetti &&
        Array.from({ length: 100 }).map((_, i) => {
          const left = Math.random() * 100
          const animationDuration = 3 + Math.random() * 2
          const size = 5 + Math.random() * 10
          const color = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"][
            Math.floor(Math.random() * 6)
          ]

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

      {/* Settings Panel */}
      <div className="settings-panel">
        <div className="settings-header">
          <h2 className="settings-title">Sozlamalar</h2>
          <button className="close-button" onClick={() => setShowSettings(false)}>
            <Icons.X size={24} />
          </button>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Umumiy sozlamalar</h3>

          <div className="settings-option">
            <span className="settings-label">Aylanish tezligi (sekund)</span>
            <input
              type="number"
              className="settings-input"
              value={spinSpeed}
              min="1"
              max="10"
              onChange={(e) => setSpinSpeed(Math.max(1, Math.min(10, Number(e.target.value))))}
            />
          </div>

          <div className="settings-option">
            <span className="settings-label">Mavzu</span>
          </div>

          <div className="theme-options">
            <div
              className={`theme-option theme-default ${theme === "default" ? "active" : ""}`}
              onClick={() => setTheme("default")}
              title="Standart"
            ></div>
            <div
              className={`theme-option theme-neon ${theme === "neon" ? "active" : ""}`}
              onClick={() => setTheme("neon")}
              title="Neon"
            ></div>
            <div
              className={`theme-option theme-classic ${theme === "classic" ? "active" : ""}`}
              onClick={() => setTheme("classic")}
              title="Klassik"
            ></div>
            <div
              className={`theme-option theme-dark ${theme === "dark" ? "active" : ""}`}
              onClick={() => setTheme("dark")}
              title="Qora"
            ></div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Segmentlarni sozlash</h3>

          <div className="segment-list">
            {segments.map((segment) => (
              <div key={segment.id} className="segment-item">
                <div className="segment-item-info">
                  <div className="segment-item-color" style={{ background: segment.color }}></div>
                  <div className="segment-item-icon">{segment.icon}</div>
                  <div className="segment-item-text">{segment.text}</div>
                </div>
                <div className="segment-item-actions">
                  <button
                    className="segment-action-button"
                    onClick={() => setEditingSegment(segment)}
                    title="Tahrirlash"
                  >
                    <Icons.Edit size={16} />
                  </button>
                  <button className="segment-action-button" onClick={() => deleteSegment(segment.id)} title="O'chirish">
                    <Icons.Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="add-segment-button" onClick={addSegment}>
            <Icons.Plus size={18} /> Yangi segment qo'shish
          </button>

          <button className="reset-button" onClick={resetToDefault}>
            <Icons.RefreshCw size={18} /> Standart sozlamalarga qaytarish
          </button>
        </div>
      </div>

      {/* History Panel */}
      <div className="history-panel">
        <div className="history-header">
          <h2 className="history-title">Aylanishlar tarixi</h2>
          <button className="close-button" onClick={() => setShowHistory(false)}>
            <Icons.X size={24} />
          </button>
        </div>

        <div className="history-list">
          {spinHistory.length === 0 ? (
            <p style={{ color: "#aaa", textAlign: "center" }}>Hali aylanishlar yo'q</p>
          ) : (
            spinHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-item-icon">{item.segment.icon}</div>
                <div className="history-item-info">
                  <div className="history-item-prize" style={{ color: item.segment.color }}>
                    {item.segment.text}
                  </div>
                  <div className="history-item-time">{item.timestamp}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {spinHistory.length > 0 && (
          <button className="clear-history-button" onClick={clearHistory}>
            <Icons.Trash size={18} /> Tarixni tozalash
          </button>
        )}
      </div>

      {/* Edit Segment Modal */}
      <div className="edit-modal">
        {editingSegment && (
          <div className="edit-modal-content">
            <div className="edit-modal-header">
              <h3 className="edit-modal-title">Segmentni tahrirlash</h3>
              <button className="close-button" onClick={() => setEditingSegment(null)}>
                <Icons.X size={20} />
              </button>
            </div>

            <div className="edit-form-group">
              <label className="edit-label">Matn</label>
              <input
                type="text"
                className="edit-input"
                value={editingSegment.text}
                onChange={(e) => setEditingSegment({ ...editingSegment, text: e.target.value })}
              />
            </div>

            <div className="edit-form-group">
              <label className="edit-label">Tavsif</label>
              <input
                type="text"
                className="edit-input"
                value={editingSegment.description}
                onChange={(e) => setEditingSegment({ ...editingSegment, description: e.target.value })}
              />
            </div>

            <div className="edit-form-group">
              <label className="edit-label">Ikonka (emoji)</label>
              <input
                type="text"
                className="edit-input"
                value={editingSegment.icon}
                onChange={(e) => setEditingSegment({ ...editingSegment, icon: e.target.value })}
              />
            </div>

            <div className="edit-input-row">
              <div className="edit-form-group">
                <label className="edit-label">Rang</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="color"
                    value={editingSegment.color}
                    onChange={(e) => setEditingSegment({ ...editingSegment, color: e.target.value })}
                  />
                  <div className="color-preview" style={{ background: editingSegment.color }}></div>
                </div>
              </div>

              <div className="edit-form-group">
                <label className="edit-label">Matn rangi</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="color"
                    value={editingSegment.textColor}
                    onChange={(e) => setEditingSegment({ ...editingSegment, textColor: e.target.value })}
                  />
                  <div className="color-preview" style={{ background: editingSegment.textColor }}></div>
                </div>
              </div>
            </div>

            <div className="edit-form-group">
              <label className="edit-label">Ehtimollik (1-100)</label>
              <input
                type="number"
                className="edit-input"
                value={editingSegment.probability}
                min="1"
                max="100"
                onChange={(e) =>
                  setEditingSegment({
                    ...editingSegment,
                    probability: Math.max(1, Math.min(100, Number(e.target.value))),
                  })
                }
              />
            </div>

            <div className="edit-actions">
              <button className="edit-button cancel-button" onClick={() => setEditingSegment(null)}>
                Bekor qilish
              </button>
              <button className="edit-button save-button" onClick={() => updateSegment(editingSegment)}>
                <Icons.Save size={16} style={{ marginRight: "5px" }} /> Saqlash
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Audio elements with error handling */}
      <audio
        ref={audioRef}
        preload="auto"
        onError={(e) => {
          console.log("Audio loading error:", e)
          setAudioLoaded((prev) => ({ ...prev, spin: false }))
        }}
      >
        {/* Multiple sources for better compatibility */}
        <source src="/wheel-spin.mp3" type="audio/mpeg" />
        <source src="/wheel-spin.ogg" type="audio/ogg" />
      </audio>

      <audio
        ref={tickRef}
        preload="auto"
        onError={(e) => {
          console.log("Tick audio loading error:", e)
          setAudioLoaded((prev) => ({ ...prev, tick: false }))
        }}
      >
        {/* Multiple sources for better compatibility */}
        <source src="/tick-sound.mp3" type="audio/mpeg" />
        <source src="/tick-sound.ogg" type="audio/ogg" />
      </audio>
    </div>
  )
}
