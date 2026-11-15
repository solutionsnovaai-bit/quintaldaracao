import { LOJA } from '../loja'

/** Logotipo da loja (arte com fundo transparente). */
export default function Marca({ tamanho = 'topo' }: { tamanho?: 'topo' | 'rodape' }) {
  return tamanho === 'topo'
    ? <img className="marca marca-topo" src="/4patas/logo-horizontal-880.webp" width={880} height={288} alt={LOJA.nome} decoding="async" />
    : <img className="marca marca-rodape" src="/4patas/logo-480.webp" srcSet="/4patas/logo-480.webp 480w, /4patas/logo-1000.webp 1000w" sizes="240px" width={480} height={480} alt={LOJA.nome} loading="lazy" decoding="async" />
}
