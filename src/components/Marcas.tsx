import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { MARCAS, MARCAS_SECAO, MENSAGENS } from '../loja'
import { waLink } from '../lib/whatsapp'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import BrandIcon from './BrandIcon'
import Reveal, { Titulo } from './Reveal'

type Marca = (typeof MARCAS)[number]

function Cartao({ m, oculto }: { m: Marca; oculto: boolean }) {
  return <li className="marca-item">
    <a className="marca-cartao" href={waLink(MENSAGENS.marca(m.nome))} target="_blank" rel="noopener noreferrer" tabIndex={oculto ? -1 : undefined}
      aria-label={oculto ? undefined : `${m.nome}: perguntar o preço no WhatsApp`} style={{ '--lw': m.w, '--lh': m.h } as CSSProperties}>
      <img src={`/loja/marcas/${m.slug}.webp`} alt="" width={m.w} height={m.h} loading="lazy" decoding="async" draggable={false} />
      <span className="marca-perguntar" aria-hidden="true"><BrandIcon brand="whatsapp" />Perguntar</span>
    </a>
  </li>
}

function Fileira({ marcas, reverso, duracao }: { marcas: Marca[]; reverso?: boolean; duracao: number }) {
  return <div className={`marcas-fileira ${reverso ? 'is-reverso' : ''}`} style={{ '--duracao': `${duracao}s` } as CSSProperties}>
    <div className="marcas-trilho">
      <ul className="marcas-grupo">{marcas.map(m => <Cartao key={m.slug} m={m} oculto={false} />)}</ul>
      <ul className="marcas-grupo" aria-hidden="true">{marcas.map(m => <Cartao key={m.slug} m={m} oculto />)}</ul>
    </div>
  </div>
}

/** Vitrine das marcas: duas fileiras que andam em sentidos opostos. Toque numa marca e pergunte o preço. */
export default function Marcas() {
  const ref = useRef<HTMLElement>(null)
  const ativo = useSceneActivity(ref)
  const { reduced } = useMotionPreferences()
  const meio = Math.ceil(MARCAS.length / 2)
  return <section id="marcas" ref={ref} className={`marcas secao ${ativo && !reduced ? 'is-ativo' : ''}`}>
    <div className="wrap marcas-cabeca">
      <div>
        <Reveal><span className="sobretitulo">{MARCAS_SECAO.sobretitulo}</span></Reveal>
        <Titulo linhas={[MARCAS_SECAO.titulo]} destaque={MARCAS_SECAO.destaque} className="h2" />
      </div>
      <Reveal className="marcas-lado" delay={0.12}>
        <p className="secao-texto">{MARCAS_SECAO.texto}</p>
        <p className="marcas-nao-achei">{MARCAS_SECAO.naoAchei} <a className="link" href={waLink(MENSAGENS.naoAchei)} target="_blank" rel="noopener noreferrer">{MARCAS_SECAO.naoAcheiLink}<ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" /></a></p>
      </Reveal>
    </div>
    <Reveal className="marcas-vitrine" delay={0.1} y={40}>
      <span className="sr-only">Marcas: {MARCAS.map(m => m.nome).join(', ')}.</span>
      <Fileira marcas={MARCAS.slice(0, meio)} duracao={46} />
      <Fileira marcas={MARCAS.slice(meio)} reverso duracao={52} />
    </Reveal>
  </section>
}
