import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { mapsQuery } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await client.fetch(mapsQuery);
        return NextResponse.json({ success: true, count: data.length, data });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message || String(e) });
    }
}
