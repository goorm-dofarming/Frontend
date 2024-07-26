import { RecoilProvider } from '@/src/utils/recoilProvider';
import './globals.css';
import type { AppProps } from 'next/app';
import { ReactQueryProvider } from '@/src/utils/queryProvider';
import { MSWComponent } from '@/src/mocks/MSWComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
  const enableMSW = process.env.NEXT_PUBLIC_ENABLE_MSW === 'false';
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error('Google Client ID is not set');
    return null; // 또는 다른 대체 렌더링을 할 수 있습니다.
  }

  return (
    <GoogleOAuthProvider
      clientId={clientId}
      onScriptLoadSuccess={() => console.log('성공')}
      onScriptLoadError={() => console.log('실패')}
    >
      <RecoilProvider>
        <ReactQueryProvider>
          <CookiesProvider>
            <Head>
              <title>Dofarming</title>
              <meta property="og:title" content="Dofarming" key="title" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </CookiesProvider>
        </ReactQueryProvider>
      </RecoilProvider>
    </GoogleOAuthProvider>
  );
}
