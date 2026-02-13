interface SparkleProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Sparkle({
  size = 24,
  color = "var(--color-accent)",
  className = "",
  style = {},
}: SparkleProps) {
  return (
    <svg
      className={className}
      style={{
        animation: "sparkle-rotate 4s linear infinite",
        ...style,
      }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill={color}
      />
    </svg>
  );
}
