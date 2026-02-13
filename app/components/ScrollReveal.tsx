"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  distance = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    requestAnimationFrame(() => {
      el.style.transition = `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          const cleanupTime = (delay + 0.9) * 1000 + 100;
          setTimeout(() => {
            el.style.transform = "";
            el.style.transition = "";
          }, cleanupTime);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, distance]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: `translateY(${distance}px)` }}
    >
      {children}
    </div>
  );
}
