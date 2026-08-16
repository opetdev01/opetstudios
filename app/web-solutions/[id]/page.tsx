import { maps as mockMaps } from '@/lib/data';
import { client } from '@/lib/sanity';
import { mapsQuery } from '@/lib/queries';
import { MapDetailClientWrapper } from '@/components/sections/MapDetailClientWrapper';

export const dynamic = 'force-dynamic';

export default async function MapDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let sanityMaps = [];
    try {
        sanityMaps = await client.fetch(mapsQuery);
    } catch (e) {
        console.error(e);
    }

    const fetchedMaps = sanityMaps?.length > 0 ? [...sanityMaps, ...mockMaps] : mockMaps;
    const map = fetchedMaps.find((m: any) => (m.slug || m._id || m.id) === id);

    return <MapDetailClientWrapper map={map} />;
}
