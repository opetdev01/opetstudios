'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Map, MapPin, Scan, ExternalLink } from 'lucide-react';
import { MapItem } from '@/lib/data';

interface MapCardProps {
    map: MapItem;
    index: number;
}

export function MapCard({ map: rawMap, index }: MapCardProps) {
    const map = rawMap as any; // Cast to avoid strict MapItem type errors
    return (
        <Link href={`/maps/${map.slug || map._id || map.id || ''}`} className="group block relative h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-full bg-black/60 border border-white/10 group-hover:border-electric/50 rounded-lg overflow-hidden transition-colors duration-500 flex flex-col"
            >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                    {map.thumbnail ? (
                        <Image
                            src={map.thumbnail}
                            alt={map.title || "Map Image"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-900 border border-white/5 flex flex-col items-center justify-center text-white/20">
                            <span className="font-mono text-xs mb-2">[NO_VISUAL_DATA]</span>
                            <Map size={24} className="opacity-50" />
                        </div>
                    )}

                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />

                    {/* HUD Elements */}
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-electric/30 p-2 rounded text-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Scan size={16} />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-electric transition-colors">
                            {map.title}
                        </h3>
                        <MapPin size={16} className="text-gray-500 group-hover:text-electric transition-colors mt-1" />
                    </div>

                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2">
                        {map.description}
                    </p>

                    {/* Footer Data */}
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-gray-500">
                        <span className="group-hover:text-electric/80 transition-colors">
                            GRID_REF: {String(map.slug || map._id || map.id || 'UNKNOWN').toUpperCase()}
                        </span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>INITIALIZE</span>
                            <ExternalLink size={12} />
                        </div>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-electric opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-electric opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-electric opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-electric opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
        </Link>
    );
}
