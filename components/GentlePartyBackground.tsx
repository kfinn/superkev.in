import { useMediaQuery } from "@react-hook/media-query";
import { useWindowSize } from "@react-hook/window-size";
import { useMemo } from "react";
import styles from "./GentlePartyBackground.module.css";

interface GentleLightGradientProps {
  id: string;
  innerStopColor: string;
  outerStopColor: string;
}

function GentleLightGradient({
  id, innerStopColor, outerStopColor,
}:GentleLightGradientProps) {
  return <radialGradient id={id}>
    <stop offset="5%" stopColor={innerStopColor} />
    <stop offset="57%" stopColor={outerStopColor} />
  </radialGradient>
}

export default function GentlePartyBackground() {
  const prefersDarkColorScheme = useMediaQuery("(prefers-color-scheme: dark)");
  const lightness = useMemo(
    () => (prefersDarkColorScheme ? "17%" : "55%"),
    [prefersDarkColorScheme]
  );

  const [width, height] = useWindowSize();
  const longerDimension = useMemo(
    () => Math.max(width, height),
    [width, height]
  );
  const horizontalMargin = useMemo(
    () => Math.min(width - height, 0) / 2,
    [width, height]
  );
  const verticalMargin = useMemo(
    () => Math.min(height - width, 0) / 2,
    [width, height]
  );

  return (
    <svg
      className={styles.container}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <GentleLightGradient id="light1" innerStopColor={`hsla(307, 100%, ${lightness}, 1)`} outerStopColor={`hsla(307, 100%, ${lightness}, 0)`} />
        <GentleLightGradient id="light2" innerStopColor={`hsla(85, 100%, ${lightness}, 1)`} outerStopColor={`hsla(85, 100%, ${lightness}, 0)`} />
      </defs>

      <circle cx={horizontalMargin} cy={verticalMargin} r={longerDimension} fill="url('#light1')" />
      <circle cx={width - horizontalMargin} cy={verticalMargin} r={longerDimension} fill="url('#light2')" />
    </svg>
  );
}
