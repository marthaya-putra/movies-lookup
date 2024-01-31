import { MovieSearchParam, RatingItems } from "@/lib/definitions";
import styles from "./search-result.module.css";
import { fetchRecommendedFilms } from "@/lib/data";
import { Pager } from "@/components/page/pager";
import { MovieCardsContainer } from "@/components/movie-card-container/movie-cards-container";
import { MovieCard } from "@/components/movie-card/movie-card";

export const SearchResult = async ({
  searchParams,
}: {
  searchParams?: MovieSearchParam;
}) => {
  const recommendedFilms = await fetchRecommendedFilms(
    searchParams?.type || "movie",
    searchParams?.genres || "",
    searchParams?.rating || RatingItems[0].value,
    String(searchParams?.page) || "1"
  );

  const { results, totalPages } = recommendedFilms;

  return (
    <div className={styles.Container}>
      <Pager totalPages={totalPages} />
      <MovieCardsContainer>
        {results.map((result) => {
          const key = result.title + result.releaseDate;

          return <MovieCard key={key} film={result} />;
        })}
      </MovieCardsContainer>
      <Pager totalPages={totalPages} />
    </div>
  );
};
