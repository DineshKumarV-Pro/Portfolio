'use client';

import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

export interface CinematicThreadsGrainientProps {
  isActive?: boolean;
  className?: string;
}

/**
 * Combines two layered generative atmospheres in Monochrome x Aurora:
 * 1. Grainient (WebGL fragment shader): organic noise-warped violet/cyan mist + 35mm film grain.
 * 2. Threads (2D anti-aliased ribbons): flowing harmonic silk threads weaving through the mist.
 */
export function CinematicThreadsGrainient({
  isActive = true,
  className = '',
}: CinematicThreadsGrainientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const threadsCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glCanvas = glCanvasRef.current;
    const threadsCanvas = threadsCanvasRef.current;
    if (!container || !glCanvas || !threadsCanvas) return;

    const reduced = prefersReducedMotion();
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    // ------------------------------------------------------------------------
    // 1. WebGL Grainient Setup
    // ------------------------------------------------------------------------
    const gl = glCanvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });

    let program: WebGLProgram | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;

    if (gl) {
      const vsSource = `
        attribute vec2 a_pos;
        void main() {
          gl_Position = vec4(a_pos, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision mediump float;
        uniform vec2 u_res;
        uniform vec2 u_mouse;
        uniform float u_time;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_res.xy;
          float t = u_time;
          vec2 p = uv * 2.1 + (u_mouse - 0.5) * 0.35;

          float n1 = noise(p + vec2(t * 0.06, -t * 0.04));
          float n2 = noise(p * 1.75 - vec2(t * 0.04, t * 0.07) + n1 * 0.85);

          vec3 voidCol = vec3(0.031, 0.031, 0.033); // #080808
          vec3 deepViolet = vec3(0.16, 0.06, 0.34);
          vec3 electricViolet = vec3(0.35, 0.21, 0.64);
          vec3 iceCyan = vec3(0.20, 0.54, 0.70);

          vec3 aurora = mix(deepViolet, electricViolet, n1);
          aurora = mix(aurora, iceCyan, smoothstep(0.56, 0.92, n2) * 0.48);

          // Restrained vignette so #080808 dominates edges and typography stays crisp
          float vignette = smoothstep(1.05, 0.18, distance(uv, vec2(0.54, 0.48)));
          vec3 col = voidCol + aurora * n2 * vignette * 0.30;

          // Subtle 35mm film grain
          float grain = (hash(gl_FragCoord.xy + fract(t) * 120.0) - 0.5) * 0.028;
          col += grain;

          gl_FragColor = vec4(col, 1.0);
        }
      `;

      const compileShader = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };

      const vs = compileShader(gl.VERTEX_SHADER, vsSource);
      const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);

      if (vs && fs) {
        program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vs);
          gl.attachShader(program, fs);
          gl.linkProgram(program);
          gl.useProgram(program);

          const buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
          );

          const aPos = gl.getAttribLocation(program, 'a_pos');
          gl.enableVertexAttribArray(aPos);
          gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

          uRes = gl.getUniformLocation(program, 'u_res');
          uMouse = gl.getUniformLocation(program, 'u_mouse');
          uTime = gl.getUniformLocation(program, 'u_time');
        }
      }
    }

    // ------------------------------------------------------------------------
    // 2. Canvas 2D Threads Setup
    // ------------------------------------------------------------------------
    const ctx2d = threadsCanvas.getContext('2d');

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      glCanvas.width = Math.floor(width * dpr);
      glCanvas.height = Math.floor(height * dpr);
      if (gl) {
        gl.viewport(0, 0, glCanvas.width, glCanvas.height);
      }

      threadsCanvas.width = Math.floor(width * dpr);
      threadsCanvas.height = Math.floor(height * dpr);
      if (ctx2d) {
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Smooth pointer state (disabled on coarse touch devices)
    let targetMx = 0.55;
    let targetMy = 0.48;
    let currentMx = 0.55;
    let currentMy = 0.48;

    const handlePointerMove = (e: PointerEvent) => {
      if (isCoarsePointer || reduced) return;
      const rect = container.getBoundingClientRect();
      targetMx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      targetMy = Math.min(1, Math.max(0, 1 - (e.clientY - rect.top) / rect.height));
    };

    if (!isCoarsePointer && !reduced) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    // Pause animation when hero is scrolled out of view
    let isInView = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    let rafId = 0;
    const startTime = performance.now();

    const drawFrame = (elapsedSec: number) => {
      // Draw Grainient
      if (gl && program) {
        gl.useProgram(program);
        gl.uniform2f(uRes, glCanvas.width, glCanvas.height);
        gl.uniform2f(uMouse, currentMx, currentMy);
        gl.uniform1f(uTime, elapsedSec);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      // Draw Threads (organic harmonic silk ribbons)
      if (ctx2d) {
        ctx2d.clearRect(0, 0, width, height);

        const threadCount = width < 640 ? 9 : 15;
        const step = width < 640 ? 22 : 16;
        const pointerShiftY = (0.5 - currentMy) * 44;
        const pointerShiftX = (currentMx - 0.5) * 0.9;

        for (let i = 0; i < threadCount; i++) {
          const norm = i / (threadCount - 1);
          const centerY = height * (0.34 + norm * 0.34);
          const amp = (14 + norm * 28) * (width < 640 ? 0.65 : 1);

          ctx2d.beginPath();
          for (let x = 0; x <= width; x += step) {
            const nx = x / width;
            const envelope = Math.sin(nx * Math.PI);
            const wave =
              Math.sin(nx * 4.2 + elapsedSec * 0.36 + i * 0.42 + pointerShiftX) * amp +
              Math.cos(nx * 7.5 - elapsedSec * 0.24 + i * 0.28) * (amp * 0.35);

            const y = centerY + (wave + pointerShiftY * (norm - 0.5)) * envelope;
            if (x === 0) ctx2d.moveTo(x, y);
            else ctx2d.lineTo(x, y);
          }

          // Restrained Monochrome x Aurora palette along threads
          if (i === Math.floor(threadCount * 0.5)) {
            ctx2d.strokeStyle = 'rgba(103, 217, 255, 0.24)';
            ctx2d.lineWidth = 1.15;
          } else if (i % 3 === 0) {
            ctx2d.strokeStyle = 'rgba(167, 139, 250, 0.16)';
            ctx2d.lineWidth = 0.95;
          } else if (i % 2 === 0) {
            ctx2d.strokeStyle = 'rgba(139, 92, 246, 0.11)';
            ctx2d.lineWidth = 0.85;
          } else {
            ctx2d.strokeStyle = 'rgba(245, 245, 245, 0.06)';
            ctx2d.lineWidth = 0.75;
          }

          ctx2d.stroke();
        }
      }
    };

    if (reduced) {
      drawFrame(1.4);
    } else {
      const renderLoop = (now: number) => {
        if (isInView && isActive) {
          currentMx += (targetMx - currentMx) * 0.05;
          currentMy += (targetMy - currentMy) * 0.05;
          drawFrame((now - startTime) * 0.001);
        }
        rafId = requestAnimationFrame(renderLoop);
      };
      rafId = requestAnimationFrame(renderLoop);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas
        ref={glCanvasRef}
        className="absolute inset-0 h-full w-full block"
      />
      <canvas
        ref={threadsCanvasRef}
        className="absolute inset-0 h-full w-full block"
      />
      {/* Bottom vignette blend into Void (#080808) for seamless section transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void via-void/70 to-transparent" />
    </div>
  );
}
