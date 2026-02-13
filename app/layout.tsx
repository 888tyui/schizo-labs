import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Nav } from "./components/Nav";
import { SolanaProvider } from "./providers/SolanaProvider";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const retroDiscoWide = localFont({
  src: "./fonts/RetroDisco-Wide.woff2",
  variable: "--font-retro-wide",
  display: "swap",
});

const retroDiscoRegular = localFont({
  src: "./fonts/RetroDisco-Regular.woff2",
  variable: "--font-retro-regular",
  display: "swap",
});

const retroDiscoNarrow = localFont({
  src: "./fonts/RetroDisco-Narrow.woff2",
  variable: "--font-retro-narrow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SCHIZO LABS",
  description: "REJECT NORMALCY. JOIN THE FREQUENCY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${retroDiscoWide.variable} ${retroDiscoRegular.variable} ${retroDiscoNarrow.variable}`}
      >
        <SolanaProvider>
          <Nav />
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
