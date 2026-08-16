'use client';

import { useRouter } from 'next/navigation';
import { useTransitionStore } from '@/hooks/useTransitionStore';
import React, { AnchorHTMLAttributes } from 'react';

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

export function TransitionLink({ href, children, className, onClick, ...props }: TransitionLinkProps) {
    const router = useRouter();
    const { startTransition } = useTransitionStore();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Only override if not ctrl/cmd clicking to open in new tab
        if (e.ctrlKey || e.metaKey || href.startsWith('http') || href.startsWith('mailto')) {
            return;
        }

        e.preventDefault();
        if (onClick) onClick(e);

        // Current pathname check (prevent transition if we are already exactly here)
        if (window.location.pathname === href) {
            return;
        }

        // 1. Mount overlay
        startTransition(href);

        // 2. Wait for the overlay to fade in and robot to start walking (approx 1000ms)
        // Then execute the real route change.
        setTimeout(() => {
            router.push(href);
        }, 1200);
    };

    return (
        <a href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    );
}
