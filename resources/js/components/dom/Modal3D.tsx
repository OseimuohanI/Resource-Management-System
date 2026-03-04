import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface Modal3DProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal3D({ isOpen, onClose, children }: Modal3DProps) {
    // Use a portal in a real app, but for simplicity here we just render inline.
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Scrim Drop */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="absolute inset-0 bg-black/40"
                        onClick={onClose}
                    />

                    {/* 3D Emergence Modal */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 20,
                            rotateX: 10,
                        }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20, rotateX: -10 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                        }}
                        style={{ perspective: 1000 }}
                        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-gray-800 p-6 shadow-2xl"
                    >
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
