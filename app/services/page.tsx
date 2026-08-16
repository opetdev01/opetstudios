import { servicesList as mockServicesList } from '@/lib/data';
import { client } from '@/lib/sanity';
import { servicesQuery } from '@/lib/queries';
import { Eye, Headset, Fingerprint } from 'lucide-react';

export const dynamic = 'force-dynamic';

const icons: Record<string, any> = {
    lens: Eye,
    dive: Headset,
    touch: Fingerprint,
    monitor: Eye,
    harddrive: Headset,
    glasses: Fingerprint,
};

export default async function ServicesPage() {
    let sanityServices: any[] = [];
    try {
        sanityServices = await client.fetch(servicesQuery);
    } catch (e) {
        console.error(e);
    }

    const services = mockServicesList;

    return (
        <main className="min-h-screen bg-void text-white pt-32 pb-20 px-4 md:px-8">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <h1 className="text-sm font-mono uppercase tracking-[0.5em] text-white/30 mb-6">
                        Select Ecosystem
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                        Our tiered ecosystems provide a comprehensive suite of real estate marketing tools designed to match your project's scale, from essential 3D assets to ultimate immersive showrooms. Choose the tier that fits your needs.
                    </p>
                </div>

                {/* Horizontal Cards stacked vertically */}
                <div className="flex flex-col gap-8">
                    {services.map((service: any, index: number) => {
                        const Icon = icons[service.icon as string] || Eye;
                        const tierLabel = `Tier ${index + 1}`;

                        return (
                            <div
                                key={service.id || service._id || index}
                                className="w-full border border-cyan-500/30 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)] hover:border-cyan-400 group relative"
                            >
                                {/* Glow Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Top Accent Line */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent" />

                                {/* LEFT: Icon + Title */}
                                <div className="flex flex-col items-center md:items-start justify-center p-8 md:p-10 md:w-[280px] md:min-w-[280px] md:border-r border-white/10 relative z-10 text-center md:text-left">
                                    <div className="mb-5 relative">
                                        <div className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-500 bg-black">
                                            <Icon size={32} strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tighter text-white mb-1 group-hover:text-cyan-50 transition-colors">
                                        {(service.title || '').replace('OPET ', '')}
                                    </h2>
                                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/80 mb-3">
                                        {tierLabel}
                                    </span>
                                    <p className="text-gray-400 font-light text-sm leading-relaxed">
                                        {service.subtitle}
                                    </p>
                                </div>

                                {/* RIGHT: Description + Features */}
                                <div className="flex-1 flex flex-col justify-center p-8 md:p-10 relative z-10">
                                    <div
                                        className="text-gray-300 text-base md:text-lg leading-relaxed font-light mb-6"
                                        dangerouslySetInnerHTML={{ __html: service.mainText }}
                                    />

                                    {service.features && service.features.length > 0 && (
                                        <div className="space-y-4 pl-5 border-l border-cyan-500/30 mb-8">
                                            {service.features.map((feature: any, idx: number) => (
                                                <div key={idx} className="relative">
                                                    <div className="absolute left-[-25px] top-1.5 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                                                    <h4 className="text-cyan-400 font-bold text-sm mb-0.5">
                                                        {feature.title}
                                                    </h4>
                                                    <p className="text-gray-500 font-light leading-relaxed text-sm">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Book Demo CTA */}
                                    <div className="mt-auto pt-6 flex justify-end">
                                        <BookDemoButton serviceTitle={service.title} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Background Grid Accent */}
            <div className="fixed inset-0 z-[-1] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
        </main>
    );
}

import { BookDemoButton } from '@/components/ui/BookDemoButton';
