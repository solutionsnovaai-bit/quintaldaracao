import { useEffect, useState } from 'react'
import { LOJA } from '../loja'

const paraMin = (hhmm: string) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m }
const ABRE = paraMin(LOJA.horario.abre)
const FECHA = paraMin(LOJA.horario.fecha)
const DIAS = new Set(LOJA.horario.dias)
const NOMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

/** "19:30" → "19h30", "09:00" → "9h" */
export const horaCurta = (hhmm: string) => { const [h, m] = hhmm.split(':').map(Number); return `${h}h${m ? String(m).padStart(2, '0') : ''}` }

/** Hora de São Paulo, qualquer que seja o fuso de quem está vendo o site. */
function agoraSP() {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date())
  const v = (t: string) => p.find(x => x.type === t)?.value ?? '0'
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(v('weekday'))
  return { dia, min: Number(v('hour')) * 60 + Number(v('minute')) }
}

export type Status = { aberto: boolean; curto: string; longo: string; fechaLogo: boolean }

export function calcularStatus(): Status {
  const { dia, min } = agoraSP()
  const fecha = horaCurta(LOJA.horario.fecha), abre = horaCurta(LOJA.horario.abre)
  if (DIAS.has(dia) && min >= ABRE && min < FECHA) {
    const falta = FECHA - min
    return { aberto: true, fechaLogo: falta <= 30, curto: 'Aberto agora', longo: falta <= 30 ? `fecha em ${falta} min` : `fecha às ${fecha}` }
  }
  // quando abre de novo
  if (DIAS.has(dia) && min < ABRE) return { aberto: false, fechaLogo: false, curto: 'Fechado agora', longo: `abre hoje às ${abre}` }
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7
    if (DIAS.has(d)) return { aberto: false, fechaLogo: false, curto: 'Fechado agora', longo: i === 1 ? `abre amanhã às ${abre}` : `abre ${NOMES[d]} às ${abre}` }
  }
  return { aberto: false, fechaLogo: false, curto: 'Fechado agora', longo: LOJA.horario.texto }
}

/** Status da loja, atualizado a cada minuto. */
export function useStatusLoja() {
  const [s, setS] = useState(calcularStatus)
  useEffect(() => {
    const t = window.setInterval(() => setS(calcularStatus()), 60_000)
    return () => clearInterval(t)
  }, [])
  return s
}
