import { useEffect, useState, useRef } from "react";
import {
  motion as Motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

const PRIMARY = "#055a27";
const ROLES = ["Ingeniero", "Arquitecto", "Maestro de obra"];

/** Tarjetas: imagen + título + texto persuasivo por herramienta */
const CARDS = [
  {
    key: "fibrocemento",
    title: "Fibrocemento (Cubiertas)",
    img: "img/fibrocemento.png",
    desc:
      "Las tejas no se calculan solo por área: traslapos, pendientes y cortes cambian el número real. Aquí obtienes la cantidad exacta y evitas compras innecesarias. Tenemos mas de 25 herramientas en total.",
  },
  {
    key: "ceramica",
    title: "Cerámica (Pisos)",
    img: "img/ceramica.png",
    desc:"El rendimiento varía por formato, patrón y desperdicios de corte. Te entregamos cajas y adhesivo precisos para cotizar o instalar sin sorpresas.",
  },
  {
    key: "bordillos",
    title: "Bordillos",
    img: "img/bordillos.png",
    desc:"Los bordillos no solo se calculan en metros lineales. El anclaje, el desperdicio y las piezas especiales complican el cálculo. Esta herramienta te da un resultado preciso para tu presupuesto y ejecución.",
  },
  {
    key: "cielorazoendrywall",
    title: "Cielo raso y Drywall",
    img: "img/cielorazoendrywall.png",
    desc:"Hacer un cielo raso en drywall requiere mucho más que calcular el área. Tambien se trata de perfiles, placas, tornillos y masilla cambian según el diseño.",
  },
  {
    key: "marmol",
    title: "Mármol (Pisos)",
    img: "img/marmol.png",
    desc:"El mármol no admite errores: un corte mal calculado puede arruinar una pieza costosa. Nuestra herramienta calcula el área, cortes y sobrantes exactos, asegurando un presupuesto realista y sin sorpresas",
  },
  {
    key: "yeso",
    title: "Yeso (Acabados)",
    img: "img/yeso.png",
    desc:"Rendimiento por sustrato, número de manos y desperdicio afectan las cantidades. Obtén litros/sacos exactos y optimiza compra y tiempos.",
  },
  {
    key: "steeldeck",
    title: "SteelDeck / Losacero",
    img: "img/steeldeck.png",
    desc:"La losa colaborante depende de traslapos, espesores y capacidad de lámina. Procesamos todo y te entregamos concreto, acero y accesorios precisos.",
  },
  {
    key: "pintura",
    title: "Pintura (Acabados)",
    img: "img/pintura.png",
    desc:"No es alto × ancho: rendimiento por galón, manos y tipo de superficie cambian el cálculo. Te damos litros exactos y evitas sobrecostos.",
  },
  {
    key: "granito",
    title: "Granito (Pisos)",
    img: "img/granito.png",
    desc:"Piezas especiales y cortes milimétricos afectan el pedido. Calculamos cantidades reales para reducir sobrantes costosos o faltantes.",
  },
  {
    key: "mamposteriaestructural",
    title: "Mampostería estructural",
    img: "img/mamposteriaestructural.png",
    desc:"Bloques, mortero, refuerzos y concretos de amarre. Centraliza el cálculo y controla desperdicios en una sola salida lista para presupuesto.",
  },
  {
    key: "pavimentorigido",
    title: "Pavimento rígido",
    img: "img/pavimentorigido.png",
    desc:"Calcular un pavimento rígido a mano no es solo multiplicar ancho × largo × espesor. También hay que considerar la dosificación exacta, desperdicios, acero y cortes. Un error de pocos milímetros en el cálculo puede significar pérdida de dinero y retrasos en obra. Esta herramienta procesa todo en segundos, con precisión milimétrica, y te entrega una lista completa de materiales lista para comprar o incluir en tu presupuesto.",
  },
  {
    key: "consolidado",
    title: "Crea un Registro",
    img: "img/consolidado.png",
    desc:"Una vez tengas los cálculos listos, crea un consolidado de obra para organizar y acceder a todos tus resultados en un solo lugar. Así podrás estimar tu presupuesto de manera más precisa y tomar decisiones con datos claros.",
  },
];

/* ------------------ utils ------------------ */
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

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : true
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

/* ------------------ UI blocks ------------------ */
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
          <span className="inline-block border-b-4" style={{ borderColor: PRIMARY }}>
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

/* -------- Desktop: efecto “naipes” (vertical sticky, SIN tarjeta blanca) -------- */
function CardSticky({ index, total, img, title, desc, scrollYProgress }) {
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
      <Motion.div
        style={{ opacity, y }}
        initial={{ scale: 0.98 }}
        animate={controls}
        className="mx-auto max-w-8xl"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center px-2 lg:px-4">
          {/* Imagen grande, sin caja */}
          <div className="lg:col-span-7" style={{ perspective: "1000px" }}>
            <Motion.img
              src={import.meta.env.BASE_URL + img.replace(/^\//, "")}
              alt={title}
              className="w-full h-[68vh] lg:h-[72vh] object-contain"
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
          {/* Texto */}
          <div className="lg:col-span-5 px-2 lg:px-6">
            <h4 className="text-sm lg:text-base text-gray-600">Lista de materiales que necesitas para:</h4>
            <h3 className="text-2xl lg:text-4xl font-extrabold mt-2" style={{ color: PRIMARY }}>
              {title}
            </h3>
            {desc && (
              <p className="mt-3 text-sm lg:text-base text-gray-700 leading-relaxed">
                {desc}
              </p>
            )}
          </div>
        </div>
      </Motion.div>
    </article>
  );
}

function CardsDesktop() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${CARDS.length * 100}vh` }}>
      {CARDS.map((c, i) => (
        <CardSticky
          key={c.key}
          index={i}
          total={CARDS.length}
          img={c.img}
          title={c.title}
          desc={c.desc}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

/* -------- Mobile: carrusel swipe (sin tarjeta blanca) -------- */
function CardsMobile() {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef(null);

  const goTo = (idx) => {
    const el = scrollerRef.current?.children[idx];
    if (el && "scrollIntoView" in el)
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(idx);
  };

  return (
    <div className="relative">
      {/* Flechas opcionales (se esconden en pantallas muy pequeñas) */}
      <button
        onClick={() => goTo(Math.max(0, active - 1))}
        className="hidden xs:block absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 border rounded-md shadow px-3 py-2"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={() => goTo(Math.min(CARDS.length - 1, active + 1))}
        className="hidden xs:block absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 border rounded-md shadow px-3 py-2"
        aria-label="Siguiente"
      >
        ›
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
        onScroll={(e) => {
          const children = Array.from(e.currentTarget.children);
          const center = e.currentTarget.scrollLeft + e.currentTarget.clientWidth / 2;
          const idx = children.findIndex((ch) => {
            const left = ch.offsetLeft;
            const right = left + ch.clientWidth;
            return left <= center && right >= center;
          });
          if (idx >= 0) setActive(idx);
        }}
      >
        {CARDS.map((c) => (
          <Motion.div
            key={c.key}
            className="snap-center shrink-0 w-[88vw] overflow-visible"
            initial={{ opacity: 0.85, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="p-2">
              <div className="w-full h-[32vh] sm:h-[36vh] md:h-[44vh] flex items-center justify-center">
                <img
                  src={import.meta.env.BASE_URL + c.img.replace(/^\//, "")}
                  alt={c.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-3">
                <h4 className="text-sm text-gray-600">Calcula al instante los materiales que necesitas para:</h4>
                <h3 className="text-2xl font-extrabold mt-1" style={{ color: PRIMARY }}>
                  {c.title}
               
                </h3>
                {c.desc && (
                  <p className="mt-2 text-sm text-gray-700 text-[15px] leading-relaxed ">
                    {c.desc}
                  </p>
                )}
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Paginadores */}
      <div className="flex justify-center gap-2 mt-2">
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full ${i === active ? "bg-green-700 scale-110" : "bg-gray-300"}`}
            aria-label={`Ir a tarjeta ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* -------- Wrapper que decide según viewport -------- */
function CardsWow() {
  const isMobile = useIsMobile(1024);
  return (
    <Section className="mt-10 px-4 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: PRIMARY }}>
        Calcula al instante:
      </h2>
      {isMobile ? <CardsMobile /> : <CardsDesktop />}
    </Section>
  );
}

/* -------- componentes auxiliares -------- */
function CheckLine({ children }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-gray-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mt-0.5 h-4 w-4 flex-none"
        viewBox="0 0 20 20"
        fill={PRIMARY}
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}

/* -------- sección Materiales + Comparación de precios -------- */
function MaterialsAndPricing() {
  const base = import.meta.env.BASE_URL;

  return (
    <section className="px-4 py-16">
      {/* Texto superior */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-3xl font-bold leading-7 text-gray-800">
          No solo calculas… sabes exactamente cuántos bultos de cemento, metros cúbicos de arena y gravilla, o
          kilos de acero necesitas.
        </p>
      </div>

      {/* Imagen de materiales sin fondo */}
      <div className="mt-6 flex items-center justify-center">
        <img
          src={base + "img/materiales.png"}
          alt="Materiales (cemento, arena, gravilla, acero, etc.)"
          className="h-[300px] sm:h-[300px] md:h-[320px] object-contain"
        />
      </div>

      {/* PRECIOS centrados y balanceados */}
      <div className="relative mt-8 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Separador vertical solo en desktop (absoluto, no afecta el grid) */}
        <div
          className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gray-300"
          aria-hidden="true"
        />

        {/* Plan Suscripción Mensual */}
        <div className="text-center md:text-left">
          <div className="text-[34px] sm:text-[36px] font-extrabold tracking-tight" style={{ color: PRIMARY }}>
            $20.000
          </div>
          <div className="text-[14px] text-gray-700 mt-1">Suscripción Mensual</div>
          <p className="text-[15px] text-gray-800 font-medium">Cancela cuando quieras</p>
          <ul className="mt-4 space-y-2">
            <CheckLine>Compatible con Mac.</CheckLine>
            <CheckLine>Más herramientas.</CheckLine>
            <CheckLine>No requiere Excel.</CheckLine>
            <CheckLine>Exporta consolidado en Excel.</CheckLine>
            <CheckLine>Soporte 24/7.</CheckLine>
          </ul>
          <div className="mt-5">
            <a
              href="/suscripcion"
              className="inline-block px-6 py-3 rounded-md font-semibold text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              Suscríbete
            </a>
          </div>
        </div>

        {/* Plan Único pago */}
        <div className="text-center md:text-left">
          <div className="text-[34px] sm:text-[36px] font-extrabold tracking-tight" style={{ color: PRIMARY }}>
            $165.000
          </div>
          <div className="text-[14px] text-gray-700 mt-1">Un solo pago</div>
          <ul className="mt-4 space-y-2">
            <CheckLine>Descarga el archivo.</CheckLine>
            <CheckLine>Disponible sin internet.</CheckLine>
            <CheckLine>Soporte Preferencial.</CheckLine>
            <CheckLine>Requiere Excel 2024.</CheckLine>
            <CheckLine>Dos licencias.</CheckLine>
          </ul>
          <div className="mt-5">
            <a
              href="/comprar"
              className="inline-block px-6 py-3 rounded-md font-semibold text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              Comprar / Descargar
            </a>
          </div>
        </div>
      </div>

      {/* Nota final */}
      <div className="max-w-3xl mx-auto text-center mt-9">
        <p className="text-[14px] text-gray-700">
          <span className="font-medium">Ambas incluyen Tutorial.</span> Elige la que prefieras. Sin restricciones.
        </p>
      </div>

      {/* Líneas finales */}
      <div className="max-w-3xl mx-auto text-center mt-8 space-y-3">
        <p className="text-[15px] text-gray-800 font-semibold">
          Exporta cálculos a PDF organizados por ítem.
        </p>
        <p className="text-[15px] text-gray-800 font-semibold">
          Creación de un consolidado parecido a un presupuesto (con materiales completos).
        </p>
      </div>
    </section>
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
      <FinalCTA />
    </div>
  );
}
