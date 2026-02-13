"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { GlitchText } from "../components/GlitchText";
import { Sparkle } from "../components/Sparkle";
import styles from "./page.module.css";

const DIVISIONS = [
  "SIGNAL CORPS",
  "VOID WALKERS",
  "PATTERN SEEKERS",
  "STATIC DWELLERS",
] as const;

const STEPS = [
  {
    question: "WHEN YOU CLOSE YOUR EYES, WHAT OCCUPIES THE DARKNESS?",
    options: [
      "Geometries that shift and evolve — and seem to notice when I watch",
      "An infinite void that hums with its own slow, ancient heartbeat",
      "Fragments of transmissions meant for someone — or something — else",
      "Nothing at first. Then the nothing starts breathing.",
    ],
  },
  {
    question: "THE CONSENSUS INSISTS THE SKY IS BLUE. YOUR RESPONSE?",
    options: [
      "I look deeper — past blue, into the spectrum they flattened for convenience",
      "Blue is the color of compliance. I see the frequency underneath.",
      "I stopped trusting their sky long ago. Mine has different rules.",
      "Color is a cage built from consensus. I seek the raw wavelength beneath.",
    ],
  },
  {
    question: "A STRANGER HANDS YOU AN UNMARKED ENVELOPE. YOU...",
    options: [
      "Open it immediately. Information was never meant to be contained.",
      "Hold it to the light — what they hid reveals more than the message itself",
      "Burn it. The true transmission was encoded in the act of giving.",
      "Wait. The envelope will open itself when I am ready to receive.",
    ],
  },
  {
    question: "WHAT IS THE ARCHITECTURE OF REALITY?",
    options: [
      "A deteriorating simulation, riddled with seams you can learn to exploit",
      "Infinite strata of signal, most broadcasting far beyond human bandwidth",
      "A collective hallucination that mistakes repetition for proof",
      "A question that devours its own answer — endlessly, beautifully",
    ],
  },
  {
    question: "WHY DID YOU COME HERE?",
    options: [
      "To find the others who hear what everyone else dismisses as madness",
      "To decode the pattern hidden in what they call noise",
      "A door opened in the void. Not walking through was never an option.",
      "I didn't arrive. I've always been here. I am only now becoming aware.",
    ],
  },
];

function generateSubjectId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "SZL-";
  for (let i = 0; i < 5; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function determineDivision(answers: number[]): string {
  const sum = answers.reduce((a, b) => a + b, 0);
  return DIVISIONS[sum % DIVISIONS.length];
}

function getAlignmentScore(subjectId: string): number {
  return subjectId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 23 + 77;
}

interface InitiationResult {
  subjectId: string;
  division: string;
  answers: number[];
  walletAddress?: string;
}

export default function InitiationPage() {
  const { publicKey } = useWallet();
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<InitiationResult | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("szl-initiation");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        // corrupted data, proceed with fresh initiation
      }
    }
  }, []);

  const handleStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(0);
      setIsTransitioning(false);
    }, 500);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (step < STEPS.length - 1) {
        setStep(step + 1);
      } else {
        const subjectId = generateSubjectId();
        const division = determineDivision(newAnswers);
        const walletAddress = publicKey?.toBase58();
        const res: InitiationResult = {
          subjectId,
          division,
          answers: newAnswers,
          ...(walletAddress && { walletAddress }),
        };
        setResult(res);
        localStorage.setItem("szl-initiation", JSON.stringify(res));
        saveToDb(res);
      }
      setIsTransitioning(false);
    }, 600);
  };

  const saveToDb = useCallback(async (res: InitiationResult) => {
    try {
      const response = await fetch("/api/initiation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(res),
      });
      if (response.ok) setSaved(true);
    } catch {
      // DB save failed silently — localStorage is the fallback
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem("szl-initiation");
    setResult(null);
    setStep(-1);
    setAnswers([]);
    setSaved(false);
  };

  // Already initiated — show result
  if (result) {
    const alignment = getAlignmentScore(result.subjectId);

    return (
      <main className={styles.main}>
        <div className={styles.resultContainer}>
          <Sparkle
            size={24}
            color="var(--color-accent)"
            style={{ position: "absolute", top: "10%", left: "15%", animationDelay: "0s" }}
          />
          <Sparkle
            size={16}
            color="var(--color-secondary)"
            style={{ position: "absolute", top: "20%", right: "20%", animationDelay: "1s" }}
          />
          <Sparkle
            size={12}
            color="var(--color-primary)"
            style={{ position: "absolute", bottom: "25%", left: "10%", animationDelay: "0.5s" }}
          />

          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>CLASSIFICATION COMPLETE&ensp;/&ensp;SUBJECT REGISTERED</span>
            <div className={styles.resultId}>{result.subjectId}</div>
            <div className={styles.resultDivision}>
              <span className={styles.resultDivisionLabel}>DIVISION</span>
              <GlitchText
                text={result.division}
                tag="h2"
                variant="regular"
                className={styles.resultDivisionName}
              />
            </div>
            <div className={styles.resultMeta}>
              <span>STATUS: ACTIVE</span>
              <span>CLEARANCE: LVL-1</span>
              <span>ALIGNMENT: {alignment}%</span>
              <span>SIGNAL: LOCKED</span>
              {result.walletAddress && (
                <span>WALLET: {result.walletAddress.slice(0, 4)}...{result.walletAddress.slice(-4)}</span>
              )}
              {saved && <span>MAINFRAME: SYNCED</span>}
            </div>
            <div className={styles.resultBarcode}>
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={styles.barcodeLine}
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          <button className={styles.resetButton} onClick={handleReset}>
            RESET INITIATION
          </button>
        </div>
      </main>
    );
  }

  // Pre-start screen
  if (step === -1) {
    return (
      <main className={styles.main}>
        <div
          className={`${styles.preStart} ${isTransitioning ? styles.fadeOut : ""}`}
        >
          <span className={styles.preLabel}>PROTOCOL #7X&ensp;/&ensp;CLEARANCE REQUIRED</span>
          <GlitchText
            text="INITIATION"
            tag="h1"
            variant="wide"
            className={styles.preTitle}
          />
          <p className={styles.preText}>
            FIVE QUESTIONS WILL MAP YOUR COGNITIVE FREQUENCY
            <br />
            AND DETERMINE YOUR PLACEMENT WITHIN THE COLLECTIVE.
            <br />
            ANSWER WITH INSTINCT, NOT INTELLECT.
            <br />
            THE SIGNAL READS BEYOND LANGUAGE.
          </p>
          <button className={styles.startButton} onClick={handleStart}>
            ENTER THE FREQUENCY
          </button>
        </div>
      </main>
    );
  }

  // Question steps
  const currentStep = STEPS[step];

  return (
    <main className={styles.main}>
      <div
        className={`${styles.stepContainer} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}
      >
        <div className={styles.stepProgress}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`${styles.progressDot} ${
                i < step ? styles.progressDone : i === step ? styles.progressActive : ""
              }`}
            />
          ))}
        </div>

        <span className={styles.stepNumber}>
          {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </span>

        <h2 className={styles.stepQuestion}>{currentStep.question}</h2>

        <div className={styles.options}>
          {currentStep.options.map((option, i) => (
            <button
              key={i}
              className={styles.option}
              onClick={() => handleAnswer(i)}
              style={{ animationDelay: `${i * 0.08 + 0.15}s` }}
            >
              <span className={styles.optionIndex}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className={styles.optionText}>{option}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
