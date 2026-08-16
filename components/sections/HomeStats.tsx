'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatItemProps {
    value: number;
    suffix: string;
    label: string;
    description: string;
    delay: number;
}

function AnimatedCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const timeout = setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const interval = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setDisplayValue(value);
                    clearInterval(interval);
                } else {
                    setDisplayValue(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(interval);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [isInView, value, delay]);

    const formatted = value >= 1000
        ? displayValue.toLocaleString()
        : displayValue.toString();

    return <span ref={ref}>{formatted}{suffix}</span>;
}

const stats: StatItemProps[] = [
    {
        value: 90000,
        suffix: '+',
        label: 'Units Sold',
        description: 'Driving presales momentum for real estate teams',
        delay: 0,
    },
    {
        value: 200,
        suffix: '+',
        label: 'Projects Delivered',
        description: 'Trusted by developers and marketers worldwide',
        delay: 0.2,
    },
    {
        value: 15,
        suffix: '+',
        label: 'Countries',
        description: 'A global track record of delivering interactive sales experiences',
        delay: 0.4,
    },
];

export function HomeStats() {
    return (
        <section className="relative py-28 px-6 md:px-12 bg-black overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.04)_0%,transparent_60%)]" />

            <div className="container mx-auto relative z-10 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="relative p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all duration-500 group"
                        >
                            {/* Left accent bar */}
                            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-display">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={stat.delay} />
                            </div>
                            <div className="text-cyan-400 font-bold text-base mb-2">
                                {stat.label}
                            </div>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
