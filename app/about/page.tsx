import { AboutHero } from '@/components/sections/AboutHero';
import { AboutTimeline } from '@/components/sections/AboutTimeline';
import { AboutPhilosophy } from '@/components/sections/AboutPhilosophy';
import { AboutTeam } from '@/components/sections/AboutTeam';
import { client } from '@/lib/sanity';
import { teamQuery, philosophyQuery } from '@/lib/queries';

export const revalidate = 60;

export default async function AboutPage() {
    let teamMembers = [];
    let philosophyItems = [];
    try {
        teamMembers = await client.fetch(teamQuery);
        philosophyItems = await client.fetch(philosophyQuery);
    } catch (e) {
        console.error(e);
    }

    return (
        <main className="min-h-screen bg-midnight text-white overflow-x-hidden selection:bg-electric selection:text-black">
            <AboutHero />
            <AboutTimeline />
            <AboutPhilosophy items={philosophyItems} />
            <AboutTeam members={teamMembers} />
        </main>
    );
}
