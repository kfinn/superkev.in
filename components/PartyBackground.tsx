import { useMediaQuery } from "@react-hook/media-query";
import { useWindowSize } from "@react-hook/window-size";
import _ from "lodash";
import { useMemo } from "react";
import styles from "./PartyBackground.module.css";

const COLORS_COUNT = 7;

interface LightGradientConfig {
  id: string;
  innerStopColorValues: string;
  outerStopColorValues: string;
};

function useLightGradientConfig(id: string, offset: number) {
  const prefersDarkColorScheme = useMediaQuery("(prefers-color-scheme: dark)");
  const lightness = useMemo(
    () => (prefersDarkColorScheme ? "17%" : "55%"),
    [prefersDarkColorScheme]
  );

  const hues = useMemo(
    () =>
      _.map(
        [..._.range(COLORS_COUNT), 0],
        (index) =>
          Math.round(offset + (360 * index) / COLORS_COUNT) % 360
      ),
    [offset]
  );

  return useMemo(() => ({
    id,
    innerStopColorValues: _.join(_.map(hues, (hue) => `hsla(${hue}, 100%, ${lightness}, 1)`), ";"),
    outerStopColorValues: _.join(_.map(hues, (hue) => `hsla(${hue}, 100%, ${lightness}, 0)`), ";"),
  }), [hues, id, lightness]);
}

function LightGradient({ config: { id, innerStopColorValues, outerStopColorValues } }: { config: LightGradientConfig }) {
  return <radialGradient id={id}>
    <stop offset="5%">
      <animate attributeName="stop-color" values={innerStopColorValues} dur="7s" repeatCount="indefinite" />
    </stop>
    <stop offset="65%">
      <animate attributeName="stop-color" values={outerStopColorValues} dur="7s" repeatCount="indefinite" />
    </stop>
  </radialGradient>
}

export default function PartyBackground() {
  const [width, height] = useWindowSize();
  const shorterDimension = useMemo(
    () => Math.min(width, height),
    [width, height]
  );

  const light1GradientConfig = useLightGradientConfig("light1", 0);
  const light2GradientConfig = useLightGradientConfig("light2", 222);
  const light3GradientConfig = useLightGradientConfig("light3", 85);
  const light4GradientConfig = useLightGradientConfig("light4", 307);

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
        <LightGradient config={light1GradientConfig} />
        <LightGradient config={light2GradientConfig} />
        <LightGradient config={light3GradientConfig} />
        <LightGradient config={light4GradientConfig} />
      </defs>

      <circle
        cx="0"
        cy="0"
        r={shorterDimension}
        fill={`url('#${light1GradientConfig.id}')`}
      />
      <circle
        cx={width}
        cy="0"
        r={shorterDimension}
        fill={`url('#${light2GradientConfig.id}')`}
      />
      <circle
        cx={width}
        cy={height}
        r={shorterDimension}
        fill={`url('#${light3GradientConfig.id}')`}
      />
      <circle
        cx="0"
        cy={height}
        r={shorterDimension}
        fill={`url('#${light4GradientConfig.id}')`}
      />
    </svg>
  );
}
