"use client";

import { useState } from "react";
import styles from "./TransmissionFlow.module.css";

const PHASES = [
  {
    number: "01",
    title: "ENCODE",
    subtitle: "SIGNAL COMPOSITION",
    description:
      "Craft your raw, unfiltered signal. Every thought is a frequency waiting to be transmitted. No censorship. No filters. Pure signal.",
    detail:
      "Access the transmission terminal. Compose your message in plaintext. The system encodes it into a unique frequency signature tied to your Subject ID.",
    terminal: [
      "> initializing transmission protocol...",
      "> subject_id: SZL-0x7A3F",
      "> frequency_band: OPEN",
      "> status: AWAITING INPUT_",
    ],
  },
  {
    number: "02",
    title: "BROADCAST",
    subtitle: "FREQUENCY INJECTION",
    description:
      "Your transmission enters the collective frequency pool. The mainframe assigns a wavelength and propagates your signal across all active nodes.",
    detail:
      "Transmissions are broadcast on-chain, permanently timestamped and cryptographically signed. No deletion. No modification. Immutable signal.",
    terminal: [
      "> injecting signal into frequency pool...",
      "> wavelength assigned: 847.3 MHz",
      "> propagation: 12 ACTIVE NODES",
      "> broadcast: CONFIRMED ✓",
    ],
  },
  {
    number: "03",
    title: "RESONATE",
    subtitle: "COLLECTIVE AMPLIFICATION",
    description:
      "Active subjects receive your signal. Resonance occurs when others lock onto your frequency — amplifying reach across the network.",
    detail:
      "Other subjects can AMPLIFY your signal, boosting its priority in the feed. High-resonance transmissions surface to the top of the collective consciousness.",
    terminal: [
      "> scanning for resonance...",
      "> subjects_locked: 47",
      "> amplification_factor: 3.2x",
      "> status: RESONATING ◉",
    ],
  },
  {
    number: "04",
    title: "ARCHIVE",
    subtitle: "MAINFRAME INSCRIPTION",
    description:
      "Every transmission is permanently etched into the mainframe. Your signal becomes part of the collective memory — irreversible, eternal.",
    detail:
      "All transmissions are stored on-chain with full metadata: timestamp, subject ID, resonance count, and frequency signature. The archive grows forever.",
    terminal: [
      "> writing to mainframe...",
      "> block_hash: 0xA7F3...E91D",
      "> inscription: PERMANENT",
      "> status: ARCHIVED █",
    ],
  },
];

export function TransmissionFlow() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <div className={styles.flow}>
      <div className={styles.phases}>
        {PHASES.map((phase, i) => {
          const isActive = activePhase === i;
          return (
            <div
              key={phase.number}
              className={`${styles.phase} ${isActive ? styles.phaseActive : ""}`}
              onClick={() => setActivePhase(isActive ? null : i)}
            >
              <div className={styles.phaseHeader}>
                <div className={styles.phaseNumberBlock}>
                  <span className={styles.phaseNumber}>{phase.number}</span>
                  <div className={styles.phaseNumberLine} />
                </div>
                <div className={styles.phaseMeta}>
                  <span className={styles.phaseSubtitle}>{phase.subtitle}</span>
                  <h3 className={styles.phaseTitle}>{phase.title}</h3>
                </div>
                <div className={styles.phaseToggle}>
                  <span className={isActive ? styles.toggleActive : ""}>
                    {isActive ? "−" : "+"}
                  </span>
                </div>
              </div>

              <div className={`${styles.phaseBody} ${isActive ? styles.phaseBodyOpen : ""}`}>
                <p className={styles.phaseDesc}>{phase.description}</p>
                <div className={styles.phaseTerminal}>
                  {phase.terminal.map((line, j) => (
                    <span
                      key={j}
                      className={styles.termLine}
                      style={{ animationDelay: `${j * 0.15}s` }}
                    >
                      {line}
                    </span>
                  ))}
                </div>
                <p className={styles.phaseDetail}>{phase.detail}</p>
              </div>

              {i < PHASES.length - 1 && (
                <div className={styles.connector}>
                  <div className={styles.connectorLine} />
                  <div className={styles.connectorDot} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
