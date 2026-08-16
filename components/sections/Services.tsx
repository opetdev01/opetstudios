'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Glasses, Monitor, HardDrive, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        id: 'archviz',
        title: 'Archviz',
        description: 'High-end imagery and cinematic video production.',
        icon: Camera,
        content: [
            { label: 'Hero Still Renders', text: 'High-end, hyper-realistic, emotionally resonant 3D imagery (interiors, exteriors, master plans).' },
            { label: 'Cinematic Video', text: 'Sweeping, narrative-driven 3D animation videos that capture the mood and lifestyle of the development.' }
        ],
        hasRelatedWorks: true
    },
    {
        id: 'ar-vr',
        title: 'AR & VR',
        description: 'Immersive experiences with scale and volume.',
        icon: Glasses,
        content: [
            { label: 'Virtual Reality (VR)', text: 'Fully immersive walkthroughs of unbuilt spaces allowing buyers to feel the scale and volume.' },
            { label: 'Augmented Reality (AR)', text: 'Overlaying digital models onto the physical world, perfect for on-site sales or remote presentations.' }
        ],
        hasRelatedWorks: true
    },
    {
        id: 'online-sales',
        title: 'Online Sales',
        description: 'Digital twins & centralized sales platforms.',
        icon: Monitor,
        content: [
            { label: 'Web Sales App', text: 'A cloud-based, centralized dashboard accessible from anywhere.' },
            { label: 'Features', text: 'Interactive 3D Master Plans, real-time unit filtering (by price, beds, availability), location/context mapping, and direct CRM (e.g., Salesforce) integration to capture and process leads instantly.' }
        ],
        hasRelatedWorks: false,
        hasMapsLink: true
    },
    {
        id: 'offline',
        title: 'Offline Experience',
        description: 'Local desktop apps & high-end viewers.',
        icon: HardDrive,
        content: [
            { label: 'Showroom Hardware/Software', text: 'Physical interactive displays (touchscreens, video walls, interactive tables) installed in sales centers.' },
            { label: 'Features', text: 'High-impact, lag-free presentation tools designed for sales agents to command the room and close deals in person.' }
        ],
        hasRelatedWorks: true
    }
];

export function Services() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mb-4 font-display uppercase">Our Expertise</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We merge the precision of architecture with the emotive power of visual art.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {services.map((service, index) => {
                        const isExpanded = expandedId === service.id;
                        return (
                            <motion.div
                                layout
                                key={service.id}
                                className={`rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex flex-col transition-colors cursor-pointer ${isExpanded ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)] col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-2' : 'hover:border-cyan-400/50 hover:bg-white/[0.07]'}`}
                                onClick={() => !isExpanded && setExpandedId(service.id)}
                            >
                                <motion.div layout className="p-8 flex flex-col h-full relative z-10">
                                    {isExpanded && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                    <motion.div layout className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white text-cyan-400 shrink-0">
                                        <service.icon className="w-7 h-7" />
                                    </motion.div>
                                    <motion.h3 layout className="text-2xl font-bold text-white mb-3">
                                        {service.title}
                                    </motion.h3>

                                    {!isExpanded && (
                                        <motion.p layout className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                            {service.description}
                                        </motion.p>
                                    )}

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-6 border-t border-white/10 pt-6 flex flex-col lg:flex-row gap-12"
                                            >
                                                {/* Details Side */}
                                                <div className="flex-1 space-y-8 pl-4 border-l border-cyan-500/50">
                                                    {service.content.map((item, i) => (
                                                        <div key={i} className="relative">
                                                            <div className="absolute left-[-21px] top-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                                            <h4 className="text-white font-bold text-lg mb-2">{item.label}</h4>
                                                            <p className="text-gray-300 leading-relaxed font-light">{item.text}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Interactive / Placeholder Side */}
                                                <div className="lg:w-1/3 shrink-0 flex flex-col justify-end bg-black/20 rounded-xl p-6 border border-white/5">
                                                    <div className="mb-4">
                                                        <span className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest block mb-2">Interactive Module</span>
                                                        <div className="h-[1px] w-full bg-gradient-to-r from-cyan-500/50 to-transparent mb-6" />
                                                    </div>

                                                    {service.hasMapsLink ? (
                                                        <Link href="/web-solutions" className="group/btn block" onClick={(e) => e.stopPropagation()}>
                                                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-400/50 transition-colors relative overflow-hidden h-32 flex flex-col items-center justify-center">
                                                                <div className="absolute inset-0 bg-[url('/map-bg.png')] bg-cover bg-center opacity-30 group-hover/btn:opacity-60 transition-opacity grayscale group-hover/btn:grayscale-0" />
                                                                <div className="absolute inset-0 bg-black/60 group-hover/btn:bg-black/40 transition-colors" />
                                                                <Map className="w-8 h-8 text-cyan-400 mb-2 relative z-10" />
                                                                <span className="relative z-10 font-bold tracking-widest text-sm uppercase flex items-center gap-2 group-hover/btn:text-cyan-400 transition-colors">Open Interactive Maps</span>
                                                            </div>
                                                        </Link>
                                                    ) : (
                                                        <div className="grid grid-cols-2 gap-3 h-full">
                                                            {[1, 2].map((i) => (
                                                                <div key={i} className="bg-neutral-900 border border-white/5 border-dashed rounded-lg flex flex-col items-center justify-center p-4 min-h-[120px] group/ph hover:border-cyan-500/30 hover:bg-white/5 transition-colors">
                                                                    <div className="w-8 h-8 rounded-full bg-white/5 mb-3 flex items-center justify-center group-hover/ph:bg-cyan-500/20 group-hover/ph:text-cyan-400 transition-colors">
                                                                        <ArrowUpRight size={14} />
                                                                    </div>
                                                                    <span className="text-[10px] uppercase font-mono text-gray-500 text-center leading-tight">Gallery<br />Placeholder</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Hover indication */}
                                {!isExpanded && (
                                    <div className="mt-auto px-8 pb-8">
                                        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-cyan-400/50 group-hover:text-cyan-400 transition-colors font-mono text-xs uppercase">
                                            <span>Explore Inside</span>
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Just importing an extra icon for the map link inside the component
function Map(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" x2="9" y1="3" y2="18" />
            <line x1="15" x2="15" y1="6" y2="21" />
        </svg>
    )
}
