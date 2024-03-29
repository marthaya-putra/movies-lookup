import styles from "./movie-card.module.css";
import { FilmInfo } from "@/lib/definitions";

type MovieCardProps = {
  film: FilmInfo;
};

export const MovieCard = ({ film }: MovieCardProps) => {
  const getReleaseYear = (releaseDate: string) => {
    return releaseDate?.split("-")[0];
  };
  const year = getReleaseYear(film.releaseDate);

  return (
    <a
      href={`https://fmoviesz.to/filter?keyword=${film.title}&year[]=${year}`}
      target="blank"
      className={styles.Link}
      key={film.title + film.releaseDate}
    >
      <img
        width={224}
        height={300}
        src={film.posterPath}
        alt={film.title}
        className={styles.Image}
      />
      <h4 style={{ maxWidth: "200px", padding: "8px 0" }}>
        {film.title} ({year})
      </h4>
      <div className={styles.Rating}>
        {Math.round(film.voteAverage * 10) / 10}
      </div>
    </a>
  );
};
