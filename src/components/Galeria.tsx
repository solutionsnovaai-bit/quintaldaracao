import CarrosselFotos from './CarrosselFotos'
import { ArrowRight } from 'lucide-react'
import { LOJA } from '../loja'
import Reveal, { Titulo } from './Reveal'
import { Pata } from './Icones'
const fotos = [
  ['01-golden-bandana', 'Golden retriever com bandana'],
  ['02-cao-laco-rosa', 'Cão caramelo com enfeites florais'],
  ['03-golden-borboletas', 'Golden retriever com enfeites azuis'],
  ['04-spitz-bandana', 'Spitz com bandana azul'],
  ['05-basset', 'Basset hound com bandana rosa'],
  ['06-pelo-longo', 'Detalhe da pelagem longa após os cuidados'],
] as const
export default function Galeria() {
  return <section id="galeria" className="galeria secao"><div className="wrap">
    <header className="galeria-cabeca"><div><Reveal><span className="sobretitulo"><Pata />Nossos pets</span></Reveal><Titulo linhas={['Uma turma de']} destaque="roubar o coração." className="h2" /><p className="secao-texto">Alguns dos companheiros que passaram pelo 4 Patas Club. Cada um com seu charme, todos com muito carinho.</p></div>
    </header>
    <CarrosselFotos>{fotos.map(([nome, alt]) => <li key={nome}><img src={`/4patas/galeria-recriada/${nome}.webp`} width={506} height={506} alt={alt} loading="lazy" decoding="async" /></li>)}</CarrosselFotos>
    <p>Retratos recriados a partir das fotos dos cães.</p>
    <a className="link galeria-instagram" href={LOJA.instagram} target="_blank" rel="noopener noreferrer">Veja mais no Instagram {LOJA.instagramHandle}<ArrowRight size={17} aria-hidden="true" /></a>
  </div></section>
}
