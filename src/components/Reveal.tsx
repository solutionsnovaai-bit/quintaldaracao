import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Entrada suave ao rolar: sobe e aparece uma única vez. */
export default function Reveal({ children, className = '', delay = 0, y = 28, as = 'div' }: { children: ReactNode; className?: string; delay?: number; y?: number; as?: 'div' | 'li' | 'figure' }) {
  const { reduced } = useMotionPreferences()
  const Comp = motion[as] as typeof motion.div
  return <Comp className={className} initial={reduced ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1, delay, ease: EASE }}>{children}</Comp>
}

/** Título com linhas mascaradas: cada linha sobe de trás de uma borda invisível. */
export function Titulo({ linhas, destaque, as: Tag = 'h2', className = '' }: { linhas: readonly string[]; destaque?: string; as?: 'h1' | 'h2' | 'h3'; className?: string }) {
  const { reduced } = useMotionPreferences()
  const todas = destaque ? [...linhas, destaque] : [...linhas]
  return <Tag className={className} aria-label={todas.join(' ')}>
    <motion.span className="titulo-linhas" initial={reduced ? 'show' : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.4 }} aria-hidden="true">
      {todas.map((l, i) => <span className="line-mask" key={l + i}>
        <motion.span className={destaque && i === todas.length - 1 ? 'destaque' : undefined} variants={{ hidden: { y: '108%' }, show: { y: 0, transition: { duration: 1.1, delay: 0.06 + i * 0.1, ease: EASE } } }}>{l}</motion.span>
      </span>)}
    </motion.span>
  </Tag>
}
