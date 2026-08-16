'use client';

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export function RobotModel({ isWalking = true, ...props }: any) {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF('/robot_walking_animated_loop.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // Find the animation action. It's usually the first one or named something specific.
        const actionNames = Object.keys(actions);
        if (actionNames.length > 0) {
            const walkAction = actions[actionNames[0]];
            if (walkAction) {
                if (isWalking) {
                    walkAction.reset().fadeIn(0.2).play();
                } else {
                    walkAction.fadeOut(0.2);
                }
            }
        }
    }, [isWalking, actions]);

    // Clone the scene so it can be mounted cleanly
    const clonedScene = React.useMemo(() => scene.clone(), [scene]);

    return (
        <group ref={group} {...props} dispose={null}>
            {/* The model is likely huge or tiny depending on export, safe scale to start, and tweak position */}
            <primitive object={clonedScene} scale={1.5} position={[0, -2, 0]} />
        </group>
    );
}

useGLTF.preload('/robot_walking_animated_loop.glb');
