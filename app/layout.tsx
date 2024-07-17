import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from './utils/queryProvider';
import { RecoilProvider } from './utils/recoilProvider';
import { MSWComponent } from './mocks/MSWComponent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dofarming',
  description: 'Tap for a Random Adventure',
  icons: {
    icon: '/logo.svg',
  },
};

const enableMSW = process.env.NEXT_PUBLIC_ENABLE_MSW === 'false';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProvider>
          <ReactQueryProvider>
            {enableMSW ? (
              <MSWComponent enableMSW={enableMSW}>{children}</MSWComponent>
            ) : (
              children
            )}
          </ReactQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
