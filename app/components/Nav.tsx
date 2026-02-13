"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";
import { WalletButton } from "./WalletButton";

const links = [
  { href: "/", label: "HOME" },
  { href: "/initiation", label: "INITIATION" },
  { href: "/transmissions", label: "TRANSMISSIONS" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        SZL
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${
              pathname === link.href ? styles.active : ""
            }`}
            data-text={link.label}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className={styles.navRight}>
        <div className={styles.socials}>
          <a
            href="https://x.com/Schizo_Labs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="X (Twitter)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://x.com/i/communities/2022396299467981270/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Community"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </a>
        </div>
        <WalletButton />
      </div>
    </nav>
  );
}
