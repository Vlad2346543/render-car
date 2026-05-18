'use client';
import { Car } from '@/app/types/car';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import css from './CarsList.module.css';

interface CarsListProps {
  cars: Car[];
}

export default function CarsList({ cars }: CarsListProps) {
  return (
<ul className={css.carsList}>
  {cars.map(car => (
    <li key={car.id} className={css.carCard}>
      <div className={css.carImageWrapper}>
        <AiOutlineHeart size={16} className={css.carHeartIcon} />
        {car.img && (
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={600}
            height={400}
            className={css.carImage}
          />
        )}
      </div>
      
      <div className={css.carCardDescr}>
        <div className={css.carMainInfo}>
          <p className={css.carTitle}>
            {car?.brand}{' '}
            <span className={css.carModel}>{car?.model},</span>{' '}
            {car?.year}
          </p>
          <p className={css.carPrice}>$ {car?.rentalPrice}</p>
        </div>
        
        <p className={css.carDetailsRow}>
          <span className={css.carDetailTag}>{car.location?.city}</span>
          <span className={css.carDetailTag}>{car.location?.country}</span>
          <span className={css.carDetailTag}>{car.rentalCompany}</span>
        </p>
        <p className={css.carDetailsRow}>
          <span className={css.carDetailTag}>{car.type}</span>
          <span className={css.carDetailTag}>{car.mileage}</span>
        </p>
      </div>
      
      <Link href={`/catalog/${car.id}`} className={css.carButton} target="_blank">
        Read more
      </Link>
    </li>
  ))}
</ul>
  );
}