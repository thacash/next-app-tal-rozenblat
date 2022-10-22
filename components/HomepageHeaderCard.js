import Link from "next/link";
import styles from "../styles/HomepageHeaderCard.module.css";

export default function HomepageHeaderCard() {
  return (
    <div className={styles.card}>
      <h1 className={styles.h1}>Pave you way to financial freedom</h1>
      <p className={styles.p}>
        Here in Cash Manage, we have the tools you need to have a clear view on your finances, and how you could achieve financial freedom sooner.
      </p>
      {/* <div className={styles.links}>
        <Link href="/about">LEARN MORE</Link>
      </div> */}
    </div>
  );
}
