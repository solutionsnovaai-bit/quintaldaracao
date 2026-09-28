import { useEffect } from 'react'
import type Lenis from 'lenis'
import { useMotionPreferences } from './useMotionPreferences'

/** Rolagem com inércia só no desktop (mouse). No toque e com movimento reduzido, rolagem nativa. */
export function useSmoothScroll(enabled: boolean) {
  const { reduced } = useMotionPreferences()
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!enabled || reduced || !fine.matches) return
    let disposed = false
    let instance: Lenis | undefined
    let frame = 0
    let previous = 0
    let time = 0
    const tick = (now: number) => {
      if (!instance || disposed || document.hidden) { frame = 0; return }
      time += Math.min(Math.max(now - previous, 0), 32)
      previous = now
      instance.raf(time)
      frame = instance.isScrolling === 'smooth' ? requestAnimationFrame(tick) : 0
    }
    const wake = () => {
      if (disposed || !instance || document.hidden || frame) return
      previous = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; instance?.stop() }
      else { instance?.start(); wake() }
    }
    void import('lenis').then(({ default: SmoothScroll }) => {
      if (disposed || !fine.matches) return
      instance = new SmoothScroll({
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        anchors: { duration: 1.2, offset: -72 },
        stopInertiaOnNavigate: true,
        prevent: node => node.closest('[data-lenis-prevent]') !== null,
      })
      instance.on('scroll', wake)
      window.addEventListener('wheel', wake, { passive: true })
      window.addEventListener('click', wake)
      document.addEventListener('visibilitychange', visibility)
    }).catch(() => {})
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      instance?.destroy()
      window.removeEventListener('wheel', wake)
      window.removeEventListener('click', wake)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [enabled, reduced])
}
