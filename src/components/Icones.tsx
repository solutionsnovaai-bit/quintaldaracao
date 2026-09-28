/** Pegada de pet (desenho próprio). */
export function Pata({ className = '' }: { className?: string }) {
  return <svg className={`pata ${className}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="currentColor">
    <ellipse cx="32" cy="42" rx="14" ry="12.5" />
    <ellipse cx="13.5" cy="29" rx="6" ry="7.6" transform="rotate(-18 13.5 29)" />
    <ellipse cx="24.5" cy="17.5" rx="6.2" ry="8.2" transform="rotate(-6 24.5 17.5)" />
    <ellipse cx="39.5" cy="17.5" rx="6.2" ry="8.2" transform="rotate(6 39.5 17.5)" />
    <ellipse cx="50.5" cy="29" rx="6" ry="7.6" transform="rotate(18 50.5 29)" />
  </svg>
}

/** Ossinho (desenho próprio). */
export function Osso({ className = '' }: { className?: string }) {
  return <svg className={`osso ${className}`} viewBox="0 0 64 32" aria-hidden="true" focusable="false" fill="currentColor">
    <rect x="12" y="10.5" width="40" height="11" rx="3" />
    <circle cx="12" cy="10" r="7" /><circle cx="12" cy="22" r="7" />
    <circle cx="52" cy="10" r="7" /><circle cx="52" cy="22" r="7" />
  </svg>
}
