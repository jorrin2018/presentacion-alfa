import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Module: RootLayout
 *
 * Summary:
 *   App-wide layout for the presentation site. Injects global font and
 *   metadata matching the business document intent.
 *
 * Notes:
 *   Comments are written in English per user instruction.
 */

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Propuesta de Colaboración Estratégica AlfaCyH - Frente 12",
  description: "Proyecto Tren México-Querétaro. Reporte de visita y propuesta de valor.",
  openGraph: {
    title: "Propuesta de Colaboración Estratégica AlfaCyH - Frente 12",
    description: "Reporte de visita técnica y propuesta de valor para optimización de suministros y mantenimiento.",
    siteName: "ALFA Conectores y Habilitado",
    images: [
      {
        url: "/logo-color.png",
        width: 1200,
        height: 630,
        alt: "ALFA Conectores y Habilitado",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Propuesta de Colaboración Estratégica AlfaCyH - Frente 12",
    description: "Reporte de visita técnica y propuesta de valor.",
    images: ["/logo-color.png"],
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
