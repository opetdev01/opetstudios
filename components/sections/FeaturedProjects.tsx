'use client';

import { ProjectCard } from '@/components/ui/ProjectCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface SubProject {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string;
    slug?: string;
}

interface FeaturedProjectsProps {
    projects: SubProject[];
}

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
    // Only take top 4 projects
    const displayProjects = projects?.slice(0, 4) || [];

    return (
        <section className="py-24 px-6 md:px-12 bg-midnight">
            <div className="max-w-[1920px] mx-auto">
                <div className="flex justify-between items-baseline mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold uppercase tracking-tight"
                    >
                        Selected Works
                    </motion.h2>
                    <Link href="/work">
                        <MagneticButton className="hidden md:flex">View Operations</MagneticButton>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {displayProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProjectCard
                                id={project.slug || project.id}
                                title={project.title}
                                category={project.category}
                                image={project.image}
                                year={project.year}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center md:hidden">
                    <Link href="/work">
                        <MagneticButton>View Operations</MagneticButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};
