import useTimeout from "@jdthornton/usetimeout";
import _ from "lodash";
import { useMemo, useState } from "react";
import styles from "./PartyBackground.module.css";

function range(size: number): number[] {
  let result = [];
  for (let i = 0; i < size; ++i) {
    result.push(i);
  }
  return result;
}

function generateLights(): Light[] {
  return range(5).map((id) => ({
    id,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    scale: Math.random()* 0.8 + 0.2,
    hue: Math.round(Math.random() * 360),
  }));
}

interface Light {
  id: number;
  x: number;
  y: number;
  scale: number;
  hue: number;
}

function generateTransitionDurationMs(): number {
  return Math.round(Math.random() * 2000) + 1000;
}

export default function PartyBackground() {
  const [transitionDurationMs, setTransitionDurationMs] = useState(generateTransitionDurationMs());
  const [lights, setLights] = useState(generateLights());

  const lightStyles = useMemo(() => _.map(lights, (light) => ({
    id: light.id,
    style: {
      backgroundImage: `radial-gradient(circle, hsla(${light.hue}, 100%, 75%, 1) 5%, hsla(${light.hue}, 100%, 75%, 0) 50%)`,
      transform: `translate(${light.x}%, ${light.y}%) scale(${light.scale})`,
      transitionDuration: `${transitionDurationMs}ms`
    }
  })), [lights, transitionDurationMs])

  useTimeout(() => {
    setTransitionDurationMs(generateTransitionDurationMs());
    setLights(generateLights);
  }, transitionDurationMs)

  return (
    <div className={styles.container}>
      {_.map(lightStyles, ({ id, style }) => (
        <div
          key={id}
          className={styles.light}
          style={style}
        />
      ))}
    </div>
  );
}
