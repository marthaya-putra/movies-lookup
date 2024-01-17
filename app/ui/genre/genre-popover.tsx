"use client";
import { Popover } from "@/components/popover/popover";
import styles from "./genre.module.css";
import { Checkbox } from "@/components/checkbox/checkbox";
import { FILM_TYPE_QUERY_STRING, Genre } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQueryString } from "@/lib/useQueryString";

type GenrePopoverProps = {
  genres: Array<Genre>;
};

const GENRES_QUERY_STRING = "genres";

export const GenrePopover = ({ genres }: GenrePopoverProps) => {
  const [selectedGenres, setSelectedGenres] = useState<Array<number>>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { createQueryString, deleteQueryString } = useQueryString();

  const genresParam = searchParams.get(GENRES_QUERY_STRING) || "";

  useEffect(() => {
    if (!genresParam) {
      setSelectedGenres([]);
      return;
    }
    const genreIds = genresParam.split("|");
    setSelectedGenres((genreIds || []).map((id) => Number(id)));
  }, [genresParam]);

  const handleSelectedGenresChanged = (
    checked: CheckedState,
    value: number
  ) => {
    if (checked) {
      setSelectedGenres((prevValues) => [...prevValues, value]);
      return;
    }
    setSelectedGenres((prevValues) => prevValues.filter((v) => v !== value));
  };

  const handlePopoverOpenChanged = (open: boolean) => {
    if (open || selectedGenres.length === 0) {
      return;
    }

    const queryString = createQueryString(
      GENRES_QUERY_STRING,
      selectedGenres.join("|")
    );
    router.push(`${pathname}?${queryString}`);
  };

  const numberOfSelectedGenres = selectedGenres.length;

  return (
    <Popover
      trigger={
        numberOfSelectedGenres > 0
          ? `(${numberOfSelectedGenres}) selected`
          : "Select genre(s)"
      }
      onOpenChange={handlePopoverOpenChanged}
    >
      <div className={styles.Wrapper}>
        {genres.map((genre) => (
          <Checkbox
            id={`cb-genre-${genre.id}`}
            key={genre.id}
            label={genre.name}
            checked={selectedGenres.includes(genre.id)}
            onCheckedChange={(checked) => {
              handleSelectedGenresChanged(checked, genre.id);
            }}
          />
        ))}
      </div>
    </Popover>
  );
};
