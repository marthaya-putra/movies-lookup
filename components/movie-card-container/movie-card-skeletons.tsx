import { MovieCardSkeleton } from "../movie-card/movie-card-skeleton";
import { MovieCardsContainer } from "./movie-cards-container";

export const MovieCardSkeletons = () => {
  const cards = new Array(20).fill(null);
  return (
    <div style={{ padding: "60px 0" }}>
      <MovieCardsContainer>
        {cards.map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </MovieCardsContainer>
    </div>
  );
};
