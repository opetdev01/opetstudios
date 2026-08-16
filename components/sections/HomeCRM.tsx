'use client';

import { motion } from 'framer-motion';
import { Marquee } from '@/components/ui/Marquee';

const integrations = [
    '4e50d21a-ed24-4c73-b769-918a4a40bc7a_removalai_preview.png',
    '522f71d9-e78a-4c27-b16a-edf7e48a4363_removalai_preview.png',
    '5ecc36cd-5ae4-4669-80b3-d4ee34e78d79_removalai_preview.png',
    '742030d6-2e9e-40ad-b07b-f177f6eedf53_removalai_preview.png',
    '9996a639-b2f8-4c46-b603-4f326feb3852_removalai_preview.png',
    '9b9b1929-a2fc-4bb3-a2a2-145898b774b3_removalai_preview.png',
    'b347828d-37e7-4ae4-9d6f-29c8f8b8f559_removalai_preview.png',
    'b3cdda34-bf9d-40be-8e97-301f304754de_removalai_preview.png',
    'b7dc3385-d76d-4f0b-be56-5f294a45ed7d_removalai_preview.png'
];

export function HomeCRM() {
    return (
        <section className="relative py-28 px-6 md:px-12 bg-black overflow-hidden">
            <div className="container mx-auto relative z-10 max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                        Within Your Sales{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            CRMs
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto">
                        Integrate Opet seamlessly with your existing CRM platforms and sales tools.
                    </p>
                </motion.div>

                {/* Integration Marquee */}
                <div className="relative w-full overflow-hidden mt-12 py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-black after:to-transparent">
                    <Marquee speed={40} direction="right" pauseOnHover={false}>
                        <div className="flex gap-8 md:gap-16 px-8 items-center">
                            {integrations.map((img, i) => (
                                <div
                                    key={i}
                                    className="relative w-32 h-16 md:w-40 md:h-20 flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 group cursor-default"
                                >
                                    <img
                                        src={`/crms/${img}`}
                                        alt={`CRM Integration ${i + 1}`}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>
            </div>
        </section>
    );
}
