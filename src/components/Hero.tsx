import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Navigation } from 'lucide-react'
import { HERO, MENSAGENS } from '../loja'
import { waLink } from '../lib/whatsapp'
import { linkRota } from '../lib/mapa'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import BrandIcon from './BrandIcon'
import { Pata } from './Icones'

export default function Hero({ pronto }: { pronto: boolean }) {
  const { reduced } = useMotionPreferences()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!pronto || reduced) return
    const timer = window.setInterval(() => setI(v => (v + 1) % HERO.palavras.length), 3000)
    return () => clearInterval(timer)
  }, [pronto, reduced])
  return <section id="inicio" className="hero hero-club">
    <div className="hero-arte">
      <picture className="hero-imagem">
        <source media="(max-width: 760px)" srcSet="/4patas/hero/hero-mobile-480.webp 480w, /4patas/hero/hero-mobile-941.webp 941w" sizes="100vw" />
        <img src="/4patas/hero/hero-desktop-1672.webp" srcSet="/4patas/hero/hero-desktop-1024.webp 1024w, /4patas/hero/hero-desktop-1672.webp 1672w" sizes="100vw" width={1672} height={941} alt="4 Patas Club: logo de cachorro e gato em veludo roxo e turquesa, com toalha e bolinha" fetchPriority="high" decoding="async" />
      </picture>
    </div>
    <div className="hero-conteudo wrap">
      <motion.div className="hero-cartao" initial={reduced ? false : { opacity: 0, y: 14 }} animate={pronto ? { opacity: 1, y: 0 } : {}} transition={{ duration: .5 }}>
        <span className="hero-selo"><Pata />{HERO.selo}</span>
        <h1 aria-label="Cuidar do seu pet é nossa paixão.">
          <span className="hero-linha" aria-hidden="true">{HERO.linha}</span>
          <span className="hero-palavra" aria-hidden="true">
            <span className="hero-palavra-medida">alegria.</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={reduced ? 'paixao' : i} className="hero-palavra-atual" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : .2 }}>{reduced ? HERO.palavras[0] : HERO.palavras[i]}</motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <p className="hero-texto">{HERO.texto}</p>
        <div className="hero-acoes">
          <a className="botao botao-whats" href={waLink(MENSAGENS.banho)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{HERO.cta}</span></a>
          <a className="botao botao-claro" href={linkRota} target="_blank" rel="noopener noreferrer"><Navigation size={18} aria-hidden="true" /><span>{HERO.secundario}</span></a>
        </div>
        <div className="hero-infos"><span>Banho e tosa</span><span>Veterinária</span><span>Pet shop</span></div>
      </motion.div>
    </div>
  </section>
}
