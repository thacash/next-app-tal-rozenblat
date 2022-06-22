import Link from "next/link";
import styles from "../styles/HomepageHeaderCard.module.css";

export default function HomepageHeaderCard() {
  return (
    <div className={styles.card}>
      <h1 className={styles.h1}>Managing expenses, at the touch of a button</h1>
      <p className={styles.p}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor
        gravida tempus. Nullam suscipit laoreet risus, non euismod elit laoreet
        eu.
      </p>
      <div className={styles.links}>
        <Link href="/about">LEARN MORE</Link>
      </div>
    </div>
  );
}
