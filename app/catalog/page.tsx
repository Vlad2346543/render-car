import CatalogPageClient, {
  Filters,
} from '@/components/CatalogPage/CatalogList/CatalogList';
import { getAllCars } from '@/lib/api/clientApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface CatalogPageProps {
  params: Promise<{ filters: Filters }>;
}

export const metadata: Metadata = {
  title: 'Catalog of the | App RentalCar',
  description:
    'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
  openGraph: {
    title: 'Catalog of the | App RentalCar',
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
    title: 'Catalog of the | App RentalCar',
    description:
      'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778943276/HeroBanner@2x_os6bbf.jpg',
    ],
  },
};

export default async function CatalogPage({ params }: CatalogPageProps) {
  const PER_PAGE = 12;
  const { filters } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
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
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageClient />
    </HydrationBoundary>
  );
}