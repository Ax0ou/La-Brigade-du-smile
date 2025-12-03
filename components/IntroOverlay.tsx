'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function IntroOverlay() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Lock body scroll on mount
        document.body.style.overflow = 'hidden';

        // Start animation faster (1s instead of 2s)
        const animationTimer = setTimeout(() => {
            setIsAnimating(true);
            // Unlock body scroll when animation starts
            document.body.style.overflow = 'auto';
        }, 1000);

        // Hide overlay completely after animation completes
        const hideTimer = setTimeout(() => {
            setIsHidden(true);
        }, 2000); // 1s delay + 1s animation duration

        // Cleanup
        return () => {
            clearTimeout(animationTimer);
            clearTimeout(hideTimer);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div
            className={`intro-overlay ${isAnimating ? 'intro-overlay--animating' : ''} ${isHidden ? 'is-hidden' : ''
                }`}
            aria-hidden={isHidden}
        >
            <div className="intro-overlay__content">
                <Image
                    src="/Lbds_logo.svg"
                    alt="La Brigade du Sourire"
                    width={200}
                    height={200}
                    priority
                    className="intro-overlay__logo"
                />
            </div>
        </div>
    );
}
