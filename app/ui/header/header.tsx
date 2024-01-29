import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.Header}>
      <h1>What to watch?</h1>
      <div className={styles.Menu}>
        <a href="/">Home</a>
        <a href="/actors">By actors</a>
      </div>
      <div></div>
    </header>
  );
};
