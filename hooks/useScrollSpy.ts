"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of `ids` is currently in the middle band of the viewport.
 *
 * Resolves by document order rather than by whichever entry happens to arrive
 * first in an observer batch — with several sections intersecting at once the
 * batch order is not meaningful. Keeps the last match when nothing is in the
 * band (it is only 5% of the viewport tall) so the nav does not flicker off
 * between sections.
 */
export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0 || !("IntersectionObserver" in window)) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }

        const firstInDocumentOrder = elements.find((el) => intersecting.has(el.id));
        if (firstInDocumentOrder) setActiveId(firstInDocumentOrder.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
