import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import TanstackProvider from '@/components/shared/TanStackProvider';
import ToasterProvider from '@/components/shared/ToasterProvider';
import Header from '@/components/shared/Header/Header';

export const metadata: Metadata = {
  title: 'RentalCar',
  description:
    'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
  openGraph: {
    title: 'RentalCar',
    description:
      'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
    images: [
      {
        width: 1200,
        height: 630,
        url: 'https://res.cloudinary.com/djhsypsct/image/upload/v1778943276/HeroBanner@2x_os6bbf.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RentalCar',
    description:
      'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778943276/HeroBanner@2x_os6bbf.jpg',
    ],
  },
};

const inter = Inter({
  weight: ['400', '500', '600'],
  variable: '--inter-font',
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  variable: '--manrope-font',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <TanstackProvider>
          <ToasterProvider />
          <Header />
          <main>{children}</main>
        </TanstackProvider>
      </body>
    </html>
  );
}