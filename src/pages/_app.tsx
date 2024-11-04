import type { AppProps } from "next/app";
import Head from "next/head";
import { Container } from "@mui/material";
import "@/styles/globals.css";
import ThemeProvider from "@/theme/themeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
