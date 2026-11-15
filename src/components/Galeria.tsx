import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { LOJA } from '../loja'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Reveal, { Titulo } from './Reveal'
import { Pata } from './Icones'
const fotos = [
  ['01-golden-bandana', 'Golden retriever com bandana', 231, 270],
  ['02-cao-laco-rosa', 'Cão caramelo com laço rosa', 230, 269],
  ['03-golden-borboletas', 'Golden retriever com enfeites azuis', 231, 265],
  ['04-spitz-bandana', 'Spitz com bandana azul', 231, 265],
  ['05-basset', 'Basset hound com bandana rosa', 230, 308],
  ['06-pelo-longo', 'Detalhe da pelagem longa após os cuidados', 230, 308],
] as const
export default function Galeria() {
  const ref = useRef<HTMLDivElement>(null)
  const { reduced } = useMotionPreferences()
  const [pos, setPos] = useState(0)
  const [fim, setFim] = useState(false)
  const atualizar = () => { const e = ref.current; if (e) { setPos(e.scrollLeft); setFim(e.scrollLeft + e.clientWidth >= e.scrollWidth - 4) } }
  const mover = (direcao: number) => ref.current?.scrollBy({ left: direcao * 244, behavior: reduced ? 'instant' : 'smooth' })
  return <section id="galeria" className="galeria secao"><div className="wrap">
    <header className="galeria-cabeca"><div><Reveal><span className="sobretitulo"><Pata />Nossos pets</span></Reveal><Titulo linhas={['Uma turma de']} destaque="roubar o coração." className="h2" /><p className="secao-texto">Alguns dos companheiros que passaram pelo 4 Patas Club. Cada um com seu charme, todos com muito carinho.</p></div>
      <div className="galeria-controles"><button type="button" aria-label="Fotos anteriores" onClick={() => mover(-1)} disabled={pos < 4}><ArrowLeft /></button><button type="button" aria-label="Próximas fotos" onClick={() => mover(1)} disabled={fim}><ArrowRight /></button></div>
    </header>
    <div ref={ref} id="fotos-pets" className="galeria-trilho" onScroll={atualizar} tabIndex={0} role="region" aria-label="Fotos dos pets do 4 Patas Club. Deslize para ver mais.">{fotos.map(([nome,alt,w,h]) => <figure className="galeria-foto" key={nome}><img src={`/4patas/galeria-tratada/${nome}.webp`} width={460} height={Math.round(h * 460 / w)} alt={alt} loading="lazy" decoding="async" /></figure>)}</div>
    <a className="link galeria-instagram" href={LOJA.instagram} target="_blank" rel="noopener noreferrer">Veja mais no Instagram {LOJA.instagramHandle}<ArrowRight size={17} aria-hidden="true" /></a>
  </div></section>
}
