import { MovieCardsContainer } from "@/components/movie-card-container/movie-cards-container";
import { MovieCard } from "@/components/movie-card/movie-card";
import { Pager } from "@/components/pager/pager";
import { fetchActorFilms } from "@/lib/data";
import { FilmType } from "@/lib/definitions";

type ActorFilmsProps = {
  actor: number;
  filmType?: FilmType;
  page?: number;
};

export const ActorFilms = async ({
  actor,
  filmType,
  page,
}: ActorFilmsProps) => {
  const films = await fetchActorFilms(
    filmType || "movie",
    actor,
    String(page || "1")
  );

  const { results, totalPages } = films;

  return (
    <div style={{ padding: "20px 0" }}>
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
