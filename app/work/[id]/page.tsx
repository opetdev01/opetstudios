import { projects } from '@/lib/data';
import { ProjectGallery } from '@/components/ui/ProjectGallery';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Scrollytelling } from '@/components/features/Scrollytelling';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }))
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-void text-accent">
            {/* Navigation Back */}
            <div className="fixed top-24 left-6 md:left-12 z-40">
                <Link href="/work" className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={16} /> Back to Operations
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-40 blur-sm scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <span className="block text-sm md:text-base font-mono text-accent/60 mb-6 uppercase tracking-[0.2em]">{project.location} — {project.year}</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-none">{project.title}</h1>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-12 mt-8 border-t border-white/20 pt-8">
                        <div className="text-left">
                            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Category</span>
                            <span className="block text-lg font-mono">{project.category}</span>
                        </div>
                        <div className="text-left">
                            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Area</span>
                            <span className="block text-lg font-mono">{project.area}</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-12 left-0 w-full text-center">
                    <p className="text-xs font-mono uppercase tracking-widest text-white/40">Scroll to Initialize</p>
                </div>
            </section>

            {/* Narrative Section */}
            <section className="bg-void py-24">
                <div className="container mx-auto px-6 mb-24 max-w-3xl text-center">
                    <p className="text-2xl md:text-3xl leading-relaxed font-light text-gray-200">
                        "{project.description}"
                    </p>
                </div>

                <Scrollytelling timeline={project.timeline} />
            </section>

            {/* Technical Grid / Gallery */}
            <ProjectGallery gallery={project.gallery} title={project.title} />

            {/* Next Project / CTA */}
            <section className="py-32 flex justify-center bg-void border-t border-white/5">
                <Link href="/contact">
                    <MagneticButton>Inquire About This Project</MagneticButton>
                </Link>
            </section>
        </main>
    );
}
