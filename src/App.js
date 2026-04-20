import React, { useEffect, useState } from "react";
import "./App.css";

const PETALS = [
  { angle: 0, delay: 0.3 },
  { angle: 45, delay: 0.5 },
  { angle: 90, delay: 0.7 },
  { angle: 135, delay: 0.9 },
  { angle: 180, delay: 1.1 },
  { angle: 225, delay: 1.3 },
  { angle: 270, delay: 1.5 },
  { angle: 315, delay: 1.7 },
];

const INNER_PETALS = [
  { angle: 22, delay: 1.9 },
  { angle: 67, delay: 2.0 },
  { angle: 112, delay: 2.1 },
  { angle: 157, delay: 2.2 },
  { angle: 202, delay: 2.3 },
  { angle: 247, delay: 2.4 },
  { angle: 292, delay: 2.5 },
  { angle: 337, delay: 2.6 },
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
            size={1}
            color1="#ffb7c5"
            color2="#e8547a"
            opened={opened}
          />
        ))}
        {INNER_PETALS.map((p, i) => (
          <Petal
            key={i}
            angle={p.angle}
            delay={p.delay}
            size={0.68}
            color1="#ffd6e0"
            color2="#f06292"
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
