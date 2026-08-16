'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageLightboxProps {
    images: string[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export const ImageLightbox = ({
    images,
    currentIndex,
    isOpen,
    onClose,
    onNext,
    onPrev
}: ImageLightboxProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            // Save current overflow to restore it
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    {/* Background Overlay to close */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 cursor-zoom-out"
                        onClick={onClose}
                    />

                    {/* Toolbar */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-0 left-0 w-full p-6 flex justify-between items-center text-white/50 z-50 pointer-events-none"
                    >
                        <span className="font-mono text-sm tracking-widest pl-4">
                            IMAGE {currentIndex + 1} OF {images.length}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-4 hover:text-white transition-colors group pointer-events-auto bg-black/50 rounded-full md:bg-transparent md:rounded-none"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </motion.div>

                    {/* Left Navigation */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-cyan-400 transition-colors z-50 hover:scale-110 active:scale-95 bg-black/50 rounded-full md:bg-transparent md:rounded-none"
                        >
                            <ChevronLeft size={48} strokeWidth={1} />
                        </button>
                    )}

                    {/* Main Image */}
                    <div className="relative w-full h-full max-w-7xl max-h-[85vh] p-4 md:p-12 pointer-events-none flex justify-center items-center">
                        {images.map((src, idx) => {
                            const isActive = idx === currentIndex;
                            const isAdjacent = 
                                Math.abs(idx - currentIndex) === 1 || 
                                (currentIndex === 0 && idx === images.length - 1) || 
                                (currentIndex === images.length - 1 && idx === 0);

                            return (
                                <motion.div
                                    key={src}
                                    initial={false}
                                    animate={{
                                        opacity: isActive ? 1 : 0,
                                        scale: isActive ? 1 : 0.95,
                                        zIndex: isActive ? 10 : 0,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className={`absolute inset-4 md:inset-12 flex items-center justify-center ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                >
                                    <Image
                                        src={src}
                                        alt={`Gallery Image ${idx + 1}`}
                                        fill
                                        className="object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                                        quality={90}
                                        priority={isActive || isAdjacent}
                                        loading={isActive || isAdjacent ? "eager" : "lazy"}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Navigation */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-cyan-400 transition-colors z-10 hover:scale-110 active:scale-95 bg-black/50 rounded-full md:bg-transparent md:rounded-none"
                        >
                            <ChevronRight size={48} strokeWidth={1} />
                        </button>
                    )}
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
