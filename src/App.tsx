import { useCallback, useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import Abertura from './components/Abertura'
import Header from './components/Header'
import Hero from './components/Hero'
import Faixas from './components/Faixas'
import Pets from './components/Pets'
import Marcas from './components/Marcas'
import ComoComprar from './components/ComoComprar'
import Brincar from './components/Brincar'
import OndeEstamos from './components/OndeEstamos'
import Duvidas from './components/Duvidas'
import ChamadaFinal from './components/ChamadaFinal'
import Rodape from './components/Rodape'
import WhatsAppFab from './components/WhatsAppFab'
import DadosEstruturados from './components/DadosEstruturados'
import { MotionPreferencesProvider, useMotionPreferences } from './hooks/useMotionPreferences'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const semAbertura = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Site() {
  const { reduced } = useMotionPreferences()
  const [abertura, setAbertura] = useState(() => !semAbertura())
  const [pronto, setPronto] = useState(() => semAbertura())
  const [menu, setMenu] = useState(false)
  useSmoothScroll(pronto && !menu)
  const { scrollYProgress } = useScroll()
  const progresso = useSpring(scrollYProgress, { stiffness: 110, damping: 30 })

  // Durante a abertura a página não rola.
  useEffect(() => {
    if (!abertura) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => { document.body.style.overflow = prev }
  }, [abertura])

  const abrir = useCallback(() => setPronto(true), [])
  const fim = useCallback(() => setAbertura(false), [])

  return <>
    {abertura && <Abertura onAbrir={abrir} onFim={fim} />}
    <div className="site" inert={!pronto}>
      <a className="pular-conteudo" href="#produtos">Pular para o conteúdo</a>
      <motion.div className="progresso" style={{ scaleX: reduced ? scrollYProgress : progresso }} aria-hidden="true" />
      <Header menuAberto={menu} setMenuAberto={setMenu} />
      <main>
        <Hero pronto={pronto} />
        <Faixas />
        <Pets />
        <Marcas />
        <ComoComprar />
        <Brincar />
        <OndeEstamos />
        <Duvidas />
        <ChamadaFinal />
      </main>
      <Rodape />
      <WhatsAppFab liberado={pronto && !menu} />
    </div>
    <DadosEstruturados />
  </>
}

export default function App() {
  return <MotionPreferencesProvider><Site /></MotionPreferencesProvider>
}
