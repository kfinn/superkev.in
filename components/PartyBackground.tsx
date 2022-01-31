import _ from "lodash";
import { useMemo, useState } from "react";
import useInterval from "use-interval";
import styles from "./PartyBackground.module.css";

function buildLightStyle(globalOffset: number, localOffset: number) {
  const hue = Math.round((globalOffset + localOffset) % 360);
  return {
    background: `radial-gradient(circle at center, hsla(${hue}, 100%, 75%, 1) 5%, hsla(${hue}, 100%, 75%, 0) 45%)`
  };
}

export default function PartyBackground() {
  const [offset, setOffset] = useState(0);
  useInterval(() => {
    setOffset((offset + 2) % 360);
  }, 60)

  const light1Style = useMemo(() => buildLightStyle(offset, 0), [offset]);
  const light2Style = useMemo(() => buildLightStyle(offset, 222), [offset]);
  const light3Style = useMemo(() => buildLightStyle(offset, 85), [offset]);
  const light4Style = useMemo(() => buildLightStyle(offset, 307), [offset]);

  return (
    <div className={styles.container}>
      <div className={styles.light1} style={light1Style} />
      <div className={styles.light2} style={light2Style} />
      <div className={styles.light3} style={light3Style} />
      <div className={styles.light4} style={light4Style} />
    </div>
  );
}
