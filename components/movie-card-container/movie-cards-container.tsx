import { ReactNode } from "react";
import styles from "./movie-cards-container.module.css";

export const MovieCardsContainer = ({ children }: { children: ReactNode }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};
