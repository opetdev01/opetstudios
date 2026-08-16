import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, HardDrive } from 'lucide-react';
import { SolutionsCarousel } from '@/components/features/SolutionsCarousel';
import { FeatureBento } from '@/components/features/FeatureBento';
import { projects } from '@/lib/data';

export const metadata = {
    title: 'Offline Experience - Opet Studio',
    description: 'Local desktop apps & high-end viewers.',
};

export default function OfflineExperiencePage() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden selection:bg-cyan-500/30">
            {/* Top Navigation */}
            <div className="container mx-auto px-6 mb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors font-mono text-sm uppercase tracking-widest">
                    <ArrowLeft size={16} /> Back to Studio
                </Link>
            </div>

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <Image
                    src="/bg_offline_experience.png"
                    alt="Offline Experience Background"
                    fill
                    className="object-cover mix-blend-screen"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-6 relative mb-24 z-10">
                <div className="absolute top-0 right-6 md:right-12 w-16 h-16 md:w-24 md:h-24 text-white/20">
                    <HardDrive className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                </div>

                <div className="relative z-10 mb-16">
                    <h2 className="text-6xl md:text-8xl font-thin font-display tracking-wide text-transparent stroke-white" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>
                        OFFLINE
                    </h2>
                    <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-cyan-500 to-transparent mt-8 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                </div>

                <div className="max-w-4xl">
                    <h3 className="text-2xl md:text-3xl text-white mb-12">
                        Local desktop apps & high-end viewers.
                    </h3>

                    <div className="mt-20">
                        <FeatureBento features={[
                            {
                                id: 'o1',
                                title: 'Balcony Views',
                                description: 'Showcase panoramic balcony and window views that sell the real estate lifestyle buyers want.',
                                image: '/offline_feat_1.png'
                            },
                            {
                                id: 'o2',
                                title: 'Dynamic Real-Time Lighting',
                                description: 'Present your project from sunrise to sunset with interactive lighting that brings every angle to life.',
                                image: '/offline_feat_2.png'
                            },
                            {
                                id: 'o3',
                                title: 'Immersive 3D Walkthroughs',
                                description: 'Directly linked with your company\'s CRM system, ensuring efficient lead management & follow-up.',
                                image: '/offline_feat_3.png'
                            },
                            {
                                id: 'o4',
                                title: 'Masterplan Exploration',
                                description: 'Reveal the full community with phase-by-phase masterplan navigation.',
                                image: '/offline_feat_4.png'
                            },
                            {
                                id: 'o5',
                                title: 'Neighborhood Highlights',
                                description: 'Demonstrate location value with interactive points of interest for schools, parks, and amenities.',
                                image: '/offline_feat_5.png'
                            },
                            {
                                id: 'o6',
                                title: 'Connected Living',
                                description: 'Visualize travel times and transit access so buyers see true connectivity and convenience.',
                                image: '/offline_feat_6.png'
                            },
                            {
                                id: 'o7',
                                title: 'Portfolio Search',
                                description: 'Accelerate presales with cross-project unit search, filters, & instant availability updates.',
                                image: '/offline_feat_7.png'
                            },
                            {
                                id: 'o8',
                                title: 'Future Growth Map',
                                description: 'Build investor trust with zoning overlays that highlight long-term growth and development.',
                                image: '/offline_feat_8.png'
                            }
                        ]} />
                    </div>
                </div>
            </div>

            {/* Related Work Grid */}
            <div className="container mx-auto px-6 relative z-10 w-full max-w-full overflow-hidden">
                <div className="mb-12 flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-white">
                        PROJECT <span className="text-cyan-400">GALLERY</span>
                    </h3>
                    <div className="h-[1px] flex-grow ml-8 bg-white/10" />
                </div>

                <div className="-mx-6">
                    <SolutionsCarousel items={
                        projects.slice(3, 8).map(p => ({
                            id: p.id,
                            title: p.title,
                            description: p.description,
                            image: p.image,
                            href: `/work/${p.id}`,
                            category: p.category
                        }))
                    } />
                </div>
            </div>
        </main>
    );
}
