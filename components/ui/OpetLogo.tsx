'use client';

import { motion } from 'framer-motion';

export const OpetLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className} text-white`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M50 10 A40 40 0 1 1 40 88 L50 78 L60 88 A40 40 0 0 1 50 10 Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </svg>
        </motion.div>
    );
};
