import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/contexts/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'BoraProCT - Sistema de Gestão',
  description: 'Sistema completo de gestão para centros de treinamento de futevôlei',
  keywords: ['futevôlei', 'gestão', 'treinamento', 'esporte'],
  authors: [{ name: 'BoraProCT Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className='font-sans antialiased'>
        <ThemeProvider>
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
