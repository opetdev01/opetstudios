'use client';

import { CalendarDays } from 'lucide-react';
import { useUIStore } from '@/lib/store';

interface BookDemoButtonProps {
    serviceTitle: string;
}

export function BookDemoButton({ serviceTitle }: BookDemoButtonProps) {
    const { openContact } = useUIStore();

    const handleBookDemo = () => {
        openContact(`I would like to book a demo for the ${serviceTitle} bundle.`);
    };

    return (
        <button
            onClick={handleBookDemo}
            className="group flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-display font-bold uppercase tracking-widest px-8 md:px-12 py-4 md:py-5 rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] mt-8 md:mt-12 w-fit relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <CalendarDays size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Initialize Demo</span>
        </button>
    );
}
