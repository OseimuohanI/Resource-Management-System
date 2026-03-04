import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth the mouse values (heavier, more premium feel)
    const mouseX = useSpring(x, { stiffness: 150, damping: 40 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 40 });

    // Map mouse position to limited rotation values (-7deg to 7deg)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['7deg', '-7deg']);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-7deg', '7deg']);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Normalize coordinates from -0.5 to 0.5
        const mouseXPos = (event.clientX - rect.left) / width - 0.5;
        const mouseYPos = (event.clientY - rect.top) / height - 0.5;

        x.set(mouseXPos);
        y.set(mouseYPos);
    }

    return (
        <div
            style={{ perspective: 1200 }}
            className="group relative h-full w-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className={`rounded-xl border border-slate-200/50 bg-white/50 p-6 shadow-2xl backdrop-blur-md transition-colors will-change-transform hover:bg-slate-50/80 dark:bg-slate-900/50 dark:hover:bg-slate-800/80 ${className}`}
            >
                <div
                    style={{ transform: 'translateZ(8px)' }}
                    className="h-full"
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
