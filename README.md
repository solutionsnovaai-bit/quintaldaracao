# 4 Patas Club

Site de demonstração em React, TypeScript e Vite. Identidade roxa e turquesa, banho e tosa, atendimento veterinário, pet shop e galeria com fotografias reais.

## Desenvolvimento

- `npm ci`
- `npm run dev`
- `npm run check`
- `npm run build`

## Conteúdo e publicação

Dados comerciais em `src/loja.ts`, cores em `src/tema.css` e imagens em `public/loja/`.
WhatsApp confirmado: +55 11 91910-4903. Endereço informado: Rua Dr. Jorge Veiga, 133, Vila Carrão, São Paulo/SP. Horários ainda não confirmados; a página orienta consultar pelo WhatsApp e não anuncia aberto/fechado.

O logo em relevo é usado na interface; veludo apenas nos heroes. O enquadramento mantém o logo inteiro. Os recortes da galeria têm cerca de 230 px de largura e são exibidos em cards compactos sem upscale generativo.

O domínio de produção é obtido de `VITE_SITE_URL` ou `VERCEL_PROJECT_PRODUCTION_URL`. O endereço atual permanece como fallback até a troca do alias na Vercel; a mudança de nome do endereço é feita nas configurações do projeto Vercel.
