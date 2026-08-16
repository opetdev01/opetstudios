'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AboutHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black/40">
            {/* Background Abstract Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,#00f3ff_10deg,transparent_20deg,transparent_360deg)] opacity-10"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,#2d6b70_20deg,transparent_40deg,transparent_360deg)] opacity-10"
                />
            </div>

            <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-7xl md:text-9xl font-bold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 mb-4">
                        WHO WE ARE
                    </h1>
                </motion.div>

                <div className="h-[2px] w-48 bg-electric mx-auto mb-8 shadow-[0_0_20px_#00f3ff]" />

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-cyan-400 font-mono tracking-widest uppercase"
                >
                    System Architects of the Unbuilt
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
            </motion.div>
        </section>
    );
}
