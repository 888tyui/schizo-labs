"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatsCounter.module.css";

interface StatsCounterProps {
  label: string;
  end: number;
  symbol?: string;
}

export function StatsCounter({ label, end, symbol = "" }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={ref} className={styles.counter}>
      <div className={styles.numberRow}>
        <span className={`${styles.number} ${isVisible && count < end ? styles.counting : ""}`}>{count.toLocaleString()}</span>
        {symbol && <span className={styles.symbol}>{symbol}</span>}
      </div>
      <div className={styles.labelRow}>
        <div className={styles.labelDot} />
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
