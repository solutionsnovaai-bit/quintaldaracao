/**
 * TUDO o que muda de um pet shop para outro mora aqui (textos, contato, horário, fotos e marcas).
 * As cores ficam em src/tema.css e as imagens em public/loja/.
 * Campo vazio ('') não aparece no site.
 */
export const LOJA = {
  nome: 'Quintal da Ração',
  /** Como a loja se apresenta numa frase curta (rodapé, Google). */
  descricao: 'Pet shop no Jardim Silvia, Zona Leste de São Paulo: rações, petiscos, brinquedos, acessórios e higiene para cães, gatos e pássaros.',

  /** WhatsApp só com números: 55 + DDD + número. Ex.: '5511999998888' */
  whatsapp: '',
  /** Como o número aparece escrito no site. Ex.: '(11) 99999-8888' */
  whatsappExibicao: '',
  /** Link completo do Instagram. Ex.: 'https://www.instagram.com/usuario/' */
  instagram: '',
  instagramHandle: '',

  endereco: {
    rua: 'R. Cornélio de Arzão, 150',
    bairro: 'Jardim Silvia',
    regiao: 'Zona Leste',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '08140-550',
  },

  horario: {
    abre: '09:00',
    fecha: '19:30',
    /** Dias abertos: 0 = domingo, 1 = segunda ... 6 = sábado. */
    dias: [0, 1, 2, 3, 4, 5, 6],
    /** Como o horário aparece escrito. */
    texto: 'Das 9h às 19h30',
    /** Dias por extenso. Deixe '' enquanto não tiver certeza. */
    diasTexto: '',
  },
}

export const ENDERECO_COMPLETO = `${LOJA.endereco.rua} - ${LOJA.endereco.bairro}, ${LOJA.endereco.cidade} - ${LOJA.endereco.uf}, ${LOJA.endereco.cep}`

const ola = `Olá! Vim pelo site do ${LOJA.nome}`

/** Mensagens que já vão escritas no WhatsApp. */
export const MENSAGENS = {
  padrao: `${ola} e queria fazer um pedido.`,
  duvida: `${ola} e tenho uma dúvida.`,
  pet: (pet: string) => `${ola}. Tenho ${pet} e queria ver as opções de produtos.`,
  item: (item: string, pet: string) => `${ola}. Vocês têm ${item.toLowerCase()} para ${pet}?`,
  marca: (marca: string) => `${ola}. Vocês têm produtos da ${marca}? Queria saber os preços.`,
  naoAchei: `${ola}. Não achei no site a marca que meu pet come. Vocês podem verificar pra mim?`,
  brinquedos: `${ola} e queria ver os brinquedos que vocês têm.`,
  escolher: `${ola} e queria ajuda para escolher a melhor ração para o meu pet.`,
}

export const NAV = [
  { id: 'produtos', nome: 'Produtos' },
  { id: 'marcas', nome: 'Marcas' },
  { id: 'como-comprar', nome: 'Como comprar' },
  { id: 'onde-estamos', nome: 'Onde estamos' },
  { id: 'duvidas', nome: 'Dúvidas' },
] as const

export const ABERTURA = { texto: 'Abrindo o quintal…' }

export const HERO = {
  seloPre: 'Pet shop no',
  selo: `${LOJA.endereco.bairro} · ${LOJA.endereco.regiao}`,
  linha: 'Tudo para o seu',
  palavras: ['cachorro.', 'gato.', 'passarinho.', 'melhor amigo.'],
  texto: 'Rações, petiscos, brinquedos, acessórios e higiene das marcas que seu pet ama. Chama no WhatsApp que a gente confere o estoque e já separa pra você.',
  cta: 'Pedir pelo WhatsApp',
  secundario: 'Como chegar',
}

/** Palavras das faixas que atravessam a tela. */
export const FAIXAS = {
  verde: ['Rações', 'Petiscos', 'Brinquedos', 'Coleiras', 'Caminhas', 'Areia', 'Tapete higiênico', 'Shampoo', 'Alpiste'],
  amarela: ['Tem pra cachorro', 'Tem pra gato', 'Tem pra passarinho', 'Pertinho de você', 'Chama no WhatsApp'],
}

export type Pet = {
  id: 'cachorro' | 'gato' | 'passaro'
  nome: string
  /** Como o pet aparece dentro da frase ("para seu cachorro"). */
  para: string
  /** "Tenho um cachorro" */
  tenho: string
  foto: string
  alt: string
  titulo: string
  texto: string
  itens: string[]
}

export const PETS_SECAO = {
  sobretitulo: 'Tudo para o seu pet',
  titulo: 'Aqui tem de tudo',
  destaque: 'pro seu bichinho.',
  texto: 'Escolha quem é o seu companheiro e veja o que você encontra na loja. Toque em qualquer item para perguntar no WhatsApp.',
  cta: (p: Pet) => `Montar o pedido do meu ${p.nome.toLowerCase()}`,
}

export const PETS: Pet[] = [
  {
    id: 'cachorro', nome: 'Cachorro', para: 'cachorro', tenho: 'um cachorro', foto: 'cachorro',
    alt: 'Cachorro shih-tzu sentado, com bandana verde, olhando para a câmera',
    titulo: 'Pro seu cachorro',
    texto: 'Do filhote ao idoso, do pequeno ao gigante: tem ração pro porte e pra idade dele, e tudo o que deixa o dia a dia mais gostoso.',
    itens: ['Ração seca e úmida', 'Petiscos e ossinhos', 'Brinquedos', 'Coleiras e guias', 'Caminhas', 'Comedouros e bebedouros', 'Tapete higiênico', 'Shampoo e higiene'],
  },
  {
    id: 'gato', nome: 'Gato', para: 'gato', tenho: 'um gato', foto: 'gato',
    alt: 'Gato laranja deitado numa almofada, com uma bolinha de feltro verde',
    titulo: 'Pro seu gato',
    texto: 'Ração seca, sachê, areia e aquele petisco que faz ele vir correndo. Gato exigente também sai feliz daqui.',
    itens: ['Ração seca', 'Sachê e patê', 'Petiscos', 'Areia sanitária', 'Arranhadores', 'Brinquedos', 'Comedouros e bebedouros', 'Produtos de higiene'],
  },
  {
    id: 'passaro', nome: 'Pássaro', para: 'passarinho', tenho: 'um passarinho', foto: 'passaro',
    alt: 'Calopsita cinza com topete amarelo pousada num galho',
    titulo: 'Pro seu passarinho',
    texto: 'Calopsita, periquito, canário: alimentação certa pra cada um e os acessórios pra gaiola ficar completa.',
    itens: ['Alpiste e sementes', 'Misturas para calopsita', 'Farinhada', 'Petiscos', 'Comedouros e bebedouros', 'Poleiros e acessórios'],
  },
]

export const MARCAS_SECAO = {
  sobretitulo: 'Marcas',
  titulo: 'As marcas que',
  destaque: 'seu pet ama.',
  texto: 'Toque numa marca para perguntar o preço no WhatsApp.',
  naoAchei: 'Não achou a do seu pet?',
  naoAcheiLink: 'Chama que a gente verifica',
}

/** Logos em public/loja/marcas/<slug>.webp. w/h = tamanho de exibição equilibrado entre elas. */
export const MARCAS = [
  { slug: 'royal-canin', nome: 'Royal Canin', w: 122, h: 44 },
  { slug: 'whiskas', nome: 'Whiskas', w: 89, h: 61 },
  { slug: 'pedigree', nome: 'Pedigree', w: 82, h: 66 },
  { slug: 'equilibrio', nome: 'Equilíbrio', w: 142, h: 38 },
  { slug: 'guabi-natural', nome: 'Guabi Natural', w: 119, h: 45 },
  { slug: 'tutano', nome: 'Tutano', w: 114, h: 47 },
  { slug: 'premier-pet', nome: 'PremieR Pet', w: 149, h: 36 },
  { slug: 'premiatta', nome: 'Premiatta', w: 104, h: 52 },
  { slug: 'max', nome: 'Max', w: 109, h: 50 },
  { slug: 'cat-premium', nome: 'Cat Premium', w: 114, h: 48 },
  { slug: 'dog-chow', nome: 'Dog Chow', w: 85, h: 63 },
  { slug: 'friskies', nome: 'Friskies', w: 87, h: 62 },
  { slug: 'cat-chow', nome: 'Cat Chow', w: 63, h: 70 },
  { slug: 'pro-plan', nome: 'Pro Plan', w: 91, h: 59 },
  { slug: 'hills', nome: "Hill's", w: 73, h: 70 },
  { slug: 'excellence', nome: 'Excellence', w: 115, h: 47 },
  { slug: 'naturalis', nome: 'Naturalis', w: 150, h: 36 },
  { slug: 'proline', nome: 'Proline', w: 88, h: 61 },
]

export const COMO_COMPRAR = {
  sobretitulo: 'Como comprar',
  titulo: 'Pedir é fácil',
  destaque: 'que nem dar biscoito.',
  passos: [
    { titulo: 'Chama no WhatsApp', texto: 'Conta qual é o pet, a marca e o tamanho do pacote. Se preferir, manda a foto da embalagem.' },
    { titulo: 'A gente separa', texto: 'Conferimos o estoque, passamos o valor e deixamos tudo prontinho pra você.' },
    { titulo: 'Passa aqui e leva', texto: `${LOJA.horario.texto}, na ${LOJA.endereco.rua}, ${LOJA.endereco.bairro}.` },
  ],
  cta: 'Começar meu pedido',
}

export const BRINCAR = {
  sobretitulo: 'Brinquedos e diversão',
  titulo: 'Pet feliz',
  destaque: 'é pet que brinca.',
  texto: 'Bolinha, corda, ratinho, varinha com pena, arranhador... Brincar gasta energia, diminui a bagunça e deixa o laço entre vocês ainda mais forte.',
  cta: 'Ver os brinquedos',
  fotos: {
    brinquedos: 'Brinquedos para pets: corda, bolinha, osso de borracha, ratinho de feltro, varinha com penas e arranhador',
    tutor: 'Homem brincando com um cachorro caramelo no quintal, segurando uma bolinha',
    tutora: 'Mulher sentada no tapete brincando com um gato com uma varinha de penas',
  },
}

export const ONDE = {
  sobretitulo: 'Onde estamos',
  titulo: 'Pertinho de você,',
  destaque: 'no Jardim Silvia.',
  fotoLoja: 'Foto da loja por dentro: prateleiras com rações, petiscos e acessórios',
  legendaFoto: 'Nossa loja',
  comoChegar: 'Como chegar',
  chamar: 'Chamar no WhatsApp',
}

export const DUVIDAS = {
  sobretitulo: 'Dúvidas',
  titulo: 'Perguntou,',
  destaque: 'a gente responde.',
  link: 'Perguntar no WhatsApp',
  itens: [
    {
      pergunta: 'Vocês têm a ração que o meu pet come?',
      resposta: 'Trabalhamos com as principais marcas para cães, gatos e pássaros. Se a sua não aparecer aqui no site, chama no WhatsApp com o nome da ração que a gente verifica pra você.',
    },
    {
      pergunta: 'Dá pra pedir pelo WhatsApp?',
      resposta: 'Dá sim. Manda o que você precisa, a gente confere o estoque, passa o valor e deixa tudo separado.',
    },
    {
      pergunta: 'Não sei qual ração escolher. Vocês ajudam?',
      resposta: 'Ajudamos! Conta a idade, o porte e se o seu pet tem alguma restrição, que a gente mostra as opções que cabem no seu bolso.',
    },
    {
      pergunta: 'Qual o horário de funcionamento?',
      resposta: `${LOJA.horario.texto}${LOJA.horario.diasTexto ? `, ${LOJA.horario.diasTexto}` : ''}.`,
    },
    {
      pergunta: 'Onde fica a loja?',
      resposta: `Na ${LOJA.endereco.rua}, ${LOJA.endereco.bairro} (${LOJA.endereco.regiao}), ${LOJA.endereco.cidade} - ${LOJA.endereco.uf}, CEP ${LOJA.endereco.cep}.`,
    },
  ],
}

export const CHAMADA = {
  titulo: 'Seu pet merece o melhor.',
  destaque: 'E fica aqui pertinho.',
  texto: 'Chama no WhatsApp e já deixa o pedido separado.',
  cta: 'Chamar no WhatsApp',
}

export const RODAPE = {
  credito: 'Site desenvolvido por Nova AI Solutions',
}

/** Textos para o Google e para a prévia do link no WhatsApp/Instagram (entram no index.html na hora do build). */
export const SEO = {
  titulo: `${LOJA.nome} · Pet shop no ${LOJA.endereco.bairro}, ${LOJA.endereco.regiao} de SP | Rações, petiscos e brinquedos`,
  descricao: `Pet shop no ${LOJA.endereco.bairro}, ${LOJA.endereco.regiao} de ${LOJA.endereco.cidade}. Rações, petiscos, brinquedos, acessórios e higiene para cães, gatos e pássaros, das marcas que seu pet ama. ${LOJA.horario.texto}. Peça pelo WhatsApp.`,
  compartilharTitulo: `${LOJA.nome} · Tudo para o seu pet, no ${LOJA.endereco.bairro}`,
  compartilharTexto: 'Rações, petiscos, brinquedos, acessórios e higiene para cães, gatos e pássaros. Peça pelo WhatsApp e retire na loja.',
  imagemAlt: `Logotipo do ${LOJA.nome} com um cachorro e um gato num quintal ensolarado.`,
  /** Cor da barra do navegador no celular e do ícone do app (use a cor principal do tema). */
  corTema: '#2E8B3A',
  corFundo: '#FFF8EC',
}
