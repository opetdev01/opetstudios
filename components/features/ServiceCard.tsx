'use client';

import { motion } from 'framer-motion';
import { Eye, Headset, Fingerprint } from 'lucide-react';
import { Service } from '@/lib/data';

interface ServiceCardProps {
    service: Service;
    index: number;
}

const icons = {
    lens: Eye,
    dive: Headset,
    touch: Fingerprint
};

export function ServiceCard({ service: rawService, index }: ServiceCardProps) {
    const service = rawService as any;
    const Icon = icons[service.icon as keyof typeof icons] || Eye;

    return (
        <div className="block w-full group">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative w-full border border-cyan-500/30 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col md:flex-row items-center md:items-stretch text-left transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)] hover:border-cyan-400 group-hover:scale-[1.01]"
            >
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Border Accent */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-0 left-0 h-[1px] bg-cyan-500"
                />

                {/* Left Side: Icon & Title Area */}
                <div className="flex flex-col items-center md:items-start justify-center p-8 md:p-12 md:w-1/3 md:border-r border-white/10 relative z-10 text-center md:text-left">
                    {/* Icon */}
                    <div className="mb-8 relative">
                        <div className="w-20 h-20 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-500 bg-black">
                            <Icon size={40} strokeWidth={1.5} />
                        </div>
                        {/* Floating dot */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)]"
                        />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tighter text-white mb-2 group-hover:text-cyan-50 transition-colors">
                            {(service.title || '').replace('OPET ', '')}
                        </h2>
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/80">
                            OPET SYSTEM
                        </span>
                    </div>

                    {/* Subtitle */}
                    <p className="text-gray-400 font-light text-lg leading-relaxed mt-4">
                        {service.subtitle}
                    </p>
                    
                    {/* Bottom Detail */}
                    <div className="mt-8 text-xs font-mono text-white/20 group-hover:text-cyan-400/50 transition-colors uppercase tracking-widest">
                        Tier {index + 1}
                    </div>
                </div>

                {/* Right Side: Explanation and Features Area */}
                <div className="flex flex-col justify-center p-8 md:p-12 md:w-2/3 relative z-10 bg-gradient-to-l from-transparent to-black/20">
                    <div
                        className="text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-8"
                        dangerouslySetInnerHTML={{ __html: service.mainText }}
                    />
                    
                    {service.features && service.features.length > 0 && (
                        <div className="space-y-6 md:pl-6 md:border-l border-cyan-500/30">
                            {service.features.map((feature: any, idx: number) => (
                                <div key={idx} className="relative group/feature">
                                    <div className="hidden md:block absolute left-[-29px] top-2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)] opacity-0 group-hover/feature:opacity-100 transition-opacity" />
                                    <h4 className="text-cyan-400 font-bold text-lg mb-1">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
