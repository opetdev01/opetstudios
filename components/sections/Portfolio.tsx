"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// TODO: Replace with actual project data from Opet Studio portfolio
const projects = [
    {
        displayTitle: "MODERN\nRESIDENCE",
        title: "Modern Residence",
        category: "Exterior Visualization",
        image: "https://images.unsplash.com/photo-1600596542815-225c551816a8?q=80&w=2574&auto=format&fit=crop",
    },
    {
        displayTitle: "URBAN\nCOMPLEX",
        title: "Urban Complex",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2670&auto=format&fit=crop",
    },
    {
        displayTitle: "DESERT\nRETREAT",
        title: "Desert Retreat",
        category: "Concept Art",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2671&auto=format&fit=crop",
    },
    {
        displayTitle: "INTERIOR\nDESIGN",
        title: "Interior Design",
        category: "Interior Visualization",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop",
    },
];

export function Portfolio() {
    return (
        <section className="py-24 bg-neutral-900 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">Selected Works</span>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">FEATURED PROJECTS</h2>
                    </div>
                    <Link href="/work" className="hidden md:inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition-all duration-300">
                        VIEW ALL PROJECTS
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-800"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <span className="text-primary text-xs font-bold tracking-wider uppercase mb-2 block opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-white/70">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold text-white uppercase leading-tight whitespace-pre-line">
                                    {project.displayTitle}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/work" className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition-all duration-300">
                        VIEW ALL PROJECTS
                    </Link>
                </div>
            </div>
        </section>
    );
}
