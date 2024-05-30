// app/[locale]/api/route.ts

import { NextRequest, NextResponse } from 'next/server';
import data from '@/flare-2.json';

/**
 * This endpoint returns the content of flare-2.json
 * @allowedMethods GET
 * @returns body containing the flare-2.json data
 */
export async function GET(req: NextRequest) {
  return NextResponse.json(data, { status: 200 });
}