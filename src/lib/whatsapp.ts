import { LOJA, MENSAGENS } from '../loja'

const numero = LOJA.whatsapp.replace(/\D/g, '')
export const temWhatsApp = /^\d{12,13}$/.test(numero)

if (import.meta.env.DEV && !temWhatsApp) {
  console.warn('[site] Preencha LOJA.whatsapp em src/loja.ts (55 + DDD + número).')
}

/** Link do WhatsApp com a mensagem pronta. Sem número cadastrado, abre o WhatsApp para escolher o contato. */
export function waLink(mensagem: string = MENSAGENS.padrao) {
  const texto = encodeURIComponent(mensagem)
  return temWhatsApp ? `https://wa.me/${numero}?text=${texto}` : `https://wa.me/?text=${texto}`
}
