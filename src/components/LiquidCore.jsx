import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  uniform vec2 uMouse;

  varying vec2 vUv;
  varying float vDistortion;
  varying vec3 vNormal;

  // 3D Simplex Noise Function (Ashima Arts)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    float t = uTime * uSpeed;
    
    float noise = snoise(position * uNoiseDensity + t);
    float distortion = noise * uNoiseStrength;
    
    // Calculate distance to mouse for bulge effect
    // Transform position to clip space to compare with normalized mouse
    vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec2 ndcPos = clipPos.xy / clipPos.w;
    float distToMouse = distance(ndcPos, uMouse);
    float bulge = smoothstep(1.0, 0.0, distToMouse) * 0.8;
    
    vec3 newPosition = position + normal * (distortion + bulge);
    vDistortion = distortion + bulge;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  varying vec2 vUv;
  varying float vDistortion;
  varying vec3 vNormal;

  void main() {
    // Holographic / Iridescent liquid aesthetic
    float intensity = vDistortion * 2.0;
    
    // Fake rim lighting based on normal
    float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    rim = smoothstep(0.6, 1.0, rim);
    
    vec3 finalColor = mix(uColor1, uColor2, intensity + rim);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const LiquidCore = () => {
  const meshRef = useRef();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: 0.2 },
    uNoiseDensity: { value: 1.5 },
    uNoiseStrength: { value: 0.4 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color("#000000") }, // Deep Black
    uColor2: { value: new THREE.Color("#ffffff") }, // Stark White
  }), []);

  // Track raw mouse for lerping
  const targetMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to -1 to +1
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isVisible = useRef(true);
  useEffect(() => {
    const handleScroll = () => {
      // Pause updates if scrolled past ~3 viewport heights (past Projects)
      isVisible.current = window.scrollY < window.innerHeight * 3;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!isVisible.current) return; // Skip heavy updates to save CPU/GPU overhead
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = time;
      
      // Lerp mouse for smooth liquid reaction
      meshRef.current.material.uniforms.uMouse.value.x += (targetMouse.current.x - meshRef.current.material.uniforms.uMouse.value.x) * 0.05;
      meshRef.current.material.uniforms.uMouse.value.y += (targetMouse.current.y - meshRef.current.material.uniforms.uMouse.value.y) * 0.05;
      
      // Parallax rotation based on mouse
      meshRef.current.rotation.y = time * 0.1 + meshRef.current.material.uniforms.uMouse.value.x * 0.5;
      meshRef.current.rotation.x = meshRef.current.material.uniforms.uMouse.value.y * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

export default LiquidCore;
