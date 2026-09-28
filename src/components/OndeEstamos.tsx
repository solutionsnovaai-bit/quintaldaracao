import { Clock, MapPin, Navigation } from 'lucide-react'
import { LOJA, MENSAGENS, ONDE } from '../loja'
import { waLink } from '../lib/whatsapp'
import { linkRota, mapaEmbed } from '../lib/mapa'
import { useStatusLoja } from '../lib/horario'
import BrandIcon from './BrandIcon'
import { Pata } from './Icones'
import Reveal, { Titulo } from './Reveal'

export default function OndeEstamos() {
  const s = useStatusLoja()
  const e = LOJA.endereco
  return <section id="onde-estamos" className="onde secao">
    <div className="wrap onde-grade">
      <div className="onde-info">
        <Reveal><span className="sobretitulo"><Pata />{ONDE.sobretitulo}</span></Reveal>
        <Titulo linhas={[ONDE.titulo]} destaque={ONDE.destaque} className="h2" />
        <Reveal className="onde-cartao" delay={0.12}>
          <div className="onde-linha">
            <span className="onde-icone"><MapPin size={22} strokeWidth={2} aria-hidden="true" /></span>
            <div><b>Endereço</b><address>{e.rua}<br />{e.bairro} ({e.regiao}) · {e.cidade} - {e.uf}<br />CEP {e.cep}</address></div>
          </div>
          <div className="onde-linha">
            <span className="onde-icone"><Clock size={22} strokeWidth={2} aria-hidden="true" /></span>
            <div>
              <b>Horário</b>
              <p>{LOJA.horario.texto}{LOJA.horario.diasTexto ? `, ${LOJA.horario.diasTexto}` : ''}</p>
              <p className={`onde-agora ${s.aberto ? 'is-aberto' : 'is-fechado'}`}><i aria-hidden="true" />{s.curto} · {s.longo}</p>
            </div>
          </div>
          {LOJA.whatsappExibicao && <div className="onde-linha">
            <span className="onde-icone"><BrandIcon brand="whatsapp" /></span>
            <div><b>WhatsApp</b><p><a href={waLink(MENSAGENS.duvida)} target="_blank" rel="noopener noreferrer">{LOJA.whatsappExibicao}</a></p></div>
          </div>}
          <div className="onde-acoes">
            <a className="botao botao-escuro" href={linkRota} target="_blank" rel="noopener noreferrer"><Navigation size={18} strokeWidth={2.2} aria-hidden="true" /><span>{ONDE.comoChegar}</span></a>
            <a className="botao botao-whats" href={waLink(MENSAGENS.duvida)} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /><span>{ONDE.chamar}</span></a>
          </div>
        </Reveal>
      </div>
      <div className="onde-visual">
        <Reveal className="onde-mapa" delay={0.1} y={40}>
          <iframe title={`Mapa: ${LOJA.nome}, ${e.rua}, ${e.bairro}`} src={mapaEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <a className="onde-mapa-selo" href={linkRota} target="_blank" rel="noopener noreferrer"><Pata />{LOJA.nome}</a>
        </Reveal>
        <Reveal as="figure" className="onde-foto" delay={0.25} y={30}>
          <img src="/loja/fotos/loja-600.webp" srcSet="/loja/fotos/loja-600.webp 600w, /loja/fotos/loja-1100.webp 1100w" sizes="(max-width: 900px) 80vw, 360px" width={1100} height={541} alt={ONDE.fotoLoja} loading="lazy" decoding="async" />
          <figcaption>{ONDE.legendaFoto}</figcaption>
          <span className="fita-adesiva" aria-hidden="true" />
        </Reveal>
      </div>
    </div>
  </section>
}
