import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { DUVIDAS, MENSAGENS } from '../loja'
import { waLink } from '../lib/whatsapp'
import BrandIcon from './BrandIcon'
import { Pata } from './Icones'
import Reveal, { Titulo } from './Reveal'

export default function Duvidas() {
  const [aberta, setAberta] = useState(0)
  const base = useId()
  return <section id="duvidas" className="duvidas secao">
    <div className="wrap duvidas-grade">
      <div className="duvidas-cabeca">
        <Reveal><span className="sobretitulo"><Pata />{DUVIDAS.sobretitulo}</span></Reveal>
        <Titulo linhas={[DUVIDAS.titulo]} destaque={DUVIDAS.destaque} className="h2" />
        <Reveal delay={0.12}><a className="botao botao-whats" href={waLink(MENSAGENS.duvida)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{DUVIDAS.link}</span></a></Reveal>
      </div>
      <Reveal className="duvidas-lista" delay={0.1}>
        {DUVIDAS.itens.map((d, i) => {
          const on = aberta === i
          return <div key={d.pergunta} className={`duvida ${on ? 'is-aberta' : ''}`}>
            <h3>
              <button type="button" id={`${base}-q${i}`} aria-expanded={on} aria-controls={`${base}-r${i}`} onClick={() => setAberta(on ? -1 : i)}>
                <span>{d.pergunta}</span><span className="duvida-sinal" aria-hidden="true"><Plus size={20} strokeWidth={2.4} /></span>
              </button>
            </h3>
            <div id={`${base}-r${i}`} role="region" aria-labelledby={`${base}-q${i}`} className="duvida-corpo" inert={!on}>
              <div><p>{d.resposta}</p></div>
            </div>
          </div>
        })}
      </Reveal>
    </div>
  </section>
}
