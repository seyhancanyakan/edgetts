import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TTS Arayüzü - Metin Sesli Okuma",
  description: "OpenAI Edge TTS ile güçlendirilmiş modern metin sesli okuma arayüzü. Türkçe ve çoklu dil desteği.",
  keywords: ["TTS", "Text to Speech", "Sesli Okuma", "Türkçe TTS", "OpenAI Edge TTS"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
