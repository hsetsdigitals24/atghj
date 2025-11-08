import { NextRequest, NextResponse } from 'next/server';
import { fetchCurrentIssue } from '@/app/api/journal/fetch';

export async function GET(request: NextRequest) {
  try {
    const data = await fetchCurrentIssue();
    console.log({"data": data });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in journal data route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch journal data' },
      { status: 500 }
    );
  }
}