import { useEffect, useState, useRef } from "react";
import { motion as Motion, useInView, useAnimation } from "framer-motion";

const PRIMARY = "#055a27";
const ROLES = ["Ingeniero", "Arquitecto", "Maestro de obra"];

const CARDS = [
  { key: "cubiertas", title: "Cubiertas (fibrocemento, UPVC, sándwich, standing, zinc)", img: "img/cubiertas.png" },
  { key: "concreto", title: "Concreto", img: "img/concreto.png" },
  { key: "ciclopeo", title: "Ciclópeo", img: "img/ciclopeo.png" },
  { key: "pavimento", title: "Pavimento rígido", img: "img/pavimento.png" },
  { key: "muros", title: "Mampostería estructural y Muros", img: "img/muros.png" },
  { key: "drywall", title: "Drywall y Cielo raso", img: "img/drywall.png" },
  { key: "pisos", title: "Pisos: porcelanato, cerámica, pulidos", img: "img/pisos.png" },
];

function useTypewriter(words) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = words[index];
    let i = 0;
    const typing = setInterval(() => {
      setText(current.slice(0, i + 1));
      i++;
      if (i === current.length) {
        clearInterval(typing);
        setTimeout(() => {
          const deleting = setInterval(() => {
            i--;
            setText(current.slice(0, i));
            if (i === 0) {
              clearInterval(deleting);
              setIndex((index + 1) % words.length);
            }
          }, 100);
        }, 1500);
      }
    }, 100);
    return () => clearInterval(typing);
  }, [index, words]);

  return text;
}

function Section({ children, className }) {
  return <section className={className}>{children}</section>;
}

function CTAButton() {
  return (
    <a
      href="/dashboard"
      className="px-8 py-4 rounded-md font-semibold text-white"
      style={{ backgroundColor: PRIMARY }}
    >
      Comienza a calcular ahora
    </a>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);
  return (
    <Section className="flex flex-col items-center pt-16 lg:pt-24 px-4">
      <h1
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center leading-tight"
        style={{ color: PRIMARY }}
      >
        <span className="block">
          La herramienta que todo{" "}
          <span
            className="inline-block border-b-4"
            style={{ borderColor: PRIMARY }}
          >
            {typed || "\u00A0"}
          </span>
        </span>
        <span className="block">necesita para calcular su obra</span>
      </h1>

      <a
        href="/dashboard"
        className="mt-6 px-6 py-3 rounded-md font-semibold text-white"
        style={{ backgroundColor: PRIMARY }}
      >
        Comienza a calcular ahora
      </a>
    </Section>
  );
}

function CardItem({ title, img, baseTitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(
      inView
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0.8, y: 24, scale: 0.98 }
    );
  }, [inView, controls]);

  return (
    <Motion.article
      ref={ref}
      className="min-h-[85vh] grid lg:grid-cols-12 items-center gap-8 bg-white rounded-3xl shadow-xl overflow-hidden"
      initial={{ opacity: 0.8, y: 24, scale: 0.98 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="lg:col-span-7 h-full w-full p-4 lg:p-6">
        <div
          className="h-full w-full bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          <Motion.img
            src={import.meta.env.BASE_URL + img.replace(/^\//, "")}
            alt={title}
            className="h-full w-full object-cover will-change-transform"
            initial={{ rotateY: -14, rotateX: 8, rotateZ: 0, scale: 1.02 }}
            whileInView={{ rotateY: -10, rotateX: 6, rotateZ: 0, scale: 1 }}
            viewport={{ amount: 0.6, once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="lg:col-span-5 px-6 lg:px-8 py-8">
        <h4 className="text-sm lg:text-base text-gray-600">{baseTitle}</h4>
        <h3
          className="text-2xl lg:text-4xl font-extrabold mt-2"
          style={{ color: PRIMARY }}
        >
          {title}
        </h3>
      </div>
    </Motion.article>
  );
}

function CardsWow() {
  const baseTitle = "Calcula al instante los materiales que necesitas para:";

  return (
    <Section className="mt-8 px-4 lg:px-8">
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: PRIMARY }}
      >
        Lo que calcula
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {CARDS.map((c) => (
          <CardItem
            key={c.key}
            title={c.title}
            img={c.img}
            baseTitle={baseTitle}
          />
        ))}
      </div>
    </Section>
  );
}

function Materials() {
  return (
    <Section className="py-16 text-center px-4">
      <h2 className="text-3xl font-bold mb-6" style={{ color: PRIMARY }}>
        De lo digital a lo tangible
      </h2>
      <p className="max-w-2xl mx-auto mb-8">
        No solo calculas… sabes exactamente cuántos bultos de cemento, metros cúbicos de arena y gravilla, o kilos de acero necesitas. Es como tener los materiales en la mano antes de comprarlos.
      </p>
      <div className="flex justify-center gap-6">
        <img
          src="/img/landing/material-cemento.png"
          alt="cemento"
          className="w-24 h-24 object-contain"
        />
        <img
          src="/img/landing/material-arena.png"
          alt="arena"
          className="w-24 h-24 object-contain"
        />
        <img
          src="/img/landing/material-acero.png"
          alt="acero"
          className="w-24 h-24 object-contain"
        />
      </div>
      <p className="mt-4 text-sm">Ejemplo: 8 bultos de 50 kg · 1.20 m³ de arena · 0.80 m³ de gravilla</p>
    </Section>
  );
}

function Pricing() {
  return (
    <Section className="py-16 text-center px-4">
      <h2 className="text-3xl font-bold mb-8" style={{ color: PRIMARY }}>
        Precios
      </h2>
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-64 mx-auto">
          <p className="text-4xl font-bold mb-2" style={{ color: PRIMARY }}>
            $20.000
          </p>
          <p>Mensuales</p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-8 w-64 mx-auto">
          <p className="text-4xl font-bold mb-2" style={{ color: PRIMARY }}>
            165.000
          </p>
          <p>Un solo pago</p>
        </div>
      </div>
      <p className="mt-4">Las dos opciones incluyen lo mismo. Elige la que prefieras. Sin restricciones.</p>
    </Section>
  );
}

function Features() {
  return (
    <Section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8" style={{ color: PRIMARY }}>
        Funciones clave
      </h2>
      <ul className="max-w-xl mx-auto space-y-4 list-disc list-inside">
        <li>Exporta cálculos a PDF organizados por ítem.</li>
        <li>Consolidado de múltiples cálculos (como presupuesto) con cantidades exactas.</li>
        <li>Accesible desde computador y celular.</li>
        <li>Interfaz intuitiva y lista para usar.</li>
      </ul>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section className="py-16 text-center">
      <CTAButton />
    </Section>
  );
}

export default function Landing() {
  return (
    <div className="font-sans">
      <Hero />
      <CardsWow />
      <Materials />
      <Pricing />
      <Features />
      <FinalCTA />
    </div>
  );
}

