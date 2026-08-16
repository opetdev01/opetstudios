import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Camera } from 'lucide-react';
import { ArchvizGallery } from '@/components/ui/ArchvizGallery';
import { CinematicVideo } from '@/components/features/CinematicVideo';
import { projects } from '@/lib/data';

export const metadata = {
    title: 'Archviz - Opet Studio',
    description: 'High-end imagery and cinematic video production.',
};

export default function ArchvizPage() {
    // Flatten all gallery images from projects for the masonry grid
    const allImages = projects.flatMap(p => p.gallery);

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
                     src="/bg_archviz.png"
                     alt="Archviz Background"
                     fill
                     className="object-cover mix-blend-screen"
                     priority
                 />
                 <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-6 relative mb-24 z-10">
                 <div className="absolute top-0 right-6 md:right-12 w-16 h-16 md:w-24 md:h-24 text-white/20">
                     <Camera className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                 </div>

                 <div className="relative z-10 mb-16">
                     <h2 className="text-6xl md:text-8xl font-thin font-display tracking-wide text-transparent stroke-white" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>
                         ARCHVIZ
                     </h2>
                     <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-cyan-500 to-transparent mt-8 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                 </div>

                 <div className="max-w-4xl">
                     <h3 className="text-2xl md:text-3xl text-white mb-12">
                         High-end imagery and cinematic video production.
                     </h3>

                     <div className="space-y-12 pl-4 md:pl-8 border-l border-cyan-500/50">
                         <div className="relative pl-8 group">
                             <div className="absolute left-[-37px] top-2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                             <h4 className="text-white font-bold text-2xl mb-4">Hero Still Renders</h4>
                             <p className="text-gray-300 text-lg leading-relaxed font-light">
                                 High-end, hyper-realistic, emotionally resonant 3D imagery (interiors, exteriors, master plans).
                             </p>
                         </div>

                         <div className="relative pl-8 group">
                             <div className="absolute left-[-37px] top-2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                             <h4 className="text-white font-bold text-2xl mb-4">Cinematic Video</h4>
                             <p className="text-gray-300 text-lg leading-relaxed font-light">
                                 Sweeping, narrative-driven 3D animation videos that capture the mood and lifestyle of the development.
                             </p>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Cinematic Video Section */}
            <CinematicVideo 
                videos={[
                    { url: "https://www.youtube.com/watch?v=TQho13xoSyk", title: "Opet Cinematic Production" },
                    { url: "https://www.youtube.com/watch?v=Y4dSXUS1kRc", title: "Opet Showreel" },
                    { url: "https://www.youtube.com/watch?v=7MjqpCLiozo", title: "Nebu New Capital", thumbnail: "/nebu-cover.jpeg" },
                    { url: "https://drive.google.com/file/d/1p13p-WqgiNSXkS6XS9hSGug27H5vUbtr/view?usp=drive_link", title: "Zomra Project", thumbnail: "/zomra-cover.png" },
                    { url: "https://www.youtube.com/watch?v=aA_chQ69WlM", title: "Sahara Project", thumbnail: "/sahara-cover.png" }
                ]} 
            />

            {/* Related Work Grid via Client Component */}
            <div className="container mx-auto px-6 relative z-10">
                 <div className="mb-12 flex items-end justify-between">
                     <h3 className="text-2xl font-bold text-white">
                         PROJECT <span className="text-cyan-400">SHOWCASES</span>
                     </h3>
                     <div className="h-[1px] flex-grow ml-8 bg-white/10" />
                 </div>

                 <ArchvizGallery images={allImages} />
            </div>
        </main>
    );
}
