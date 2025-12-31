"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NeuralBackgroundProps {
  children: React.ReactNode
}

export function NeuralBackground({ children }: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const styles = getComputedStyle(document.body)
    const primaryColor = styles.getPropertyValue("--primary").trim() || "#22c55e"

    // ---------- Resize (DPR-safe) ----------
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    window.addEventListener("resize", resize)
    resize()

    // ---------- Circular Wave Line Class ----------
    class CircularLine {
      opacity = 0
      targetOpacity = Math.random() * 0.4 + 0.1
      speed = Math.random() * 0.15 + 0.01 // Rotation/Wave speed
      radius: number
      phase: number
      frequency: number
      amplitude: number

      constructor(private centerX: number, private centerY: number) {
        this.radius = Math.random() * 300 + 100 // Base radius
        this.phase = Math.random() * Math.PI * 2 // Random starting point for wave
        this.frequency = Math.floor(Math.random() * 4) + 2 // How many "bumps" in the circle
        this.amplitude = Math.random() * 20 + 10 // How deep the waves are
      }

      draw(ctx: CanvasRenderingContext2D, t: number) {
        // Fade in
        if (this.opacity < this.targetOpacity) this.opacity += 0.005

        ctx.beginPath()
        ctx.globalAlpha = this.opacity
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = 1.5

        const segments = 100 // Higher segments for smoother circles
        
        // Draw a closed loop
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2
          
          // Calculate a "breathing" wave offset
          // We use the angle to make the wave wrap perfectly around the circle
          const wave = Math.sin(angle * this.frequency + t * this.speed + this.phase)
          const currentRadius = this.radius + wave * this.amplitude

          const x = this.centerX + Math.cos(angle) * currentRadius
          const y = this.centerY + Math.sin(angle) * currentRadius

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        
        ctx.stroke()
        ctx.globalAlpha = 1.0
      }
    }

    // Initialize Rings
    const lines: CircularLine[] = Array.from(
      { length: 12 }, 
      () => new CircularLine(window.innerWidth / 2, window.innerHeight / 2)
    )

    // ---------- Render Loop ----------
    const render = () => {
      time += 0.05 // Slower time step for smoother waves
      ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear cleanly for sharp lines

      lines.forEach((line) => line.draw(ctx, time))
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const introTimer = setTimeout(() => {
      setIsIntroComplete(true)
    }, 4000)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(introTimer)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground selection:bg-primary/20">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grain Texture */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
        //   style={{
        //     backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        //   }}
        />

        {/* Canvas for Circles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60"
          style={{ filter: "blur(0.5px)" }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/10 to-background/80" />
      </div>

      {/* Intro Overlay */}
      <AnimatePresence>
        {!isIntroComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "6rem" }}
                transition={{ duration: 1 }}
                className="w-px bg-linear-to-b from-transparent via-primary to-transparent"
              />

              <div className="text-center space-y-3 mix-blend-difference">
                <motion.h1
                  initial={{ opacity: 0, letterSpacing: "0.2em" }}
                  animate={{ opacity: 1, letterSpacing: "0.6em" }}
                  transition={{ duration: 2 }}
                  className="text-sm font-bold uppercase text-primary"
                >
                  System Initializing
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="text-[10px] uppercase tracking-[0.3em] font-mono text-muted-foreground"
                >
                  PANHAROTH
                </motion.p>
              </div>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "6rem" }}
                transition={{ duration: 1 }}
                className="w-px bg-linear-to-t from-transparent via-primary to-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isIntroComplete ? 1 : 0,
          y: isIntroComplete ? 0 : 20,
        }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.main>
    </div>
  )
}