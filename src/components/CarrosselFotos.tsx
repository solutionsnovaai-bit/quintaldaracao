import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

export default function CarrosselFotos({ children }: { children: ReactNode }) {
  const trilho = useRef<HTMLUListElement>(null)
  const { reduced, paused } = useMotionPreferences()
  const [automatico, setAutomatico] = useState(true)
  const [sobre, setSobre] = useState(false)
  const [visivel, setVisivel] = useState(false)
  const ativo = automatico && !reduced && !paused

  const mover = useCallback((direcao: number) => {
    const lista = trilho.current
    const primeiro = lista?.children[0] as HTMLElement | undefined
    const segundo = lista?.children[1] as HTMLElement | undefined
    if (!lista || !primeiro || !segundo) return
    const limite = lista.scrollWidth - lista.clientWidth
    if (limite < 2) return
    const passo = segundo.offsetLeft - primeiro.offsetLeft
    const atual = lista.scrollLeft
    const destino = direcao > 0 && atual >= limite - 3 ? 0
      : direcao < 0 && atual <= 3 ? limite
      : Math.max(0, Math.min(limite, atual + direcao * passo))
    lista.scrollTo({ left: destino, behavior: reduced ? 'instant' : 'smooth' })
  }, [reduced])

  useEffect(() => {
    const lista = trilho.current
    if (!lista) return
    const observer = new IntersectionObserver(([entry]) => setVisivel(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(lista)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!ativo || sobre || !visivel) return
    const timer = window.setInterval(() => {
      if (!document.hidden) mover(1)
    }, 3800)
    return () => window.clearInterval(timer)
  }, [ativo, mover, sobre, visivel])

  const navegar = (direcao: number) => {
    setAutomatico(false)
    mover(direcao)
  }

  return <div className="carrossel-pets" onMouseEnter={() => setSobre(true)} onMouseLeave={() => setSobre(false)}>
    <div className="carrossel-pets-acoes">
      <button type="button" aria-label="Fotos anteriores" onClick={() => navegar(-1)}><ArrowLeft /></button>
      {!reduced && !paused && <button type="button" aria-label={automatico ? 'Pausar carrossel' : 'Reproduzir carrossel'} onClick={() => setAutomatico(v => !v)}>{automatico ? <Pause /> : <Play />}</button>}
      <button type="button" aria-label="Próximas fotos" onClick={() => navegar(1)}><ArrowRight /></button>
    </div>
    <ul ref={trilho} className="carrossel-pets-trilho" tabIndex={0} aria-label="Fotos dos cães"
      onFocus={() => setAutomatico(false)} onTouchStart={() => setAutomatico(false)}>
      {children}
    </ul>
  </div>
}