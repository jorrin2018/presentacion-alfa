'use client';

/**
 * Module: Home Presentation Page
 *
 * Summary:
 *   Web presentation that renders slides based on the business document
 *   provided in `presentacion.sty`. Content strictly mirrors the original
 *   sections: purpose of visit, findings, value proposal (supply and
 *   maintenance), policy scope, critical situations, and the strategic
 *   conclusion. Includes keyboard and touch navigation with subtle motion.
 *
 * Design:
 *   - Brand color aligns with ALFA (primary orange).
 *   - Header with logo and watermark for brand presence.
 *   - Card-based slides with bullet points.
 *
 * Navigation:
 *   - Left/Right arrows
 *   - Swipe gestures on touch devices
 *
 * Note:
 *   All comments are written in English per user instruction.
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertTriangle,
  Truck,
  Wrench,
  Table,
  ShieldCheck,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Type: Slide
 *
 * Represents a single slide in the presentation.
 *
 * Properties:
 * - title: Slide heading.
 * - icon: Icon element to visually categorize the slide.
 * - content: Array of bullet strings or React nodes.
 * - cta: Optional flag to render a primary call-to-action button.
 */
type Slide = {
  title: string;
  icon: React.ReactNode;
  content: (string | React.ReactNode)[];
  cta?: boolean;
};

// ======================================
//  Brand configuration
// ======================================
const brand = {
  primary: "#f36e21", // ALFA orange
  dark: "#303030", // dark gray for text
  mid: "#6b7280", // mid gray
};

// Path to logo in Next.js public directory
const LOGO_PATH = "/logo-color.png";

/**
 * Width steps used to expand the slide horizontally when content
 * does not fit vertically. Values are in pixels.
 */
const WIDTH_STEPS_PX: number[] = [640, 768, 896, 1024, 1152, 1280, 1440, 1536, 1728, 1920];

/**
 * Decorators for emphasizing bullet items with icons while keeping
 * the underlying literal text intact.
 */
const renderProblem = (text: string) => (
  <span className="inline-flex items-start">
    <AlertTriangle className="w-4 h-4 mt-1 mr-2 text-red-600" />
    <span>{text}</span>
  </span>
);

const renderPositive = (text: string) => (
  <span className="inline-flex items-start">
    <CheckCircle className="w-4 h-4 mt-1 mr-2 text-green-600" />
    <span>{text}</span>
  </span>
);

const renderPreventive = (text: string) => (
  <span className="inline-flex items-start">
    <ShieldCheck className="w-4 h-4 mt-1 mr-2" style={{ color: brand.primary }} />
    <span>{text}</span>
  </span>
);

/**
 * validateSlides
 *
 * Validates slide array conforms to the expected structure.
 *
 * Args:
 *   arr: Array of slide-like objects to validate.
 *
 * Returns:
 *   string[]: Array of validation error messages, empty if valid.
 */
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

// ======================================
//  Slides data: mirrors presentacion.sty
// ======================================
const slides: Slide[] = [
  {
    title: "Propuesta de Colaboración Estratégica AlfaCyH - Frente 12",
    icon: <Table className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Atención: Gerencia de Proyecto, Frente 12",
      "Asunto: Reporte de visita técnica y propuesta de valor para la optimización de suministros y mantenimiento de maquinaria.",
      "El propósito de este documento es presentar hallazgos y una propuesta de colaboración integral para garantizar eficiencia, calidad y continuidad operativa en el Frente 12.",
    ],
  },
  {
    title: "1. ¿A qué fuimos? (Motivo de Nuestra Visita)",
    icon: <Truck className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Atendimos la solicitud del Ingeniero Andrés para realizar una entrega de consumibles para los equipos de cortadora y roscadora de varilla.",
      "Comprendemos que esta necesidad surgió debido a que su proveedor actual no está cumpliendo con los tiempos y formas de entrega pactados, lo que representa un riesgo para la continuidad de sus operaciones.",
      "Nuestro objetivo inmediato fue responder con agilidad para evitar cualquier interrupción en su línea de trabajo.",
    ],
  },
  {
    title: "2. ¿Qué vimos? (Diagnóstico de la Situación Actual)",
    icon: <AlertTriangle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      renderProblem("Descontento General: Percibimos un descontento en el equipo de obra relacionado con la baja calidad de los suministros que reciben actualmente."),
      renderProblem("Suministros Inadecuados: Observamos prácticas deficientes en la entrega de materiales, como el soluble siendo transportado en recipientes no apropiados, lo cual puede comprometer la calidad del producto y el rendimiento de la maquinaria."),
      renderPositive("Capacidad de Respuesta Inmediata: Durante la visita, nuestro equipo técnico no solo revisó el estado de las cuchillas de las cortadoras , sino que también logró adaptar exitosamente las cuchillas que llevábamos para el equipo de roscado de varilla. Esto demuestra nuestra capacidad para ofrecer soluciones técnicas en sitio y de forma inmediata."),
    ],
  },
  {
    title: "3. Áreas de Oportunidad – Suministro Estratégico y Garantizado",
    icon: <Truck className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      renderPositive("Conectores: Podemos ofrecer un conector de mejor calidad de acero al que actualmente se suministra en la obra, lo que garantiza una mayor seguridad para el proyecto. Asimismo, podemos ofrecer un amplio stock de conectores de entrega inmediata en sus diferentes diámetros."),
      renderPositive("Maquinaria: Podemos ofrecer máquinas de primera calidad con stock de refacciones e inventario disponible, garantizando una respuesta inmediata ante cualquier requerimiento."),
      renderPositive("Factor Logístico: Proponemos un modelo de entrega directa en obra. Para esto, contamos con vehículos de 3.5 y 6 toneladas los cuales se adaptan a sus necesidades. Para facilitar esto, podemos incluir el flete sin costo en pedidos que alcancen un volumen mínimo por acordar. "),
    ],
  },
  {
    title: "3. Áreas de Oportunidad – Creación de un Plan de Mantenimiento Proactivo",
    icon: <Wrench className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      renderProblem("Observamos que actualmente no cuentan con servicio técnico especializado para su maquinaria. Esta situación es un foco de riesgo que, de no atenderse, muy probablemente derivará en daños a los equipos y paros operativos."),
      renderPositive("Nuestra Solución: Proponemos la implementación de pólizas de mantenimiento preventivo por equipo y/o la asignación de una guardia técnica permanente en obra. Este servicio garantizaría el funcionamiento óptimo de la maquinaria, previniendo paros no programados y protegiendo su inversión."),
    ],
  },
  {
    title: "¿Que incluye la póliza de mantenimiento?",
    icon: <CheckCircle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      renderPositive("Supervisión en la operación."),
      renderPositive("Mantenimientos preventivos."),
      renderPositive("Atención a emergencias."),
      renderPositive("Revisiones periódicas de las máquinas."),
      renderPositive("Personal técnico con vehículo asignado."),
    ],
  },
  {
    title: "¿Que no incluye la póliza de mantenimiento?",
    icon: <AlertTriangle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Refacciones.",
      "Consumibles.",
      "Traslados de la maquinaria.",
    ],
  },
  {
    title: "4. Situaciones Críticas y Urgentes de Atender",
    icon: <AlertTriangle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      renderProblem("Riesgo Inminente de Paro de Producción: La falta de un responsable de mantenimiento y de un stock adecuado de consumibles y refacciones es crítica. Una falla en una máquina, sin tener las refacciones disponibles de inmediato, provocaría un atraso significativo en la obra y, en consecuencia, pérdidas económicas y de tiempo. Sugerimos una compra estratégica de consumibles clave para mitigar este riesgo."),
      renderProblem("Aumento Inminente de Costos por Aranceles (Ventana de Oportunidad): A partir de enero de 2026, el gobierno mexicano implementará un arancel del 50% a diversos productos siderúrgicos como el acero, lo que impactará directamente el costo de los conectores y otros suministros."),
      renderPreventive("Acción preventiva: Mantener al menos 1 Centro de Habilitado como backup en el CEDIS por cada 5 centros activos en obra."),
    ],
  },
  {
    title: "Aumento Inminente de Costos por Aranceles – Alternativas",
    icon: <CheckCircle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Fijar un precio preferencial ahora a través del fincado de un pedido de los conectores que se van a ocupar en el proyecto.",
      "Realizar de manera urgente una compra concreta de conectores en el mes de octubre del año 2025, para que el material llegue a México antes de la entrada en vigor del arancel.",
    ],
  },
  {
    title: "Conclusión: Hacia una Alianza Estratégica \"Ganar-Ganar\"",
    icon: <CheckCircle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      renderPositive("Continuidad Operativa: Minimizando el riesgo de paros por fallas en maquinaria o falta de consumibles."),
      renderPositive("Eficiencia de Costos: Asegurando precios competitivos y evitando el impacto del nuevo arancel del 50%."),
      renderPositive("Calidad Garantizada: Recibiendo productos y servicios que cumplen con los más altos estándares de calidad."),
      renderPositive("Simplicidad Logística: Con entregas directas en obra y un plan de suministro adaptado a sus necesidades."),
      renderPositive("Estamos convencidos de que juntos podemos llevar la eficiencia y rentabilidad de su proyecto al siguiente nivel."),
    ],
  },
  {
    title: "Atentamente",
    icon: <CheckCircle className="w-6 h-6 mr-2" style={{ color: brand.primary }} />,
    content: [
      "Alfa Conectores y Habilitado",
    ],
    
  },
];

// ======================
//  Main component
// ======================
export default function Home() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideContentRef = useRef<HTMLDivElement | null>(null);
  const [widthIndex, setWidthIndex] = useState<number>(3); // start near 1024px
  const [scale, setScale] = useState<number>(1);

  /**
   * nextSlide
   *
   * Advances to the next slide with wrap-around behavior.
   */
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  /**
   * prevSlide
   *
   * Goes back to the previous slide with wrap-around behavior.
   */
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Run a quick integrity check for slides at mount
  const validationErrors = useMemo(() => validateSlides(slides as any), []);

  // Dev assertions for basic runtime checks
  useEffect(() => {
    console.assert(slides.length >= 3, "[TEST] Debe haber ≥ 3 slides");
    console.assert(typeof nextSlide === "function" && typeof prevSlide === "function", "[TEST] Navegadores definidos");
    const lastIdx = slides.length - 1;
    const wrapRight = (lastIdx + 1) % slides.length;
    console.assert(wrapRight === 0, "[TEST] Wrap-around derecha OK");
    console.assert(LOGO_PATH.startsWith("/"), "[TEST] LOGO_PATH debe iniciar con '/'");
    slides.forEach((s, i) => console.assert(!!s.icon, `[TEST] Slide ${i + 1} con icono`));
  }, []);

  // Keyboard and touch interactions
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

  /**
   * fitSlideToViewport
   *
   * Attempts to ensure current slide fits within viewport height by
   * increasing the maximum width in discrete steps. If width cannot
   * resolve the overflow (e.g., on small screens), applies a scale
   * down factor as a last resort.
   */
  useEffect(() => {
    const fit = () => {
      const node = slideContentRef.current;
      if (!node) return;
      // Reset scale before measurement
      setScale(1);
      // Estimate available height (account for header/footer/margins)
      const availableHeight = Math.max(window.innerHeight - 180, 320);
      // Measure current content height (unscaled)
      const contentHeight = node.getBoundingClientRect().height;

      if (contentHeight <= availableHeight) {
        return;
      }

      // Try widening in steps
      let idx = widthIndex;
      let widened = false;
      while (idx < WIDTH_STEPS_PX.length - 1) {
        idx += 1;
        widened = true;
        setWidthIndex(idx);
        break; // allow reflow before re-checking
      }

      if (!widened) {
        // Cannot widen further: compute scale fallback
        const nextScale = Math.min(1, (availableHeight - 8) / contentHeight);
        setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
      } else {
        // After width change, schedule a re-check on next frame
        requestAnimationFrame(() => {
          const newNode = slideContentRef.current;
          if (!newNode) return;
          const newHeight = newNode.getBoundingClientRect().height;
          if (newHeight > availableHeight && idx >= WIDTH_STEPS_PX.length - 1) {
            const nextScale = Math.min(1, (availableHeight - 8) / newHeight);
            setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
          }
        });
      }
    };

    // Defer to allow slide transition to finish before measuring
    const id = setTimeout(fit, 60);
    return () => clearTimeout(id);
  }, [current, widthIndex]);

  // Re-fit on window resize
  useEffect(() => {
    const onResize = () => {
      // Reset width and scale, then let effect above re-fit
      setScale(1);
      setWidthIndex((idx) => idx);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative p-4 sm:p-6 min-h-screen flex flex-col items-center justify-center"
      style={{ background: `linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #fff 100%)` }}
    >
      {/* Brand header bar */}
      <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between bg-white shadow">
        <div className="flex items-center gap-3">
          {/* Use <img> for PNG served from /public */}
          <img src={LOGO_PATH} alt="ALFA Conectores y Habilitado" className="h-10 w-auto" />
        </div>
        <a href="https://alfacyh.mx/" target="_blank" rel="noreferrer" className="text-sm font-semibold" style={{ color: brand.primary }}>
          alfacyh.mx
        </a>
      </div>

      {/* Brand watermark */}
      <div className="pointer-events-none select-none opacity-0 sm:opacity-5 absolute -right-6 -bottom-6">
        <img src={LOGO_PATH} alt="ALFA Logo Watermark" className="w-[280px] sm:w-[360px] h-auto" />
      </div>

      {/* Page header */}
      <div className="text-center mt-20 mb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: brand.dark }}>
          Propuesta de Colaboración Estratégica AlfaCyH - Frente 12
        </h1>
        <p className="text-sm sm:text-base" style={{ color: brand.mid }}>
          Proyecto Tren México-Querétaro
        </p>
      </div>

      {/* Validation notice */}
      {validationErrors.length > 0 && (
        <div className="mb-2 text-[12px] text-red-600">{validationErrors.join(" · ")}</div>
      )}

      {/* Animated slide container */}
      <div
        className="w-full h-auto flex items-center justify-center"
        style={{ maxWidth: WIDTH_STEPS_PX[widthIndex] }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full h-auto"
          >
            <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
              <Card
                className="w-full h-full flex flex-col justify-center rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.07)]"
                style={{ borderColor: brand.primary, borderWidth: 2 }}
              >
                <CardContent ref={slideContentRef} className="p-6 sm:p-8 text-center space-y-5 bg-white rounded-2xl">
                  <h2
                    className="text-xl sm:text-2xl font-bold flex items-center justify-center"
                    style={{ color: brand.dark }}
                  >
                    {slides[current].icon} {slides[current].title}
                  </h2>
                  {slides[current].content.length > 0 && (
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
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-2xl mt-5 space-y-2 sm:space-y-0">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={() => setCurrent(0)}
            variant="outline"
            size="sm"
            className="border w-full sm:w-auto"
            style={{ borderColor: brand.primary, color: brand.dark }}
          >
            Inicio
          </Button>
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="border w-full sm:w-auto"
            style={{ borderColor: brand.primary, color: brand.dark }}
          >
            Anterior
          </Button>
        </div>
        <span className="text-sm font-semibold order-first sm:order-none" style={{ color: brand.mid }}>
          {current + 1} / {slides.length}
        </span>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={nextSlide}
            variant="outline"
            size="sm"
            className="border w-full sm:w-auto"
            style={{ borderColor: brand.primary, color: brand.dark }}
          >
            Siguiente
          </Button>
          <Button
            onClick={() => setCurrent(slides.length - 1)}
            variant="outline"
            size="sm"
            className="border w-full sm:w-auto"
            style={{ borderColor: brand.primary, color: brand.dark }}
          >
            Final
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 text-[11px]" style={{ color: brand.mid }}>
        © {new Date().getFullYear()} ALFA Conectores y Habilitado • Frente 12 – Tren México-Querétaro
      </div>
    </div>
  );
}