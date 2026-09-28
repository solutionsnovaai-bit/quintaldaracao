import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Bird, Cat, Dog } from 'lucide-react'
import { MENSAGENS, PETS, PETS_SECAO } from '../loja'
import type { Pet } from '../loja'
import { waLink } from '../lib/whatsapp'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import BrandIcon from './BrandIcon'
import { Pata } from './Icones'
import Reveal, { EASE, Titulo } from './Reveal'

const ICONES: Record<Pet['id'], typeof Dog> = { cachorro: Dog, gato: Cat, passaro: Bird }
const foto = (p: Pet, w: number) => `/loja/fotos/${p.foto}-${w}.webp`

/** "Aqui tem de tudo": escolhe o pet e aparecem a foto, o que tem na loja e o botão do pedido. */
export default function Pets() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const visivel = useSceneActivity(ref)
  const [atual, setAtual] = useState(0)
  const p = PETS[atual]

  // Quando a seção chega perto, as outras fotos já vão carregando para a troca ser instantânea.
  useEffect(() => {
    if (!visivel) return
    PETS.forEach(x => { const i = new Image(); i.decoding = 'async'; i.src = foto(x, 760) })
  }, [visivel])

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const mapa: Record<string, number> = { ArrowRight: atual + 1, ArrowLeft: atual - 1, Home: 0, End: PETS.length - 1 }
    if (!(e.key in mapa)) return
    e.preventDefault()
    const n = (mapa[e.key] + PETS.length) % PETS.length
    setAtual(n)
    document.getElementById(`pet-aba-${n}`)?.focus()
  }

  return <section id="produtos" ref={ref} className="pets secao">
    <div className="wrap">
      <header className="secao-cabeca is-centro">
        <Reveal><span className="sobretitulo"><Pata />{PETS_SECAO.sobretitulo}</span></Reveal>
        <Titulo linhas={[PETS_SECAO.titulo]} destaque={PETS_SECAO.destaque} className="h2" />
        <Reveal delay={0.12}><p className="secao-texto">{PETS_SECAO.texto}</p></Reveal>
      </header>

      <Reveal delay={0.1}>
        <div className="pets-abas" role="tablist" aria-label="Escolha o seu pet" onKeyDown={onKey}>
          {PETS.map((x, i) => {
            const Icone = ICONES[x.id]
            return <button key={x.id} id={`pet-aba-${i}`} type="button" role="tab" aria-selected={atual === i} aria-controls="pet-painel" tabIndex={atual === i ? 0 : -1}
              className={`pets-aba ${atual === i ? 'is-ativo' : ''}`} onClick={() => setAtual(i)}>
              {atual === i && <motion.span layoutId="pets-aba-fundo" className="pets-aba-fundo" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <Icone size={24} strokeWidth={2} aria-hidden="true" /><span>{x.nome}</span>
            </button>
          })}
        </div>
      </Reveal>

      <div id="pet-painel" className="pets-painel" role="tabpanel" aria-labelledby={`pet-aba-${atual}`}>
        <div className="pets-foto-area">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.figure key={p.id} className="pets-foto"
              initial={reduced ? false : { opacity: 0, rotate: -9, scale: 0.9, y: 24 }} animate={{ opacity: 1, rotate: -2.5, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 7, scale: 0.92, x: 40 }} transition={{ type: 'spring', stiffness: 140, damping: 17 }}>
              <img src={foto(p, 760)} srcSet={`${foto(p, 760)} 760w, ${foto(p, 1400)} 1400w`} sizes="(max-width: 900px) 92vw, 46vw" width={1400} height={1050} alt={p.alt} loading="lazy" decoding="async" />
            </motion.figure>
          </AnimatePresence>
          <motion.span key={`selo-${p.id}`} className="pets-selo" aria-hidden="true" initial={reduced ? false : { scale: 0.4, rotate: -30, opacity: 0 }} animate={{ scale: 1, rotate: 8, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 13, delay: 0.25 }}>
            <Pata />Tem tudo pro<br />seu {p.para}!
          </motion.span>
        </div>

        <div className="pets-info">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.id} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
              <h3 className="pets-titulo">{p.titulo}</h3>
              <p className="pets-texto">{p.texto}</p>
              <ul className="pets-itens" aria-label={`Produtos para ${p.para}`}>
                {p.itens.map((it, i) => <motion.li key={it} initial={reduced ? false : { opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, delay: 0.05 + i * 0.035, ease: EASE }}>
                  <a href={waLink(MENSAGENS.item(it, p.para))} target="_blank" rel="noopener noreferrer">
                    <span className="pets-item-icone" aria-hidden="true"><Pata /></span>
                    <span className="pets-item-nome">{it}</span>
                    <ArrowUpRight className="pets-item-seta" size={16} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                </motion.li>)}
              </ul>
              <a className="botao botao-whats pets-cta" href={waLink(MENSAGENS.pet(p.tenho))} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{PETS_SECAO.cta(p)}</span></a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </section>
}
