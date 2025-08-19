import { useEffect, useState, useRef } from "react";
import {
  motion as Motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const PRIMARY = "#055a27";
const SECUNDARY = "#111111ff";
const ROLES = ["Ingenieros", "Arquitectos", "Maestros de obra"];

/** Imágenes en public/img/*.png (sin slash inicial; se concatena BASE_URL) */
const CARDS = [
  {
    key: "Inicio",
    title: "Calcular lo que quieras",
    img: "img/inicio.png",
    desc:
      "Comenzar a calcular es tan simple como escribir el trabajo que vas a realizar.",
  },
{
    key: "murodebloques",
    title: "Bloques (Muros)",
    img: "img/bloques.png",
    desc:
      "Bloques, mortero, todo dependiendo de la cara del muro. Centraliza el cálculo y controla desperdicios en una sola salida lista para presupuesto.",
  },

  {
    key: "fibrocemento",
    title: "Fibrocemento (Cubiertas)",
    img: "img/fibrocemento.png",
    desc:
      "Las tejas no se calculan solo por área. Existen los traslapos, pendientes y cortes que cambian el número total de cubiertas. Aquí obtienes la cantidad exacta y evitas compras innecesarias. ",
  },
  {
    key: "ceramica",
    title: "Cerámica (Pisos)",
    img: "img/ceramica.png",
    desc:
      "El rendimiento varía por formato, patrón y desperdicios de corte. Te entregamos cajas y adhesivo precisos para cotizar o instalar sin sorpresas.",
  },
  {
    key: "bordillos",
    title: "Bordillos(Concreto)",
    img: "img/bordillos.png",
    desc:
      "Los bordillos no solo se calculan en metros lineales. El anclaje, el desperdicio y las piezas especiales complican el cálculo. Esta herramienta te da un resultado preciso para tu presupuesto y ejecución.",
  },
  {
    key: "cielorazoendrywall",
    title: "Cielo raso en Drywall",
    img: "img/cielorazo.png",
    desc:
      "Hacer un cielo raso en drywall requiere mucho más que calcular el área. Tambien se trata de perfiles, placas, tornillos y masilla cambian según el diseño.",
  },  
    {
    key: "steeldeck",
    title: "SteelDeck (Losas)",
    img: "img/steeldeck.png",
    desc:
      "La losa colaborante depende de traslapos, espesores y capacidad de lámina. Procesamos todo y te entregamos concreto, acero y accesorios precisos.",
  },
  {
    key: "pintura",
    title: "Pintura (Acabados)",
    img: "img/pintura.png",
    desc:
      "No es alto × ancho: rendimiento por galón, manos y tipo de superficie cambian el cálculo. Te damos litros exactos y evitas sobrecostos.",
  },
  {
    key: "granito",
    title: "Granito (Pisos)",
    img: "img/granito.png",
    desc:
      "Piezas especiales y cortes milimétricos afectan el pedido. Calculamos cantidades reales para reducir sobrantes costosos o faltantes.",
  },
  {
    key: "mamposteriaestructural",
    title: "Mampostería estructural",
    img: "img/mamposteriaestructural.png",
    desc:
      "Bloques, mortero, refuerzos y concretos de amarre. Centraliza el cálculo y controla desperdicios en una sola salida lista para presupuesto.",
  },
  {
    key: "pavimentorigido",
    title: "Pavimento rígido",
    img: "img/pavimentorigido.png",
    desc:
      "Calcular un pavimento rígido a mano no es solo multiplicar ancho × largo × espesor. También hay que considerar la dosificación exacta, desperdicios, acero y cortes. Un error de pocos milímetros en el cálculo puede significar pérdida de dinero y retrasos en obra. Esta herramienta procesa todo en segundos, con precisión milimétrica, y te entrega una lista completa de materiales lista para comprar o incluir en tu presupuesto.",
  },
  {
    key: "pdf",
    title: "Importa un Informe por Item",
    img: "img/informe.png",
    desc:
      "Exporta un informe claro para enviarlo a comprar",
  },
  {
    key: "consolidado",
    title: "Crear un Presupuesto",
    img: "img/consolidado.png",
    desc:
      "Una vez tengas los cálculos listos, crea un consolidado de obra para organizar y acceder a todos tus resultados en un solo lugar. Así podrás estimar tu presupuesto de manera más precisa y tomar decisiones con datos claros.",
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
        }, 150);
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
      href="https://wa.me/573127437848"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-white"
      style={{ backgroundColor: SECUNDARY }}
    >
      <FaWhatsapp size={20} />
      Contactar a un asesor
    </a>
  );
}



function AppHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 backdrop-blur"
      style={{ background: "rgba(5, 90, 39, 0.9)" }}
    >
      <div className="max-w-7xl mx-auto h-16 flex items-center px-4">
        <a href="/" aria-label="Inicio">
          <img
            src={import.meta.env.BASE_URL + "img/logociviles.png"}
            alt="Civiles Pro"
            className="h-10 w-auto"
          />
        </a>
      </div>
    </header>
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
          La herramienta que los {" "}
          <span className="inline-block border-b-4" style={{ borderColor: PRIMARY }}>
            {typed || "\u00A0"}
          </span>
        </span>
        <span className="block">necesitan para ser mas eficientes.</span>
      </h1>

      <a
        href="/dashboard"
        className="mt-6 px-6 py-3 rounded-md font-semibold text-white"
        style={{ backgroundColor: SECUNDARY }}
      >
        Comienza ahora
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
            <h4 className="text-sm lg:text-base text-gray-600">
              Lista de materiales que necesitas para:
            </h4>
            <h3 className="text-2xl lg:text-4xl font-extrabold mt-2" style={{ color: PRIMARY }}>
              {title}
            </h3>
            {desc && (
              <p className="mt-2 text-sm text-gray-700 text-[15px] leading-relaxed max-w-[520px]">
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
              <div className="mt-3 max-w-[520px]">
                <h4 className="text-sm text-gray-600">
                  Calcula al instante los materiales que necesitas para:
                </h4>
                <h3 className="text-2xl font-extrabold mt-1" style={{ color: PRIMARY }}>
                  {c.title}
                </h3>
                {c.desc && (
                  <p className="mt-2 text-sm text-gray-700 text-[15px] leading-relaxed">
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
        Más de 32 herramientas que calculan al instante lo que tu obra necesita.
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
          Ves los bultos, la arena, la grava, las varillas… pero lo que no ves son los errores. Porque aquí todo está medido, ajustado y listo para construir.
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

      {/* Separador absoluto (sin tocar diseño de precios) */}
      <div className="relative mt-8  max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div
          className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gray-300"
          aria-hidden="true"
        />
      </div>

      {/* PRECIOS (sin cambios) */}
      <div className="mt-6 mb-10 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 text-center items-start sm:divide-x sm:divide-gray-300">
        <div className="flex flex-col items-center sm:px-6">
          <div className="text-[34px] sm:text-[36px] font-extrabold tracking-tight text-primary">$20.000 COP</div>
          <div className="text-[14px] text-gray-700 mt-1">Suscripción Mensual</div>
          <p className="text-[15px] text-gray-800 font-medium">Cancela cuando quieras</p>
          <ul className="mt-4 space-y-2">
            <CheckLine>Compatible con Mac.</CheckLine>
            <CheckLine>32 herramientas activas.</CheckLine>
            <CheckLine>No requiere Excel.</CheckLine>
            <CheckLine>Exporta consolidado en Excel.</CheckLine>
            <CheckLine>Soporte 24/7</CheckLine>
          </ul>
          <a
            href="/dashboard"
            className="mt-4 px-6 py-3 rounded-md font-semibold text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            Suscríbete
          </a>
        </div>

        <div className="flex flex-col items-center mt-6 sm:mt-0 sm:px-6">
          <div className="text-[34px] sm:text-[36px] font-extrabold tracking-tight text-primary">$165.000 COP</div>
          <div className="text-[14px] text-gray-700 mt-1">Un solo pago</div>
          <ul className="mt-4 space-y-2">
            <CheckLine>Descarga el archivo.</CheckLine>
            <CheckLine>Disponible sin internet.</CheckLine>
            <CheckLine>25 herramientas activas.</CheckLine>
            <CheckLine>Soporte Preferencial.</CheckLine>
            <CheckLine>Requiere Excel 2024.</CheckLine>
            <CheckLine>Dos licencias.</CheckLine>
          </ul>
          <a
            href="/dashboard"
            className="mt-4 px-6 py-3 rounded-md font-semibold text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            Comprar 
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center mt-">
        <p className="text-[14px] text-gray-700">
          <span className="font-medium">Ambas incluyen Tutorial.</span> Elige la que prefieras. Sin restricciones.
        </p>
      </div>
 <div className="mt-6 flex items-center justify-center">
        <img
          src={base + "img/mediosdepago.png"}
          alt="Materiales (cemento, arena, gravilla, acero, etc.)"
          className="h-[120px] sm:h-[120px] md:h-[120px] object-contain"
        />
      </div>
      <div className="max-w-3xl mx-auto text-center mt-8 space-y-3">
        <p className="text-[15px] text-gray-800 font-semibold">
          Exporta cada cálculo en PDF (ordenado por ítem) para cotizar y documentar.
        </p>
        <p className="text-[15px] text-gray-800 font-semibold">
          Reúne todos los materiales en un consolidado listo para presupuesto.
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

function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-white" style={{ backgroundColor: PRIMARY }}>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Encabezado */}
        <div className="grid gap-6 md:grid-cols-3 items-start">
          <div>
            <img
              src={import.meta.env.BASE_URL + "img/logociviles.png"}
              alt="Civiles Pro"
              className="h-20 w-auto"
            />
          </div>
          <div className="md:col-span-2 text-xs opacity-90">
            Civiles Pro ofrece herramientas de cálculo de materiales para obra
            civil. Las cantidades resultantes se generan con base en parámetros
            técnicos y buenas prácticas de construcción, y pueden ajustarse según
            especificaciones de proyecto. Las medidas y resultados se expresan
            conforme a normativa vigente colombiana cuando aplica. La plataforma
            facilita la creación de un consolidado para estimación y control; sin
            embargo, no es un software de presupuesto ni sustituye la validación
            técnica del profesional responsable de la obra.
          </div>
        </div>

        {/* Cuerpo */}
        <div className="grid gap-8 md:grid-cols-2">
          <ul className="space-y-2">
            <li>
              <a
                href="https://civilespro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-90 hover:opacity-100"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="https://civilespro.com/concreto"
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-90 hover:opacity-100"
              >
                Plantilla de cálculo de concreto
              </a>
            </li>
            <li>
              <a
                href="https://civilespro.com/cursos"
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-90 hover:opacity-100"
              >
                Cursos
              </a>
            </li>
            <li>
              <a
                href="https://civilespro.com/autocad"
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-90 hover:opacity-100"
              >
                Recursos para Autocad
              </a>
            </li>
            <li>
              <a
                href="https://civilespro.com/revit"
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-90 hover:opacity-100"
              >
                Recursos para Revit
              </a>
            </li>
            <li>
              <a
                href="https://civilespro.com/formaleta"
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-90 hover:opacity-100"
              >
                Plantilla de gestión de formaleta
              </a>
            </li>
            <li>
              <a
                href="https://civilespro.com/almacen"
                target="_blank"
                rel="noopener noreferrer"
                className="block opacity-90 hover:opacity-100"
              >
                Plantilla de almacén
              </a>
            </li>
          </ul>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/ingcivilespro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M24 12.073C24 5.404 18.627 0 12 0 5.373 0 0 5.404 0 12.073c0 6.053 4.388 11.07 10.125 11.928v-8.432H7.078v-3.496h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.492 0-1.956.925-1.956 1.874v2.251h3.328l-.532 3.497h-2.796v8.432C19.612 23.142 24 18.125 24 12.073" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/civilespro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 0c3.3 0 3.7.012 5.004.072 1.206.058 2.003.25 2.48.415a4.92 4.92 0 011.8 1.17 4.92 4.92 0 011.17 1.8c.165.477.357 1.274.415 2.48C22.988 5.3 23 5.7 23 9c0 3.3-.012 3.7-.072 5.004-.058 1.206-.25 2.003-.415 2.48a4.92 4.92 0 01-1.17 1.8 4.92 4.92 0 01-1.8 1.17c-.477.165-1.274.357-2.48.415C15.7 22.988 15.3 23 12 23c-3.3 0-3.7-.012-5.004-.072-1.206-.058-2.003-.25-2.48-.415a4.92 4.92 0 01-1.8-1.17 4.92 4.92 0 01-1.17-1.8c-.165-.477-.357-1.274-.415-2.48C1.012 15.7 1 15.3 1 12c0-3.3.012-3.7.072-5.004.058-1.206.25-2.003.415-2.48a4.92 4.92 0 011.17-1.8 4.92 4.92 0 011.8-1.17c.477-.165 1.274-.357 2.48-.415C8.3 1.012 8.7 1 12 1zm0 2.163c-3.26 0-3.67.012-4.964.07-.996.046-1.54.213-1.898.356-.478.185-.82.407-1.178.765-.358.358-.58.7-.765 1.178-.143.358-.31.902-.356 1.898-.058 1.294-.07 1.704-.07 4.964s.012 3.67.07 4.964c.046.996.213 1.54.356 1.898.185.478.407.82.765 1.178.358.358.7.58 1.178.765.358.143.902.31 1.898.356 1.294.058 1.704.07 4.964.07s3.67-.012 4.964-.07c.996-.046 1.54-.213 1.898-.356a3.2 3.2 0 001.178-.765 3.2 3.2 0 00.765-1.178c.143-.358.31-.902.356-1.898.058-1.294.07-1.704.07-4.964s-.012-3.67-.07-4.964c-.046-.996-.213-1.54-.356-1.898a3.2 3.2 0 00-.765-1.178 3.2 3.2 0 00-1.178-.765c-.358-.143-.902-.31-1.898-.356-1.294-.058-1.704-.07-4.964-.07zm0 3.405a5.432 5.432 0 110 10.864 5.432 5.432 0 010-10.864zm0 8.962a3.53 3.53 0 100-7.06 3.53 3.53 0 000 7.06zm5.6-9.994a1.272 1.272 0 11-2.544 0 1.272 1.272 0 012.544 0z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@ingcivilespro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              title="TikTok"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 0h4.837c.375 2.73 2.426 4.87 5.163 5.11v4.89a9.075 9.075 0 01-4.812-1.318v8.306a6.93 6.93 0 11-6.93-6.928c.45 0 .885.046 1.309.126V5.105H12V0zm1.309 13.61a2.437 2.437 0 00-1.309-.365 2.485 2.485 0 102.485 2.485v-6.199a9.088 9.088 0 004.812 1.319V8.184a5.127 5.127 0 01-4.812-5.059H13.31v10.485z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Pie */}
        <div className="pt-8 mt-8 border-t border-white/20 text-xs text-center">
          © {year} Civiles Pro. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="font-sans">
      <AppHeader />
      <div className="pt-20 lg:pt-24">
        <Hero />
        <CardsWow />
        <MaterialsAndPricing />
        <FinalCTA />
        <SiteFooter />
      </div>
    </div>
  );
}
