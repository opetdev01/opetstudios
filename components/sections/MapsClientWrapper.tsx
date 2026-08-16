'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Monitor } from 'lucide-react';
import { SolutionsCarousel } from '@/components/features/SolutionsCarousel';

export function MapsClientWrapper({ maps }: { maps: any[] }) {
    const carouselItems = maps ? maps.map(map => ({
        id: map.slug || map._id || map.id || Math.random().toString(),
        title: map.title as string,
        description: map.description as string || "Interactive 3D Map",
        image: map.thumbnail || "https://images.unsplash.com/photo-1542451313056-b7c8e6266459?q=80&w=2400&auto=format&fit=crop",
        href: `/web-solutions/${map.slug || map._id || map.id || ''}`,
        category: "Interactive Map"
    })) : [];
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
                        A cloud-based, centralized dashboard accessible from anywhere.
                    </h3>

                    <div className="space-y-12 pl-4 md:pl-8 border-l border-cyan-500/50">
                        <div className="relative pl-8 group">
                            <div className="absolute left-[-37px] top-2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                            <h4 className="text-white font-bold text-2xl mb-4">Web Sales App</h4>
                            <p className="text-gray-300 text-lg leading-relaxed font-light">
                                A cloud-based, centralized dashboard accessible from anywhere.
                            </p>
                        </div>

                        <div className="relative pl-8 group">
                            <div className="absolute left-[-37px] top-2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                            <h4 className="text-white font-bold text-2xl mb-4">Features</h4>
                            <p className="text-gray-300 text-lg leading-relaxed font-light">
                                Interactive 3D Master Plans, real-time unit filtering (by price, beds, availability), location/context mapping, and direct CRM (e.g., Salesforce) integration to capture and process leads instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Work Grid -> Replaced by Interactive Maps */}
            <div className="container mx-auto px-6 relative z-10 w-full max-w-full overflow-hidden">
                <div className="mb-12 flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-white">
                        INTERACTIVE <span className="text-cyan-400">MAPS</span>
                    </h3>
                    <div className="h-[1px] flex-grow ml-8 bg-white/10" />
                </div>

                {carouselItems.length === 0 ? (
                    <div className="h-64 border border-dashed border-white/10 flex items-center justify-center text-white/20 font-mono">
                        [NO_ACTIVE_MAPS_FOUND]
                    </div>
                ) : (
                    <div className="-mx-6">
                        <SolutionsCarousel items={carouselItems} />
                    </div>
                )}
            </div>
        </main>
    );
}
