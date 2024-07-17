import { RecoilProvider } from '@/src/utils/recoilProvider';
import './globals.css';
import type { AppProps } from 'next/app';
import { ReactQueryProvider } from '@/src/utils/queryProvider';
import { MSWComponent } from '@/src/mocks/MSWComponent';

export default function App({ Component, pageProps }: AppProps) {
  const enableMSW = process.env.NEXT_PUBLIC_ENABLE_MSW === 'false';
  return (
    <RecoilProvider>
      <ReactQueryProvider>
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
