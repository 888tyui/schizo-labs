import styles from "./MarqueeStrip.module.css";

interface MarqueeStripProps {
  text: string;
  reversed?: boolean;
}

export function MarqueeStrip({ text, reversed = false }: MarqueeStripProps) {
  const repeated = text.repeat(10);
  return (
    <div className={`${styles.strip} ${reversed ? styles.reversed : ""}`}>
      <div className={styles.track}>
        <span className={styles.text}>{repeated}</span>
        <span className={styles.text} aria-hidden>{repeated}</span>
      </div>
    </div>
  );
}
