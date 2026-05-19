import { Car } from '@/app/types/car';
import css from './CarDescription.module.css';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { CiCircleCheck } from 'react-icons/ci';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaCar } from 'react-icons/fa';
import { BsFuelPump } from 'react-icons/bs';
import { PiGearThin } from 'react-icons/pi';

interface CarDetailsDescriptionProps {
  car: Car;
}
export default function CarDetailsDescription({ car }: CarDetailsDescriptionProps) {
  return (
    <div className={css.descWrapper}>
      <div className={css.descFirstRow}>
        <h3 className={css.descHead}>
          <span>{car.brand}</span>{' '}
          <span className={css.descModelAccent}>{car.model},</span>{' '}
          <span>{car.year}</span>{' '}
          <span className={css.descId}>{`id: ${car.stockNumber}`}</span>
        </h3>
        <p className={css.descLocation}>
          <HiOutlineLocationMarker size={16} />
          <span>
            {car.location?.city}, {car.location?.country}
          </span>
          <span className={css.descMileage}>{`Mileage: ${car.mileage}`}</span>
        </p>
        <p className={css.descPrice}>${car.rentalPrice}</p>
        <p className={css.descText}>{car.description}</p>
      </div>

      <div className={css.descSecondRow}>
        <h4 className={css.descTitle}>Rental Conditions:</h4>
        <ul className={css.descList}>
          {car.rentalConditions?.map((condition, index) => (
            <li key={index} className={css.descItem}>
              <CiCircleCheck size={16} />
              {condition}
            </li>
          ))}
        </ul>
      </div>

      <div className={css.descThirdRow}>
        <h4 className={css.descTitle}>Car Specifications:</h4>
        <ul className={css.descList}>
          <li className={css.descItem}>
            <IoCalendarOutline size={16} />
            {`Year: ${car.year}`}
          </li>
          <li className={css.descItem}>
            <FaCar size={16} />
            {`Type: ${car.type}`}
          </li>
          <li className={css.descItem}>
            <BsFuelPump size={16} />
            {`Fuel Consumption: ${car.fuelConsumption}`}
          </li>
          <li className={css.descItem}>
            <PiGearThin size={16} />
            {`Engine Size: ${car.engine}`}
          </li>
        </ul>
      </div>

      <div className={css.descFourthRow}>
        <h4 className={css.descTitle}>Accessories and functionalities:</h4>
        <ul className={css.descList}>
          {car.features?.map((feature, index) => (
            <li key={index} className={css.descItem}>
              <CiCircleCheck size={16} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}