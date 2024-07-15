import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./utils/queryProvider";
import { MSWComponent } from "./mocks/MSWComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dofarming",
  description: "Tap for a Random Adventure",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MSWComponent>
      </body>
    </html>
  );
}
