'use client';

import { motion } from 'framer-motion';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { useState, useRef } from 'react';

interface TourItem {
    url: string;
    title?: string;
    thumbnail?: string;
}

interface ToursShowcaseProps {
    tours: TourItem[];
}

export function ToursShowcase({ tours }: ToursShowcaseProps) {
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggleFullscreen = (index: number) => {
        const element = containerRefs.current[index];
        if (!element) return;

        if (!document.fullscreenElement) {
            element.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                        360 INTERACTIVE <span className="text-cyan-400">TOURS</span>
                    </h3>
                    <div className="h-[1px] flex-grow ml-8 bg-white/10" />
                </div>

                <div className={`grid grid-cols-1 ${tours.length === 2 ? 'md:grid-cols-2' : tours.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-8`}>
                    {tours.map((tour, index) => {
                        const isPlaying = playingIndex === index;

                        return (
                            <motion.div 
                                key={index}
                                ref={el => { containerRefs.current[index] = el; }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group"
                            >
                                {!isPlaying ? (
                                    <div 
                                        className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
                                        onClick={() => setPlayingIndex(index)}
                                    >
                                        {/* Overlay Background */}
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                        
                                        {/* Thumbnail Overlay */}
                                        {tour.thumbnail && (
                                            <img 
                                                src={tour.thumbnail} 
                                                alt={tour.title || "360 Tour"}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        )}

                                        {/* Interaction Badge */}
                                        <div className="absolute top-4 left-4 z-30 px-3 py-1 bg-cyan-500/80 backdrop-blur-md rounded-full border border-white/10">
                                            <p className="text-[10px] font-mono font-bold text-white uppercase tracking-tighter">Interactive Experience</p>
                                        </div>

                                        {/* Play Button */}
                                        <div className="relative z-30">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-500 bg-black/20 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                                <Maximize2 className="text-white group-hover:text-cyan-400 w-6 h-6 md:w-8 md:h-8" />
                                            </div>
                                            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        <p className="relative z-30 mt-6 text-white font-mono text-[10px] uppercase tracking-[0.3em] font-medium drop-shadow-lg">Explore Experience</p>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 w-full h-full bg-black">
                                        <iframe
                                            className="w-full h-full"
                                            src={tour.url}
                                            title={tour.title || "360 Tour"}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                            allowFullScreen
                                        />
                                        
                                        {/* Controls Overlay */}
                                        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                                            <button 
                                                onClick={() => toggleFullscreen(index)}
                                                className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all border border-white/10 group/btn"
                                                title="Toggle Fullscreen"
                                            >
                                                <Maximize2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                            <button 
                                                onClick={() => setPlayingIndex(null)}
                                                className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all border border-white/10 group/btn"
                                                title="Close Tour"
                                            >
                                                <X className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
