import { Bath, Stethoscope, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { MENSAGENS } from '../loja'
import { waLink } from '../lib/whatsapp'
import Reveal, { Titulo } from './Reveal'
import { Pata } from './Icones'
const servicos = [
  { titulo: 'Banho e tosa', texto: 'Um cuidado especial para deixar seu companheiro limpinho, cheiroso e com o visual em dia.', icone: Bath, mensagem: MENSAGENS.banho, cta: 'Agendar um cuidado' },
  { titulo: 'Atendimento veterinário', texto: 'A saúde do seu pet merece atenção. Converse com a equipe e consulte a disponibilidade de atendimento.', icone: Stethoscope, mensagem: MENSAGENS.veterinario, cta: 'Consultar atendimento' },
  { titulo: 'Pet shop', texto: 'Produtos para acompanhar a rotina do seu melhor amigo. Chame a equipe para conhecer as opções da loja.', icone: ShoppingBag, mensagem: MENSAGENS.loja, cta: 'Conhecer os produtos' },
]
export default function Servicos() {
  return <section id="servicos" className="servicos secao"><div className="wrap">
    <header className="secao-cabeca is-centro"><Reveal><span className="sobretitulo"><Pata />Cuidado por inteiro</span></Reveal><Titulo linhas={['Cada pet, um jeitinho.']} destaque="Todo cuidado, muito carinho." className="h2" /></header>
    <div className="servicos-grade">{servicos.map((s,i) => <Reveal key={s.titulo} className="servico-card" delay={i * .08}><s.icone className="servico-icone" size={36} strokeWidth={1.6} aria-hidden="true" /><h3>{s.titulo}</h3><p>{s.texto}</p><a href={waLink(s.mensagem)} target="_blank" rel="noopener noreferrer">{s.cta}<ArrowUpRight size={19} aria-hidden="true" /></a></Reveal>)}</div>
  </div></section>
}
