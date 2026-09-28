import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

/** Liga animações contínuas só enquanto a cena está na tela e a aba está em primeiro plano. */
export function useSceneActivity(ref: RefObject<HTMLElement | null>, threshold = 0) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let inView = false
    const update = () => setActive(inView && !document.hidden)
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update() }, { threshold, rootMargin: '80px 0px' })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [ref, threshold])
  return active
}
