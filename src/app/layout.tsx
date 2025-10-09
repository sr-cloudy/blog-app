import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
const inter = Inter({ subsets: ['latin'] });
import AuthProvider from './components/auth/AuthProvider';
export const metadata: Metadata = {
  title: 'Next.js + Supabase Auth',
  description: 'A starter template for Next.js with Supabase authentication.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50 flex flex-col items-center">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
