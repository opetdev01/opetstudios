'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

export function ProjectGallery({ gallery, title }: { gallery: string[], title: string }) {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setViewerOpen(true);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    return (
        <section className="py-24 border-t border-white/10 bg-neutral-950">
            <div className="container mx-auto px-6">
                <h2 className="text-xl font-mono uppercase tracking-widest mb-12 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-white/30"></span>
                    Visual Archive
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gallery.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => openLightbox(idx)}
                            className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-zoom-in group"
                        >
                            <Image
                                src={img}
                                alt={`${title} view ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 text-white font-mono tracking-widest uppercase text-sm mix-blend-difference">Enlarge</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ImageLightbox
                images={gallery}
                currentIndex={currentIndex}
                isOpen={viewerOpen}
                onClose={() => setViewerOpen(false)}
                onNext={nextImage}
                onPrev={prevImage}
            />
        </section>
    );
}
