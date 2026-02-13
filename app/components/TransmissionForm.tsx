"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { buildMemoTransaction } from "../lib/solana";
import { getSubjectBySubjectId, postTransmission } from "../transmissions/actions";
import styles from "./TransmissionForm.module.css";

type TxStatus = "idle" | "signing" | "confirming" | "saving" | "success" | "error";

interface TransmissionFormProps {
  onPosted: () => void;
}

export function TransmissionForm({ onPosted }: TransmissionFormProps) {
  const { connection } = useConnection();
  const { publicKey, connected, sendTransaction } = useWallet();
  const [content, setContent] = useState("");
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [subjectDbId, setSubjectDbId] = useState<string | null>(null);
  const [subjectLabel, setSubjectLabel] = useState("UNKNOWN");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("szl-initiation");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSubjectLabel(parsed.subjectId || "UNKNOWN");
        getSubjectBySubjectId(parsed.subjectId).then((subject) => {
          if (subject) setSubjectDbId(subject.id);
        });
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!content.trim() || txStatus !== "idle" || !connected || !publicKey || !sendTransaction) return;

    setErrorMsg(null);

    try {
      // Build memo transaction
      setTxStatus("signing");
      const transaction = await buildMemoTransaction(connection, publicKey, content.trim());

      // Send transaction (triggers wallet popup)
      const signature = await sendTransaction(transaction, connection);

      // Wait for confirmation
      setTxStatus("confirming");
      await connection.confirmTransaction(signature, "confirmed");

      // Save to DB
      setTxStatus("saving");
      const result = await postTransmission(
        content.trim(),
        subjectDbId || undefined,
        signature,
        publicKey.toBase58()
      );

      if (result.error) {
        setTxStatus("error");
        setErrorMsg(result.error);
        return;
      }

      setTxStatus("success");
      setContent("");
      onPosted();

      setTimeout(() => setTxStatus("idle"), 2000);
    } catch (err) {
      setTxStatus("error");
      if (err instanceof Error) {
        if (err.message.includes("User rejected")) {
          setErrorMsg("TRANSMISSION CANCELLED BY USER");
        } else {
          setErrorMsg(err.message.slice(0, 100));
        }
      } else {
        setErrorMsg("UNKNOWN ERROR");
      }
      setTimeout(() => {
        setTxStatus("idle");
        setErrorMsg(null);
      }, 4000);
    }
  };

  const remaining = 280 - content.length;
  const isProcessing = txStatus !== "idle" && txStatus !== "success" && txStatus !== "error";

  const statusLabel: Record<TxStatus, string> = {
    idle: "TRANSMIT",
    signing: "SIGNING...",
    confirming: "CONFIRMING...",
    saving: "TRANSMITTING...",
    success: "TRANSMITTED",
    error: "FAILED",
  };

  if (!connected || !publicKey) {
    return (
      <div className={`${styles.form} ${styles.formDisabled}`}>
        <div className={styles.walletPrompt}>
          LINK WALLET TO TRANSMIT
        </div>
        <textarea
          className={styles.textarea}
          disabled
          placeholder="CONNECT YOUR WALLET TO BROADCAST..."
          rows={3}
        />
        <button className={styles.submitButton} disabled>
          TRANSMIT
        </button>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>
        <span className={styles.sender}>
          TRANSMITTING AS: <strong>{subjectLabel}</strong>
          {" (WALLET LINKED)"}
        </span>
        <span
          className={`${styles.charCount} ${remaining < 30 ? styles.charCountWarn : ""}`}
        >
          {remaining}
        </span>
      </div>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, 280))}
        placeholder="BROADCAST YOUR SIGNAL..."
        rows={3}
        disabled={isProcessing}
      />
      {errorMsg && (
        <div className={styles.errorMsg}>{errorMsg}</div>
      )}
      <div className={styles.formFooter}>
        {txStatus !== "idle" && txStatus !== "error" && (
          <span className={styles.txStatus}>
            <span className={styles.txStatusDot} />
            {statusLabel[txStatus]}
          </span>
        )}
        <button
          className={`${styles.submitButton} ${txStatus === "success" ? styles.submitButtonSuccess : ""} ${txStatus === "error" ? styles.submitButtonError : ""}`}
          onClick={handleSubmit}
          disabled={!content.trim() || isProcessing}
        >
          {statusLabel[txStatus]}
        </button>
      </div>
    </div>
  );
}
