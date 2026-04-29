import "./globals.css";
import { Providers } from "./providers";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { SyntheticAgent } from "../components/agent/SyntheticAgent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origine Digital",
  description: "Digital products, services, and done-for-you business systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <SyntheticAgent />
        </Providers>
      </body>
    </html>
  );
}