import type { ReactNode } from 'react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

export default function CarrosselFotos({ children }: { children: ReactNode }) {
  const { reduced } = useMotionPreferences()

  return <div className={`carrossel-pets${reduced ? ' is-estatico' : ''}`}
    role="region" aria-label="Galeria dos cães" tabIndex={reduced ? 0 : undefined}>
    <div className="carrossel-pets-trilho">
      <ul className="carrossel-pets-grupo">{children}</ul>
      {!reduced && <ul className="carrossel-pets-grupo carrossel-pets-copia" aria-hidden="true" inert>{children}</ul>}
    </div>
  </div>
}
