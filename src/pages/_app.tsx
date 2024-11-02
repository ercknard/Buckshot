import type { AppProps } from "next/app";
import Head from "next/head";
import localFont from "next/font/local";
import { Container } from "@mui/material";
import "@/styles/globals.css";
import ThemeProvider from "@/theme/themeProvider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider>
        <Container
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}
