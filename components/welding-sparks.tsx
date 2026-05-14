'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export function WeldingSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const colors = ['#FF6B00', '#FFD700', '#FF4500', '#FFFFFF', '#FFA500']

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticle = (originX: number, originY: number): Particle => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 4 + 2
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 2,
        life: 0,
        maxLife: Math.random() * 60 + 30,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Origin point (center-right of canvas)
      const originX = rect.width * 0.7
      const originY = rect.height * 0.5

      // Add new particles
      if (particles.length < 50) {
        for (let i = 0; i < 3; i++) {
          particles.push(createParticle(originX, originY))
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravity

        const alpha = 1 - p.life / p.maxLife
        
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        // Draw glow first
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3 * alpha, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
        gradient.addColorStop(0, `rgba(255, 200, 100, ${alpha * 0.5})`)
        gradient.addColorStop(0.5, `rgba(255, 150, 50, ${alpha * 0.2})`)
        gradient.addColorStop(1, 'rgba(255, 100, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw particle core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw welding point glow - larger and brighter
      const glowGradient = ctx.createRadialGradient(originX, originY, 0, originX, originY, 60)
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      glowGradient.addColorStop(0.2, 'rgba(255, 230, 150, 0.6)')
      glowGradient.addColorStop(0.5, 'rgba(255, 150, 50, 0.3)')
      glowGradient.addColorStop(1, 'rgba(255, 100, 0, 0)')
      ctx.beginPath()
      ctx.arc(originX, originY, 60, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      // Inner bright core
      const coreGradient = ctx.createRadialGradient(originX, originY, 0, originX, originY, 15)
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      coreGradient.addColorStop(0.5, 'rgba(255, 255, 200, 0.8)')
      coreGradient.addColorStop(1, 'rgba(255, 200, 100, 0)')
      ctx.beginPath()
      ctx.arc(originX, originY, 15, 0, Math.PI * 2)
      ctx.fillStyle = coreGradient
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
