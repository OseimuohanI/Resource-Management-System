import { Environment, Float } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useMotionStore } from '../../store/useMotionStore';

export default function WebGLBackground() {
    const scrollProgress = useMotionStore((state) => state.scrollProgress);

    return (
        <div className="pointer-events-none fixed inset-0 -z-10">
            <Canvas
                dpr={[1, 1.5]}
                frameloop="demand"
                camera={{ position: [0, 0, 10], fov: 35 }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />

                    <Float
                        speed={1.5}
                        rotationIntensity={0.5}
                        floatIntensity={0.5}
                    >
                        <mesh position={[2, scrollProgress * -5, -5]}>
                            <icosahedronGeometry args={[1, 0]} />
                            <meshStandardMaterial
                                color="#1f2937"
                                wireframe
                                transparent={true}
                                opacity={0.15}
                            />
                        </mesh>
                        <mesh position={[-3, scrollProgress * 3 - 2, -8]}>
                            <octahedronGeometry args={[1.5, 0]} />
                            <meshStandardMaterial
                                color="#374151"
                                wireframe
                                transparent={true}
                                opacity={0.15}
                            />
                        </mesh>
                    </Float>

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
