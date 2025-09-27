'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertTriangle,
  Truck,
  Wrench,
  DollarSign,
  Star,
  Table,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  title: string;
  icon: React.ReactNode;
  content: (string | React.ReactNode)[];
  cta?: boolean;
};

// ======================================
//  Marca ALFA
// ======================================
const brand = {
  primary: "#f36e21", // naranja ALFA
  dark: "#303030", // gris oscuro para texto
  mid: "#6b7280", // gris medio
};

// Ruta del logo (debe estar en la carpeta /public del proyecto Next.js)
const LOGO_PATH = "/logo-color.png";

// ======================
//  UTIL: Helpers & Tests
// ======================
function validateSlides(arr: Array<{ title: string; content: (string | React.ReactNode)[]; cta?: boolean; icon?: React.ReactNode }>) {
  const errors: string[] = [];
  if (!Array.isArray(arr) || arr.length === 0) errors.push("slides vacío o inválido");
  arr.forEach((s, i) => {
    if (!s.title) errors.push(`Slide ${i + 1} sin título`);
    if (!Array.isArray(s.content) || s.content.length === 0) errors.push(`Slide ${i + 1} sin contenido`);
    if (!s.icon) errors.push(`Slide ${i + 1} sin icono`);
  });
  return errors;
}

// ======================
//  DATA: Diapositivas (solo íconos solicitados)
// ======================
const slides: Slide[] = [
  {
    title: "1. Motivo de la Visita",
    icon: <Truck className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Entrega urgente de consumibles para cortadora y roscadora de varilla.",
      "Proveedor actual incumple tiempos y formas de entrega.",
      "Acción inmediata: adaptación de cuchillas en sitio para continuidad.",
      "Atención personalizada a solicitud del Ing. Andrés.",
    ],
  },
  {
    title: "2. Diagnóstico",
    icon: <AlertTriangle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "⚠️ Descontento por baja calidad de suministros.",
      "🚫 Prácticas deficientes: recipientes inadecuados para soluble.",
      "⚡ Respuesta técnica inmediata y efectiva en obra.",
      "🔍 Oportunidad de mejora logística y técnica detectada.",
    ],
  },
  {
    title: "3A. Propuesta – Suministro Estratégico",
    icon: <Truck className="w-6 h-6 mr-2 text-blue-600" />,
    content: [
      "Precios competitivos en maquinaria y conectores.",
      "Entregas directas en obra, sin costos extras.",
      "Flete sin costo en pedidos ≥ 6,000 conectores.",
      "Soporte logístico adaptado con unidades 3.5 y 6 ton.",
    ],
  },
  {
    title: "3B. Propuesta – Mantenimiento Proactivo",
    icon: <Wrench className="w-6 h-6 mr-2 text-green-600" />,
    content: [
      "Pólizas preventivas por equipo o guardia técnica en obra.",
      "Garantiza continuidad operativa.",
      "Protección de la inversión en maquinaria.",
      "Reducción de costos por paros no programados.",
    ],
  },
  {
    title: "4. Situaciones Críticas",
    icon: <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />,
    content: [
      "Riesgo de paro de producción: falta de stock y refacciones.",
      "Aranceles 2026 (50% productos chinos): fijar precios ahora o compra consolidada antes de fin de 2025.",
      "Impacto económico severo si no se atiende de inmediato.",
    ],
  },
  {
    title: "5. Beneficios de la Alianza",
    icon: <CheckCircle className="w-6 h-6 mr-2 text-green-600" />,
    content: [
      "Continuidad operativa sin paros.",
      "Eficiencia de costos: mejores precios + evitar aranceles.",
      "Calidad garantizada en suministros.",
      "Simplicidad logística: entregas directas en obra.",
      "Visión de socio estratégico a largo plazo.",
    ],
  },
  {
    title: "6. Reconocimiento de Valor",
    icon: <Star className="w-6 h-6 mr-2 text-yellow-500" />,
    content: [
      "🌟 Experiencia demostrada en soluciones técnicas inmediatas.",
      "🌟 Confianza generada por respuesta rápida en obra.",
      "🌟 Compromiso con eficiencia y calidad.",
    ],
  },
  {
    title: "7. Oferta Comercial",
    icon: <DollarSign className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Flete sin costo en pedidos ≥ 6,000 conectores.",
      "Precios preferenciales por contrato de volumen (12–18 meses).",
      "Descuentos escalonados por tramos: 3k / 6k / 10k+ conectores.",
      "Tiempos de entrega: 24 h (CDMX/Valle), 48–72 h (Bajío/Occidente).",
    ],
  },
  {
    title: "8. Timeline de Implementación (4 semanas)",
    icon: <CheckCircle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Semana 1: Kickoff, diagnóstico a detalle y definición de KPIs.",
      "Semana 2: Alta de pólizas, setup de bitácoras y stock mínimo en sitio.",
      "Semana 3: Primera entrega consolidada y capacitación de cuadrillas.",
      "Semana 4: Revisión de métricas, ajustes finos y firma de plan trimestral.",
    ],
  },
  {
    title: "Próximos Pasos",
    icon: <DollarSign className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Reunión para definir pólizas de mantenimiento.",
      "Estrategia de compra antes de los aranceles.",
      "Consolidación de una alianza estratégica ganar-ganar.",
    ],
    cta: true,
  },
];

// ======================
//  COMPONENTE PRINCIPAL
// ======================
export default function Home() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Navegación
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Validación de datos (auto-test simple)
  const validationErrors = useMemo(() => validateSlides(slides as any), []);

  // DEV TESTS (no rompen la UI, solo alertan en consola)
  useEffect(() => {
    console.assert(slides.length >= 3, "[TEST] Debe haber ≥ 3 slides");
    console.assert(typeof nextSlide === "function" && typeof prevSlide === "function", "[TEST] Navegadores definidos");
    // wrap-around lógico
    const lastIdx = slides.length - 1;
    const wrapRight = (lastIdx + 1) % slides.length;
    console.assert(wrapRight === 0, "[TEST] Wrap-around derecha OK");
    // el logo debe apuntar a /logo-color.png (public)
    console.assert(LOGO_PATH.startsWith("/"), "[TEST] LOGO_PATH debe iniciar con '/'");
    // cada slide debe tener ícono
    slides.forEach((s, i) => console.assert(!!s.icon, `[TEST] Slide ${i + 1} con icono`));
  }, []);

  // Teclado (←/→) y gestos táctiles
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => {
      const delta = e.changedTouches[0].clientX - startX;
      if (delta < -40) nextSlide();
      if (delta > 40) prevSlide();
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart as any);
      el.removeEventListener("touchend", onTouchEnd as any);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative p-4 sm:p-6 h-screen flex flex-col items-center justify-center"
      style={{ background: `linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #fff 100%)` }}
    >
      {/* Marca: barra superior */}
      <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between bg-white shadow">
        <div className="flex items-center gap-3">
          {/* Usamos <img> para PNG desde /public */}
          <img src={LOGO_PATH} alt="ALFA Conectores y Habilitado" className="h-10 w-auto" />
        </div>
        <a href="https://alfacyh.mx/" target="_blank" rel="noreferrer" className="text-sm font-semibold" style={{ color: brand.primary }}>
          alfacyh.mx
        </a>
      </div>

      {/* Marca: watermark */}
      <div className="pointer-events-none select-none opacity-5 absolute -right-6 -bottom-6">
        <img src={LOGO_PATH} alt="ALFA Logo Watermark" className="w-[280px] sm:w-[360px] h-auto" />
      </div>

      {/* Header */}
      <div className="text-center mt-20 mb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: brand.dark }}>
          Propuesta Estratégica – Frente 12
        </h1>
        <p className="text-sm sm:text-base" style={{ color: brand.mid }}>
          Proyecto Tren México-Querétaro • 26 de septiembre de 2025
        </p>
      </div>

      {/* Aviso de validación */}
      {validationErrors.length > 0 && (
        <div className="mb-2 text-[12px] text-red-600">{validationErrors.join(" · ")}</div>
      )}

      {/* Contenedor del slide con animación */}
      <div className="w-full max-w-2xl h-[64vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Card
              className="w-full h-full flex flex-col justify-center rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.07)]"
              style={{ borderColor: brand.primary, borderWidth: 2 }}
            >
              <CardContent className="p-6 sm:p-8 text-center space-y-5 bg-white rounded-2xl">
                <h2
                  className="text-xl sm:text-2xl font-bold flex items-center justify-center"
                  style={{ color: brand.dark }}
                >
                  {slides[current].icon} {slides[current].title}
                </h2>
                <ul className="pl-6 text-left space-y-3">
                  {slides[current].content.map((item, idx) => (
                    typeof item === 'string' ? (
                      <li key={idx} className="text-base sm:text-lg" style={{ color: brand.dark }}>
                        <span
                          className="mr-2 inline-block h-2 w-2 rounded-full"
                          style={{ background: brand.primary }}
                        ></span>
                        {item}
                      </li>
                    ) : (
                      <div key={idx}>{item}</div>
                    )
                  ))}
                </ul>
                {slides[current].cta && (
                  <Button size="lg" className="mt-4 text-white" style={{ background: brand.primary }}>
                    Agendar Reunión
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles */}
      <div className="flex justify-between items-center w-full max-w-2xl mt-5">
        <Button
          onClick={prevSlide}
          variant="outline"
          className="border"
          style={{ borderColor: brand.primary, color: brand.dark }}
        >
          Anterior
        </Button>
        <span className="text-sm font-semibold" style={{ color: brand.mid }}>
          {current + 1} / {slides.length}
        </span>
        <Button
          onClick={nextSlide}
          variant="outline"
          className="border"
          style={{ borderColor: brand.primary, color: brand.dark }}
        >
          Siguiente
        </Button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 text-[11px]" style={{ color: brand.mid }}>
        © {new Date().getFullYear()} ALFA Conectores y Habilitado • Frente 12 – Tren México-Querétaro
      </div>
    </div>
  );
}