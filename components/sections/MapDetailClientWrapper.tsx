'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Maximize, Minus, Plus, RefreshCw, Share2 } from 'lucide-react';
import { useContentProtection } from '@/hooks/useContentProtection';

export function MapDetailClientWrapper({ map }: { map: any }) {
    useContentProtection();

    if (!map) {
        return (
            <div className="min-h-screen bg-midnight flex items-center justify-center text-white font-mono select-none">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 text-red-500">[ERROR_404]</h1>
                    <p className="text-gray-400 mb-8">SECTOR NOT FOUND</p>
                    <Link href="/web-solutions" className="text-electric hover:underline tracking-widest uppercase text-sm">
                        Return to Grid
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="w-full h-screen bg-black relative overflow-hidden flex flex-col pt-24 md:pt-28 select-none">

            {/* Header Bar */}
            <header className="h-16 border-b border-white/10 bg-black/90 backdrop-blur flex items-center justify-between px-6 z-30">
                <div className="flex items-center gap-6">
                    <Link href="/web-solutions" className="text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div>
                        <h1 className="text-white font-bold tracking-widest uppercase text-sm">{map.title}</h1>
                        <span className="text-electric font-mono text-xs">LIVE_FEED :: {(map.slug || map.id).toUpperCase()}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                    <div className="hidden md:flex items-center gap-2 text-xs font-mono mr-4">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        CONNECTION_STABLE
                    </div>
                    <button className="hover:text-electric transition-colors"><Share2 size={18} /></button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-grow relative flex">

                {/* Sidebar Overlay (Desktop) */}
                <div className="hidden md:block w-80 h-full border-r border-white/10 bg-black/80 backdrop-blur-sm relative z-20 p-6">
                    <div className="mb-8">
                        <span className="text-electric font-mono text-xs mb-2 block">// DESCRIPTION</span>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {map.description}
                        </p>
                    </div>

                    <div className="mb-8">
                        <span className="text-electric font-mono text-xs mb-2 block">// METADATA</span>
                        <div className="space-y-2 text-xs text-gray-400 font-mono">
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>LATITUDE</span>
                                <span>30.0444° N</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>LONGITUDE</span>
                                <span>31.2357° E</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>ZOOM_LEVEL</span>
                                <span>MACRO</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="border border-white/10 bg-white/5 p-4 rounded text-center">
                            <p className="text-xs text-gray-500 mb-2">RENDER_STATUS</p>
                            <div className="w-full bg-white/10 h-1 rounded overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    className="h-full bg-electric"
                                />
                            </div>
                            <p className="text-electric text-xs mt-2 font-mono">COMPLETE</p>
                        </div>
                    </div>
                </div>

                {/* Map Viewport */}
                <div className="flex-grow relative bg-void">
                    {/* Loading Overlay */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="absolute inset-0 z-10 bg-black flex items-center justify-center pointer-events-none"
                    >
                        <div className="text-electric font-mono animate-pulse">
                            INITIALIZING_VIEWPORT...
                        </div>
                    </motion.div>

                    <iframe
                        src={map.url}
                        className="w-full h-full border-none grayscale-[0.2] contrast-125 hover:grayscale-0 transition-all duration-700"
                        title={map.title}
                    />

                    {/* Floating Controls */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
                        <button className="bg-black/80 text-white p-3 rounded hover:bg-electric hover:text-black transition-colors border border-white/10">
                            <Plus size={20} />
                        </button>
                        <button className="bg-black/80 text-white p-3 rounded hover:bg-electric hover:text-black transition-colors border border-white/10">
                            <Minus size={20} />
                        </button>
                        <button className="bg-black/80 text-white p-3 rounded hover:bg-electric hover:text-black transition-colors border border-white/10">
                            <RefreshCw size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
