'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight, ChevronDown, Video, Glasses, Monitor, HardDrive } from 'lucide-react';
import { OpetLogo } from '@/components/ui/OpetLogo';
import { useUIStore } from '@/lib/store';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
    const { openContact } = useUIStore();

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        openContact();
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 bg-black/40 backdrop-blur-md border-b border-white/5"
            >
                <div className="flex justify-between items-center max-w-[1920px] mx-auto">
                    {/* Logo Area */}
                    <Link href="/" className="text-xl font-bold tracking-tighter z-50 mix-blend-difference text-white flex items-center gap-3">
                        <motion.div
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            whileHover={{ rotateY: 360 }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                            className="relative w-10 h-10"
                        >
                            <img
                                src="/opet black png.png"
                                alt="Opet Logo"
                                className="w-full h-full object-contain invert"
                            />
                        </motion.div>
                        OPET STUDIOS
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center font-mono text-sm uppercase tracking-wider">
                        <Link href="/" className="hover:opacity-60 transition-opacity mix-blend-difference text-white">Home</Link>

                        {/* Solutions Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsSolutionsOpen(true)}
                            onMouseLeave={() => setIsSolutionsOpen(false)}
                        >
                            <button className="flex items-center gap-1 hover:opacity-60 transition-opacity uppercase font-mono text-sm mix-blend-difference text-white">
                                Solutions <ChevronDown size={14} className={`transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isSolutionsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-6 w-64 bg-[#0a1118]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 overflow-hidden"
                                    >
                                        <div className="flex flex-col">
                                            <Link href="/web-solutions" className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors group/item">
                                                <Monitor className="w-5 h-5 mt-0.5 text-white/50 group-hover/item:text-cyan-400 transition-colors" />
                                                <div>
                                                    <div className="font-bold text-white normal-case text-base mb-1">Online Sales</div>
                                                    <div className="text-xs text-white/50 normal-case font-sans">Digital twins & platforms</div>
                                                </div>
                                            </Link>
                                            <div className="h-[1px] w-full bg-white/5 my-1" />
                                            <Link href="/offline-experience" className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors group/item">
                                                <HardDrive className="w-5 h-5 mt-0.5 text-white/50 group-hover/item:text-cyan-400 transition-colors" />
                                                <div>
                                                    <div className="font-bold text-white normal-case text-base mb-1">Offline Experience</div>
                                                    <div className="text-xs text-white/50 normal-case font-sans">Local desktop apps & viewers</div>
                                                </div>
                                            </Link>
                                            <div className="h-[1px] w-full bg-white/5 my-1" />
                                            <Link href="/archviz" className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors group/item">
                                                <Video className="w-5 h-5 mt-0.5 text-white/50 group-hover/item:text-cyan-400 transition-colors" />
                                                <div>
                                                    <div className="font-bold text-white normal-case text-base mb-1">Archviz</div>
                                                    <div className="text-xs text-white/50 normal-case font-sans">High-end imagery & video</div>
                                                </div>
                                            </Link>
                                            <div className="h-[1px] w-full bg-white/5 my-1" />
                                            <Link href="/ar-vr" className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors group/item">
                                                <Glasses className="w-5 h-5 mt-0.5 text-white/50 group-hover/item:text-cyan-400 transition-colors" />
                                                <div>
                                                    <div className="font-bold text-white normal-case text-base mb-1">AR & VR</div>
                                                    <div className="text-xs text-white/50 normal-case font-sans">Immersive experiences</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/work" className="hover:opacity-60 transition-opacity mix-blend-difference text-white">Showcases</Link>
                        <Link href="/services" className="hover:opacity-60 transition-opacity mix-blend-difference text-white">Ecosystems</Link>
                        <Link href="/about" className="hover:opacity-60 transition-opacity mix-blend-difference text-white">About</Link>
                        <a href="/contact" onClick={handleContactClick} className="hover:opacity-60 transition-opacity cursor-pointer mix-blend-difference text-white">Contact</a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 mix-blend-difference text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-void z-40 flex flex-col justify-center items-center gap-8 text-2xl font-light uppercase tracking-widest"
                    >
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

                        <div className="flex flex-col items-center gap-6 my-4 border-y border-white/10 py-6 w-full">
                            <span className="text-electric text-sm font-mono tracking-widest">SOLUTIONS</span>
                            <Link href="/web-solutions" className="hover:text-cyan-400" onClick={() => setIsMobileMenuOpen(false)}>Online Sales</Link>
                            <Link href="/offline-experience" className="hover:text-cyan-400" onClick={() => setIsMobileMenuOpen(false)}>Offline Experience</Link>
                            <Link href="/archviz" className="hover:text-cyan-400" onClick={() => setIsMobileMenuOpen(false)}>Archviz</Link>
                            <Link href="/ar-vr" className="hover:text-cyan-400" onClick={() => setIsMobileMenuOpen(false)}>AR & VR</Link>
                        </div>

                        <Link href="/work" onClick={() => setIsMobileMenuOpen(false)}>Showcases</Link>
                        <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}>Ecosystems</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                        <a href="/contact" onClick={handleContactClick} className="cursor-pointer">Contact</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
