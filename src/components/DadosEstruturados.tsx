import { LOJA, MARCAS, SEO } from '../loja'
import { temWhatsApp } from '../lib/whatsapp'

const DIAS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** Dados para o Google entender o negócio (tipo PetStore). */
export default function DadosEstruturados() {
  const e = LOJA.endereco
  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    name: LOJA.nome,
    description: SEO.descricao,
    url: `${__SITE_ORIGIN__}/`,
    image: `${__SITE_ORIGIN__}/og.jpg`,
    logo: `${__SITE_ORIGIN__}/loja/logo-480.webp`,
    address: { '@type': 'PostalAddress', streetAddress: e.rua, addressLocality: e.cidade, addressRegion: e.uf, postalCode: e.cep, addressCountry: 'BR' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: LOJA.horario.dias.map(d => DIAS[d]), opens: LOJA.horario.abre, closes: LOJA.horario.fecha }],
    brand: MARCAS.map(m => ({ '@type': 'Brand', name: m.nome })),
  }
  if (temWhatsApp) dados.telephone = `+${LOJA.whatsapp.replace(/\D/g, '')}`
  if (LOJA.instagram) dados.sameAs = [LOJA.instagram]
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
}
