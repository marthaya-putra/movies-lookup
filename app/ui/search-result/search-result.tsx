import Image from "next/image";
import { MovieSearchParam, RatingItems } from "@/lib/definitions";
import styles from "./search-result.module.css";
import { fetchRecommendedFilms } from "@/lib/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Pager } from "./pager";

export const SearchResult = async ({
  searchParams,
}: {
  searchParams?: MovieSearchParam;
}) => {
  if (!searchParams?.genres) {
    return <div className={styles.Wrapper}>What to watch today?</div>;
  }

  const recommendedFilms = await fetchRecommendedFilms(
    searchParams?.type || "movie",
    searchParams.genres,
    searchParams?.rating || RatingItems[0].value,
    String(searchParams?.page) || "1"
  );

  const getReleaseYear = (releaseDate: string) => {
    return releaseDate?.split("-")[0];
  };

  const { results, totalPages } = recommendedFilms;

  return (
    <>
      <Pager totalPages={totalPages} />
      <div className={styles.Wrapper}>
        {results.map((result) => {
          const year = getReleaseYear(result.releaseDate);

          return (
            <a
              href={`https://fmoviesz.to/filter?keyword=${result.title}&year[]=${year}`}
              target="blank"
              className={styles.Link}
              key={result.title + result.releaseDate}
            >
              <Image
                width={200}
                height={300}
                src={result.posterPath}
                alt={result.title}
                className={styles.Image}
              />
              <h4 style={{ maxWidth: "200px" }}>
                {result.title} ({year})
              </h4>
              <div>Rated: {result.voteAverage}</div>
            </a>
          );
        })}
      </div>
      <Pager totalPages={totalPages} />
    </>
  );
};
