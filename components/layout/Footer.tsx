'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <motion.div
                                className="relative w-8 h-8"
                                whileHover={{ rotateY: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src="/opet black png.png"
                                    alt="Opet Logo"
                                    className="w-full h-full object-contain invert opacity-80"
                                />
                            </motion.div>
                            <h3 className="text-xl font-bold text-white">OPET STUDIOS</h3>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Transforming unbuilt architecture into vivid, immersive visual experiences.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Office</h4>
                        <p className="text-gray-400 text-sm">9 Bosta Street, Korba, Cairo, Egypt</p>
                        <p className="text-gray-400 text-sm mt-2">11 Hussein Shafiq Al Masry, Al Hijaz, Cairo, Egypt</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <a href="mailto:opet.social@cubeconsult.org" className="block text-gray-400 text-sm hover:text-white transition-colors">
                            opet.social@cubeconsult.org
                        </a>
                        <a href="https://www.opetstudios.com" target="_blank" rel="noopener noreferrer" className="block text-gray-400 text-sm mt-2 hover:text-white transition-colors">
                            www.opetstudios.com
                        </a>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-8">
                            {[
                                { Icon: Facebook, href: "https://facebook.com/opetstudios", label: "Facebook" },
                                { Icon: Instagram, href: "https://instagram.com/opetstudios", label: "Instagram" },
                                { Icon: Linkedin, href: "https://linkedin.com/company/opetstudios", label: "LinkedIn" },
                            ].map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 bg-white/5 hover:bg-cyan-400/10 transition-all"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    aria-label={social.label}
                                >
                                    <social.Icon size={18} strokeWidth={1.5} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Opet Studios. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
