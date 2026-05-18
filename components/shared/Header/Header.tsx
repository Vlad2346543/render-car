'use client';
import Link from 'next/link';
import css from './Header.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


export default function Header() {
  const pathname = usePathname();
  return (
<header className={css.header}>
  <div className="container">
    <div className={css.headerContainer}>
      <Link href="/" className={css.headerLogo}>
        <Image
          src="/Logo.svg"
          alt="Logo of the RentalCar Company"
          width={104}
          height={16}
          priority
        />
      </Link>
      
      <nav className={css.headerNav}>
        <Link
          href="/"
          className={clsx(
            css.headerNavLink, 
            pathname === '/' && css.headerNavLinkActive
          )}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={clsx(
            css.headerNavLink,
            pathname === '/catalog' && css.headerNavLinkActive
          )}
        >
          Catalog
        </Link>
      </nav>
    </div>
  </div>
</header>
  );
}