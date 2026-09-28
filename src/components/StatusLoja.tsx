import { useStatusLoja } from '../lib/horario'

/** Bolinha "Aberto agora / Fechado agora", calculada no horário de São Paulo. */
export default function StatusLoja({ className = '', curto = false }: { className?: string; curto?: boolean }) {
  const s = useStatusLoja()
  return <span className={`status ${s.aberto ? 'is-aberto' : 'is-fechado'} ${s.fechaLogo ? 'is-fecha-logo' : ''} ${className}`}>
    <i aria-hidden="true" />
    <b>{s.curto}</b>
    {!curto && <span className="status-detalhe">{s.longo}</span>}
  </span>
}
