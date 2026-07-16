"use client";

import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec3 uColor;

  float wave(vec2 point, float phase) {
    float first = sin(point.x * 2.2 + phase + sin(point.y * 1.7 - phase * .7));
    float second = cos(point.y * 2.8 - phase * .8 + sin(point.x * 1.3 + phase));
    return first + second;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
    vec2 pointer = (uPointer - .5) * vec2(.7, .45);
    uv -= pointer;

    float t = uTime * .26;
    float field = wave(uv * .9, t);
    field += .55 * wave((uv + vec2(field * .09)) * 1.7, -t * 1.25);

    float ribbon = smoothstep(.32, 0.0, abs(field) * .18 + abs(uv.y + .08));
    float halo = .11 / max(.08, length(uv * vec2(.72, 1.2)));
    float edge = smoothstep(1.45, .15, length(uv));
    float alpha = clamp((ribbon * .34 + halo * .40) * edge, 0.0, .52);

    gl_FragColor = vec4(uColor * (ribbon + halo * 1.8), alpha);
  }
`;

export function PlasmaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const brandColor = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim() || "#00bfff";

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uPointer: { value: [0.72, 0.3] },
        uColor: { value: new Color(brandColor) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    let frame = 0;
    let targetX = 0.72;
    let targetY = 0.3;
    let currentX = targetX;
    let currentY = targetY;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX / window.innerWidth;
      targetY = 1 - event.clientY / window.innerHeight;
    };

    const render = (time: number) => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      program.uniforms.uPointer.value = [currentX, currentY];
      program.uniforms.uTime.value = reducedMotion.matches ? 0 : time * 0.001;
      renderer.render({ scene: mesh });
      if (!reducedMotion.matches) frame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="hero-plasma" aria-hidden="true" />;
}
