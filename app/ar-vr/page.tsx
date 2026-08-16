import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Glasses, PlayCircle } from 'lucide-react';

export const metadata = {
    title: 'AR & VR - Opet Studio',
    description: 'Immersive experiences with scale and volume.',
};

export default function ARVRPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden selection:bg-cyan-500/30">
            {/* Top Navigation */}
            <div className="container mx-auto px-6 mb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors font-mono text-sm uppercase tracking-widest">
                    <ArrowLeft size={16} /> Back to Studio
                </Link>
            </div>

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <Image
                    src="/bg_ar_vr.png"
                    alt="AR VR Background"
                    fill
                    className="object-cover mix-blend-screen"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-6 relative mb-24 z-10">
                <div className="absolute top-0 right-6 md:right-12 w-16 h-16 md:w-24 md:h-24 text-white/20">
                    <Glasses className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                </div>

                <div className="relative z-10 mb-16">
                    <h2 className="text-6xl md:text-8xl font-thin font-display tracking-wide text-transparent stroke-white" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>
                        AR & VR
                    </h2>
                    <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-cyan-500 to-transparent mt-8 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                </div>

                <div className="max-w-4xl">
                    <h3 className="text-2xl md:text-3xl text-white mb-12">
                        Immersive experiences with scale and volume.
                    </h3>

                    <div className="space-y-24 pl-4 md:pl-8 border-l border-cyan-500/50">
                        {/* VR Section */}
                        <div className="relative pl-8 group">
                            <div className="absolute left-[-37px] top-2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                            <h4 className="text-white font-bold text-3xl mb-4">Virtual Reality (VR)</h4>
                            <p className="text-gray-300 text-lg leading-relaxed font-light mb-8 max-w-2xl">
                                Step inside your future development before a single brick is laid. Our high-fidelity Virtual Reality experiences provide true 1:1 scale, enabling buyers to feel the exact volume, understand spatial relationships, and review premium material finishes under realistic lighting. By removing physical boundaries, VR builds an immediate, powerful emotional connection with the property.
                            </p>
                            <div className="relative w-full max-w-3xl aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                {/* VR Image Placeholder */}
                                <Image
                                    src="/VR.PNG"
                                    alt="Virtual Reality Solution"
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* AR Section */}
                        <div className="relative pl-8 group">
                            <div className="absolute left-[-37px] top-2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                            <h4 className="text-white font-bold text-3xl mb-4">Augmented Reality (AR)</h4>
                            <p className="text-gray-300 text-lg leading-relaxed font-light mb-8 max-w-2xl">
                                Project architectural scale models directly onto any tabletop or visualize an entire building structure on an empty lot. Augmented Reality empowers your sales team to demonstrate interactive floorplans, dynamic exterior facades, and shadow studies seamlessly from an iPad or smartphone—blending digital mastery with the physical world.
                            </p>
                            <div className="relative w-full max-w-3xl aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                {/* AR Image Placeholder */}
                                <Image
                                    src="/AR.PNG"
                                    alt="Augmented Reality Solution"
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
