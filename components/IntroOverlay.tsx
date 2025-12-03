'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function IntroOverlay() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Lock body scroll on mount
        document.body.style.overflow = 'hidden';

        // Start animation after a short delay (adjust timing as needed)
        const animationTimer = setTimeout(() => {
            setIsAnimating(true);
            // Unlock body scroll when animation starts
            document.body.style.overflow = 'auto';
        }, 2000); // 2 seconds before curtain starts lifting

        // Hide overlay completely after animation completes
        const hideTimer = setTimeout(() => {
            setIsHidden(true);
        }, 3000); // 2s delay + 1s animation duration

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
