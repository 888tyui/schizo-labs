"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import styles from "./SchizyCharacter.module.css";

type Expression = "happy" | "grin" | "tongue" | "wink" | "love";

const EXPRESSIONS: Expression[] = ["happy", "grin", "tongue", "wink", "love"];

const FACE_TEXTS: Record<Expression, string> = {
  happy: ":)",
  grin: ":D",
  tongue: ":P",
  wink: ";)",
  love: "<3",
};

const EXPR_LABELS: Record<Expression, string> = {
  happy: "SIGNAL CLEAR",
  grin: "FREQUENCY AMPLIFIED",
  tongue: "DECODING REALITY",
  wink: "ANOMALY DETECTED",
  love: "RESONANCE LOCKED",
};

/* ============================================
   FACE SPRITE — draws text on a canvas,
   returns a sprite that always faces camera
   ============================================ */
function createFaceTexture(expr: Expression): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 440;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#1a0c35";
  ctx.fillRect(0, 0, 512, 440);

  const grad = ctx.createRadialGradient(256, 220, 50, 256, 220, 280);
  grad.addColorStop(0, "rgba(50, 25, 100, 0.3)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 440);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 220px 'Courier New', monospace";
  ctx.fillStyle = "#ffaadd";
  ctx.shadowColor = "#ff88cc";
  ctx.shadowBlur = 40;
  ctx.fillText(FACE_TEXTS[expr], 256, 230);
  ctx.shadowBlur = 0;

  for (let y = 0; y < 440; y += 4) {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0, y, 512, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function ScreenFace({ expression }: { expression: Expression }) {
  const texture = useMemo(() => createFaceTexture(expression), [expression]);

  return (
    <mesh position={[0, 0.02, 1.06]}>
      <planeGeometry args={[1.5, 1.28]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/* ============================================
   TV HEAD
   ============================================ */
function TVHead({ expression, flash }: { expression: Expression; flash: boolean }) {
  const flashRef = useRef<THREE.Mesh>(null!);
  const flashVal = useRef(0);

  useFrame((_, delta) => {
    if (flash) flashVal.current = 1;
    if (flashVal.current > 0) {
      flashVal.current = Math.max(0, flashVal.current - delta * 5);
    }
    if (flashRef.current) {
      const mat = flashRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = flashVal.current * 0.4;
    }
  });

  return (
    <group>
      {/* Outer shell */}
      <RoundedBox args={[2, 2, 2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#6b4fa0" roughness={0.55} metalness={0.1} />
      </RoundedBox>

      {/* Screen bezel */}
      <RoundedBox args={[1.65, 1.45, 0.15]} radius={0.05} position={[0, 0.02, 0.95]}>
        <meshStandardMaterial color="#3d2570" roughness={0.4} metalness={0.15} />
      </RoundedBox>

      {/* Screen with face */}
      <ScreenFace expression={expression} />

      {/* Flash overlay */}
      <mesh ref={flashRef} position={[0, 0.02, 1.08]}>
        <planeGeometry args={[1.5, 1.3]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Screen glow */}
      <pointLight color="#9966ff" intensity={1.5} distance={4} position={[0, 0, 1.8]} />
    </group>
  );
}

/* ============================================
   GREEN EAR CUBE
   ============================================ */
function EarCube() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 1.5) * 0.12;
    ref.current.rotation.z = Math.cos(t * 1.2) * 0.06;
  });

  return (
    <group position={[-1.3, 0, 0]}>
      <mesh ref={ref}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#88ee44"
          emissive="#66bb22"
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>
      <pointLight color="#88ee44" intensity={1} distance={2.5} position={[-0.2, 0, 0]} />
    </group>
  );
}

/* ============================================
   BODY
   ============================================ */
function Body() {
  return (
    <group position={[0, -1.55, 0]}>
      <RoundedBox args={[0.4, 0.25, 0.4]} radius={0.03} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#5a3d8a" roughness={0.65} />
      </RoundedBox>
      <RoundedBox args={[1.05, 0.75, 0.95]} radius={0.08}>
        <meshStandardMaterial color="#5a3d8a" roughness={0.55} metalness={0.08} />
      </RoundedBox>
      <RoundedBox args={[0.28, 0.55, 0.28]} radius={0.04} position={[-0.24, -0.6, 0]}>
        <meshStandardMaterial color="#4a3078" roughness={0.65} />
      </RoundedBox>
      <RoundedBox args={[0.28, 0.55, 0.28]} radius={0.04} position={[0.24, -0.6, 0]}>
        <meshStandardMaterial color="#4a3078" roughness={0.65} />
      </RoundedBox>
    </group>
  );
}

/* ============================================
   CHARACTER
   ============================================ */
function Character({ expression, flash, onClick }: {
  expression: Expression;
  flash: boolean;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const bounceRef = useRef(0);

  useFrame((_, delta) => {
    if (flash) bounceRef.current = 1;
    if (bounceRef.current > 0) {
      bounceRef.current = Math.max(0, bounceRef.current - delta * 3);
      const bounce = Math.sin(bounceRef.current * Math.PI * 3) * bounceRef.current * 0.2;
      groupRef.current.position.y = bounce;
      const squash = 1 + Math.sin(bounceRef.current * Math.PI * 2) * bounceRef.current * 0.1;
      groupRef.current.scale.set(1 / squash, squash, 1 / squash);
    } else {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.05);
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4} floatingRange={[-0.12, 0.12]}>
      <group ref={groupRef} scale={0.7} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <group position={[0, 0.3, 0]}>
          <TVHead expression={expression} flash={flash} />
          <EarCube />
        </group>
        <Body />
      </group>
    </Float>
  );
}

/* ============================================
   SCENE — no Suspense-dependent components
   ============================================ */
function Scene({ expression, flash, onClick }: {
  expression: Expression;
  flash: boolean;
  onClick: () => void;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1.5} color="#c4aaff" />
      <directionalLight position={[-4, 2, 3]} intensity={0.6} color="#ffaacc" />
      <pointLight position={[0, -3, 3]} intensity={0.5} color="#8866cc" distance={8} />
      <Character expression={expression} flash={flash} onClick={onClick} />
    </>
  );
}

/* ============================================
   EXPORT
   ============================================ */
export function SchizyCharacter() {
  const [exprIndex, setExprIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const expression = EXPRESSIONS[exprIndex];

  const handleClick = useCallback(() => {
    setFlash(true);
    setExprIndex((i) => (i + 1) % EXPRESSIONS.length);
    setShowLabel(true);
    setTimeout(() => setFlash(false), 150);
    setTimeout(() => setShowLabel(false), 2000);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.canvasWrap}>
        <Canvas
          camera={{ position: [0, 0.3, 8], fov: 40 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Scene expression={expression} flash={flash} onClick={handleClick} />
        </Canvas>
      </div>

      <div className={`${styles.exprLabel} ${showLabel ? styles.visible : ""}`}>
        <span className={styles.exprDot} />
        {EXPR_LABELS[expression]}
        <span className={styles.exprFace}>{FACE_TEXTS[expression]}</span>
      </div>

      <div className={styles.clickHint}>
        <span className={styles.hintDot} />
        CLICK TO INTERACT
      </div>
    </div>
  );
}
