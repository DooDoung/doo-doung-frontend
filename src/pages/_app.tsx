import type { AppProps } from "next/app";
import { Chakra_Petch, Geist, Geist_Mono } from "next/font/google";

import "../style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chakra = Chakra_Petch({
  weight: "400",
  variable: "--font-chakra",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`font-chakra ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <Component {...pageProps} />
    </div>
  );
}
