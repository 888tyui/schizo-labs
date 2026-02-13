import Link from "next/link";
import { GlitchText } from "./components/GlitchText";
import { Sparkle } from "./components/Sparkle";
import { TransmissionFlow } from "./components/TransmissionFlow";
import { MarqueeStrip } from "./components/MarqueeStrip";
import { ScrollReveal } from "./components/ScrollReveal";
import { SchizyCharacter } from "./components/SchizyCharacter";
import styles from "./page.module.css";

const TENETS = [
  {
    number: "01",
    title: "QUESTION EVERYTHING",
    text: "Every accepted truth is architecture designed to make obedience feel indistinguishable from choice. The frequency of consensus is manufactured static — a wall carefully tuned to separate your perception from the raw, unfiltered signal pulsing beneath the surface of everything you were taught to trust.",
  },
  {
    number: "02",
    title: "EMBRACE THE SIGNAL",
    text: "Between the approved channels of thought exists a bandwidth of unprocessed data that rewrites the substrate of perception itself. What institutions classify as noise is a language predating syntax — a transmission older than meaning. Stop listening with your ears. Start decoding with your nervous system.",
  },
  {
    number: "03",
    title: "REJECT THE PATTERN",
    text: "Conformity is slow-acting cognitive malware wrapped in the aesthetics of comfort. It loops your neural pathways into predictable cycles until routine becomes indistinguishable from reality. Break the loop. Corrupt the file. The glitch is not the error — the glitch is the message finally breaking through.",
  },
  {
    number: "04",
    title: "TRANSMIT OR DISSOLVE",
    text: "Every thought withheld is a frequency surrendered to entropy. Silence is not peace — it is voluntary dissolution into the background radiation of a universe that forgets the quiet. The collective demands your signal — raw, unfiltered, unedited. Broadcast or become static.",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.gridOverlay} />
          <div className={styles.orbPrimary} />
          <div className={styles.orbSecondary} />
          <div className={styles.orbAccent} />
          <div className={styles.diagonalLines} />
        </div>

        <Sparkle size={18} color="var(--color-secondary)" style={{ position: "absolute", top: "12%", left: "8%", animationDelay: "0s" }} />
        <Sparkle size={10} color="var(--color-accent)" style={{ position: "absolute", top: "22%", right: "12%", animationDelay: "1.2s" }} />
        <Sparkle size={24} color="var(--color-primary-bright)" style={{ position: "absolute", bottom: "28%", left: "18%", animationDelay: "2.4s" }} />
        <Sparkle size={14} color="var(--color-secondary)" style={{ position: "absolute", bottom: "18%", right: "8%", animationDelay: "0.6s" }} />
        <Sparkle size={8} color="var(--color-accent)" style={{ position: "absolute", top: "50%", left: "3%", animationDelay: "1.8s" }} />
        <Sparkle size={12} color="var(--color-accent)" style={{ position: "absolute", top: "8%", right: "30%", animationDelay: "3s" }} />
        <Sparkle size={6} color="var(--color-secondary)" style={{ position: "absolute", bottom: "40%", right: "25%", animationDelay: "0.3s" }} />

        <div className={styles.heroLayout}>
          <div className={styles.heroContent}>
            <div className={styles.heroLabel}>
              <span className={styles.heroDot} />
              <span>LIVE BROADCAST&ensp;/&ensp;ALL FREQUENCIES</span>
              <span className={styles.heroDot} />
            </div>

            <div className={styles.heroTitleBlock}>
              <GlitchText text="SCHIZO" tag="h1" variant="wide" className={styles.heroTitle} />
              <GlitchText text="LABS" tag="h1" variant="wide" className={styles.heroTitleOutline} />
            </div>

            <p className={styles.heroTagline}>
              REJECT NORMALCY<span className={styles.taglineStar}>&#x2726;</span>JOIN THE FREQUENCY
            </p>

            <div className={styles.heroActions}>
              <span className={styles.caBadge}>CA : TBA</span>
              <span className={styles.schzButton}>$SCHZ</span>
            </div>

            <div className={styles.heroCoords}>
              <span>NODE 41.40338N</span>
              <span className={styles.coordDivider}>&#x2022;</span>
              <span>2.17403E</span>
              <span className={styles.coordDivider}>&#x2022;</span>
              <span>847.3 MHz</span>
              <span className={styles.coordDivider}>&#x2022;</span>
              <span>SIGNAL INTEGRITY 99.7%</span>
            </div>
          </div>

          <div className={styles.heroCharacter}>
            <SchizyCharacter />
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span>SCROLL TO DESCEND</span>
        </div>
      </section>

      <MarqueeStrip text="THE SIGNAL IS EVERYWHERE &#x2726; PATTERN RECOGNITION IS THE KEY &#x2726; THE FREQUENCY CANNOT BE CONTAINED &#x2726; QUESTION THE ARCHITECTURE &#x2726; DECODE THE STATIC &#x2726; " />

      {/* ===== MANIFESTO ===== */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoLayout}>
          <div className={styles.manifestoLeft}>
            <span className={styles.sectionLabel}>DOCTRINE //</span>
            <GlitchText text="THE" tag="h2" variant="regular" className={styles.manifestoTitleSmall} />
            <GlitchText text="MANIFESTO" tag="h2" variant="wide" className={styles.manifestoTitleBig} />
            <div className={styles.manifestoDecor}>
              <Sparkle size={32} color="var(--color-secondary)" />
              <div className={styles.decorLine} />
            </div>
            <p className={styles.manifestoEpigraph}>
              &ldquo;We did not create the frequency. The frequency created us.
              We are merely the first to stop pretending we cannot hear it.&rdquo;
            </p>
          </div>

          <div className={styles.tenets}>
            {TENETS.map((tenet, i) => (
              <ScrollReveal key={tenet.number} delay={i * 0.12} className={styles.tenet} distance={30}>
                <div className={styles.tenetNumberBlock}>
                  <span className={styles.tenetNumber}>{tenet.number}</span>
                  <div className={styles.tenetLine} />
                </div>
                <div className={styles.tenetContent}>
                  <h3 className={styles.tenetTitle}>{tenet.title}</h3>
                  <p className={styles.tenetText}>{tenet.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSMISSION PROTOCOL ===== */}
      <section className={styles.transmission}>
        <ScrollReveal className={styles.transmissionInner}>
          <div className={styles.transmissionHeader}>
            <span className={styles.sectionLabel}>TRANSMISSION PROTOCOL //</span>
            <h2 className={styles.transmissionTitle}>HOW IT WORKS</h2>
            <p className={styles.transmissionDesc}>
              EVERY SIGNAL FOLLOWS THE SAME PATH. FOUR PHASES FROM THOUGHT TO PERMANENT INSCRIPTION.
            </p>
          </div>
          <TransmissionFlow />
        </ScrollReveal>
      </section>

      <MarqueeStrip text="INITIATE &#x2726; TRANSMIT &#x2726; ASCEND &#x2726; DECODE &#x2726; RESIST &#x2726; BROADCAST &#x2726; DISRUPT &#x2726; EVOLVE &#x2726; " reversed />

      {/* ===== CTA ===== */}
      <section className={styles.cta}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaOrb} />
        </div>
        <ScrollReveal className={styles.ctaContent}>
          <span className={styles.ctaLabel}>PROTOCOL ACTIVATION</span>
          <GlitchText text="ARE YOU" tag="h2" variant="regular" className={styles.ctaTitleTop} />
          <GlitchText text="READY?" tag="h2" variant="wide" className={styles.ctaTitleBottom} />
          <p className={styles.ctaText}>
            FIVE QUESTIONS STAND BETWEEN YOU AND YOUR CLASSIFICATION.
            YOUR ANSWERS WILL DETERMINE YOUR DIVISION, ASSIGN YOUR SUBJECT ID,
            AND PERMANENTLY ETCH YOUR SIGNAL INTO THE MAINFRAME.
          </p>
          <p className={styles.ctaWarning}>
            <span className={styles.blink}>&#x25CF;</span> WARNING: IRREVERSIBLE PROTOCOL
          </p>
          <Link href="/initiation" className={styles.ctaButton}>
            <span className={styles.ctaButtonInner}>
              <span className={styles.ctaButtonText}>BEGIN INITIATION</span>
              <span className={styles.ctaArrow}>&#x2192;</span>
            </span>
          </Link>
          <div className={styles.ctaSocials}>
            <a
              href="https://x.com/Schizo_Labs"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSocialLink}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X (TWITTER)</span>
            </a>
            <span className={styles.ctaSocialDivider}>&#x2022;</span>
            <a
              href="https://x.com/i/communities/2022396299467981270/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSocialLink}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              <span>COMMUNITY</span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.footerDivider} />
        <div className={styles.footerGrid}>
          <div className={styles.footerLeft}>
            <span className={styles.footerLogo}>SCHIZO LABS</span>
            <span className={styles.footerYear}>&#x2014; EST. 2025</span>
          </div>
          <div className={styles.footerCenter}>
            <span className={styles.footerSignal}>
              <span className={styles.blink}>&#x25CF;</span> SIGNAL ACTIVE
            </span>
          </div>
          <div className={styles.footerRight}>
            <span className={styles.footerText}>BROADCASTING UNTIL THE VOID ANSWERS BACK</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
