import styles from "./movie-card-skeleton.module.css";

export const MovieCardSkeleton = () => {
  return (
    <div className={styles.Card}>
      <div className={`${styles.Image} ${styles.ShimmeringPart}`}></div>
      <div className={`${styles.Title} ${styles.ShimmeringPart}`}></div>
    </div>
  );
};
