import { useEffect, useRef, useState } from 'react'
import { ABERTURA, LOJA } from '../loja'
import { Pata } from './Icones'

const MINIMO = 2600   // tempo mínimo para a animação respirar
const LIMITE = 7000   // nunca segura a pessoa mais do que isso
const TRAVES = 'M5 5H95V95H5Z M5 50H95 M5 5L95 50 M95 5L5 50 M5 50L95 95 M95 50L5 95'

function Porta({ lado }: { lado: 'esq' | 'dir' }) {
  return <div className={`porta porta-${lado}`} aria-hidden="true">
    <svg className="porta-desenho" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
      <path className="porta-traves-sombra" d={TRAVES} />
      <path className="porta-traves" d={TRAVES} />
    </svg>
    <span className="porta-macaneta" />
  </div>
}

/** Espera fontes, a página e a imagem do topo; decodifica antes de abrir para não piscar. */
function esperarSite() {
  const carregou = new Promise<void>(r => (document.readyState === 'complete' ? r() : window.addEventListener('load', () => r(), { once: true })))
  const fontes = document.fonts?.ready.then(() => undefined) ?? Promise.resolve()
  const hero = document.querySelector<HTMLImageElement>('.hero-imagem img')
  const imagem = hero?.decode ? hero.decode().catch(() => undefined) : Promise.resolve()
  return Promise.all([carregou, fontes, imagem])
}

/**
 * Abertura: as portas do celeiro fechadas, o logotipo salta, as patinhas andam
 * enquanto o site carrega e, no fim, as portas se abrem com a luz do sol entrando.
 */
export default function Abertura({ onAbrir, onFim }: { onAbrir: () => void; onFim: () => void }) {
  const [abrindo, setAbrindo] = useState(false)
  const cb = useRef({ onAbrir, onFim })
  cb.current = { onAbrir, onFim }

  useEffect(() => {
    const t0 = performance.now()
    let feito = false, espera = 0
    const abrir = () => { if (!feito) { feito = true; setAbrindo(true) } }
    const limite = window.setTimeout(abrir, LIMITE)
    esperarSite().then(() => { espera = window.setTimeout(abrir, Math.max(0, MINIMO - (performance.now() - t0))) })
    return () => { clearTimeout(limite); clearTimeout(espera) }
  }, [])

  useEffect(() => {
    if (!abrindo) return
    const a = window.setTimeout(() => cb.current.onAbrir(), 480)
    const b = window.setTimeout(() => cb.current.onFim(), 1700)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [abrindo])

  return <div className={`abertura ${abrindo ? 'is-abrindo' : ''}`} role="status" aria-live="polite">
    <span className="sr-only">{abrindo ? `${LOJA.nome}: pronto` : `${LOJA.nome}: carregando o site`}</span>
    <span className="abertura-luz" aria-hidden="true" />
    <Porta lado="esq" />
    <Porta lado="dir" />
    <div className="abertura-centro" aria-hidden="true">
      <div className="abertura-marca">
        <span className="abertura-raios" />
        <img className="abertura-logo" src="/loja/logo-1000.webp" srcSet="/loja/logo-480.webp 480w, /loja/logo-1000.webp 1000w" sizes="(max-width: 600px) 78vw, 460px" width={1000} height={747} alt="" decoding="async" fetchPriority="high" />
      </div>
      <div className="abertura-patas">{[0, 1, 2, 3, 4].map(i => <Pata key={i} className={`p${i}`} />)}</div>
      <p className="abertura-texto">{ABERTURA.texto}</p>
    </div>
  </div>
}
