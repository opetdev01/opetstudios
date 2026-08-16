'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box } from 'lucide-react';
import { SubProject } from '@/components/sections/FeaturedProjects'; // Assuming type relies here, or we can redefine it

interface HorizontalScrollerProps {
    projects: SubProject[];
}

export const HorizontalScroller = ({ projects }: HorizontalScrollerProps) => {
    const targetRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the entire sticky section
    const { scrollYProgress } = useScroll({
        target: targetRef,
        // Start tracking when top of the section hits the top of the viewport
        // End when the bottom of the section hits the bottom of the viewport
        offset: ["start start", "end end"]
    });

    // Take top 4 projects for the scroller
    const displayProjects = projects?.slice(0, 4) || [];

    // Transform vertical scroll progress (0 to 1) into horizontal translation (-x%)
    // The exact percentage depends on how many cards there are. 
    // We want the last card to end up on the screen, but not scroll completely off.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]); // Adjusted based on a 4-card layout

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black">
            {/* The sticky container that holds the horizontal strip */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[linear-gradient(rgba(18,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]">

                {/* Section Header (Fixed while scrolling horizontally) */}
                <div className="absolute top-24 md:top-32 left-6 md:left-12 z-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 text-cyan-500 mb-4">
                            <Box className="w-5 h-5 animate-pulse" />
                            <span className="font-mono text-sm tracking-[0.3em] uppercase">Global_Archives</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter mix-blend-difference">
                            Selected
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 block">
                                Operations
                            </span>
                        </h2>
                    </motion.div>
                </div>

                {/* The horizontally moving strip of cards */}
                <motion.div
                    style={{ x }}
                    className="flex gap-8 px-6 md:px-12 mt-24 md:mt-32 w-[max-content]"
                >
                    {displayProjects.map((project, index) => {
                        return <Card key={project.id || index} project={project} index={index} />;
                    })}

                    {/* Final 'View All' Call to action panel */}
                    <Link href="/work" className="group h-[50vh] min-h-[400px] w-[85vw] md:w-[60vw] max-w-[800px] shrink-0 border border-white/10 hover:border-cyan-500/50 bg-neutral-900 rounded-lg flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500">
                            <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="font-display text-2xl md:text-4xl text-white font-bold tracking-widest uppercase mb-2">Access Grid</span>
                        <span className="font-mono text-xs text-white/40 tracking-[0.2em] group-hover:text-cyan-400 transition-colors uppercase">View All Operations</span>

                        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ project, index }: { project: SubProject; index: number }) => {
    return (
        <Link href={`/work/${project.slug || project.id}`} className="group relative h-[50vh] min-h-[400px] w-[85vw] md:w-[60vw] max-w-[800px] shrink-0 overflow-hidden rounded-lg bg-neutral-900 border border-white/10">
            {/* Image internal parallax simulation (hover based for extra effect) */}
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110 pointer-events-none">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                />
            </div>

            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            {/* Content overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase border border-cyan-400/30 px-3 py-1 rounded-sm bg-black/50 backdrop-blur-sm">
                        {project.category}
                    </span>
                    <span className="text-xs font-mono text-white/50">{project.year}</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-white uppercase font-display tracking-tight drop-shadow-2xl">
                    {project.title}
                </h3>
            </div>

            {/* Tech accents */}
            <div className="absolute top-6 right-6 font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase group-hover:text-cyan-400/50 transition-colors pointer-events-none">
                IDX_0{index + 1}
            </div>
        </Link>
    );
};
