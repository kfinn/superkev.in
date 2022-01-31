import _ from "lodash";
import styles from "./PartyBackground.module.css";

export default function PartyBackground() {

  return (
    <div className={styles.container}>
      <div className={styles.light1bottom} />
      <div className={styles.light1top} />
      <div className={styles.light2bottom} />
      <div className={styles.light2top} />
      <div className={styles.light3bottom} />
      <div className={styles.light3top} />
      <div className={styles.light4bottom} />
      <div className={styles.light4top} />
    </div>
  );
}
