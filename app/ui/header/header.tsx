import styles from "./header.module.css";
import { SelectedPath } from "./selected-path";

export const Header = () => {
  return (
    <header className={styles.Header}>
      <h1>What to watch?</h1>
      <div className={styles.Menu}>
        <a href="/">
          Home <SelectedPath path="/" />
        </a>
        <a href="/actors">
          By actors <SelectedPath path="/actors" />
        </a>
      </div>
      <div></div>
    </header>
  );
};
