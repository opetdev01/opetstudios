'use client';

import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard utils

export function IntroOverlay() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Check session storage to see if intro has been played
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

        if (!hasSeenIntro) {
            setIsVisible(true);
            // Prevent scrolling while intro is visible
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenIntro', 'true');
        document.body.style.overflow = ''; // Restore scrolling
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                >
                    <video
                        ref={videoRef}
                        src="/intro-video.mp4"
                        autoPlay
                        muted={isMuted}
                        playsInline
                        onEnded={handleDismiss}
                        className="w-full h-full object-cover"
                    />

                    {/* Controls Container */}
                    <div className="absolute bottom-8 right-8 flex gap-4 items-center z-10">
                        {/* Mute Toggle */}
                        <button
                            onClick={toggleMute}
                            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        {/* Skip Button */}
                        <button
                            onClick={handleDismiss}
                            className="px-6 py-3 rounded-full bg-white text-black font-medium tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                        >
                            SKIP INTRO
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
