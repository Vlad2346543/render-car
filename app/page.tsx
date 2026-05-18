import clsx from 'clsx';
import css from './page.module.css';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HomePage of the | App RentalCar',
  description:
    'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
  openGraph: {
    title: 'HomePage of the | App RentalCar',
    description:
      'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
    images: [
      {
        width: 1200,
        height: 630,
        url: 'https://res.cloudinary.com/djhsypsct/image/upload/v1778943276/HeroBanner_2x_os6bbf.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomePage of the | App RentalCar',
    description:
      'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778943276/HeroBanner@2x_os6bbf.png',
    ],
  },
};

export default function Home() {
  return (
    <section className={css.heroSection}>
      <div className={clsx('container', css.heroContainer)}>
        <h1 className={css.heroTitle}>Find your perfect rental car</h1>
        <p className={css.heroText}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link href="/catalog" className={css.heroLink}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}