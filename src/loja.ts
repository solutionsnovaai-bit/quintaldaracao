/** Dados do 4 Patas Club. Horários ainda não confirmados: não inferir abertura. */
export const LOJA = {
  nome: '4 Patas Club',
  descricao: 'Pet shop, banho e tosa e atendimento veterinário na Vila Carrão, São Paulo. Cuidar do seu pet é nossa paixão!',
  whatsapp: '5511919104903',
  whatsappExibicao: '(11) 91910-4903',
  instagram: 'https://www.instagram.com/4patasclub.pet/',
  instagramHandle: '@4patasclub.pet',
  endereco: { rua: 'Rua Dr. Jorge Veiga, 133', bairro: 'Vila Carrão', regiao: 'Zona Leste', cidade: 'São Paulo', uf: 'SP', cep: '' },
  horario: { confirmado: false, abre: '', fecha: '', dias: [] as number[], texto: 'Consulte os horários pelo WhatsApp', diasTexto: '' },
}
export const ENDERECO_COMPLETO = `${LOJA.endereco.rua} - ${LOJA.endereco.bairro}, ${LOJA.endereco.cidade} - ${LOJA.endereco.uf}`
const ola = `Olá! Vim pelo site do ${LOJA.nome}`
export const MENSAGENS = {
  padrao: `${ola} e gostaria de saber mais sobre os serviços.`,
  duvida: `${ola} e tenho uma dúvida.`,
  banho: `${ola} e gostaria de agendar banho e tosa para meu pet.`,
  veterinario: `${ola} e gostaria de consultar a disponibilidade para atendimento veterinário.`,
  loja: `${ola} e gostaria de consultar os produtos disponíveis na loja.`,
}
export const NAV = [
  { id: 'servicos', nome: 'Serviços' },
  { id: 'galeria', nome: 'Nossos pets' },
  { id: 'como-comprar', nome: 'Como agendar' },
  { id: 'onde-estamos', nome: 'Onde estamos' },
  { id: 'duvidas', nome: 'Dúvidas' },
] as const
export const ABERTURA = { texto: 'Um carinho já vai começar…' }
export const HERO = {
  seloPre: 'Pet shop na', selo: 'Vila Carrão · São Paulo',
  linha: 'Cuidar do seu pet é nossa', palavras: ['paixão.', 'alegria.', 'missão.'],
  texto: 'Banho e tosa, atendimento veterinário e uma loja recheada de cuidado. Tudo para o seu melhor amigo, pertinho de você.',
  cta: 'Agendar pelo WhatsApp', secundario: 'Como chegar',
}
export const FAIXAS = {
  verde: ['Banho e tosa', 'Atendimento veterinário', 'Pet shop', 'Carinho', 'Bem-estar', 'Cuidado'],
  amarela: ['4 Patas Club', 'Cuidar é nossa paixão', 'Na Vila Carrão', 'Seu pet em boas mãos'],
}
export const COMO_COMPRAR = {
  sobretitulo: 'Como agendar', titulo: 'O próximo carinho', destaque: 'começa com um oi.',
  passos: [
    { titulo: 'Chama no WhatsApp', texto: 'Conta pra gente o nome do seu pet e se você procura banho e tosa, atendimento veterinário ou produtos.' },
    { titulo: 'Combine com a equipe', texto: 'Consulte os horários disponíveis, os valores e os detalhes do cuidado que seu pet precisa.' },
    { titulo: 'Venha conhecer', texto: 'Esperamos vocês na Rua Dr. Jorge Veiga, 133, na Vila Carrão, em São Paulo.' },
  ], cta: 'Falar com a equipe',
}
export const ONDE = { sobretitulo: 'Onde estamos', titulo: 'Carinho pertinho,', destaque: 'na Vila Carrão.', comoChegar: 'Como chegar', chamar: 'Chamar no WhatsApp' }
export const DUVIDAS = {
  sobretitulo: 'Dúvidas', titulo: 'Pode perguntar.', destaque: 'A gente te ajuda.', link: 'Perguntar no WhatsApp',
  itens: [
    { pergunta: 'Como agendo banho e tosa?', resposta: 'É só chamar no WhatsApp, contar qual é o seu pet e consultar os horários e serviços com a nossa equipe.' },
    { pergunta: 'Vocês têm atendimento veterinário?', resposta: 'Sim! Entre em contato para consultar a disponibilidade e combinar o atendimento do seu pet.' },
    { pergunta: 'Posso consultar produtos pelo WhatsApp?', resposta: 'Pode sim. Mande o que você procura para a equipe conferir a disponibilidade e os valores.' },
    { pergunta: 'Qual o horário de funcionamento?', resposta: 'Consulte pelo WhatsApp o horário de funcionamento e a disponibilidade para o serviço desejado antes da visita.' },
    { pergunta: 'Onde fica o 4 Patas Club?', resposta: `Na ${ENDERECO_COMPLETO}. Toque em “Como chegar” para abrir a rota no mapa.` },
  ],
}
export const CHAMADA = { titulo: 'Seu pet merece carinho.', destaque: 'E a gente tem de sobra.', texto: 'Converse com a equipe e combine a próxima visita do seu melhor amigo.', cta: 'Agendar pelo WhatsApp' }
export const RODAPE = { credito: 'Site desenvolvido por Nova AI Solutions' }
export const SEO = {
  titulo: '4 Patas Club | Pet shop, Banho e Tosa e Veterinária na Vila Carrão',
  descricao: 'Conheça o 4 Patas Club na Vila Carrão, São Paulo: banho e tosa, atendimento veterinário e pet shop. Rua Dr. Jorge Veiga, 133. Agende pelo WhatsApp.',
  compartilharTitulo: '4 Patas Club · Cuidar do seu pet é nossa paixão',
  compartilharTexto: 'Banho e tosa, veterinária e pet shop na Vila Carrão. Fale com a equipe e agende uma visita.',
  imagemAlt: 'Logo do 4 Patas Club com cachorro e gato, nas cores roxo e turquesa.',
  corTema: '#690A71', corFundo: '#FAF7FB',
}
