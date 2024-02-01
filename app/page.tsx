import { Genre } from "./ui/genre/genre";
import { FilmType } from "./ui/film-type/film-type";
import { MovieSearchParam } from "@/lib/definitions";
import { SearchResult } from "./ui/search-result/search-result";
import { Rating } from "./ui/rating/rating";
import { Suspense } from "react";
import { Label } from "@/components/label/label";
import styles from "./page.module.css";
import { MovieCardSkeletons } from "@/components/movie-card-container/movie-card-skeletons";

export default function Home({
  searchParams,
}: {
  searchParams?: MovieSearchParam;
}) {
  const items = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
  ];
  return (
    <main>
      <div className={styles.Wrapper}>
        <div className={styles.Filter}>
          <Label>Recommend me</Label> <FilmType items={items} />
        </div>
        <div className={styles.Filter}>
          <Label>Genre(s)</Label> <Genre type={searchParams?.type ?? "movie"} />
        </div>
        <div className={styles.Filter}>
          <Label>Rating</Label> <Rating />
        </div>
      </div>
      <Suspense fallback={<MovieCardSkeletons />}>
        <SearchResult searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
