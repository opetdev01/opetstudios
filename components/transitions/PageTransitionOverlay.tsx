'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTransitionStore } from '@/hooks/useTransitionStore';
import { AnimatePresence, motion } from 'framer-motion';

export function PageTransitionOverlay() {
    const { isTransitioning, endTransition } = useTransitionStore();
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState(pathname);

    useEffect(() => {
        if (pathname !== prevPathname) {
            setPrevPathname(pathname);
            const timer = setTimeout(() => {
                endTransition();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [pathname, prevPathname, endTransition]);

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] pointer-events-none bg-midnight/90 backdrop-blur-md flex flex-col items-center justify-center"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-4 text-cyan-400 font-mono tracking-[0.4em] text-sm uppercase">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            Transferring Data
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        </div>
                        <div className="w-48 h-[2px] bg-white/10 overflow-hidden relative rounded-full">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute inset-0"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
