import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ENDERECO_COMPLETO, LOJA, SEO } from './src/loja'

/**
 * Endereço público do site, usado nas tags de compartilhamento (WhatsApp, Instagram, Google).
 * Ordem: VITE_SITE_URL (se você definir) → domínio de produção da Vercel → endereço padrão.
 */
function siteOrigin(mode: string) {
  const env = loadEnv(mode, '.', 'VITE_')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const raw = env.VITE_SITE_URL || (vercel ? `https://${vercel}` : 'https://quintal-da-racao.vercel.app')
  const url = new URL(raw)
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL deve usar HTTP ou HTTPS.')
  return url.origin
}

const html = (t: string) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Preenche o index.html e gera o site.webmanifest a partir de src/loja.ts. */
function dadosDaLoja(origin: string): Plugin {
  const trocas: Record<string, string> = {
    __SITE_ORIGIN__: origin,
    __NOME__: html(LOJA.nome),
    __TITULO__: html(SEO.titulo),
    __DESCRICAO__: html(SEO.descricao),
    __COMPARTILHAR_TITULO__: html(SEO.compartilharTitulo),
    __COMPARTILHAR_TEXTO__: html(SEO.compartilharTexto),
    __IMAGEM_ALT__: html(SEO.imagemAlt),
    __COR_TEMA__: SEO.corTema,
    __COR_FUNDO__: SEO.corFundo,
    __SEM_JS__: html(`${LOJA.nome} · Pet shop. ${ENDERECO_COMPLETO}. ${LOJA.horario.texto}.${LOJA.whatsappExibicao ? ` WhatsApp ${LOJA.whatsappExibicao}.` : ''}`),
  }
  const manifesto = JSON.stringify({
    name: `${LOJA.nome} · Pet shop`, short_name: LOJA.nome,
    icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
    theme_color: SEO.corTema, background_color: SEO.corFundo, display: 'standalone',
  }, null, 2)
  return {
    name: 'dados-da-loja',
    transformIndexHtml: (h: string) => Object.entries(trocas).reduce((acc, [k, v]) => acc.replaceAll(k, v), h),
    configureServer(server) {
      server.middlewares.use('/site.webmanifest', (_req, res) => { res.setHeader('Content-Type', 'application/manifest+json'); res.end(manifesto) })
    },
    generateBundle() { this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: manifesto }) },
  }
}

export default defineConfig(({ mode }) => {
  const origin = siteOrigin(mode)
  return {
    plugins: [react(), tailwindcss(), dadosDaLoja(origin)],
    define: { __SITE_ORIGIN__: JSON.stringify(origin) },
    server: { host: '0.0.0.0', port: 4173, strictPort: true },
    preview: { host: '0.0.0.0', port: 4173 },
    build: { target: 'es2022', sourcemap: false, cssCodeSplit: false },
  }
})
