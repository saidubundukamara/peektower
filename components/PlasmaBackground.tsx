"use client";

import { useEffect, useRef } from "react";
import { resolveTier } from "@/components/world/tier";

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/**
 * Concentric arcs travelling outward from the tower mast: the company is
 * PeekTower and the positioning is "the digital infrastructure Sierra Leone
 * runs on", so the hero broadcasts. It arrives as a burst and settles into a
 * resting glow rather than looping, which keeps it an authored moment instead
 * of ambient wallpaper (and avoids WCAG 2.2.2).
 */
const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;        // seconds since first frame
  uniform float uIntro;       // 0 -> 1 over the first ~1.2s
  uniform vec2  uResolution;
  uniform vec2  uOrigin;      // mast tip, GL space (y already flipped)
  uniform vec2  uPointer;
  uniform vec3  uColor;

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2  uv = gl_FragCoord.xy / uResolution;

    // Pointer only nudges the origin. A field that follows the cursor reads as
    // a toy; a field that drifts slightly reads as physical.
    vec2  o = uOrigin + (uPointer - 0.5) * 0.02;
    vec2  d = (uv - o) * vec2(aspect, 1.0);
    float r = length(d);

    float rings = 0.5 + 0.5 * sin((r * 8.0 - uTime * 0.5) * 6.28318);
    float arc   = pow(rings, 18.0);          // thin bright arcs, not a plasma haze

    float burst = exp(-uTime * 0.30);        // arrival, then settle
    float amp   = mix(0.20, 1.0, burst) * uIntro;

    float fall  = exp(-r * 2.0);             // dies out before it reaches the copy
    float core  = 0.03 / max(0.05, r);       // glow at the mast itself

    // Bias the energy down and left, across the headline, so the field reads as
    // a sweep with a direction rather than a bullseye.
    float dir = smoothstep(-0.3, 0.8, dot(normalize(d + 1e-5), vec2(-0.82, -0.5)));

    float a = clamp((arc * fall * (0.30 + 0.70 * dir) + core * 0.5) * amp, 0.0, 0.9);
    gl_FragColor = vec4(uColor * (arc * 1.5 + core * 2.0), a);
  }
`;

const INTRO_MS = 1200;

/**
 * Origin of the arcs, in GL space (y measured from the bottom).
 *
 * Measured off the rendered mark rather than re-derived from the CSS custom
 * properties: the mast tip is 48% across the SVG and the height is clamped
 * against the viewport, so recomputing it here would be two sources of truth
 * for one point.
 */
function readOrigin(container: HTMLElement): [number, number] {
  const tower = container.parentElement?.querySelector(".signal-tower");
  const bounds = container.getBoundingClientRect();
  if (!tower || bounds.width === 0 || bounds.height === 0) return [0.76, 0.8];

  const mark = tower.getBoundingClientRect();
  const x = (mark.left + mark.width * 0.48 - bounds.left) / bounds.width;
  const y = (mark.top - bounds.top) / bounds.height;
  return [x, 1 - y];
}

export function PlasmaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // This shader is now the constrained tier of the tower world: it runs where
    // three would be too much to ask for, and nowhere else. Anything richer gets
    // the modelled scene instead, and anything poorer keeps the CSS rings — so
    // in both of those cases ogl is never fetched either.
    if (resolveTier() !== "constrained") return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    // ogl is ~40KB and only ever runs here, so keep it out of the entry chunk.
    void import("ogl")
      .then(({ Color, Mesh, Program, Renderer, Triangle }) => {
        if (cancelled) return;

        let renderer: InstanceType<typeof Renderer>;
        try {
          renderer = new Renderer({
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
            // Full-screen fragment shader: dpr 2 on a wide hero is ~5M frags a
            // frame for no visible gain on a field this soft.
            dpr: Math.min(window.devicePixelRatio, 1.5),
          });
        } catch {
          return; // no WebGL — the CSS fallback in globals.css stays visible
        }

        const gl = renderer.gl;
        if (!gl) return;

        gl.clearColor(0, 0, 0, 0);
        container.appendChild(gl.canvas);

        // Only now is the fallback safe to hide.
        container.dataset.gl = "on";

        const styles = getComputedStyle(document.documentElement);
        const brandColor = styles.getPropertyValue("--brand").trim() || "#00bfff";

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex,
          fragment,
          transparent: true,
          uniforms: {
            uTime: { value: 0 },
            uIntro: { value: 0 },
            uResolution: { value: [1, 1] },
            uOrigin: { value: [0.76, 0.8] },
            uPointer: { value: [0.5, 0.5] },
            uColor: { value: new Color(brandColor) },
          },
        });

        // The single biggest reason the old field looked dead: standard alpha
        // blending makes cyan sit flat on ink. Additive makes it emit.
        program.setBlendFunc(gl.SRC_ALPHA, gl.ONE);

        const mesh = new Mesh(gl, { geometry, program });

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        let running = false;
        let onScreen = true;
        let start = 0;
        let targetX = 0.5;
        let targetY = 0.5;
        let currentX = 0.5;
        let currentY = 0.5;

        const drawStatic = () => {
          // Settled state: burst already decayed, no arcs sweeping.
          program.uniforms.uTime.value = 8;
          program.uniforms.uIntro.value = 1;
          program.uniforms.uPointer.value = [0.5, 0.5];
          renderer.render({ scene: mesh });
        };

        const resize = () => {
          const { width, height } = container.getBoundingClientRect();
          if (width === 0 || height === 0) return;
          renderer.setSize(width, height);
          program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
          program.uniforms.uOrigin.value = readOrigin(container);
          // Previously the static path never re-rendered, so resizing under
          // reduced motion left a blank canvas.
          if (!running) drawStatic();
        };

        const render = (now: number) => {
          if (!start) start = now;
          const elapsed = (now - start) / 1000;

          currentX += (targetX - currentX) * 0.05;
          currentY += (targetY - currentY) * 0.05;

          program.uniforms.uPointer.value = [currentX, currentY];
          program.uniforms.uTime.value = elapsed;
          program.uniforms.uIntro.value = Math.min(1, ((now - start) / INTRO_MS) ** 0.6);
          renderer.render({ scene: mesh });
          frame = requestAnimationFrame(render);
        };

        const stop = () => {
          if (!running) return;
          running = false;
          cancelAnimationFrame(frame);
        };

        const play = () => {
          if (running || reducedMotion.matches || !onScreen || document.hidden) return;
          running = true;
          // Resume where it left off rather than replaying the burst.
          start = performance.now() - (program.uniforms.uTime.value as number) * 1000;
          frame = requestAnimationFrame(render);
        };

        const onPointerMove = (event: PointerEvent) => {
          targetX = event.clientX / window.innerWidth;
          targetY = 1 - event.clientY / window.innerHeight;
        };

        // The hero is 100svh, so it leaves the viewport almost immediately.
        // Without this the shader burned GPU for the whole page.
        const visibility = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            if (onScreen) play();
            else stop();
          },
          { threshold: 0 },
        );

        const onVisibilityChange = () => (document.hidden ? stop() : play());

        const onMotionPreferenceChange = () => {
          if (reducedMotion.matches) {
            stop();
            drawStatic();
          } else {
            play();
          }
        };

        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(container);
        visibility.observe(container);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.addEventListener("visibilitychange", onVisibilityChange);
        reducedMotion.addEventListener("change", onMotionPreferenceChange);

        resize();
        if (reducedMotion.matches) drawStatic();
        else play();

        teardown = () => {
          stop();
          sizeObserver.disconnect();
          visibility.disconnect();
          window.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("visibilitychange", onVisibilityChange);
          reducedMotion.removeEventListener("change", onMotionPreferenceChange);
          delete container.dataset.gl;
          gl.canvas.remove();
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
      })
      .catch(() => {
        /* leave the CSS fallback visible */
      });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return <div ref={containerRef} className="hero-plasma" aria-hidden="true" />;
}
