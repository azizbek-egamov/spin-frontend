"use client"

import { useState, useRef } from "react"

export default function FortuneWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)
  const audioRef = useRef(null)

  // Wheel segments/prizes
  const segments = [
  ]

  const segmentAngle = 360 / segments.length

  // Function to spin the wheel
  const spinWheel = () => {
    if (isSpinning) return

    // Play spinning sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    setIsSpinning(true)
    setResult(null)

    // Random number of full rotations (between 3 and 5)
    const fullRotations = 3 + Math.floor(Math.random() * 3)

    // Random angle for the final position (which segment will be selected)
    const randomSegment = Math.floor(Math.random() * segments.length)
    const randomAngle = randomSegment * segmentAngle

    // Calculate total rotation (full rotations + random angle + small offset)
    const spinAngle = fullRotations * 360 + randomAngle + Math.random() * segmentAngle

    // Set new rotation (add to current rotation for continuous spinning)
    const newRotation = rotation + spinAngle
    setRotation(newRotation)

    // Determine the result after spinning is complete
    setTimeout(() => {
      // Calculate which segment is at the top position
      const normalizedRotation = newRotation % 360
      const segmentIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length
      setResult(segments[segmentIndex])
      setIsSpinning(false)

      // Stop the sound
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }, 5000) // Match this with the CSS animation duration
  }

  return (
    <div className="fortune-wheel-container">
      <style jsx>{`
        .fortune-wheel-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .fortune-wheel-title {
          font-size: 3rem;
          margin-bottom: 10px;
          color: #f0f0f0;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .fortune-wheel-subtitle {
          font-size: 1.2rem;
          color: #aaa;
          margin-bottom: 30px;
        }

        .wheel-container {
          position: relative;
          width: 350px;
          height: 350px;
          margin: 0 auto 40px;
        }

        .wheel {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #333;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.3) inset;
          transition: transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99);
        }

        .wheel-segment {
          position: absolute;
          width: 50%;
          height: 50%;
          transform-origin: bottom right;
          left: 0;
          top: 0;
          border: 1px solid rgba(0, 0, 0, 0.2);
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
          padding-top: 20px;
          font-weight: bold;
          font-size: 14px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          transform-origin: bottom right;
        }

        .wheel-center {
          position: absolute;
          width: 50px;
          height: 50px;
          background: #f0f0f0;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          border: 5px solid #ddd;
        }

        .wheel-pointer {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: #f44336;
          clip-path: polygon(50% 100%, 0 0, 100% 0);
          z-index: 10;
          filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
        }

        .spin-button {
          padding: 15px 40px;
          font-size: 1.2rem;
          font-weight: 600;
          background: linear-gradient(135deg, #f44336, #e91e63);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .spin-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 20px rgba(0, 0, 0, 0.4);
        }

        .spin-button:active {
          transform: translateY(1px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        }

        .spin-button.disabled {
          background: #888;
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .result-container {
          margin-top: 30px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          animation: fadeIn 0.5s ease;
        }

        .result-container h2 {
          margin-bottom: 10px;
          color: #f0f0f0;
        }

        .result-container p {
          font-size: 1.2rem;
        }

        .result-container span {
          font-weight: bold;
          font-size: 1.4rem;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .wheel-container {
            width: 300px;
            height: 300px;
          }
          
          .fortune-wheel-title {
            font-size: 2.5rem;
          }
          
          .segment-content {
            font-size: 12px;
            padding-top: 15px;
          }
        }

        @media (max-width: 480px) {
          .wheel-container {
            width: 250px;
            height: 250px;
          }
          
          .fortune-wheel-title {
            font-size: 2rem;
          }
          
          .segment-content {
            font-size: 10px;
            padding-top: 12px;
          }
          
          .wheel-center {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      <h1 className="fortune-wheel-title">Omad Charxi</h1>
      <p className="fortune-wheel-subtitle">Omadingizni sinab ko'ring!</p>

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
                  {segment.text}
                </div>
              </div>
            )
          })}
        </div>

        {/* Wheel center */}
        <div className="wheel-center"></div>

        {/* Pointer/indicator */}
        <div className="wheel-pointer"></div>
      </div>

      {/* Spin button */}
      <button className={`spin-button ${isSpinning ? "disabled" : ""}`} onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? "Aylanmoqda..." : "Aylantirish"}
      </button>

      {/* Result display */}
      {result && (
        <div className="result-container">
          <h2>Tabriklaymiz!</h2>
          <p>
            Siz yutdingiz: <span style={{ color: result.color }}>{result.text}</span>
          </p>
        </div>
      )}

      {/* Audio for spinning sound */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/sfx/preview/mixkit-slot-machine-wheel-1932.mp3"
        preload="auto"
      ></audio>
    </div>
  )
}
