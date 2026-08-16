'use client';

import { motion } from 'framer-motion';

export function HomeBrief() {
    return (
        <section className="relative py-32 px-6 md:px-12 bg-black overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />

            <div className="container mx-auto max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center"
                >
                    {/* Label */}
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: '0.2em' }}
                        whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="inline-block font-mono text-xs text-cyan-400 uppercase tracking-[0.5em] mb-8"
                    >
                        Who We Are
                    </motion.span>

                    {/* Main Statement */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-8"
                    >
                        We Build{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            Interactive Sales
                        </span>{' '}
                        Experiences for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            Real Estate
                        </span>
                    </motion.h2>

                    {/* Sub-text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light"
                    >
                        Opet Studios is an interactive technology company specialized in Real Estate.
                        We transform the property sales journey through high-end 3D visualization,
                        immersive VR/AR experiences, and cutting-edge interactive web platforms.
                    </motion.p>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '120px' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-[2px] bg-gradient-to-r from-cyan-500 to-transparent mx-auto mt-12"
                    />
                </motion.div>
            </div>
        </section>
    );
}
