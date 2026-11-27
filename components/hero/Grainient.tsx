'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/motion';

export interface GrainientProps {
  className?: string;
  /** Animation speed multiplier (kept slow and atmospheric by default) */
  speed?: number;
  /** Film grain intensity (subtle 35mm texture) */
  grain?: number;
  /** Overall aurora luminance intensity */
  intensity?: number;
  /** Enables restrained pointer influence on non-touch devices */
  mouseInteraction?: boolean;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_grain;
  uniform float u_intensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 3; i++) {
      v += amp * noise(p);
      p = p * 2.02 + vec2(17.1, 31.7);
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

    // Restrained pointer drift
    vec2 mouseOffset = (u_mouse - 0.5) * vec2(0.28, 0.2);
    float t = u_time;

    // Organic domain-warped gradient field
    vec2 q = vec2(
      fbm(p * 1.45 + vec2(t * 0.07, -t * 0.05) + mouseOffset),
      fbm(p * 1.45 + vec2(-t * 0.05, t * 0.08) + vec2(5.2, 1.3))
    );
    float f = fbm(p * 1.35 + 1.6 * q + vec2(t * 0.04, -t * 0.03));

    // Monochrome x Aurora palette (predominantly deep void #080808)
    vec3 voidColor = vec3(0.031, 0.031, 0.033);      // #080808
    vec3 deepViolet = vec3(0.22, 0.09, 0.42);        // muted #6D28D9
    vec3 electricViolet = vec3(0.42, 0.26, 0.72);    // muted #8B5CF6
    vec3 lavender = vec3(0.54, 0.44, 0.82);          // muted #A78BFA
    vec3 iceCyan = vec3(0.26, 0.62, 0.76);           // restrained #67D9FF

    vec3 aurora = mix(deepViolet, electricViolet, smoothstep(0.25, 0.68, f));
    aurora = mix(aurora, lavender, smoothstep(0.55, 0.85, q.x) * 0.55);
    aurora = mix(aurora, iceCyan, smoothstep(0.62, 0.94, q.y) * 0.35);

    // Soft elliptical vignette keeping edges deep black & center readable
    float dist = length(p * vec2(0.85, 1.15));
    float vignette = smoothstep(1.05, 0.15, dist);
    float auraMask = smoothstep(0.28, 0.88, f) * vignette;

    vec3 color = voidColor + aurora * auraMask * u_intensity;

    // Subtle 35mm procedural film grain
    float grainSample = (hash(gl_FragCoord.xy + fract(t * 0.5) * 120.0) - 0.5) * u_grain;
    color += grainSample;

    gl_FragColor = vec4(max(color, 0.0), 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function Grainient({
  className,
  speed = 0.32,
  grain = 0.026,
  intensity = 0.34,
  mouseInteraction = true,
}: GrainientProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      }) ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uGrain = gl.getUniformLocation(program, 'u_grain');
    const uIntensity = gl.getUniformLocation(program, 'u_intensity');

    let currentMouseX = 0.5;
    let currentMouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = prefersReducedMotion();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    if (mouseInteraction && !isTouch && !reduced) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const maxDpr = window.innerWidth < 768 ? 1.0 : 1.5;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let rafId: number | null = null;
    let isVisible = true;
    const startTime = performance.now();

    const renderFrame = (timeSeconds: number) => {
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, currentMouseX, currentMouseY);
      gl.uniform1f(uTime, timeSeconds);
      gl.uniform1f(uGrain, grain);
      gl.uniform1f(uIntensity, intensity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (reduced) {
      // Static atmospheric frame for reduced-motion users
      renderFrame(1.5);
    } else {
      const tick = (now: number) => {
        if (!isVisible) {
          rafId = null;
          return;
        }
        currentMouseX += (targetMouseX - currentMouseX) * 0.045;
        currentMouseY += (targetMouseY - currentMouseY) * 0.045;
        const elapsed = ((now - startTime) / 1000) * speed;
        renderFrame(elapsed);
        rafId = requestAnimationFrame(tick);
      };

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isVisible = Boolean(entry?.isIntersecting);
          if (isVisible && rafId === null) {
            rafId = requestAnimationFrame(tick);
          }
        },
        { threshold: 0.01 }
      );
      intersectionObserver.observe(canvas);
      rafId = requestAnimationFrame(tick);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        if (mouseInteraction && !isTouch) {
          window.removeEventListener('pointermove', handlePointerMove);
        }
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      };
    }

    return () => {
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [speed, grain, intensity, mouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full bg-void',
        className
      )}
    />
  );
}
