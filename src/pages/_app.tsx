import type { AppProps } from "next/app";
import { Chakra_Petch, Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "../style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div
        className={`font-chakra ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
