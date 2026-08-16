'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

interface VideoItem {
    url: string;
    title?: string;
    thumbnail?: string;
}

interface CinematicVideoProps {
    videos: VideoItem[];
}

export function CinematicVideo({ videos }: CinematicVideoProps) {
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    // Extract Embed URL
    const getEmbedUrl = (url: string) => {
        // YouTube
        const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const ytMatch = url.match(ytRegExp);
        if (ytMatch && ytMatch[2].length === 11) {
            return `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1&rel=0&modestbranding=1`;
        }

        // Google Drive
        if (url.includes('drive.google.com')) {
            const driveIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (driveIdMatch) {
                return `https://drive.google.com/file/d/${driveIdMatch[1]}/preview?autoplay=1`;
            }
        }

        return url;
    };

    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-white">
                        CINEMATIC <span className="text-cyan-400">PRODUCTION</span>
                    </h3>
                    <div className="h-[1px] flex-grow ml-8 bg-white/10" />
                </div>

                <div className={`grid grid-cols-1 ${videos.length === 2 ? 'md:grid-cols-2' : videos.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-8`}>
                    {videos.map((video, index) => {
                        const embedUrl = getEmbedUrl(video.url);
                        // For non-YouTube, we REQUIRE a custom thumbnail in the data
                        const ytIdMatch = video.url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
                        const ytId = (ytIdMatch && ytIdMatch[2].length === 11) ? ytIdMatch[2] : null;
                        
                        const isPlaying = playingIndex === index;

                        return (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl"
                            >
                                {!isPlaying ? (
                                    <div 
                                        className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer group"
                                        onClick={() => setPlayingIndex(index)}
                                    >
                                        {/* Overlay Background */}
                                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                                        
                                        {/* Thumbnail Overlay */}
                                        <img 
                                            src={video.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '')} 
                                            alt={video.title || "Cinematic Video"}
                                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                                        />

                                        {/* Play Button */}
                                        <div className="relative z-30">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-500">
                                                <Play className="text-white fill-white group-hover:text-cyan-400 group-hover:fill-cyan-400 w-6 h-6 md:w-8 md:h-8 translate-x-[2px]" />
                                            </div>
                                            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        <p className="relative z-30 mt-6 text-white/50 font-mono text-[10px] uppercase tracking-[0.3em] font-light">Play Production</p>
                                    </div>
                                ) : (
                                    <>
                                        {embedUrl.includes('youtube.com/embed') || embedUrl.includes('drive.google.com') ? (
                                            <iframe
                                                className="absolute inset-0 w-full h-full"
                                                src={embedUrl}
                                                title={video.title || "Cinematic Video"}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <video
                                                className="absolute inset-0 w-full h-full object-cover"
                                                src={embedUrl}
                                                autoPlay
                                                controls
                                                playsInline
                                            />
                                        )}
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

