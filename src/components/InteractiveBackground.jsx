import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../hooks/useTheme';
import * as THREE from 'three';

const ParticleWave = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Use a premium purple/pink gradient color feel
  const color = isDark ? new THREE.Color("#c084fc") : new THREE.Color("#9333ea");
  
  const meshRef = useRef();
  const count = 75; // Number of particles along one axis
  const separation = 3;

  const [positions, scales] = useMemo(() => {
    const numParticles = count * count;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        positions[i * 3] = ix * separation - (count * separation) / 2; // x
        positions[i * 3 + 1] = 0; // y
        positions[i * 3 + 2] = iy * separation - (count * separation) / 2; // z
        scales[i] = 1;
        i++;
      }
    }
    return [positions, scales];
  }, [count, separation]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      let i = 0;
      const positions = meshRef.current.geometry.attributes.position.array;
      const scales = meshRef.current.geometry.attributes.scale.array;
      
      for (let ix = 0; ix < count; ix++) {
        for (let iy = 0; iy < count; iy++) {
          // Complex wave mathematics for organic movement
          const x = ix * separation - (count * separation) / 2;
          const z = iy * separation - (count * separation) / 2;
          
          positions[i * 3 + 1] = 
            (Math.sin((ix + time) * 0.3) * 4) +
            (Math.sin((iy + time) * 0.5) * 4) +
            (Math.cos((x * 0.1) + time) * 3);
          
          scales[i] = 
            (Math.sin((ix + time) * 0.3) + 1) * 3 +
            (Math.sin((iy + time) * 0.5) + 1) * 3;
            
          i++;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.attributes.scale.needsUpdate = true;
    }
  });

  const uniforms = useMemo(() => ({
    color: { value: color },
  }), [color]);

  return (
    <points ref={meshRef} position={[0, -10, -30]} rotation={[0.2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-scale" count={scales.length} array={scales} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          attribute float scale;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = scale * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          void main() {
            // Make particles circular
            if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
            gl_FragColor = vec4(color, 0.5);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const InteractiveBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const fogColor = isDark ? '#09090b' : '#fafafa';

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-500">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <fog attach="fog" args={[fogColor, 10, 80]} />
        <ParticleWave />
      </Canvas>
    </div>
  );
};

export default InteractiveBackground;
