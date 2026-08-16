import { projects, servicesList as mockServicesList } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ServiceIcons } from '@/components/ui/ServiceIcons';
import { BookDemoButton } from '@/components/ui/BookDemoButton';
import { client } from '@/lib/sanity';
import { servicesQuery, projectsQuery } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let sanityServices = [];
    let sanityProjects = [];
    try {
        sanityServices = await client.fetch(servicesQuery);
        sanityProjects = await client.fetch(projectsQuery);
    } catch (e) {
        console.error(e);
    }

    const services = sanityServices?.length > 0 ? [...sanityServices, ...mockServicesList] : mockServicesList;
    const projectItems = sanityProjects?.length > 0 ? [...sanityProjects, ...projects] : projects;

    const service = services.find((s: any) => (s.slug || s.id) === id);
    const serviceProjects = projectItems.filter((p: any) => p.category?.toLowerCase() === id?.toLowerCase() || p.serviceId === id);

    if (!service) {
        notFound();
    }

    // Safely look up the icon, default to Zap
    const iconName = service.icon || 'lens'; // Our mock uses lower-case IDs, sanity uses exact names or we can use the ID
    const Icon = (ServiceIcons as any)[iconName] || ServiceIcons.lens;

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden selection:bg-cyan-500/30">

            {/* Top Navigation */}
            <div className="container mx-auto px-6 mb-12">
                <Link href="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors font-mono text-sm uppercase tracking-widest">
                    <ArrowLeft size={16} /> Back to Modules
                </Link>
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-6 relative mb-8">
                {/* Top Right Icon */}
                <div className="absolute top-0 right-6 md:right-12 w-16 h-16 md:w-24 md:h-24 text-white">
                    {Icon && <Icon className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />}
                </div>

                {/* Title */}
                <div className="relative z-10 mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tighter text-white mb-2 shadow-cyan-500/20">
                        OPET
                    </h1>
                    <h2 className="text-6xl md:text-8xl font-thin font-display tracking-wide text-transparent stroke-white" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>
                        {service.title.replace('OPET ', '')}
                    </h2>
                    {/* Glowing Line */}
                    <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-cyan-500 to-transparent mt-8 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                </div>

                {/* Content Block */}
                <div className="max-w-4xl">
                    <h3 className="text-2xl md:text-3xl text-white mb-8">
                        {service.subtitle}
                    </h3>

                    {/* Gradient Info Box */}
                    <div className="relative bg-gradient-to-r from-cyan-900/20 to-transparent border-l-4 border-cyan-500 p-8 md:p-10 mb-8 rounded-r-2xl">
                        <p
                            className="text-gray-300 text-lg md:text-xl leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: service.mainText }}
                        />
                    </div>

                    <div className="mb-16">
                        <BookDemoButton serviceTitle={service.title} />
                    </div>

                    {/* Feature Bullets */}
                    <div className="space-y-8 pl-4 md:pl-8 border-l border-white/10">
                        {service.features?.map((feature: any, idx: number) => (
                            <div key={idx} className="relative pl-6 group">
                                <div className="absolute left-[-27px] top-2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                <h4 className="text-white font-bold text-lg mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Work Grid */}
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-white">
                        PROJECT <span className="text-cyan-400">GALLERY</span>
                    </h3>
                    <div className="h-[1px] flex-grow ml-8 bg-white/10" />
                </div>

                {serviceProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* We can add a couple more placeholders if the list is short just to show the grid */}
                        {serviceProjects.map((project: any) => (
                            <Link href={`/work/${project.slug || project.id}`} key={project.id || project._id} className="group block relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-900 border border-white/5">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Hover Scanline */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay transition-opacity" />
                            </Link>
                        ))}
                        {/* Placeholder for "Show styling" as requested */}
                        <div className="group block relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-900 border border-white/5 border-dashed flex items-center justify-center">
                            <span className="text-white/20 font-mono text-sm">[PLACEHOLDER_SLOT_01]</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((placeholder) => (
                            <div key={placeholder} className="aspect-[4/3] bg-neutral-900 border border-white/10 flex items-center justify-center">
                                <span className="text-white/20 font-mono">[FUTURE_PROJECT]</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
