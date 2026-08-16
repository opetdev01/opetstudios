'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Ensure utility exists or remove if not needed for simple case

interface StoryStep {
    title: string;
    description: string;
    image: string;
}

interface ScrollytellingProps {
    timeline: StoryStep[];
}

export const Scrollytelling = ({ timeline }: ScrollytellingProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative w-full">
            {timeline.map((step, index) => (
                <StorySection key={index} step={step} index={index} total={timeline.length} progress={scrollYProgress} />
            ))}
        </div>
    );
};

const StorySection = ({ step, index, total, progress }: { step: StoryStep; index: number; total: number; progress: any }) => {
    // Determine visibility range for this step based on index
    // e.g., if total=2, step 0 is visible 0-0.5, step 1 is visible 0.5-1
    const rangeStart = index / total;
    const rangeEnd = (index + 1) / total;

    // Very simple opacity transition for the text/image overlap if needed
    // But typically scrollytelling has the image sticky. Let's adjust the architecture.
    // Actually, for a robust list, we often sticky the image and scroll the text.

    return (
        <div className="min-h-screen flex items-center justify-center relative border-t border-white/5 last:border-b-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-[1920px] mx-auto px-6 md:px-12 h-full py-24">

                {/* Text Side (Scrolls) */}
                <div className="flex flex-col justify-center order-2 md:order-1">
                    <span className="text-xs font-mono text-gray-500 mb-4 block">PHASE 0{index + 1}</span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 uppercase">{step.title}</h3>
                    <p className="text-lg text-gray-300 max-w-md leading-relaxed">{step.description}</p>
                </div>

                {/* Image Side (Visual) */}
                <div className="relative aspect-[4/3] w-full md:aspect-square md:h-[60vh] order-1 md:order-2 self-center">
                    <div className="relative w-full h-full overflow-hidden rounded-lg bg-neutral-900 border border-white/10">
                        <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}
