"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-void text-accent flex flex-col">

            <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6">
                <div className="container mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
                        SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">GALLERY</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                        A curated collection of our most profound narratives and visual experiences.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-void border-t border-white/5">
                <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                    >
                        {projects.map((project, index) => (
                            <Link href={`/work/${project.id}`} key={project.id} className="block w-full">
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 50 },
                                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                                    }}
                                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-black border border-white/5 hover:border-cyan-500/50 transition-colors duration-500"
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none" />

                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <span className="text-cyan-400 text-xs font-bold tracking-wider uppercase mb-2 block opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white uppercase leading-tight whitespace-pre-line group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-colors duration-300">
                                            {project.displayTitle}
                                        </h3>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
