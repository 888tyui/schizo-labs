import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

export async function buildMemoTransaction(
  connection: Connection,
  publicKey: PublicKey,
  message: string
): Promise<Transaction> {
  const transaction = new Transaction();
  transaction.add(createMemoInstruction(message, [publicKey]));

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");
  transaction.recentBlockhash = blockhash;
  transaction.lastValidBlockHeight = lastValidBlockHeight;
  transaction.feePayer = publicKey;

  return transaction;
}

export function getSolanaCluster(): "mainnet-beta" | "devnet" {
  const rpcUrl = process.env.SOLANA_RPC_URL || "";
  if (rpcUrl.includes("mainnet")) return "mainnet-beta";
  return "devnet";
}

export function getExplorerUrl(txSignature: string): string {
  const cluster = getSolanaCluster();
  const base = "https://explorer.solana.com/tx";
  const params = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`;
  return `${base}/${txSignature}${params}`;
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
