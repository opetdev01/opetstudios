'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
    pauseOnHover?: boolean;
}

export function Marquee({
    children,
    speed = 20,
    direction = 'left',
    className = '',
    pauseOnHover = true,
}: MarqueeProps) {
    const isLeft = direction === 'left';

    return (
        <div className={`relative flex w-full overflow-hidden ${className}`}>
            <motion.div
                className={`flex whitespace-nowrap ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                animate={{
                    x: isLeft ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {/* Render children twice to create the infinite loop effect */}
                <div className="flex shrink-0">
                    {children}
                </div>
                <div className="flex shrink-0">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
