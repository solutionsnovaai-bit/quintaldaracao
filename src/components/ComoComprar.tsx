import { useRef } from 'react'
import { PackageCheck, Store } from 'lucide-react'
import { COMO_COMPRAR, MENSAGENS } from '../loja'
import { waLink } from '../lib/whatsapp'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import BrandIcon from './BrandIcon'
import { Pata } from './Icones'
import Reveal, { Titulo } from './Reveal'

const ICONES = [
  () => <BrandIcon brand="whatsapp" className="passo-icone" />,
  () => <PackageCheck className="passo-icone" strokeWidth={1.9} aria-hidden="true" />,
  () => <Store className="passo-icone" strokeWidth={1.9} aria-hidden="true" />,
]

/** Três passos, ligados por patinhas que andam de um cartão para o outro. */
export default function ComoComprar() {
  const ref = useRef<HTMLElement>(null)
  const ativo = useSceneActivity(ref)
  const { reduced } = useMotionPreferences()
  return <section id="como-comprar" ref={ref} className={`comprar secao ${ativo && !reduced ? 'is-ativo' : ''}`}>
    <div className="wrap">
      <header className="secao-cabeca is-centro">
        <Reveal><span className="sobretitulo"><Pata />{COMO_COMPRAR.sobretitulo}</span></Reveal>
        <Titulo linhas={[COMO_COMPRAR.titulo]} destaque={COMO_COMPRAR.destaque} className="h2" />
      </header>
      <ol className="passos">
        {COMO_COMPRAR.passos.map((p, i) => {
          const Icone = ICONES[i]
          return <Reveal as="li" key={p.titulo} className="passo" delay={0.12 * i} y={40}>
            <span className="passo-num" aria-hidden="true"><Pata /><b>{i + 1}</b></span>
            <Icone />
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
            {i < COMO_COMPRAR.passos.length - 1 && <span className="passo-trilha" aria-hidden="true"><Pata /><Pata /><Pata /></span>}
          </Reveal>
        })}
      </ol>
      <Reveal className="comprar-fim" delay={0.2}>
        <a className="botao botao-sol" href={waLink(MENSAGENS.padrao)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{COMO_COMPRAR.cta}</span></a>
      </Reveal>
    </div>
  </section>
}
