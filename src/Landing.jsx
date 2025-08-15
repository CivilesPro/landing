import { useEffect, useState, useRef } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

const Motion = motion;

const PRIMARY = "#055a27";
const ROLES = ["Ingeniero", "Arquitecto", "Maestro de obra"];

const CARDS = [
  {
    key: "cubiertas",
    title: "Cubiertas (fibrocemento, UPVC, sándwich, standing, zinc)",
    img: "img/landing/cubiertas.png",
  },
  { key: "concreto", title: "Concreto", img: "img/landing/concreto.png" },
  { key: "ciclopeo", title: "Ciclópeo", img: "img/landing/ciclopeo.png" },
  { key: "pavimento", title: "Pavimento rígido", img: "img/landing/pavimento.png" },
  { key: "muros", title: "Mampostería estructural y Muros", img: "img/landing/muros.png" },
  { key: "drywall", title: "Drywall y Cielo raso", img: "img/landing/drywall.png" },
  {
    key: "pisos",
    title: "Pisos: porcelanato, cerámica, pulidos",
    img: "img/landing/pisos.png",
  },
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
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-center leading-tight"
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

function CardSticky({ index, total, img, title, baseTitle, scrollYProgress }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(inView ? { scale: 1 } : { scale: 0.98 });
  }, [inView, controls]);

  const start = index / total;
  const mid = start + (1 / total) * 0.35;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [start, mid, end], [40, 0, -40]);
  const rotateX = useTransform(scrollYProgress, [start, mid, end], [10, 6, -4]);
  const rotateY = useTransform(scrollYProgress, [start, mid, end], [-12, -8, 0]);

  return (
    <article ref={ref} className="sticky top-24 lg:top-28" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{ opacity, y }}
        initial={{ scale: 0.98 }}
        animate={controls}
        className="mx-auto max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center p-4 lg:p-6">
          {/* Imagen con perspectiva (no uses / inicial: usamos BASE_URL) */}
          <div className="lg:col-span-7">
            <div
              className="bg-gray-100 rounded-2xl h-[56vh] lg:h-[62vh] flex items-center justify-center overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              <motion.img
                src={import.meta.env.BASE_URL + img.replace(/^\//, "")}
                alt={title}
                className="h-full w-full object-cover"
                style={{ rotateX, rotateY }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          {/* Texto */}
          <div className="lg:col-span-5 px-2 lg:px-6">
            <h4 className="text-sm lg:text-base text-gray-600">{baseTitle}</h4>
            <h3 className="text-2xl lg:text-4xl font-extrabold mt-2" style={{ color: PRIMARY }}>
              {title}
            </h3>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

function CardsWow() {
  const baseTitle = "Calcula al instante los materiales que necesitas para:";
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <Section className="mt-10 px-4 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: PRIMARY }}>
        Lo que calcula
      </h2>

      {/* Contenedor de altura N * 100vh. No tiene su propio scroll. */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${CARDS.length * 100}vh` }}
      >
        {CARDS.map((c, i) => (
          <CardSticky
            key={c.key}
            index={i}
            total={CARDS.length}
            img={c.img}
            title={c.title}
            baseTitle={baseTitle}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </Section>
  );
}

function MaterialsAndPricing() {
  const base = import.meta.env.BASE_URL;

  return (
    <section className="px-4 py-16">
      {/* Texto superior (dos líneas) */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[18px] leading-7 text-gray-800">
          No solo calculas… sabes exactamente cuántos bultos de cemento, metros cúbicos de arena y gravilla, o
          kilos de acero necesitas.
        </p>
      </div>

      {/* Imagen de materiales sin fondo */}
      <div className="mt-6 flex items-center justify-center">
        <img
          src={base + "img/materiales.png"}
          alt="Materiales"
          className="h-[82px] sm:h-[92px] md:h-[110px] object-contain"
        />
      </div>

      {/* PRECIOS con divisor vertical al centro */}
      <div className="mt-6 max-w-3xl mx-auto grid grid-cols-2 items-start">
        {/* Precio izquierda */}
        <div className="text-center pr-6">
          <div className="text-[34px] sm:text-[36px] font-extrabold tracking-tight text-primary">$20.000</div>
          <div className="text-[14px] text-gray-700 mt-1">Mensuales</div>
        </div>

        {/* Precio derecha con borde izquierdo para separar */}
        <div className="text-center pl-6 border-l border-gray-300">
          <div className="text-[34px] sm:text-[36px] font-extrabold tracking-tight text-primary">165.000</div>
          <div className="text-[14px] text-gray-700 mt-1">Un solo pago</div>
        </div>
      </div>

      {/* Texto pequeño bajo los precios */}
      <div className="max-w-3xl mx-auto text-center mt-4">
        <p className="text-[14px] text-gray-700">
          Las dos opciones incluyen lo mismo. Elige la que prefieras. Sin restricciones.
        </p>
      </div>

      {/* Líneas finales (como en la maqueta) */}
      <div className="max-w-3xl mx-auto text-center mt-8 space-y-3">
        <p className="text-[15px] text-gray-800">
          <span className="font-medium">Exporta cálculos</span> a PDF organizados por ítem
        </p>
        <p className="text-[15px] text-gray-800">
          <span className="font-medium">Creación de un consolidado</span> parecido a un presupuesto (con materiales completos)
        </p>
      </div>
    </section>
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
      <MaterialsAndPricing />
      <Features />
      <FinalCTA />
    </div>
  );
}

