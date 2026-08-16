'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Monitor, HardDrive, Glasses } from 'lucide-react';

const solutions = [
    { title: 'ARCHVIZ', href: '/archviz', icon: Camera, description: 'Architectural Visualization' },
    { title: 'ONLINE SALES', href: '/web-solutions', icon: Monitor, description: 'Interactive Web Apps' },
    { title: 'OFFLINE EXPERIENCE', href: '/offline-experience', icon: HardDrive, description: 'Desktop Presentations' },
    { title: 'AR & VR', href: '/ar-vr', icon: Glasses, description: 'Immersive Reality' },
];

export function HomeSolutions() {
    return (
        <section className="relative z-20 my-16 md:my-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {solutions.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    href={item.href}
                                    className="group relative flex flex-col items-center justify-center text-center p-6 md:p-10 border border-white/10 bg-black/40 backdrop-blur-sm hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.08)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none" />

                                    {/* Top accent line */}
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />

                                    <h3 className="text-white font-display font-bold text-sm md:text-lg tracking-widest uppercase mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                        {item.title}
                                    </h3>

                                    <p className="text-white/40 text-xs md:text-sm font-light tracking-wide">
                                        {item.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
