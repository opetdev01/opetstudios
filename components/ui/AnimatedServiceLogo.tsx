'use client';

import { motion } from 'framer-motion';

interface AnimatedServiceLogoProps {
    serviceId: string;
}

export function AnimatedServiceLogo({ serviceId }: AnimatedServiceLogoProps) {
    // In a real scenario, this would load the 3D model or specific image asset.
    // For now, we create a specialized animated "Construct" for each.

    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mt-4 mb-4 pointer-events-none">

            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />

            {/* Central Animated Element */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
            >
                {/* Rings / Structure based on Service */}
                {serviceId === 'lens' && (
                    <div className="w-full h-full rounded-full border-4 border-cyan-500/30 flex items-center justify-center p-12">
                        <div className="w-full h-full rounded-full border-2 border-dashed border-cyan-400/50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-cyan-500 font-mono text-xs tracking-[0.5em] animate-pulse">LENS_OPTICS</span>
                        </div>
                    </div>
                )}

                {serviceId === 'dive' && (
                    <div className="w-full h-full border-4 border-cyan-500/30 rounded-[3rem] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-transparent" />
                        <span className="text-cyan-500 font-mono text-xs tracking-[0.5em] animate-pulse">VR_CORE</span>
                    </div>
                )}

                {serviceId === 'touch' && (
                    <div className="w-full h-full rounded-full border-[1px] border-cyan-500/20 flex items-center justify-center relative">
                        <div className="absolute w-[120%] h-[1px] bg-cyan-500/50 rotate-45" />
                        <div className="absolute w-[120%] h-[1px] bg-cyan-500/50 -rotate-45" />
                        <div className="w-2/3 h-2/3 rounded-full border-4 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)]" />
                        <span className="absolute bottom-0 text-cyan-500 font-mono text-xs tracking-[0.5em] animate-pulse">DT_LINK</span>
                    </div>
                )}
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        initial={{ x: "50%", y: "50%", opacity: 0 }}
                        animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
