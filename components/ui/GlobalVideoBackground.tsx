'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function GlobalVideoBackground({ videoUrl }: { videoUrl?: string }) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Don't render on home page
    if (pathname === '/') return null;

    return (
        <>
            {/* 
        Force body background to be transparent so the fixed video shows through.
        The -z-50 on the video puts it behind all content but fixed to viewport.
      */}
            <style jsx global>{`
        body {
          background-color: transparent !important;
        }
      `}</style>

            <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none">
                {/* The Source Video */}
                <video
                    key={videoUrl || "/global-background.mp4"}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src={videoUrl || "/global-background.mp4"} type="video/mp4" />
                </video>

                {/* Dark Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
            </div>
        </>
    );
}
