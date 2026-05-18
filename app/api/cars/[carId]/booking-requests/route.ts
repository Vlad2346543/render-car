import { getServerApi } from '@/lib/api/serverApi';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function POST( request: NextRequest, { params }: { params: Promise<{ carId: string }> }) {
  try {
    const api = await getServerApi();
    const { carId } = await params;
    const body = await request.json();

    const res = await api.post(`/cars/${carId}/booking-requests`, body);
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