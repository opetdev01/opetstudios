'use client';

import { motion } from 'framer-motion';
import { Box } from 'lucide-react';
import { SolutionsCarousel } from '@/components/features/SolutionsCarousel';

interface HomeProjectsProps {
    projects: any[];
}

export function HomeProjects({ projects }: HomeProjectsProps) {
    const carouselItems = projects.slice(0, 6).map((p: any) => ({
        id: p.slug || p.id || p._id,
        title: p.title,
        description: p.description || '',
        image: p.image,
        href: `/work/${p.slug || p.id}`,
        category: p.category,
    }));

    return (
        <section className="relative py-28 bg-black overflow-hidden">
            <div className="container mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="px-6 md:px-12 mb-4"
                >
                    <div className="flex items-center gap-3 text-cyan-500 mb-4">
                        <Box className="w-5 h-5 animate-pulse" />
                        <span className="font-mono text-xs tracking-[0.3em] uppercase">Selected Work</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Projects</span>
                    </h2>
                </motion.div>

                {/* 3D Stacked Slider */}
                <SolutionsCarousel items={carouselItems} />
            </div>
        </section>
    );
}
