'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

export function ArchvizGallery({ images }: { images: string[] }) {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setViewerOpen(true);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            {/* Masonry-style Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-2 space-y-2">
                {images.map((imgUrl, index) => (
                    <div 
                        key={index} 
                        onClick={() => openLightbox(index)}
                        className="break-inside-avoid relative rounded-none overflow-hidden group cursor-zoom-in bg-neutral-900 border border-white/10"
                    >
                        <Image
                            src={imgUrl}
                            alt={`Archviz Example ${index + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                            <span className="text-white font-mono uppercase tracking-widest text-sm border border-white/20 px-4 py-2 rounded-full mix-blend-difference">Enlarge</span>
                        </div>
                    </div>
                ))}
            </div>

            <ImageLightbox
                images={images}
                currentIndex={currentIndex}
                isOpen={viewerOpen}
                onClose={() => setViewerOpen(false)}
                onNext={nextImage}
                onPrev={prevImage}
            />
        </>
    );
}
