import { RecoilProvider } from "@/src/utils/recoilProvider";
import "./globals.css";
import type { AppProps } from "next/app";
import { ReactQueryProvider } from "@/src/utils/queryProvider";
import { MSWComponent } from "@/src/mocks/MSWComponent";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const enableMSW = process.env.NEXT_PUBLIC_ENABLE_MSW === "false";
  return (
    <RecoilProvider>
      <ReactQueryProvider>
        <Head>
          <title>Dofarming</title>
          <meta property="og:title" content="Dofarming" key="title" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {enableMSW ? (
          <MSWComponent enableMSW={enableMSW}>
            <Component {...pageProps} />
          </MSWComponent>
        ) : (
          <Component {...pageProps} />
        )}
      </ReactQueryProvider>
    </RecoilProvider>
  );
}
