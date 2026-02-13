"use client";

import { useCallback, useEffect, useState } from "react";
import { GlitchText } from "../components/GlitchText";
import { TransmissionCard } from "../components/TransmissionCard";
import { TransmissionForm } from "../components/TransmissionForm";
import { getTransmissions } from "./actions";
import styles from "./page.module.css";

interface TransmissionData {
  id: string;
  content: string;
  txSignature: string | null;
  walletAddress: string | null;
  createdAt: Date;
  subject: {
    subjectId: string;
    division: string;
  } | null;
}

export default function TransmissionsPage() {
  const [transmissions, setTransmissions] = useState<TransmissionData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransmissions = useCallback(async () => {
    const data = await getTransmissions();
    setTransmissions(data as TransmissionData[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTransmissions();
  }, [loadTransmissions]);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>OPEN CHANNEL</span>
        <GlitchText
          text="TRANSMISSIONS"
          tag="h1"
          variant="regular"
          className={styles.title}
        />
        <p className={styles.subtitle}>
          UNFILTERED BROADCASTS FROM THE COLLECTIVE UNCONSCIOUS.
          <br />
          EACH TRANSMISSION IS ETCHED INTO THE MAINFRAME
          <br />
          — PERMANENT, IMMUTABLE, IRREVERSIBLE.
        </p>
      </div>

      <div className={styles.formWrapper}>
        <TransmissionForm onPosted={loadTransmissions} />
      </div>

      <div className={styles.feed}>
        {loading ? (
          <div className={styles.loading}>
            <span className={styles.loadingDot} />
            SCANNING FREQUENCIES...
          </div>
        ) : transmissions.length === 0 ? (
          <div className={styles.empty}>
            NO TRANSMISSIONS DETECTED. BE THE FIRST SIGNAL.
          </div>
        ) : (
          <div className={styles.grid}>
            {transmissions.map((t, i) => (
              <TransmissionCard
                key={t.id}
                content={t.content}
                senderSubjectId={t.subject?.subjectId}
                senderDivision={t.subject?.division}
                txSignature={t.txSignature}
                walletAddress={t.walletAddress}
                createdAt={t.createdAt.toString()}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
