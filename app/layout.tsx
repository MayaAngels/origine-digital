import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

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
            <header style={{ padding: '1rem', background: '#11151A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <a href="/" style={{ color: '#6EE7B7', fontWeight: 700, fontSize: '1.2rem', textDecoration: 'none' }}>ORIGINE.DIGITAL</a>
            </header>
            <main className="flex-1">{children}</main>
            <footer style={{ padding: '1rem', background: '#11151A', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', color: '#8A93A6', fontSize: '0.85rem' }}>
              © 2026 ORIGINE.DIGITAL — Ireland
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}