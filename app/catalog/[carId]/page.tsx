import CarDetailsPageClient from '@/components/CarDetails/CarDetailsClient/CarDetailsClient';
import { getCarById } from '@/lib/api/clientApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export const metadata: Metadata = {
  title: 'Page with detail information about picked car | App RentalCar',
  description:
    'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
  openGraph: {
    title: 'Page with detail information about picked car | App RentalCar',
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
    title: 'Page with detail information about picked car | App RentalCar',
    description:
      'The app provides a searchable car catalog, detailed car pages, filter controls, and booking requests for rental vehicles.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778943276/HeroBanner@2x_os6bbf.png',
    ],
  },
};

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const queryClient = new QueryClient();
  const { carId } = await params;
  queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsPageClient carId={carId} />
    </HydrationBoundary>
  );
}