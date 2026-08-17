'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import { X, Check, MapPin, AlertCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type FoldStep = 'idle' | 'flat' | 'corners' | 'point' | 'spine' | 'wings' | 'launch' | 'flying' | 'done';

export const ContactModal = () => {
    const { isContactOpen, closeContact, contactInquiry } = useUIStore();
    const [status, setStatus] = useState<'idle' | 'folding' | 'success' | 'error'>('idle');
    const [foldStep, setFoldStep] = useState<FoldStep>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [messageText, setMessageText] = useState(contactInquiry || '');

    const tracePathRef = useRef<SVGPathElement>(null);
    const planeGroupRef = useRef<SVGGElement>(null);
    const animFrameRef = useRef<number | null>(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isContactOpen) {
            setStatus('idle');
            setFoldStep('idle');
            setErrorMessage('');
            if (contactInquiry) {
                setMessageText(contactInquiry);
            }
        }
    }, [isContactOpen, contactInquiry]);

    // Clean up animation on unmount
    useEffect(() => {
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    const runFlightAnimation = () => {
        const path = tracePathRef.current;
        const plane = planeGroupRef.current;
        if (!path || !plane) {
            setFoldStep('done');
            setStatus('success');
            return;
        }

        const totalLength = path.getTotalLength();
        path.style.strokeDasharray = `${totalLength}`;
        path.style.strokeDashoffset = `${totalLength}`;
        path.style.opacity = '1';

        const startTime = performance.now();
        const duration = 1350; // ms

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Refined smooth cubic flight trajectory
            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            const currentDist = eased * totalLength;
            const p = path.getPointAtLength(currentDist);
            const pAhead = path.getPointAtLength(Math.min(totalLength, currentDist + 3));
            
            const angle = Math.atan2(pAhead.y - p.y, pAhead.x - p.x) * (180 / Math.PI);
            const scale = 1 - progress * 0.45;
            const opacity = progress > 0.85 ? (1 - progress) / 0.15 : 1;

            plane.setAttribute(
                'transform',
                `translate(${p.x}, ${p.y}) rotate(${angle}) scale(${scale})`
            );
            plane.style.opacity = `${opacity}`;

            // Draw line behind the plane's tail
            path.style.strokeDashoffset = `${totalLength * (1 - eased)}`;

            if (progress < 1) {
                animFrameRef.current = requestAnimationFrame(animate);
            } else {
                setFoldStep('done');
                setStatus('success');
                setTimeout(() => {
                    closeContact();
                }, 3500);
            }
        };

        animFrameRef.current = requestAnimationFrame(animate);
    };

    const triggerFoldSequence = () => {
        setStatus('folding');
        setFoldStep('flat');

        // Step 1: Corners fold in (380ms)
        setTimeout(() => {
            setFoldStep('corners');

            // Step 2: Nose Point folds down (480ms)
            setTimeout(() => {
                setFoldStep('point');

                // Step 3: Central spine folds the paper in half (520ms)
                setTimeout(() => {
                    setFoldStep('spine');

                    // Step 4: Wings fold out into aerodynamic airplane (520ms)
                    setTimeout(() => {
                        setFoldStep('wings');

                        // Step 5: Pullback flick launch (400ms)
                        setTimeout(() => {
                            setFoldStep('launch');

                            // Step 6: Flight takeoff locked directly on the trajectory path
                            setTimeout(() => {
                                setFoldStep('flying');
                                runFlightAnimation();
                            }, 280);
                        }, 440);
                    }, 520);
                }, 520);
            }, 480);
        }, 380);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Start 3D Origami Folding & Flying Sequence
        triggerFoldSequence();

        try {
            const response = await fetch('https://formsubmit.co/ajax/opet.social@cubeconsult.org', {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Server returned an unexpected response');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setErrorMessage('Unable to transmit inquiry. Please check your connection and try again.');
        }
    };

    const isFlying = foldStep === 'flying';
    const isDone = foldStep === 'done';

    return (
        <AnimatePresence>
            {isContactOpen && (
                <>
                    {/* Dark Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={status === 'idle' ? closeContact : undefined}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60]"
                    />

                    {/* FLIGHT STAGE: SVG Path & Plane Locked 100% to Path Tangent */}
                    <div 
                        className={`fixed inset-0 z-[68] pointer-events-none flex items-center justify-center transition-opacity duration-200 ${
                            isFlying ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ display: isDone ? 'none' : undefined }}
                    >
                        <svg
                            className="w-full h-full max-w-5xl max-h-[850px] overflow-visible"
                            viewBox="0 0 900 650"
                        >
                            {/* Glowing Flight Line */}
                            <path
                                ref={tracePathRef}
                                id="flightTracePath"
                                className="flight-trace-line"
                                d="M 450,340 C 370,270 330,130 460,85 C 600,40 760,60 980,-60"
                            />

                            {/* Origami Paper Airplane Plane Group matching neutral-900 theme */}
                            <g ref={planeGroupRef} id="flyingPlane">
                                <polygon points="0,0 -38,18 -16,0" fill="#1f1f1f" stroke="#00f3ff" strokeWidth="1" />
                                <polygon points="0,0 -38,-18 -16,0" fill="#171717" stroke="#00f3ff" strokeWidth="1" />
                                <polygon points="0,0 -42,6 -18,0" fill="#262626" opacity="0.9" />
                                <polygon points="0,0 -42,-6 -18,0" fill="#121212" opacity="0.9" />
                                <circle cx="-16" cy="0" r="3" fill="#00f3ff" style={{ filter: 'drop-shadow(0 0 6px #00f3ff)' }} />
                            </g>
                        </svg>
                    </div>

                    {/* Main Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none overflow-visible">

                        {/* SUCCESS TRANSMISSION CARD */}
                        {status === 'success' && (
                            <motion.div
                                key="success-card"
                                initial={{ opacity: 0, scale: 0.88, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-neutral-900/95 border border-white/10 w-full max-w-lg p-10 md:p-14 rounded-2xl shadow-2xl pointer-events-auto flex flex-col items-center justify-center text-center backdrop-blur-2xl text-white"
                            >
                                <motion.div 
                                    initial={{ scale: 0.5, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.08 }}
                                    className="w-16 h-16 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/30 flex items-center justify-center mb-6 text-[#00f3ff] shadow-[0_0_30px_rgba(0,243,255,0.25)]"
                                >
                                    <Check size={32} />
                                </motion.div>
                                <h3 className="text-3xl font-bold uppercase tracking-tight text-[#00f3ff] mb-2">Transmission Sent</h3>
                                <p className="text-white/60 font-mono text-sm">We will establish connection shortly.</p>
                            </motion.div>
                        )}

                        {/* 3D ORIGAMI FOLDING WINDOW */}
                        {status !== 'success' && (
                            <div className="origami-scene-wrapper">
                                <div 
                                    className={`origami-window-card ${foldStep}`}
                                    style={
                                        isFlying || isDone
                                            ? { opacity: 0, pointerEvents: 'none', visibility: 'hidden' }
                                            : undefined
                                    }
                                >
                                    {/* Real Form Window - using exact original neutral-900/90 theme */}
                                    <div className="window-inner-content bg-neutral-900/90 border border-white/10 w-full max-w-3xl p-8 md:p-12 rounded-2xl shadow-2xl pointer-events-auto relative overflow-hidden text-white">
                                        
                                        {/* Spine Crease Line Indicator */}
                                        <div className="origami-spine-crease" />

                                        {/* Close Button */}
                                        {status === 'idle' && (
                                            <button
                                                onClick={closeContact}
                                                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-30 p-2"
                                                aria-label="Close Contact Modal"
                                            >
                                                <X size={24} />
                                            </button>
                                        )}

                                        {/* Header */}
                                        <div className="mb-10 form-fade-section">
                                            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-2 text-[#00f3ff]">
                                                Initialize Contact
                                            </h2>
                                            <p className="text-white/60 font-mono text-sm">Start a new project inquiry.</p>

                                            {/* Location Pin */}
                                            <a
                                                href="https://maps.app.goo.gl/WAmMg66zoSUcieUA7"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mt-4 group w-fit"
                                            >
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                    className="bg-red-600/20 p-1.5 rounded-full text-red-500"
                                                >
                                                    <MapPin size={14} />
                                                </motion.div>
                                                <span className="text-xs font-mono uppercase tracking-widest border-b border-transparent group-hover:border-white">
                                                    Locate HQ
                                                </span>
                                            </a>
                                        </div>

                                        {errorMessage && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -5 }} 
                                                animate={{ opacity: 1, y: 0 }} 
                                                className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm font-mono"
                                            >
                                                <AlertCircle size={16} />
                                                <span>{errorMessage}</span>
                                            </motion.div>
                                        )}

                                        {/* Form Fields */}
                                        <form onSubmit={handleSubmit} className="space-y-8 form-fade-section">
                                            <input type="hidden" name="_captcha" value="false" />
                                            <input type="hidden" name="_subject" value="New Inquiry from Opet Website!" />
                                            <input type="hidden" name="_template" value="box" />

                                            {/* 3-Column Responsive Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                                <div className="space-y-2">
                                                    <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-white/50">
                                                        Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Enter your name"
                                                        required
                                                        disabled={status !== 'idle'}
                                                        className="w-full bg-transparent border-b border-white/20 py-2 text-base md:text-lg text-white focus:outline-none focus:border-[#00f3ff] transition-colors placeholder:text-white/20 disabled:opacity-50"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-white/50">
                                                        Email
                                                    </label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter your email"
                                                        required
                                                        disabled={status !== 'idle'}
                                                        className="w-full bg-transparent border-b border-white/20 py-2 text-base md:text-lg text-white focus:outline-none focus:border-[#00f3ff] transition-colors placeholder:text-white/20 disabled:opacity-50"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="phone" className="text-xs font-mono uppercase tracking-widest text-white/50">
                                                        Phone
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="+20 1..."
                                                        disabled={status !== 'idle'}
                                                        className="w-full bg-transparent border-b border-white/20 py-2 text-base md:text-lg text-white focus:outline-none focus:border-[#00f3ff] transition-colors placeholder:text-white/20 disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-white/50">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={4}
                                                    value={messageText}
                                                    onChange={(e) => setMessageText(e.target.value)}
                                                    placeholder="Tell us about your project or vision..."
                                                    required
                                                    disabled={status !== 'idle'}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-base md:text-lg text-white focus:outline-none focus:border-[#00f3ff] transition-colors resize-none placeholder:text-white/20 disabled:opacity-50"
                                                />
                                            </div>

                                            <div className="pt-4 flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={status !== 'idle'}
                                                    className="px-8 py-3 rounded-full bg-[#00f3ff] text-black font-bold uppercase tracking-wider text-sm hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(0,243,255,0.4)] disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
                                                >
                                                    Send Inquiry
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* FOLDING STYLES */}
                    <style jsx>{`
                        .origami-scene-wrapper {
                            width: 100%;
                            max-width: 48rem;
                            perspective: 1200px;
                            transform-style: preserve-3d;
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .origami-window-card {
                            width: 100%;
                            position: relative;
                            transform-style: preserve-3d;
                            transform-origin: center center;
                            border-radius: 1rem;
                            transition: clip-path 0.5s cubic-bezier(0.25, 1, 0.35, 1),
                                        transform 0.5s cubic-bezier(0.25, 1, 0.35, 1),
                                        opacity 0.2s ease;
                        }

                        .window-inner-content {
                            position: relative;
                            z-index: 10;
                            border-radius: 1rem;
                            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.85);
                            transition: opacity 0.4s ease;
                        }

                        .origami-spine-crease {
                            position: absolute;
                            inset: 0;
                            background: linear-gradient(90deg, transparent 49.3%, rgba(0, 243, 255, 0.4) 50%, transparent 50.7%);
                            opacity: 0;
                            pointer-events: none;
                            transition: opacity 0.4s ease;
                            z-index: 25;
                        }

                        .form-fade-section {
                            transition: opacity 0.35s ease;
                        }

                        /* STEP 0: FLAT */
                        .origami-window-card.flat {
                            clip-path: polygon(0% 0%, 50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%);
                            transform: scale(1);
                        }

                        /* STEP 1: CORNERS FOLD INWARD */
                        .origami-window-card.corners {
                            clip-path: polygon(30% 18%, 50% 0%, 70% 18%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%);
                            transform: scale(0.95);
                        }
                        .origami-window-card.corners .form-fade-section {
                            opacity: 0.65;
                        }

                        /* STEP 2: NOSE POINT FOLDS DOWN */
                        .origami-window-card.point {
                            clip-path: polygon(38% 36%, 50% 45%, 62% 36%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%);
                            transform: scale(0.85);
                        }
                        .origami-window-card.point .origami-spine-crease {
                            opacity: 0.85;
                        }
                        .origami-window-card.point .form-fade-section {
                            opacity: 0.35;
                        }

                        /* STEP 3: SPINE VERTICAL FOLD */
                        .origami-window-card.spine {
                            clip-path: polygon(46.8% 40%, 50% 45%, 53.2% 40%, 70% 50%, 70% 100%, 50% 100%, 30% 100%, 30% 50%);
                            transform: scale(0.66) rotateX(15deg);
                            transition: clip-path 0.52s cubic-bezier(0.34, 1.56, 0.64, 1),
                                        transform 0.52s cubic-bezier(0.34, 1.56, 0.64, 1);
                        }
                        .origami-window-card.spine .origami-spine-crease {
                            opacity: 1;
                        }
                        .origami-window-card.spine .form-fade-section {
                            opacity: 0.1;
                        }

                        /* STEP 4: WINGS FOLD INTO SUPERSONIC PAPER AIRPLANE */
                        .origami-window-card.wings,
                        .origami-window-card.launch,
                        .origami-window-card.flying,
                        .origami-window-card.done {
                            clip-path: polygon(46% 22%, 50% 3%, 54% 22%, 86% 70%, 64% 95%, 50% 85%, 36% 95%, 14% 70%);
                            transform: scale(0.46) rotateX(25deg);
                            transition: clip-path 0.5s cubic-bezier(0.25, 1, 0.35, 1),
                                        transform 0.5s cubic-bezier(0.25, 1, 0.35, 1);
                        }
                        .origami-window-card.wings .origami-spine-crease,
                        .origami-window-card.launch .origami-spine-crease,
                        .origami-window-card.flying .origami-spine-crease,
                        .origami-window-card.done .origami-spine-crease {
                            opacity: 1;
                        }
                        .origami-window-card.wings .form-fade-section,
                        .origami-window-card.launch .form-fade-section,
                        .origami-window-card.flying .form-fade-section,
                        .origami-window-card.done .form-fade-section {
                            opacity: 0;
                        }

                        /* STEP 5: LAUNCH PULLBACK */
                        .origami-window-card.launch {
                            transform: translateY(30px) scale(0.42) rotateX(20deg);
                            transition: transform 0.26s cubic-bezier(0.55, 0, 1, 0.45);
                        }

                        /* STEP 6 & 7: FLYING & DONE - STRICTLY INVISIBLE */
                        .origami-window-card.flying,
                        .origami-window-card.done {
                            opacity: 0 !important;
                            visibility: hidden !important;
                            pointer-events: none !important;
                        }

                        /* FLIGHT LINE & SVG STYLING */
                        .flight-trace-line {
                            fill: none;
                            stroke: #00f3ff;
                            stroke-width: 3;
                            stroke-linecap: round;
                            opacity: 0;
                            filter: drop-shadow(0 0 10px rgba(0, 243, 255, 0.9));
                        }

                        #flyingPlane {
                            filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 12px rgba(0, 243, 255, 0.5));
                        }
                    `}</style>
                </>
            )}
        </AnimatePresence>
    );
};
