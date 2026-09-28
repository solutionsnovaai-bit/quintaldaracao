import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { Navigation } from 'lucide-react'
import { HERO, LOJA, MARCAS, MENSAGENS } from '../loja'
import { waLink } from '../lib/whatsapp'
import { linkRota } from '../lib/mapa'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import BrandIcon from './BrandIcon'
import StatusLoja from './StatusLoja'
import { Pata } from './Icones'
import { EASE } from './Reveal'

/** Na arte do desktop (1672 px), o logotipo começa em x ≈ 705. */
const ARTE = { w: 1672, h: 941, inicioLogo: 690 }
export const HERO_VERTICAL = '(max-width: 760px), (max-aspect-ratio: 1/1)'

/**
 * lado: a arte cobre a tela e o cartão fica à esquerda, sem encostar no logotipo.
 * empilhado: a arte inteira no topo e o cartão logo abaixo (telas largas e baixas).
 * vertical: arte em pé do celular, com o cartão sobre a parte do gramado.
 */
type Modo = { modo: 'lado' | 'empilhado' | 'vertical'; x: number; w: number }
const CARTAO = { max: 470, min: 390, folga: 32 }

function medirModo(): Modo {
  if (window.matchMedia(HERO_VERTICAL).matches) return { modo: 'vertical', x: 0, w: 0 }
  const w = window.innerWidth, h = Math.max(window.innerHeight - 38, 660)
  const escala = Math.max(w / ARTE.w, h / ARTE.h)
  const corte = ARTE.w * escala - w                    // a arte fica presa à direita; o corte sai da esquerda
  const inicioLogo = ARTE.inicioLogo * escala - corte
  const gutter = Math.min(64, Math.max(18, w * 0.044))
  const limite = inicioLogo - CARTAO.folga
  if (limite - gutter < CARTAO.min) return { modo: 'empilhado', x: 0, w: 0 }
  const x = Math.max(gutter, Math.min((w - 1280) / 2, limite - CARTAO.max))
  return { modo: 'lado', x: Math.round(x), w: Math.round(Math.min(CARTAO.max, limite - x)) }
}

function useModoHero() {
  const [m, setM] = useState<Modo>(() => (typeof window === 'undefined' ? { modo: 'lado', x: 64, w: 470 } : medirModo()))
  useEffect(() => {
    const vertical = window.matchMedia(HERO_VERTICAL)
    let frame = 0
    const medir = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => setM(medirModo())) }
    window.addEventListener('resize', medir)
    vertical.addEventListener('change', medir)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', medir); vertical.removeEventListener('change', medir) }
  }, [])
  return m
}

function PalavraQueGira({ pronto, ativo }: { pronto: boolean; ativo: boolean }) {
  const { reduced } = useMotionPreferences()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!pronto || !ativo || reduced) return
    const t = window.setInterval(() => setI(v => (v + 1) % HERO.palavras.length), 2400)
    return () => clearInterval(t)
  }, [pronto, ativo, reduced])
  const maior = HERO.palavras.reduce((a, b) => (b.length > a.length ? b : a))
  return <span className="hero-palavra" aria-hidden="true">
    <span className="hero-palavra-medida">{maior}</span>
    <AnimatePresence initial={false}>
      <motion.span key={i} className="hero-palavra-atual"
        initial={{ y: '90%', opacity: 0, rotate: 4 }} animate={pronto ? { y: 0, opacity: 1, rotate: 0 } : {}}
        exit={{ y: '-80%', opacity: 0, rotate: -3, transition: { duration: reduced ? 0 : 0.45, ease: EASE, delay: 0 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: pronto && i === 0 ? 0.45 : 0.05 }}>
        {HERO.palavras[i]}
        <svg className="hero-sublinhado" viewBox="0 0 300 18" preserveAspectRatio="none" focusable="false"><motion.path d="M4 13C60 5 140 3 296 9" initial={{ pathLength: reduced ? 1 : 0 }} animate={pronto ? { pathLength: 1 } : {}} transition={{ duration: 0.7, delay: pronto && i === 0 ? 0.95 : 0.3, ease: EASE }} /></svg>
      </motion.span>
    </AnimatePresence>
  </span>
}

export default function Hero({ pronto }: { pronto: boolean }) {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const ativo = useSceneActivity(ref)
  const { modo, x, w } = useModoHero()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const arteY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const surge = (delay: number) => ({ initial: reduced ? false as const : { opacity: 0, y: 18 }, animate: pronto ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay, ease: EASE } })

  return <section id="inicio" ref={ref} className={`hero hero-${modo} ${pronto ? 'is-pronto' : ''}`} style={modo === 'lado' ? { '--hero-x': `${x}px`, '--hero-w': `${w}px` } as CSSProperties : undefined}>
    <div className="hero-arte">
      <motion.picture className="hero-imagem" style={reduced || modo !== 'lado' ? undefined : { y: arteY }}
        initial={reduced ? false : { scale: 1.07 }} animate={pronto ? { scale: 1 } : {}} transition={{ duration: 1.8, ease: EASE }}>
        <source media={HERO_VERTICAL} srcSet="/loja/hero/hero-mobile-780.webp 780w, /loja/hero/hero-mobile-1290.webp 1290w" sizes="100vw" />
        <img src="/loja/hero/hero-desktop-1600.webp" srcSet="/loja/hero/hero-desktop-1024.webp 1024w, /loja/hero/hero-desktop-1600.webp 1600w, /loja/hero/hero-desktop-2560.webp 2560w" sizes="100vw" width={1600} height={900}
          alt={`${LOJA.nome}: cachorro e gato ao lado de um saco de ração, pote e ossinho, com um celeiro vermelho e um quintal ensolarado ao fundo`} fetchPriority="high" decoding="async" />
      </motion.picture>
    </div>

    <div className="hero-conteudo wrap">
      <motion.div className="hero-cartao" initial={reduced ? false : { opacity: 0, y: 46, rotate: -2 }} animate={pronto ? { opacity: 1, y: 0, rotate: 0 } : {}} transition={{ type: 'spring', stiffness: 110, damping: 16, delay: 0.1 }}>
        <motion.span className="hero-adesivo" aria-hidden="true" initial={reduced ? false : { scale: 0, rotate: -40 }} animate={pronto ? { scale: 1, rotate: 12 } : {}} transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 1.1 }}>
          <Pata /><span>Tem<br />tudo!</span>
        </motion.span>
        <motion.span className="hero-selo" {...surge(0.25)}><Pata /><span><span className="hero-selo-pre">{HERO.seloPre} </span>{HERO.selo}</span></motion.span>
        <h1 aria-label={`${HERO.linha} ${HERO.palavras.join(' ')}`}>
          <motion.span className="hero-linha" aria-hidden="true" {...surge(0.32)}>{HERO.linha}</motion.span>
          <PalavraQueGira pronto={pronto} ativo={ativo} />
        </h1>
        <motion.p className="hero-texto" {...surge(0.5)}>{HERO.texto}</motion.p>
        <motion.div className="hero-acoes" {...surge(0.62)}>
          <a className="botao botao-whats" href={waLink(MENSAGENS.padrao)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{HERO.cta}</span></a>
          <a className="botao botao-claro" href={linkRota} target="_blank" rel="noopener noreferrer"><Navigation size={18} strokeWidth={2.2} aria-hidden="true" /><span>{HERO.secundario}</span></a>
        </motion.div>
        <motion.div className="hero-infos" {...surge(0.74)}>
          <StatusLoja />
          <span className="hero-info"><b>+{MARCAS.length}</b> marcas</span>
          <span className="hero-info">Cães, gatos e pássaros</span>
        </motion.div>
      </motion.div>
    </div>
  </section>
}
