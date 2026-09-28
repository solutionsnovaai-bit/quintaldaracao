import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { BRINCAR, MENSAGENS } from '../loja'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import BrandIcon from './BrandIcon'
import { Osso } from './Icones'
import Reveal, { Titulo } from './Reveal'

const img = (nome: string) => ({ src: `/loja/fotos/${nome}-760.webp`, srcSet: `/loja/fotos/${nome}-760.webp 760w, /loja/fotos/${nome}-1400.webp 1400w` })

/** Colagem de fotos que se desloca de leve com a rolagem, como fotos presas num mural. */
export default function Brincar() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const ativo = useSceneActivity(ref)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -70])
  const y3 = useTransform(scrollYProgress, [0, 1], [-30, 60])
  const p = (v: typeof y1) => (reduced ? undefined : { y: v })

  return <section ref={ref} className={`brincar secao ${ativo && !reduced ? 'is-ativo' : ''}`}>
    <div className="wrap brincar-grade">
      <div className="brincar-mural" role="group" aria-label="Fotos de pets brincando">
        <motion.figure className="brincar-foto f-principal" style={p(y1)}>
          <img {...img('brinquedos')} sizes="(max-width: 900px) 80vw, 36vw" width={1400} height={1050} alt={BRINCAR.fotos.brinquedos} loading="lazy" decoding="async" />
        </motion.figure>
        <motion.figure className="brincar-foto f-tutor" style={p(y2)}>
          <img {...img('tutor-cachorro')} sizes="(max-width: 900px) 52vw, 22vw" width={1400} height={1050} alt={BRINCAR.fotos.tutor} loading="lazy" decoding="async" />
          <span className="fita-adesiva" aria-hidden="true" />
        </motion.figure>
        <motion.figure className="brincar-foto f-tutora" style={p(y3)}>
          <img {...img('tutora-gato')} sizes="(max-width: 900px) 52vw, 22vw" width={1400} height={1050} alt={BRINCAR.fotos.tutora} loading="lazy" decoding="async" />
          <span className="fita-adesiva" aria-hidden="true" />
        </motion.figure>
        <span className="brincar-bola" aria-hidden="true" />
      </div>
      <div className="brincar-texto">
        <Reveal><span className="sobretitulo"><Osso />{BRINCAR.sobretitulo}</span></Reveal>
        <Titulo linhas={[BRINCAR.titulo]} destaque={BRINCAR.destaque} className="h2" />
        <Reveal delay={0.12}><p className="secao-texto">{BRINCAR.texto}</p></Reveal>
        <Reveal delay={0.2}><a className="botao botao-whats" href={waLink(MENSAGENS.brinquedos)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{BRINCAR.cta}</span></a></Reveal>
      </div>
    </div>
  </section>
}
