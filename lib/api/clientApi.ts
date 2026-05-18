import { Car } from '@/app/types/car';
import { clientApi } from './api';
import { Order } from '@/app/types/order';
import { Filter } from '@/app/types/filter';

interface AxiosCarResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export const getAllCars = async (
  brand?: string,
  price?: number,
  minMileage?: number,
  maxMileage?: number,
  perPage = 12,
  page = 1
): Promise<AxiosCarResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (brand) params.brand = brand;
  if (price !== undefined) params.price = price;
  if (minMileage !== undefined) params.minMileage = minMileage;
  if (maxMileage !== undefined) params.maxMileage = maxMileage;

  const { data } = await clientApi.get<AxiosCarResponse>(
    '/cars',
    {
      params,
    }
  );

  return data;
};

export const getCarById = async (
  carId: string
): Promise<Car> => {
  const response = await clientApi.get('/cars');

  const car = response.data.cars.find(
    (item: Car) => item.id === carId
  );

  console.log(car);

  return car;
};


export const getAllFilters = async (): Promise<Filter> => {
  const { data } = await clientApi.get<Filter>(
    '/cars/filters'
  );

  return data;
};

export const createOrder = async (
  carId: string,
  order: Order
): Promise<Order> => {
  const { data } = await clientApi.post<Order>(
    `/cars/${carId}/booking-requests`,
    order
  );

  return data;
};