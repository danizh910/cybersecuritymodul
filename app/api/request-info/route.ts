import { NextRequest, NextResponse } from 'next/server';
import { getServerRequestInfo } from '@/lib/server-info';

export async function GET(req: NextRequest) {
  return NextResponse.json(getServerRequestInfo(req));
}
