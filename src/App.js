import React, { useEffect, useState } from "react";
import "./App.css";

const PETALS = [
  { angle: 0, delay: 0.3 },  // Tulip — 6 petals, evenly spaced (60° apart)
  { angle: 60, delay: 0.5 },
  { angle: 120, delay: 0.7 },
  { angle: 180, delay: 0.9 },
  { angle: 240, delay: 1.1 },
  { angle: 300, delay: 1.3 },
];

const INNER_PETALS = [
  { angle: 30, delay: 1.6 },  // Orchid inner — 5 petals + 1 lip (slightly larger)
  { angle: 90, delay: 1.7 },
  { angle: 150, delay: 1.8 },
  { angle: 210, delay: 1.9 },
  { angle: 270, delay: 2.0 },
  { angle: 330, delay: 2.1 },  // lip petal — rendered bigger below
];

function Petal({ angle, delay, size = 1, color1, color2, opened }) {
  return (
    <div
      className="petal-wrapper"
      style={{ transform: `rotate(${angle}deg)`, "--delay": `${delay}s` }}
    >
      <div
        className={`petal ${opened ? "petal--open" : ""}`}
        style={{
          width: `${52 * size}px`,
          height: `${80 * size}px`,
          background: `radial-gradient(ellipse at 60% 30%, ${color1}, ${color2})`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("bud");
  const [showMessage, setShowMessage] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const ps = Array.from({ length: 18 }, () => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 6}s`,
      animationDuration: `${5 + Math.random() * 6}s`,
      width: `${6 + Math.random() * 10}px`,
      height: `${6 + Math.random() * 10}px`,
      opacity: 0.5 + Math.random() * 0.4,
    }));
    setParticles(ps);

    const t1 = setTimeout(() => setPhase("blooming"), 600);
    const t2 = setTimeout(() => setPhase("open"), 2800);
    const t3 = setTimeout(() => setShowMessage(true), 4000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const opened = phase === "open";

  return (
    <div className="scene">
      {/* Floating particles */}
      {particles.map((s, i) => (
        <div key={i} className="particle" style={s} />
      ))}

      {/* Stem */}
      <div className={`stem ${phase !== "bud" ? "stem--grow" : ""}`}>
        <div className="leaf leaf--left" />
        <div className="leaf leaf--right" />
      </div>

      {/* Flower */}
      <div className={`flower ${phase !== "bud" ? "flower--rise" : ""}`}>
        {PETALS.map((p, i) => (
          <Petal
            key={i}
            angle={p.angle}
            delay={p.delay}
            size={1.1}
            color1="#f48fb1"
            color2="#7b1fa2"
            opened={opened}
          />
        ))}

        {/* Orchid inner petals — white/lavender */}
        {INNER_PETALS.map((p, i) => (
          <Petal
            key={i}
            angle={p.angle}
            delay={p.delay}
            size={i === 5 ? 0.85 : 0.6}  // last one is the orchid lip — slightly larger
            color1="#f3e5f5"
            color2="#ce93d8"
            opened={opened}
          />
        ))}

        {/* Center */}
        <div className={`center ${opened ? "center--open" : ""}`}>
          <div className="center-glow" />
          <span className="center-heart">♥</span>
        </div>
      </div>

      {/* Message card */}
      <div className={`message-card ${showMessage ? "message-card--visible" : ""}`}>
        <div className="message-deco">✦ ✦ ✦</div>
        <p className="message-salutation">To my dear Kenza,</p>
        <p className="message-body">
          I will never stop loving you, supporting you and being there for you.
        </p>
        <p className="message-footer">Love You To The Moon And Back</p>
        <div className="message-hearts">
          <span>♥</span><span>♥</span><span>♥</span>
        </div>
      </div>
    </div>
  );
}