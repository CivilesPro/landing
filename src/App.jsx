import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'

const roles = ['Ingeniero', 'Arquitecto', 'Maestro de obra']

function CTAButton() {
  return (
    <a
      href="/dashboard"
      className="inline-block bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
    >
      Comienza a calcular ahora
    </a>
  )
}

function Hero() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    const current = roles[index]
    let i = 0
    const typing = setInterval(() => {
      setText(current.slice(0, i + 1))
      i++
      if (i === current.length) {
        clearInterval(typing)
        setTimeout(() => {
          const deleting = setInterval(() => {
            i--
            setText(current.slice(0, i))
            if (i === 0) {
              clearInterval(deleting)
              setIndex((index + 1) % roles.length)
            }
          }, 100)
        }, 1500)
      }
    }, 100)
    return () => clearInterval(typing)
  }, [index])

  return (
    <section className="flex flex-col items-center text-center pt-20 pb-32 px-4 space-y-10">
      <h1 className="text-3xl lg:text-5xl font-bold">
        La herramienta que todo{' '}
        <span className="text-primary">{text}</span>{' '}
        necesita para calcular su obra
      </h1>
      <CTAButton />
      <div className="relative w-80 h-56 mt-10">
        <div
          className="absolute w-64 h-40 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center -rotate-6"
          style={{ backgroundImage: 'url(/img/landing/hero-tool-a.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          Imagen de Dashboard herramienta (A)
        </div>
        <div
          className="absolute w-64 h-40 bg-green-600 text-white rounded-2xl shadow-lg flex items-center justify-center rotate-6 top-8 left-8"
          style={{ backgroundImage: 'url(/img/landing/hero-tool-b.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          Imagen de Dashboard herramienta (B)
        </div>
      </div>
    </section>
  )
}

const wowCards = [
  { title: 'Cubiertas (fibrocemento, UPVC, sándwich, standing, zinc)', img: '/img/landing/cubiertas.png' },
  { title: 'Concreto', img: '/img/landing/concreto.png' },
  { title: 'Ciclópeo', img: '/img/landing/ciclopeo.png' },
  { title: 'Pavimento rígido', img: '/img/landing/pavimento.png' },
  { title: 'Mampostería estructural y Muros de concreto', img: '/img/landing/muros.png' },
  { title: 'Drywall y Cielo raso', img: '/img/landing/drywall.png' },
  { title: 'Pisos (porcelanato, cerámica, pulidos)', img: '/img/landing/pisos.png' },
  { title: 'Bordillos', img: '/img/landing/bordillos.png' },
  { title: 'Malla electrosoldada', img: '/img/landing/malla.png' },
  { title: 'Losas (concreto armado, placa fácil, losacero, aligerada)', img: '/img/landing/losas.png' },
]

function WowCards() {
  return (
    <section className="py-16">
      <h2 className="text-center text-3xl font-bold text-primary mb-8">Lo que calcula</h2>
      {/* Desktop */}
      <div className="hidden lg:block h-screen overflow-y-scroll snap-y snap-mandatory">
        {wowCards.map((c) => (
          <Motion.div
            key={c.title}
            className="h-[90vh] flex items-center snap-start px-8 gap-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <img src={c.img} alt={c.title} className="w-2/3 h-full object-contain" />
            <p className="w-1/3 text-xl">
              Calcula al instante los materiales que necesitas para: {c.title}
            </p>
          </Motion.div>
        ))}
      </div>
      {/* Mobile */}
      <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory px-4 space-x-4">
        {wowCards.map((c) => (
          <Motion.div
            key={c.title}
            className="flex-shrink-0 w-80 snap-center bg-white rounded-2xl shadow-md p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <img src={c.img} alt={c.title} className="h-40 w-full object-contain mb-4" />
            <p>
              Calcula al instante los materiales que necesitas para: {c.title}
            </p>
          </Motion.div>
        ))}
      </div>
    </section>
  )
}

function Materials() {
  return (
    <section className="py-16 text-center px-4">
      <h2 className="text-3xl font-bold text-primary mb-6">De lo digital a lo tangible</h2>
      <p className="max-w-2xl mx-auto mb-8">
        No solo calculas… sabes exactamente cuántos bultos de cemento, metros cúbicos de arena y gravilla, o kilos de acero necesitas. Es como tener los materiales en la mano antes de comprarlos.
      </p>
      <div className="flex justify-center gap-6">
        <img src="/img/landing/material-cemento.png" alt="cemento" className="w-24 h-24 object-contain" />
        <img src="/img/landing/material-arena.png" alt="arena" className="w-24 h-24 object-contain" />
        <img src="/img/landing/material-acero.png" alt="acero" className="w-24 h-24 object-contain" />
      </div>
      <p className="mt-4 text-sm">Ejemplo: 8 bultos de 50 kg · 1.20 m³ de arena · 0.80 m³ de gravilla</p>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-16 text-center px-4">
      <h2 className="text-3xl font-bold text-primary mb-8">Precios</h2>
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-64 mx-auto">
          <p className="text-4xl font-bold text-primary mb-2">$20.000</p>
          <p>Mensuales</p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-8 w-64 mx-auto">
          <p className="text-4xl font-bold text-primary mb-2">165.000</p>
          <p>Un solo pago</p>
        </div>
      </div>
      <p className="mt-4">Las dos opciones incluyen lo mismo. Elige la que prefieras. Sin restricciones.</p>
    </section>
  )
}

function Features() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">Funciones clave</h2>
      <ul className="max-w-xl mx-auto space-y-4 list-disc list-inside">
        <li>Exporta cálculos a PDF organizados por ítem.</li>
        <li>Consolidado de múltiples cálculos (como presupuesto) con cantidades exactas.</li>
        <li>Accesible desde computador y celular.</li>
        <li>Interfaz intuitiva y lista para usar.</li>
      </ul>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-16 text-center">
      <CTAButton />
    </section>
  )
}

export default function App() {
  return (
    <div className="font-sans">
      <Hero />
      <WowCards />
      <Materials />
      <Pricing />
      <Features />
      <FinalCTA />
    </div>
  )
}
