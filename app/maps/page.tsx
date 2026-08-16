import { maps as mockMaps } from '@/lib/data';
import { client } from '@/lib/sanity';
import { mapsQuery } from '@/lib/queries';
import { MapsClientWrapper } from '@/components/sections/MapsClientWrapper';

export const revalidate = 60;

export default async function MapsPage() {
    let sanityMaps = [];
    try {
        sanityMaps = await client.fetch(mapsQuery);
    } catch (e) {
        console.error(e);
    }

    const fetchedMaps = sanityMaps?.length > 0 ? sanityMaps : mockMaps;

    return <MapsClientWrapper maps={fetchedMaps} />;
}
