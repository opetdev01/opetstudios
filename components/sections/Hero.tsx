'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MoveDown } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import { Magnetic } from '@/components/ui/Magnetic';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Parallax Video Background */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 w-full h-full"
            >
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Texture Overlay */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/hero-loop.mp4" type="video/mp4" />
                    {/* Fallback for now if video missing, usually we'd have a poster */}
                </video>
            </motion.div>


            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <MoveDown className="text-white/50 w-6 h-6" />
                </motion.div>
            </motion.div>
        </div>
    );
};
