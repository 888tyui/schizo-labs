"use client";

import { useState } from "react";
import styles from "./CopyBadge.module.css";

interface CopyBadgeProps {
  label: string;
  value: string;
}

export function CopyBadge({ label, value }: CopyBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className={styles.badge} onClick={handleCopy} title="Click to copy">
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      <span className={styles.copyHint}>{copied ? "COPIED" : "COPY"}</span>
    </button>
  );
}
