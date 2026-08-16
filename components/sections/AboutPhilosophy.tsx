'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export interface PhilosophyItem {
    _id?: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

const fallbackPhilosophyItems: PhilosophyItem[] = [
    {
        title: "EMPOWERING CREATORS",
        description: "Translating concepts into compelling visual stories that resonate with audiences and elevate the perception of the built environment.",
        icon: "Zap",
        color: "text-yellow-400"
    },
    {
        title: "ARCHITECTURAL STORYTELLING",
        description: "Merging the precision of architecture with the emotive power of visual art to create narratives, not just images.",
        icon: "Eye",
        color: "text-cyan-400"
    },
    {
        title: "DIGITAL CRAFTSMANSHIP",
        description: "Going beyond capable rendering to craft profound narratives through expert digital artistry and technical rigor.",
        icon: "Cpu",
        color: "text-red-400"
    }
];

export function AboutPhilosophy({ items }: { items?: PhilosophyItem[] }) {
    const displayItems = items && items.length > 0 ? items : fallbackPhilosophyItems;

    return (
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        OUR <span className="text-electric">CODE</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        The core principles that drive our simulation engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayItems.map((item, index) => {
                        // Dynamically resolve icon, fallback to Zap if missing/invalid
                        const IconComponent = (Icons as any)[item.icon] || Icons.Zap;
                        return (
                            <motion.div
                                key={item._id || index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="group relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-2xl hover:bg-gradient-to-b hover:from-electric hover:to-transparent transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-electric/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative h-full bg-black p-8 rounded-xl border border-white/5 group-hover:border-electric/50 transition-colors">
                                    <div className={`mb-6 p-4 rounded-full bg-white/5 w-fit ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent size={32} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-electric transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">
                                        {item.description}
                                    </p>

                                    {/* Decoration */}
                                    <div className="absolute bottom-4 right-4 text-white/5 font-mono text-4xl font-bold select-none">
                                        0{index + 1}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
