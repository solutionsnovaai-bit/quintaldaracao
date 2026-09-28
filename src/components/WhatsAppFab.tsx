import { useEffect, useRef, useState } from 'react'
import { waLink } from '../lib/whatsapp'
import { LOJA } from '../loja'
import BrandIcon from './BrandIcon'

/*
  Balão do WhatsApp com inércia: a velocidade da rolagem se acumula, o balão atrasa,
  gira e estica de leve, e volta ao lugar com mola. Some quando a chamada final está na tela.
*/
export default function WhatsAppFab({ liberado }: { liberado: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [dica, setDica] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !liberado) return
    const final = document.getElementById('pedir')
    let perto = false
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lastY = window.scrollY, vel = 0, off = 0, rot = 0, raf = 0, visivel = false, parado = 0, jaMostrou = false, timerDica = 0
    const mostrar = () => {
      const quer = window.scrollY > window.innerHeight * 0.6 && !perto
      if (quer !== visivel) {
        visivel = quer
        el.parentElement?.classList.toggle('is-visivel', quer)
        if (quer && !jaMostrou) { jaMostrou = true; setDica(true); timerDica = window.setTimeout(() => setDica(false), 5200) }
        if (!quer) setDica(false)
      }
    }
    const loop = () => {
      vel *= 0.86
      const alvo = Math.max(-34, Math.min(34, vel * 0.85))
      off += (alvo - off) * 0.14
      rot += (off * 0.5 - rot) * 0.12
      const squash = 1 - Math.min(0.12, Math.abs(off) / 340)
      el.style.transform = `translate3d(0, ${off.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${squash.toFixed(3)}, ${(1 / squash).toFixed(3)})`
      if (Math.abs(off) < 0.05 && Math.abs(vel) < 0.05 && Math.abs(rot) < 0.05) parado++; else parado = 0
      raf = parado > 20 ? 0 : requestAnimationFrame(loop)
    }
    const onScroll = () => {
      const y = window.scrollY
      vel += y - lastY
      lastY = y
      mostrar()
      if (!reduzir && !raf) { parado = 0; raf = requestAnimationFrame(loop) }
    }
    const io = new IntersectionObserver(([e]) => { perto = e.isIntersecting; mostrar() }, { threshold: 0.2 })
    if (final) io.observe(final)
    window.addEventListener('scroll', onScroll, { passive: true })
    mostrar()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); clearTimeout(timerDica); io.disconnect() }
  }, [liberado])

  if (!liberado) return null
  return <div className="whats-fab">
    <span className={`whats-dica ${dica ? 'is-visivel' : ''}`} aria-hidden="true">Pedir pelo WhatsApp</span>
    <a ref={ref} className="whats-botao" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label={`Pedir no ${LOJA.nome} pelo WhatsApp (abre em nova aba)`} onMouseEnter={() => setDica(true)} onMouseLeave={() => setDica(false)} onFocus={() => setDica(true)} onBlur={() => setDica(false)}>
      <span className="whats-onda" aria-hidden="true" />
      <BrandIcon brand="whatsapp" />
    </a>
  </div>
}
