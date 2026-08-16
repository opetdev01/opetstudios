'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Cpu } from 'lucide-react';

// Just importing an extra icon for the map link inside the component
interface HomeEcosystemsProps {
    services: any[];
}

export function HomeEcosystems({ services }: HomeEcosystemsProps) {
    return (
        <section className="relative py-28 px-6 md:px-12 bg-black overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="container mx-auto relative z-10 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-xs text-cyan-400 uppercase tracking-[0.5em] mb-4 block">Our Ecosystems</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                        Explore The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Ecosystems</span>
                    </h2>
                </motion.div>

                {/* Single Clickable Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/services" className="block relative group overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-500">

                        {/* Interactive Background Glows */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent group-hover:animate-shimmer pointer-events-none" style={{ transform: 'translateX(-100%)' }} />

                        <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">

                            {/* Visual/Icon Side */}
                            <div className="flex-shrink-0 relative hidden md:block">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-400/30 transition-colors duration-500" />
                                <div className="relative w-32 h-32 rounded-full border border-cyan-400/30 flex items-center justify-center bg-black/50 backdrop-blur-xl group-hover:scale-110 transition-transform duration-500 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                                    <Cpu size={48} strokeWidth={1} className="text-cyan-400" />
                                </div>
                            </div>

                            {/* Text Side - Map through services */}
                            <div className="flex-1 w-full flex flex-col gap-6">
                                <h3 className="text-3xl md:text-5xl font-bold font-display text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all duration-300">
                                    Opet Studio Tiers
                                </h3>

                                <div className="flex flex-col gap-4 mb-4">
                                    {services.slice(0, 3).map((service, idx) => (
                                        <div key={service.id || idx} className="flex flex-col justify-center pl-4 border-l-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">Tier {idx + 1}</span>
                                                <h4 className="text-xl font-bold text-white">{(service.title || '').replace('OPET ', '')}</h4>
                                            </div>
                                            <p className="text-sm font-light text-gray-400 mt-1 line-clamp-2 md:line-clamp-1">
                                                {service.subtitle}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="inline-flex items-center gap-4 text-cyan-400 font-mono tracking-widest uppercase text-sm border-b border-cyan-400/30 pb-2 group-hover:border-cyan-400 transition-colors">
                                    <span>Discover The Tiers</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>

                        {/* Decorative HUD Elements */}
                        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 group-hover:animate-pulse" />
                        <div className="absolute bottom-6 left-6 w-12 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-cyan-500/50 transition-all duration-500" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
