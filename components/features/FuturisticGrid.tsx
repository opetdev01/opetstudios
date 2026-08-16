'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const placeholders = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2010&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524230659092-07f99a75c013?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496556156029-9200aa006c74?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1465620803444-23961ec9d242?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2068&auto=format&fit=crop',
];

export function FuturisticGrid() {
    return (
        <div className="w-full min-h-screen p-4 md:p-8 lg:p-12 pt-32">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
                {placeholders.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group break-inside-avoid overflow-hidden rounded-sm"
                    >
                        <div className="relative aspect-[3/4] md:aspect-auto">
                            <Image
                                src={src}
                                alt={`Gallery Image ${index + 1}`}
                                width={800}
                                height={1000}
                                className="w-full h-auto object-cover transition-all duration-700 ease-in-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            {/* Futuristic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute bottom-4 left-4 font-mono text-xs text-accent">
                                    <span className="block opacity-50">IMG_0{index + 1}</span>
                                    <span className="block tracking-widest">SYSTEM_VIEW</span>
                                </div>
                            </div>

                            {/* Scanline Effect */}
                            <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-overlay" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
