import styles from "../styles/HomePageBackground.module.css";

export default function HomePageBackground({ children }) {
  return (
    <div className={styles.background}>
      <main>{children}</main>
    </div>
  );
}
