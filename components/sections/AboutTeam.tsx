'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
    _id?: string;
    name: string;
    role: string;
    imageUrl?: string;
    color?: string; // Retain color scheme for aesthetic
}

const fallbackTeam: TeamMember[] = [
    { name: "Unit 01", role: "Creative Director", color: "bg-cyan-500" },
    { name: "Unit 02", role: "Technical Lead", color: "bg-purple-500" },
    { name: "Unit 03", role: "Art Director", color: "bg-pink-500" },
    { name: "Unit 04", role: "Operations Output", color: "bg-emerald-500" },
    { name: "Unit 05", role: "3D Generalist", color: "bg-blue-500" },
    { name: "Unit 06", role: "Lighting Specialist", color: "bg-red-500" },
    { name: "Unit 07", role: "Unreal Engineer", color: "bg-yellow-500" },
    { name: "Unit 08", role: "Compositor", color: "bg-cyan-500" },
]

export function AboutTeam({ members }: { members?: TeamMember[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const defaultColors = ["bg-cyan-500", "bg-purple-500", "bg-pink-500", "bg-emerald-500", "bg-blue-500", "bg-red-500", "bg-yellow-500"];
    const displayTeam = members && members.length > 0
        ? members.map((m, i) => ({ ...m, color: m.color || defaultColors[i % defaultColors.length] }))
        : fallbackTeam;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.75 : 300; // Match approximate card width
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-32 relative overflow-hidden bg-white/2">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            THE <span className="text-electric">CREATIVE TEAM</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            The minds behind the simulation. Specialized units dedicated to visual excellence.
                        </p>
                    </div>
                </div>

                <div className="relative group mb-32 pb-8">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:opacity-100 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-4 md:gap-8 px-4 md:px-12 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {displayTeam.map((member, i) => (
                            <motion.div
                                key={member._id || i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-[3/4] min-w-[75vw] sm:min-w-[300px] shrink-0 snap-center bg-neutral-900 border border-white/10 overflow-hidden"
                            >
                                {/* Abstract Avatar or Real Image */}
                                {member.imageUrl ? (
                                    <Image src={member.imageUrl} alt={member.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity hover:mix-blend-normal" />
                                ) : (
                                    <>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${member.color}/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className={`w-24 h-24 rounded-full ${member.color} blur-[50px] animate-pulse`} />
                                        </div>
                                    </>
                                )}

                                <div className={`absolute inset-0 bg-gradient-to-br ${member.color}/10 to-transparent pointer-events-none`} />

                                {/* Info Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-bold text-lg">{member.name}</h3>
                                    <p className="text-electric font-mono text-xs uppercase tracking-widest">{member.role}</p>
                                </div>

                                {/* Tech Lines */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:opacity-100 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>

                {/* Locations */}
                <div className="border border-white/10 rounded-3xl p-8 md:p-16 bg-black/40 backdrop-blur-sm">
                    <h3 className="text-2xl font-mono text-white mb-12 flex items-center gap-4">
                        <span className="w-4 h-4 rounded-full bg-electric animate-pulse" />
                        ACTIVE NODES
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="group flex flex-col justify-center">
                            <h4 className="text-4xl font-bold text-white mb-2 group-hover:text-electric transition-colors">CAIRO / HQ</h4>
                            <p className="text-gray-500 font-mono">9 Bosta Street, Korba</p>
                            <div className="h-[1px] w-full bg-white/10 mt-8 group-hover:bg-electric/50 transition-colors" />
                        </div>
                        <div className="group h-[300px] lg:h-[400px] w-full relative rounded-2xl overflow-hidden border border-white/10">
                            <iframe
                                src="https://maps.google.com/maps?q=9%20Bosta%20Street,%20Korba,%20Cairo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
