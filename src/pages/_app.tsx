import type { AppProps } from "next/app";
import { Geist, Geist_Mono, Sulphur_Point } from "next/font/google";

import "../style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sulphur = Sulphur_Point({
  weight: "400",
  variable: "--font-sulphur",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${sulphur.variable} antialiased`}
    >
      <Component {...pageProps} />
    </div>
  );
}
