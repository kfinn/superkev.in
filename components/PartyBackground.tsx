import { useMediaQuery } from "@react-hook/media-query";
import _ from "lodash";
import { useMemo, useState } from "react";
import useInterval from "use-interval";
import styles from "./PartyBackground.module.css";

function useLightStyle(globalOffset: number, localOffset: number) {
  const prefersDarkColorScheme = useMediaQuery("(prefers-color-scheme: dark)");

  return useMemo(() => {
    const hue = Math.round((globalOffset + localOffset) % 360);
    const lightness = prefersDarkColorScheme ? "15%" : "75%"
    return { background: `radial-gradient(circle at center, hsla(${hue}, 100%, ${lightness}, 1) 5%, hsla(${hue}, 100%, ${lightness}, 0) 45%)` }
  }, [prefersDarkColorScheme, globalOffset, localOffset]);
}

export default function PartyBackground() {
  const [offset, setOffset] = useState(0);
  useInterval(() => {
    setOffset((offset + 2) % 360);
  }, 60)

  const light1Style = useLightStyle(offset, 0);
  const light2Style = useLightStyle(offset, 222);
  const light3Style = useLightStyle(offset, 85);
  const light4Style = useLightStyle(offset, 307);

  return (
    <div className={styles.container}>
      <div className={styles.light1} style={light1Style} />
      <div className={styles.light2} style={light2Style} />
      <div className={styles.light3} style={light3Style} />
      <div className={styles.light4} style={light4Style} />
    </div>
  );
}
