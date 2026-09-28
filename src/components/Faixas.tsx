import { useRef } from 'react'
import { FAIXAS } from '../loja'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { Osso, Pata } from './Icones'

function Fita({ palavras, tom, reverso }: { palavras: string[]; tom: 'verde' | 'amarela'; reverso?: boolean }) {
  const grupo = (oculto: boolean) => <div className="fita-grupo" aria-hidden={oculto || undefined}>
    {[...palavras, ...palavras].map((p, i) => <span key={p + i} className="fita-item" aria-hidden={i >= palavras.length || undefined}>{p}{tom === 'verde' ? <Pata /> : <Osso />}</span>)}
  </div>
  return <div className={`fita fita-${tom} ${reverso ? 'is-reverso' : ''}`}>
    <div className="fita-trilho">{grupo(false)}{grupo(true)}</div>
  </div>
}

/** Duas fitas que se cruzam logo abaixo do topo, rolando em sentidos opostos. */
export default function Faixas() {
  const ref = useRef<HTMLDivElement>(null)
  const ativo = useSceneActivity(ref)
  const { reduced } = useMotionPreferences()
  return <div ref={ref} className={`faixas ${ativo && !reduced ? 'is-ativo' : ''}`}>
    <Fita palavras={FAIXAS.amarela} tom="amarela" reverso />
    <Fita palavras={FAIXAS.verde} tom="verde" />
  </div>
}
