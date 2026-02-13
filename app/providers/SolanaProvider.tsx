"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { type ReactNode, useCallback, useMemo } from "react";
import type { Adapter, WalletError } from "@solana/wallet-adapter-base";

export function SolanaProvider({ children }: { children: ReactNode }) {
  const endpoint = useMemo(
    () =>
      process.env.SOLANA_RPC_URL || clusterApiUrl("devnet"),
    []
  );

  const onError = useCallback((error: WalletError, adapter?: Adapter) => {
    console.error("Wallet error:", error.name, error.message, adapter?.name);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
