'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Maximize2, X, MousePointer2 } from 'lucide-react';

interface CarouselItem {
    id: string;
    title: string;
    description?: string;
    image: string;
    href: string; // Used for external maps
    url?: string; // Used for 360 tour iframes
    category?: string;
    isTour?: boolean;
}

interface SolutionsCarouselProps {
    items: CarouselItem[];
}

export function SolutionsCarousel({ items }: SolutionsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [isTourActive, setIsTourActive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNext = useCallback(() => {
        setIsTourActive(false);
        setDirection('next');
        setActiveIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const handlePrev = useCallback(() => {
        setIsTourActive(false);
        setDirection('prev');
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    if (!items || items.length === 0) return null;

    const getStackedItems = () => {
        const result = [];
        for (let i = 0; i < Math.min(items.length, 5); i++) {
            result.push({
                ...items[(activeIndex + i) % items.length],
                stackIndex: i,
            });
        }
        return result;
    };

    const stackedItems = getStackedItems();
    const active = stackedItems[0];
    const deck = stackedItems.slice(1);

    const handleLaunch = useCallback(() => {
        if (active.isTour) {
            setIsTourActive(true);
        } else if (active.href && active.href !== '#') {
            window.open(active.href, '_blank', 'noopener,noreferrer');
        }
    }, [active]);

    return (
        <div className="w-full py-8 px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">

                {/* === LEFT: Active Large Slide === */}
                <div className="relative flex-shrink-0 w-full lg:w-[58%]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            ref={containerRef}
                            initial={{ opacity: 0, x: direction === 'next' ? 80 : -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction === 'next' ? -80 : 80 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10"
                        >
                            {active.isTour && isTourActive ? (
                                <div className="absolute inset-0 z-50 bg-black">
                                    <iframe
                                        className="w-full h-full"
                                        src={active.url}
                                        title={active.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                        allowFullScreen
                                    />
                                    <div className="absolute top-4 right-4 z-[60] flex items-center gap-2">
                                        <button 
                                            onClick={toggleFullscreen}
                                            className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all border border-white/10 group/btn"
                                            title="Toggle Fullscreen"
                                        >
                                            <Maximize2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                        <button 
                                            onClick={() => setIsTourActive(false)}
                                            className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all border border-white/10 group/btn"
                                            title="Exit Tour"
                                        >
                                            <X className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="absolute inset-0 cursor-pointer z-0" onClick={handleLaunch} title="Launch Project">
                                        <Image
                                        src={active.image}
                                        alt={active.title}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        priority
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                    </div>

                                    {/* Tour Interaction Badge */}
                                    {active.isTour && (
                                        <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-cyan-500/80 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                            <div className="flex items-center gap-2">
                                                <MousePointer2 className="w-3 h-3 text-white" />
                                                <p className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Interactive 360 Experience</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Prev Arrow */}
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-cyan-500/60 transition-all group"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
                                    </button>

                                    {/* Next Arrow */}
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-colors group"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* === Content Below Active Slide === */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${active.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="mt-6"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                {active.title}
                            </h3>
                            {active.category && (
                                <p className="text-cyan-400 font-bold text-sm md:text-base mb-3 font-mono">
                                    {active.category}
                                </p>
                            )}
                            {active.description && (
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-5 max-w-lg line-clamp-2">
                                    {active.description}
                                </p>
                            )}
                            <div className="flex items-center gap-3">
                                {active.isTour ? (
                                    <button
                                        onClick={() => setIsTourActive(true)}
                                        className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-colors shadow-[0_4px_15px_rgba(6,182,212,0.3)]"
                                    >
                                        Explore Tour
                                    </button>
                                ) : (
                                    <Link
                                        href={active.href}
                                        target="_blank"
                                        className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-colors shadow-[0_4px_15px_rgba(6,182,212,0.3)]"
                                    >
                                        Launch Solution
                                    </Link>
                                )}
                                <Link
                                    href="/work"
                                    className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                                >
                                    View All Work
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* === RIGHT: Stacked "Deck" of cards === */}
                <div className="hidden lg:flex flex-1 items-center justify-start relative" style={{ height: '320px' }}>
                    {deck.map((item, i) => {
                        const offset = i * 40;
                        const scale = 1 - i * 0.08;
                        const opacity = 1 - i * 0.25;
                        const zIndex = deck.length - i;

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute rounded-2xl overflow-hidden bg-neutral-800 shadow-xl cursor-pointer border border-white/5"
                                style={{
                                    width: '260px',
                                    aspectRatio: '4/3',
                                    zIndex,
                                    transformOrigin: 'left center',
                                }}
                                animate={{
                                    left: offset,
                                    opacity,
                                    scale,
                                }}
                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                onClick={handleNext}
                                whileHover={{ scale: scale * 1.04 }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ backgroundColor: `rgba(0,0,0,${0.15 + i * 0.2})` }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="mt-8 flex items-center gap-2">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setIsTourActive(false);
                            setDirection(i > activeIndex ? 'next' : 'prev');
                            setActiveIndex(i);
                        }}
                        className={`transition-all rounded-full ${i === activeIndex
                            ? 'w-8 h-2 bg-cyan-500'
                            : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
                <span className="ml-auto text-white/30 font-mono text-xs">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
}
