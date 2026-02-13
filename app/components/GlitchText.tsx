import styles from "./GlitchText.module.css";

interface GlitchTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "span" | "p";
  variant?: "wide" | "regular" | "narrow";
  className?: string;
}

export function GlitchText({
  text,
  tag: Tag = "h1",
  variant = "wide",
  className = "",
}: GlitchTextProps) {
  const fontClass =
    variant === "wide"
      ? styles.fontWide
      : variant === "narrow"
      ? styles.fontNarrow
      : styles.fontRegular;

  return (
    <Tag
      className={`${styles.glitch} ${fontClass} ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
