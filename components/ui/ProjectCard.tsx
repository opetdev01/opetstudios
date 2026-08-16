'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectCardProps {
    id: string;
    title: string;
    category: string;
    image: string;
    year: string;
}

export const ProjectCard = ({ id, title, category, image, year }: ProjectCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/work/${id}`} className="block w-full">
            <motion.div
                className="group relative w-full overflow-hidden rounded-lg bg-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full w-full"
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>
                    {/* Glitch/Refraction Effect on Hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2, x: [-2, 2, -1, 0] }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-red-500 mix-blend-screen pointer-events-none"
                                    transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2, x: [2, -2, 1, 0] }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-blue-500 mix-blend-screen pointer-events-none"
                                    transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", delay: 0.1 }}
                                />
                            </>
                        )}
                    </AnimatePresence>
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-widest text-white/70 mb-2">{category} — {year}</p>
                            <h3 className="text-2xl font-sans font-medium">{title}</h3>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
