import { ArrowUp, Pause, Play } from 'lucide-react'
import { LOJA, NAV, RODAPE } from '../loja'
import { waLink } from '../lib/whatsapp'
import { linkRota } from '../lib/mapa'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import BrandIcon from './BrandIcon'
import Marca from './Marca'

export default function Rodape() {
  const { paused, toggle } = useMotionPreferences()
  const e = LOJA.endereco
  return <footer className="rodape">
    <div className="wrap rodape-grade">
      <div className="rodape-marca">
        <Marca tamanho="rodape" />
        <p>{LOJA.descricao}</p>
      </div>
      <nav className="rodape-col" aria-label="Seções do site">
        <b>Navegue</b>
        <ul>{NAV.map(n => <li key={n.id}><a href={`#${n.id}`}>{n.nome}</a></li>)}</ul>
      </nav>
      <div className="rodape-col">
        <b>Visite</b>
        <address><a href={linkRota} target="_blank" rel="noopener noreferrer">{e.rua}<br />{e.bairro} ({e.regiao})<br />{e.cidade} - {e.uf} · {e.cep}</a></address>
        <p>{LOJA.horario.texto}{LOJA.horario.diasTexto ? `, ${LOJA.horario.diasTexto}` : ''}</p>
      </div>
      <div className="rodape-col">
        <b>Fale com a gente</b>
        <a className="rodape-whats" href={waLink()} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" />{LOJA.whatsappExibicao || 'WhatsApp'}</a>
        {LOJA.instagram && <a className="rodape-whats" href={LOJA.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon brand="instagram" />{LOJA.instagramHandle || 'Instagram'}</a>}
      </div>
    </div>
    <div className="wrap rodape-base">
      <p>© {new Date().getFullYear()} {LOJA.nome}. Todos os direitos reservados.</p>
      <p className="rodape-credito">{RODAPE.credito}</p>
      <div className="rodape-botoes">
        <button type="button" onClick={toggle} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? 'Ligar animações' : 'Pausar animações'}</button>
        <a href="#inicio"><ArrowUp size={14} />Voltar ao topo</a>
      </div>
    </div>
  </footer>
}
