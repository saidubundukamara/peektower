"use client";

import { useEffect, useRef } from "react";
import { createApertures } from "@/components/world/apertures";
import { createGovernor, createRig } from "@/components/world/rig";
import { buildScene } from "@/components/world/scene";
import {
  resolveTier,
  tierAnimates,
  tierDprCap,
  tierLoadsThree,
} from "@/components/world/tier";

/**
 * The world behind the page.
 *
 * One fixed canvas for the whole document, mounted once from the layout. The
 * page scrolls the camera through a single scene; the light sections paint over
 * it, and it is seen only where the page opens a hole.
 *
 * Guard order matters. The tier is resolved before three is fetched, so a
 * visitor on a metered connection never pays for a renderer they will not see —
 * `app/globals.css` records why that is a first-class case here rather than an
 * edge one.
 */
export function PeekTowerWorld() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const tier = resolveTier();
    document.documentElement.dataset.worldTier = tier;
    if (!tierLoadsThree(tier)) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    void import("three")
      .then((T) => {
        if (cancelled) return;

        const vp = () => ({
          // clientWidth, not innerWidth: on mobile the initial containing block
          // can run wider than the visual viewport, and sizing from innerWidth
          // renders a frame wider than the phone actually shows.
          w: document.documentElement.clientWidth || window.innerWidth,
          h: document.documentElement.clientHeight || window.innerHeight,
        });

        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new T.WebGLRenderer({
            antialias: tier === "full",
            alpha: false,
            powerPreference: tier === "full" ? "high-performance" : "low-power",
          });
        } catch {
          // No context. The CSS signal rings in the hero stay exactly as they
          // are, which is the documented permanent state for this case.
          document.documentElement.dataset.worldTier = "none";
          return;
        }

        renderer.outputColorSpace = T.SRGBColorSpace;
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.autoClear = false;
        host.appendChild(renderer.domElement);

        const world = buildScene(T);
        const rig = createRig(T, vp);
        const apertures = createApertures(T);
        const governor = createGovernor();

        const animates = tierAnimates(tier);
        const dprCap = tierDprCap(tier);

        const sizeRenderer = () => {
          const { w, h } = vp();
          renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, dprCap) * governor.scale,
          );
          renderer.setSize(w, h, true);
        };

        const resize = () => {
          sizeRenderer();
          rig.measure();
          apertures.layout();
          if (!running) drawOnce();
        };


        const drawFrame = () => {
          const { w, h } = vp();
          renderer.setViewport(0, 0, w, h);
          renderer.setScissorTest(false);
          renderer.clear(true, true, false);
          rig.apply();
          renderer.render(world.scene, rig.camera);
          apertures.render(renderer, world.scene, h);
        };

        /**
         * The resting frame: one settled image, no loop.
         *
         * `snap` moves the camera to wherever the page currently sits, and is
         * only ever passed at start-up — a deep link should open on its own
         * chapter. After that the reduced-motion camera stays put: repainting
         * here keeps the apertures registered to elements that have scrolled,
         * it is not licence to fly the camera on scroll.
         */
        const drawOnce = (snap = false) => {
          if (snap) rig.step(0, true);
          world.update(6, rig.progress);
          drawFrame();
        };

        let running = false;
        let raf = 0;
        let last = 0;
        let clock = 0;

        const tick = (now: number) => {
          if (!last) last = now;
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          clock += dt;

          if (governor.sample(dt)) sizeRenderer();

          rig.step(dt, false);
          world.update(clock, rig.progress);
          drawFrame();
          raf = requestAnimationFrame(tick);
        };

        const stop = () => {
          if (!running) return;
          running = false;
          cancelAnimationFrame(raf);
        };

        const play = () => {
          if (running || !animates || document.hidden) return;
          running = true;
          // Resume rather than replay: the opening burst should not restart
          // every time the tab comes back.
          last = 0;
          raf = requestAnimationFrame(tick);
        };

        // The world is the page's subject, so reduced motion keeps the scene and
        // drops the movement, rather than removing it entirely.
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onReduced = () => {
          if (reduced.matches) {
            stop();
            drawOnce(true);
          } else {
            play();
          }
        };

        const onVisibility = () => (document.hidden ? stop() : play());

        const onScroll = () => {
          apertures.layout();
          if (!running) drawOnce();
        };

        const onPointer = (e: PointerEvent) => {
          const { w, h } = vp();
          rig.setPointer((e.clientX / w) * 2 - 1, -((e.clientY / h) * 2 - 1));
        };

        sizeRenderer();
        apertures.collect();
        rig.measure();
        host.dataset.gl = "on";
        document.documentElement.dataset.world = "live";

        drawOnce(true);
        if (animates) play();

        window.addEventListener("resize", resize, { passive: true });
        window.addEventListener("orientationchange", resize, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
        reduced.addEventListener("change", onReduced);
        if (animates) window.addEventListener("pointermove", onPointer, { passive: true });

        // Sections settle after fonts and images land; re-measure once they do.
        const ro = new ResizeObserver(resize);
        ro.observe(document.body);

        teardown = () => {
          stop();
          window.removeEventListener("resize", resize);
          window.removeEventListener("orientationchange", resize);
          window.removeEventListener("scroll", onScroll);
          document.removeEventListener("visibilitychange", onVisibility);
          reduced.removeEventListener("change", onReduced);
          window.removeEventListener("pointermove", onPointer);
          ro.disconnect();
          apertures.dispose();
          world.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
          delete host.dataset.gl;
          delete document.documentElement.dataset.world;
        };
      })
      .catch(() => {
        document.documentElement.dataset.worldTier = "none";
      });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return <div ref={hostRef} className="world-canvas" aria-hidden="true" />;
}
