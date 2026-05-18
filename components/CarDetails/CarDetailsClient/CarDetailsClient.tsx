'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import css from './CarDetailsClient.module.css';
import { createOrder, getCarById } from '@/lib/api/clientApi';
import Image from 'next/image';
import Loader from '@/components/shared/Loader/Loader';
import CarDetailsDescription from '../CarDescription/CarDescription';
import { Car } from '@/app/types/car';
import BookingForm from '../BookingForm/BookingForm';
import toast from 'react-hot-toast';
import { Order } from '@/app/types/order';
import { useEffect } from 'react';

interface CarDetailsClientProps {
  carId: string;
}

export default function CarDetailsClient({
  carId,
}: CarDetailsClientProps) {
  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
    refetchOnMount: false,
  });
  const createBookingRequest = useMutation({
    mutationFn: ({ carId, order }: { carId: string; order: Order }) =>
      createOrder(carId, order),

    onSuccess: () => {
      toast.success('Thank You! Your booking request was sucessfully created');
    },

    onError: () => {
      toast.error('Sorry something went wrong. Please try again');
    },
  });

  const handleCreateRequest = (body: Order) => {
    createBookingRequest.mutate({
      carId,
      order: body,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error('Sorry something went wrong. Please try again');
    }
  }, [isError]);

  if (isError) {
    throw new Error('Failed to load car details');
  }

  if (isLoading || !car) {
    return <Loader />;
  }
  return (
    
<section className={css.detailsSection}>
  <div className="container">
    {!isLoading && !isError && (
      <div className={css.detailsWrapper}>
        {car?.img && (
          <Image
            width={640}
            height={512}
            src={car.img}
            alt={car.description || 'Car image'}
            className={css.detailsImage}
            priority
          />
        )}
        <div className={css.detailsDescriptionContent}>
          <CarDetailsDescription car={car} />
        </div>
        <div className={css.detailsBooking}>
          <BookingForm
            onSubmit={handleCreateRequest}
            isPending={createBookingRequest.isPending}
          />
        </div>
      </div>
    )}
  </div>
</section>
  ); 
}