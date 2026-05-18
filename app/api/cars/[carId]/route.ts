import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { getServerApi } from '@/lib/api/serverApi';


export async function GET(request: NextRequest) {
  try {
    const brand = request.nextUrl.searchParams.get('brand');

    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 10);
    const priceParam = request.nextUrl.searchParams.get('price');
    const price = priceParam ? Number(priceParam) : undefined;
    const minMileageParam = request.nextUrl.searchParams.get('minMileage');
    const minMileage = minMileageParam ? Number(minMileageParam) : undefined;
    const maxMileageParam = request.nextUrl.searchParams.get('maxMileage');
    const maxMileage = minMileageParam ? Number(maxMileageParam) : undefined;

    const api = await getServerApi();

    const res = await api.get('/cars', {
      params: {
        page,
        perPage,
        brand,
        price,
        minMileage,
        maxMileage,
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}