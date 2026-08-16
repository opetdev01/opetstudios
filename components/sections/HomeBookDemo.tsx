'use client';

import { motion } from 'framer-motion';
import { useUIStore } from '@/lib/store';

export function HomeBookDemo() {
    const openContact = useUIStore((state) => state.openContact);

    return (
        <section className="relative py-32 px-6 md:px-12 bg-black overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_60%)]" />

            <div className="container mx-auto relative z-10 max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="font-mono text-xs text-cyan-400 uppercase tracking-[0.5em] mb-6 block">Get Started</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                        Ready to Transform Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            Sales Experience
                        </span>?
                    </h2>
                    <p className="text-gray-400 text-lg font-light mb-10 max-w-xl mx-auto">
                        Book a personalized demo and see how Opet can elevate your real estate sales to the next level.
                    </p>

                    <motion.button
                        onClick={() => openContact()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-base hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-shadow duration-500"
                    >
                        Book a Demo
                    </motion.button>

                    {/* Decorative */}
                    <div className="mt-12 flex justify-center gap-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                className="w-2 h-2 rounded-full bg-cyan-500"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
