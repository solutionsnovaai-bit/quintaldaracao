import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MapPin, X } from 'lucide-react'
import { LOJA, NAV } from '../loja'
import { waLink } from '../lib/whatsapp'
import { linkRota } from '../lib/mapa'
import BrandIcon from './BrandIcon'
import Marca from './Marca'
import StatusLoja from './StatusLoja'
import { EASE } from './Reveal'

export default function Header({ menuAberto, setMenuAberto }: { menuAberto: boolean; setMenuAberto: (v: boolean) => void }) {
  const [rolou, setRolou] = useState(false)
  const [ativo, setAtivo] = useState('')
  const botao = useRef<HTMLButtonElement>(null)
  const painel = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0
    const medir = () => { frame = 0; setRolou(window.scrollY > 30) }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(medir) }
    medir()
    window.addEventListener('scroll', onScroll, { passive: true })
    const secoes = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setAtivo(e.target.id) }), { rootMargin: '-45% 0px -50% 0px' })
    secoes.forEach(s => io.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); io.disconnect() }
  }, [])

  useEffect(() => {
    if (!menuAberto) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuAberto(false) }
    window.addEventListener('keydown', onKey)
    requestAnimationFrame(() => painel.current?.querySelector<HTMLElement>('a')?.focus())
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); botao.current?.focus() }
  }, [menuAberto, setMenuAberto])

  return <>
    <div className="faixa-topo">
      <div className="wrap faixa-topo-conteudo">
        <StatusLoja />
        <a className="faixa-topo-endereco" href={linkRota} target="_blank" rel="noopener noreferrer"><MapPin size={14} strokeWidth={2.2} aria-hidden="true" />{LOJA.endereco.rua} · {LOJA.endereco.bairro}</a>
        {LOJA.whatsappExibicao && <a className="faixa-topo-whats" href={waLink()} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" />{LOJA.whatsappExibicao}</a>}
      </div>
    </div>
    <header className={`topo ${rolou ? 'is-rolou' : ''} ${menuAberto ? 'is-menu' : ''}`}>
      <div className="topo-barra">
        <a className="topo-marca" href="#inicio" aria-label={`${LOJA.nome}, voltar ao início`} onClick={() => setMenuAberto(false)}><Marca /></a>
        <nav className="topo-nav" aria-label="Seções">
          {NAV.map(n => <a key={n.id} href={`#${n.id}`} className={ativo === n.id ? 'is-ativo' : undefined} aria-current={ativo === n.id ? 'true' : undefined}>{n.nome}</a>)}
        </nav>
        <div className="topo-acoes">
          <a className="botao botao-whats botao-pequeno topo-pedir" href={waLink()} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>Pedir no WhatsApp</span></a>
          <button ref={botao} className="topo-menu" type="button" aria-expanded={menuAberto} aria-controls="menu-movel" aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuAberto(!menuAberto)}>
            {menuAberto ? <X size={22} strokeWidth={2.4} /> : <span className="topo-menu-linhas" aria-hidden="true"><i /><i /><i /></span>}
          </button>
        </div>
      </div>
    </header>
    <AnimatePresence>
      {menuAberto && <motion.nav ref={painel} id="menu-movel" className="menu-movel" aria-label="Menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        <ul>
          {NAV.map((n, i) => <motion.li key={n.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: EASE }}>
            <a href={`#${n.id}`} onClick={() => setMenuAberto(false)}>{n.nome}</a>
          </motion.li>)}
        </ul>
        <motion.div className="menu-movel-pe" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: EASE }}>
          <StatusLoja />
          <a className="botao botao-whats" href={waLink()} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>Pedir no WhatsApp</span></a>
          <a className="link" href={linkRota} target="_blank" rel="noopener noreferrer"><MapPin size={16} strokeWidth={2.2} aria-hidden="true" />{LOJA.endereco.rua}, {LOJA.endereco.bairro}</a>
        </motion.div>
      </motion.nav>}
    </AnimatePresence>
  </>
}
