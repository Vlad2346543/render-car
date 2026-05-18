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
export default function CarDetailsDescription({
  car,
}: CarDetailsDescriptionProps) {
  return (
    <div className={css.desscriptionWrapper}>
      <div className={css.firstRow}>
        <h3 className={css.head}>
          <span className={css.partHead}>{car.brand}</span>{' '}
          <span className={css.partHead}>{car.model},</span>{' '}
          <span className={css.partHead}>{car.year}</span>{' '}
          <span className={css.id}>{`id: ${car.stockNumber}`}</span>
        </h3>
        <p className={css.location}>
          <HiOutlineLocationMarker size={16} />
          <span>
            {car.location?.city},{car.location?.country}
          </span>
          <span>{`Mileage: ${car.mileage}`}</span>
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.descr}>{car.description}</p>
      </div>

      <div className={css.secondRow}>
        <h4 className={css.condHead}>Rental Conditions:</h4>
        <ul className={css.conditions}>
          {car.rentalConditions?.map((condition, index) => (
            <li key={index} className={css.condition}>
              <CiCircleCheck size={16} />
              {condition}
            </li>
          ))}
        </ul>
      </div>
      <div className={css.thirdRow}>
        <h4 className={css.specificationsTitle}>Car Specifications:</h4>
        <ul className={css.specifications}>
          <li className={css.specific}>
            <IoCalendarOutline size={16} />
            {`Year: ${car.year}`}
          </li>
          <li className={css.specific}>
            <FaCar size={16} />
            {`Type: ${car.type}`}
          </li>
          <li className={css.specific}>
            <BsFuelPump size={16} />
            {`Fuel Consumption: ${car.fuelConsumption}`}
          </li>
          <li className={css.specific}>
            <PiGearThin size={16} />
            {`Engine Size: ${car.engine}`}
          </li>
        </ul>
      </div>
      <div className={css.fourthRow}>
        <h4 className={css.featuresTitle}>Accessories and functionalities:</h4>
        <ul className={css.features}>
          {car.features?.map((feature, index) => (
            <li key={index} className={css.feature}>
              <CiCircleCheck size={16} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}