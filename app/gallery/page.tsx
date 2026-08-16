import { FuturisticGrid } from '@/components/features/FuturisticGrid';

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-void selection:bg-electric selection:text-white">
            {/* Header / Title */}
            <div className="fixed top-24 left-8 md:left-12 z-10 pointer-events-none mix-blend-difference">
                <h1 className="text-6xl md:text-9xl font-bold font-display tracking-tighter opacity-20">
                    GALLERY
                </h1>
            </div>

            <FuturisticGrid />
        </main>
    );
}
