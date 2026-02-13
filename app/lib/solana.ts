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

export function getExplorerUrl(
  txSignature: string,
  cluster: "devnet" | "mainnet-beta" = "devnet"
): string {
  const base = "https://explorer.solana.com/tx";
  const params = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`;
  return `${base}/${txSignature}${params}`;
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
