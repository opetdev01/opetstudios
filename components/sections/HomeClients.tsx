'use client';

import { motion } from 'framer-motion';
import { Marquee } from '@/components/ui/Marquee';
import Image from 'next/image';

const clients = [
    { name: 'Abrar', src: '/clients/abrar.PNG' },
    { name: 'Enza', src: '/clients/enza.PNG' },
    { name: 'Gedico', src: '/clients/gedico.PNG' },
    { name: 'NOS', src: '/clients/nos.PNG' },
    { name: 'Royal', src: '/clients/royal.PNG' },
    { name: 'Shobaily', src: '/clients/shobaily.PNG' },
];

export function HomeClients() {
    return (
        <section className="relative py-28 px-6 md:px-12 bg-black overflow-hidden">
            <div className="container mx-auto relative z-10 max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-xs text-cyan-400 uppercase tracking-[0.5em] mb-4 block">Our Partners</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                        Trusted by{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            Global Leaders
                        </span>
                    </h2>
                </motion.div>

                {/* Client Logo Marquee */}
                <div className="relative w-full overflow-hidden mt-12 py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-black after:to-transparent">
                    <Marquee speed={40} direction="left" pauseOnHover={false}>
                        <div className="flex gap-4 md:gap-8 px-4">
                            {clients.map((client, i) => (
                                <div
                                    key={client.name}
                                    className="relative flex items-center justify-center h-20 md:h-28 w-40 md:w-56 px-6 py-4 rounded-lg border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all duration-300 group cursor-default shadow-lg"
                                >
                                    <div className="relative w-full h-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                                        <Image
                                            src={client.src}
                                            alt={`${client.name} Logo`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>
            </div>
        </section>
    );
}
