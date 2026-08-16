import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Monitor } from 'lucide-react';
import { SolutionsCarousel } from '@/components/features/SolutionsCarousel';
import { FeatureBento } from '@/components/features/FeatureBento';
import { ToursShowcase } from '@/components/features/ToursShowcase';
import { maps, tours } from '@/lib/data';

export const metadata = {
    title: 'Online Sales - Opet Studio',
    description: 'Interactive web-based sales apps & real-time 3D configurators.',
};

export default function OnlineSalesPage() {
    // Combine maps and tours into a single gallery
    const carouselItems = [
        ...maps.map(m => ({
            id: m.id,
            title: m.title,
            description: m.description,
            image: m.thumbnail,
            href: m.url, // Launch solution link
            category: 'Interactive Map',
            isTour: false
        })),
        ...tours.map(t => ({
            id: t.id,
            title: t.title,
            description: t.description,
            image: t.thumbnail,
            href: '#', // Not used for tours as they open in-page
            url: t.url,
            category: '360° Interior Experience',
            isTour: true
        }))
    ];

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
                    src="/bg_online_sales.png"
                    alt="Online Sales Background"
                    fill
                    className="object-cover mix-blend-screen"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-6 relative mb-24 z-10">
                <div className="absolute top-0 right-6 md:right-12 w-16 h-16 md:w-24 md:h-24 text-white/20">
                    <Monitor className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                </div>

                <div className="relative z-10 mb-16">
                    <h2 className="text-6xl md:text-8xl font-thin font-display tracking-wide text-transparent stroke-white" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>
                        ONLINE SALES
                    </h2>
                    <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-cyan-500 to-transparent mt-8 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                </div>

                <div className="max-w-4xl">
                    <h3 className="text-2xl md:text-3xl text-white mb-12">
                        Interactive web-based sales apps & real-time 3D configurators.
                    </h3>

                    <div className="mt-20">
                        <FeatureBento features={[
                            {
                                id: 'f1',
                                title: 'Interactive 3D Master Plans',
                                description: 'Real-time masterplan viewers and unit selectors powered by WebGL, giving prospects a bird\'s-eye command of the development from any device.',
                                image: '/online_feat_1.png'
                            },
                            {
                                id: 'f2',
                                title: 'Real-Time Filtering',
                                description: 'Instantly filter available units by price, beds, availability, and orientation to match buyer criteria in seconds.',
                                image: '/online_feat_2.png'
                            },
                            {
                                id: 'f3',
                                title: 'Location & Context Mapping',
                                description: 'Understand the neighborhood, nearby amenities, and precise building location in full 3D context.',
                                image: '/online_feat_3.png'
                            },
                            {
                                id: 'f4',
                                title: 'Direct CRM Integration',
                                description: 'Seamlessly connect with Salesforce, HubSpot, and others to capture and process leads instantly from the web application.',
                                image: '/online_feat_4.png'
                            },
                            {
                                id: 'f5',
                                title: '360 Tours: Interior / Exterior',
                                description: 'Immersive 360° virtual tours that let prospects explore every room and outdoor space from any device, creating an unforgettable remote viewing experience.',
                                image: '/online_feat_5.png'
                            },
                            {
                                id: 'f6',
                                title: 'Client Direct Contact',
                                description: 'Enable direct communication between prospects and sales agents through integrated chat, video calls, and scheduling — right from within the platform.',
                                image: '/online_feat_6.png'
                            }
                        ]} />
                    </div>
                </div>
            </div>

            {/* Project Gallery Carousel */}
            <div className="container mx-auto px-6 relative z-10 w-full max-w-full overflow-hidden">
                <div className="mb-12 flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                        PROJECT <span className="text-cyan-400">GALLERY</span>
                    </h3>
                    <div className="h-[1px] flex-grow ml-8 bg-white/10" />
                </div>

                <div className="-mx-6">
                    <SolutionsCarousel items={carouselItems} />
                </div>
            </div>
        </main>
    );
}
