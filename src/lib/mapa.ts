import { ENDERECO_COMPLETO, LOJA } from '../loja'

const alvo = encodeURIComponent(`${LOJA.nome}, ${ENDERECO_COMPLETO}`)
const soEndereco = encodeURIComponent(ENDERECO_COMPLETO)

/** Abre o Google Maps já traçando a rota até a loja. */
export const linkRota = `https://www.google.com/maps/dir/?api=1&destination=${soEndereco}`
/** Abre o endereço no Google Maps. */
export const linkMapa = `https://www.google.com/maps/search/?api=1&query=${alvo}`
/** Mapa incorporado (não precisa de chave de API). */
export const mapaEmbed = `https://www.google.com/maps?q=${soEndereco}&z=16&output=embed`
