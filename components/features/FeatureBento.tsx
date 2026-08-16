'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

export interface FeatureItem {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface FeatureBentoProps {
    features: FeatureItem[];
}

export function FeatureBento({ features }: FeatureBentoProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
                {features.map((feature, index) => {
                    const isSelected = selectedId === feature.id;

                    // If a card is selected, hide the others
                    if (selectedId && !isSelected) return null;

                    return (
                        <motion.div
                            layoutId={`card-${feature.id}`}
                            key={feature.id}
                            className={`group cursor-pointer rounded-2xl overflow-hidden relative border ${isSelected
                                    ? 'border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.3)] col-span-1 sm:col-span-2 lg:col-span-4 h-[500px] z-20 bg-black/80 backdrop-blur-md'
                                    : 'border-white/10 hover:border-cyan-500/50 h-[300px] bg-neutral-900 z-10'
                                } transition-colors duration-500`}
                            onClick={() => !isSelected && setSelectedId(feature.id)}
                        >
                            {/* Background Image */}
                            <motion.div
                                layoutId={`image-${feature.id}`}
                                className={`absolute inset-0 ${isSelected ? 'opacity-30' : 'opacity-60 group-hover:opacity-100 group-hover:scale-105'} transition-all duration-700`}
                            >
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? 'from-black via-black/80 to-transparent' : 'from-black via-black/40 to-transparent'}`} />
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                layoutId={`content-${feature.id}`}
                                className={`relative h-full flex flex-col ${isSelected ? 'p-10 md:p-16 justify-end md:justify-center' : 'p-6 justify-end'}`}
                            >
                                <motion.h4
                                    layoutId={`title-${feature.id}`}
                                    className={`${isSelected ? 'text-3xl md:text-5xl mb-6' : 'text-xl'} font-display font-bold text-white group-hover:text-cyan-400 transition-colors`}
                                >
                                    {feature.title}
                                </motion.h4>

                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <p className="text-gray-300 text-lg md:text-2xl font-light leading-relaxed max-w-3xl border-l-2 border-cyan-500 pl-6">
                                                {feature.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Close Button */}
                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedId(null);
                                            }}
                                            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 hover:text-cyan-400"
                                        >
                                            <X size={24} />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Backdrop for selected card */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        className="fixed inset-0 bg-black/80 z-10 backdrop-blur-sm cursor-pointer"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
