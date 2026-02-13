"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./WalletButton.module.css";

function truncateAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { publicKey, wallets, select, connect, disconnect, connecting, connected } =
    useWallet();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!publicKey) return;
    await navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [publicKey]);

  const handleDisconnect = useCallback(async () => {
    await disconnect();
    setDropdownOpen(false);
  }, [disconnect]);

  const handleSelectWallet = useCallback(
    async (walletName: string) => {
      const wallet = wallets.find((w) => w.adapter.name === walletName);
      if (wallet) {
        select(wallet.adapter.name);
        try {
          await connect();
        } catch {
          // wallet selection triggers auto-connect via adapter
        }
      }
      setDropdownOpen(false);
    },
    [wallets, select, connect]
  );

  // Connecting state
  if (connecting) {
    return (
      <div className={styles.container}>
        <button className={`${styles.button} ${styles.connecting}`} disabled>
          <span className={styles.dot} />
          LINKING...
        </button>
      </div>
    );
  }

  // Connected state
  if (connected && publicKey) {
    return (
      <div className={styles.container} ref={containerRef}>
        <button
          className={`${styles.button} ${styles.connected}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className={styles.dotActive} />
          {truncateAddress(publicKey.toBase58())}
        </button>
        {dropdownOpen && (
          <div className={styles.dropdown}>
            <button className={styles.dropdownItem} onClick={handleCopy}>
              {copied ? "COPIED !" : "COPY ADDRESS"}
            </button>
            <button
              className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
              onClick={handleDisconnect}
            >
              DISCONNECT
            </button>
          </div>
        )}
      </div>
    );
  }

  // Disconnected state — show wallet list or connect button
  const detectedWallets = wallets.filter(
    (w) => w.readyState === "Installed"
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={styles.button}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className={styles.dot} />
        LINK WALLET
      </button>
      {dropdownOpen && (
        <div className={styles.dropdown}>
          {detectedWallets.length === 0 ? (
            <div className={styles.dropdownEmpty}>
              NO WALLETS DETECTED
            </div>
          ) : (
            detectedWallets.map((wallet) => (
              <button
                key={wallet.adapter.name}
                className={styles.dropdownItem}
                onClick={() => handleSelectWallet(wallet.adapter.name)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wallet.adapter.icon}
                  alt=""
                  className={styles.walletIcon}
                />
                {wallet.adapter.name.toUpperCase()}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
