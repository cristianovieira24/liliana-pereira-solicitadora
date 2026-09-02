import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liliana Pereira — Solicitadora",
  description:
    "Conceito de website para Liliana Pereira, Solicitadora na Guia, Pombal.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
