import { fetchGenres } from "@/lib/data";
import { GenrePopover } from "./genre-popover";
import { FilmType } from "@/lib/definitions";

type GenreProps = {
  type: FilmType;
};

export const Genre = async ({ type }: GenreProps) => {
  const genres = await fetchGenres(type);

  return <GenrePopover genres={genres} />;
};
