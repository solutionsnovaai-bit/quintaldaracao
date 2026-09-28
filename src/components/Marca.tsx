import { LOJA } from '../loja'

/** Logotipo da loja (arte com fundo transparente). */
export default function Marca({ tamanho = 'topo' }: { tamanho?: 'topo' | 'rodape' }) {
  return tamanho === 'topo'
    ? <img className="marca marca-topo" src="/loja/logo-220.webp" srcSet="/loja/logo-220.webp 220w, /loja/logo-480.webp 480w" sizes="110px" width={220} height={164} alt={LOJA.nome} decoding="async" />
    : <img className="marca marca-rodape" src="/loja/logo-480.webp" srcSet="/loja/logo-480.webp 480w, /loja/logo-1000.webp 1000w" sizes="240px" width={480} height={359} alt={LOJA.nome} loading="lazy" decoding="async" />
}
