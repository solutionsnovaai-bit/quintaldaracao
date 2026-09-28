# Quintal da Ração · site do pet shop

Site de uma página do Quintal da Ração (Jardim Silvia, Zona Leste de SP).
Serve de **base para outros pet shops**: a estrutura é a mesma, e o que muda de uma loja para
outra fica separado em três lugares (textos, cores e imagens).

React 19, TypeScript, Vite 6, Tailwind 4, Motion e Lenis, com fontes locais (Fredoka e Nunito) e imagens em WebP.

## Rodar

Requisito: Node.js 20 ou superior.

```bash
npm ci
npm run dev      # http://localhost:4173
npm run build    # gera a pasta dist/
npm run check    # confere os tipos (opcional)
```

## Publicar na Vercel

Suba a pasta no GitHub e importe na Vercel. Framework: Vite. Build: `npm run build`. Saída: `dist`.
Não precisa de variável de ambiente. Com domínio próprio, defina `VITE_SITE_URL`
(ex.: `https://quintaldaracao.com.br`) nas variáveis do projeto e publique de novo.

Ao atualizar pelo GitHub, apague do repositório os arquivos que saíram do projeto (subir por cima não apaga).

## Antes de publicar

Tudo em `src/loja.ts`, no objeto `LOJA`:

- `whatsapp` (55 + DDD + número) e `whatsappExibicao`. **Todos os botões** abrem o WhatsApp com uma
  mensagem pronta do contexto (pedido, produto + pet, marca, brinquedos, dúvida). Sem número, o WhatsApp abre
  para a pessoa escolher o contato.
- `horario.dias`: hoje está "todos os dias". Se a loja fecha em algum dia, tire o número do dia da lista
  (0 = domingo … 6 = sábado) e preencha `diasTexto` (ex.: 'de segunda a sábado'). O selo "Aberto agora /
  Fechado agora" usa isso, sempre no horário de São Paulo.
- `instagram` e `instagramHandle` (opcional).

## Como fazer o próximo pet shop

1. Copie a pasta inteira.
2. **Textos e dados:** `src/loja.ts` (nome, endereço, horário, WhatsApp, textos das seções, lista de produtos
   por pet, lista de marcas, dúvidas, SEO). O título da aba, a prévia do link e o manifesto são gerados daqui.
3. **Cores:** `src/tema.css` (principal, acento, terceira cor das portas e da chamada final, fundos, texto)
   e `SEO.corTema` em `src/loja.ts`.
4. **Imagens:** `public/loja/` (veja `public/loja/LEIA-ME.txt` com nomes e tamanhos).
   Logotipo com fundo transparente, artes do topo (desktop e celular), fotos dos pets, foto da loja e logos das marcas.
5. **Topo:** em `src/components/Hero.tsx`, `ARTE.inicioLogo` diz em que ponto (em pixels, na arte desktop de 1672 px)
   o logotipo começa. O cartão de texto nunca passa desse ponto.
6. `public/og.jpg` (1200×630) para a prévia do link.

## Seções

Abertura (portas do celeiro que se abrem) → topo com selo "Aberto agora" → hero com palavra que gira →
fitas cruzadas → produtos por pet (cachorro, gato, pássaro) → vitrine de marcas → como comprar →
brinquedos → onde estamos (mapa, horário ao vivo, foto da loja) → dúvidas → chamada final → rodapé com cerca.
Balão do WhatsApp com inércia em todas as telas.

## Estrutura

```text
src/
  loja.ts               Tudo o que muda de um pet shop para outro
  tema.css              Cores
  styles.css            Visual, responsivo e animações
  App.tsx               Ordem das seções
  components/           Uma seção por arquivo (Abertura, Hero, Pets, Marcas, ComoComprar, ...)
  lib/                  WhatsApp, Google Maps e horário de funcionamento
  hooks/                Movimento reduzido, rolagem suave, cenas ativas
public/
  loja/                 Imagens da loja (logo, topo, fotos, marcas)
  texturas/             Textura de madeira (portas e chamada final)
  fonts/                Fredoka e Nunito (WOFF2, licença OFL)
```

## Desempenho e acessibilidade

- Só `transform`, `opacity` e `clip-path` animam; animações contínuas param fora da tela.
- As portas da abertura aparecem antes do JavaScript carregar e abrem assim que a foto do topo está pronta
  (no máximo 7 segundos).
- Rolagem suave só com mouse; no celular a rolagem é nativa.
- Respeita "reduzir movimento" do sistema (pula a abertura) e tem o botão "Pausar animações" no rodapé.
