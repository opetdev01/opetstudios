'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TimelineSection {
    title: string;
    text: string;
    cta: { label: string; href: string };
    image: string;
}

const sections: TimelineSection[] = [
    {
        title: 'Our Story',
        text: "Founded in Cairo, Opet Studio was built on one mission: to revolutionize how real estate is sold through cutting-edge interactive technology. From our earliest projects, we have grown into a trusted partner for developers across the Middle East and beyond — delivering immersive 3D experiences, interactive maps, and virtual showrooms that close deals faster.",
        cta: { label: 'See Our Projects', href: '/work' },
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2400&auto=format&fit=crop',
    },
    {
        title: 'What We Deliver',
        text: 'Opet gives developers, brokers, and agencies a single platform to align teams and accelerate presales. Every project is presented with the same clarity and credibility, so buyers see a premium story that builds trust from the first meeting. From interactive web apps to full-scale VR experiences, we cover the entire sales technology stack.',
        cta: { label: 'Explore Our Ecosystems', href: '/services' },
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2400&auto=format&fit=crop',
    },
    {
        title: 'Who We Serve',
        text: 'We partner with visionary real-estate developers to simplify complex portfolios, transforming technical content into interactive presentations that engage investors, partners, and stakeholders. Whether it\'s a luxury branded residence or a massive mixed-use masterplan, our technology scales to match the ambition.',
        cta: { label: 'Book a Demo', href: '#contact' },
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop',
    },
];

export function AboutTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Timeline line grows as user scrolls
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section ref={containerRef} className="relative py-24 md:py-40 overflow-hidden">
            {/* Central vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-white/10 hidden md:block" />
            <motion.div
                style={{ height: lineHeight }}
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] bg-gradient-to-b from-cyan-500 to-cyan-500/0 hidden md:block z-10"
            />

            <div className="container mx-auto px-6 relative z-20">
                {sections.map((section, index) => {
                    const isReversed = index % 2 !== 0;

                    return (
                        <div
                            key={section.title}
                            className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-32 last:mb-0 ${isReversed ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Text Side */}
                            <motion.div
                                initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                                className="flex-1 max-w-lg"
                            >
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{section.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">{section.text}</p>
                                <Link
                                    href={section.cta.href}
                                    className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] transition-all duration-300"
                                >
                                    {section.cta.label}
                                </Link>
                            </motion.div>

                            {/* Timeline Dot (center, only visible on md+) */}
                            <div className="hidden md:flex items-center justify-center relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(0,243,255,0.6)] z-20"
                                />
                            </div>

                            {/* Image Side */}
                            <motion.div
                                initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                                className="flex-1 max-w-lg"
                            >
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                                    <Image
                                        src={section.image}
                                        alt={section.title}
                                        fill
                                        className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                    {/* Overlay shimmer */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
