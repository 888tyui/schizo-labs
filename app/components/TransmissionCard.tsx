import { getExplorerUrl, truncateAddress } from "../lib/solana";
import styles from "./TransmissionCard.module.css";

interface TransmissionCardProps {
  content: string;
  senderSubjectId?: string | null;
  senderDivision?: string | null;
  txSignature?: string | null;
  walletAddress?: string | null;
  createdAt: string;
  index: number;
}

export function TransmissionCard({
  content,
  senderSubjectId,
  senderDivision,
  txSignature,
  walletAddress,
  createdAt,
  index,
}: TransmissionCardProps) {
  const rotation = ((index * 7) % 5) - 2;
  const timeAgo = getTimeAgo(new Date(createdAt));

  return (
    <div
      className={styles.card}
      style={{
        transform: `rotate(${rotation}deg)`,
        animationDelay: `${(index % 10) * 0.05}s`,
      }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.senderId}>
          {senderSubjectId || "UNKNOWN"}
        </span>
        {senderDivision && (
          <span className={styles.division}>{senderDivision}</span>
        )}
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.cardFooter}>
        <div className={styles.onchainInfo}>
          {walletAddress && (
            <span className={styles.walletAddress}>
              {truncateAddress(walletAddress)}
            </span>
          )}
          {txSignature && (
            <a
              href={getExplorerUrl(txSignature)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.explorerLink}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              TX
            </a>
          )}
        </div>
        <span className={styles.timestamp}>{timeAgo}</span>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
