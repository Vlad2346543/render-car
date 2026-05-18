'use client';
import css from './CatalogList.module.css';
import FiltersForm from '../FiltresForm/FiltresForm';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllCars } from '@/lib/api/clientApi';
import Loader from '@/components/shared/Loader/Loader';
import CarsList from '../CarsList/CarsList';
import toast from 'react-hot-toast';

export interface Filters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}
export default function CatalogPageClient() {
  const PER_PAGE = 12;

  const [filters, setFilters] = useState<Filters>({});

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam = 1 }) =>
      getAllCars(
        filters.brand,
        filters.price,
        filters.minMileage,
        filters.maxMileage,
        PER_PAGE,
        pageParam
      ),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
    refetchOnMount: false,
  });
  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  const isEmpty = !isLoading && !isError && cars.length === 0;

  const handleFiltersSubmit = (values: Filters) => {
    setFilters({
      brand: values.brand || undefined,
      price: values.price || undefined,
      minMileage: values.minMileage || undefined,
      maxMileage: values.maxMileage || undefined,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error('Sorry something went wrong. Please try again');
    }
  }, [isError]);

  if (isError) {
    throw new Error('Failed to load cars');
  }

  return (
    <section className={css.catalog}>
      <div className="container">
        <FiltersForm onSubmitFilters={handleFiltersSubmit} />
        {isLoading && <Loader />}

        {!isError && !isLoading && <CarsList cars={cars} />}

        {isEmpty && (
          <div className={css.empty}>
            <p className={css.emptyMessage}>
              Sorry! There are no cars found matching your filters. Please try
              something else!
            </p>
            <button
              type="button"
              onClick={() => {
                setFilters({});
              }}
              className={css.emptyLink}
            >
              Show all available cars
            </button>
          </div>
        )}
        {!isError && hasNextPage && (
          <button
            className={css.loadmoreBtn}
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        )}
      </div>
    </section>
  );
}