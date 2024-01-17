import { Genre } from "./ui/genre/genre";
import { FilmType } from "./ui/film-type/film-type";
import { MovieSearchParam } from "@/lib/definitions";
import { SearchResult } from "./ui/search-result/search-result";
import { Rating } from "./ui/rating/rating";
import { Suspense } from "react";
import { Label } from "@/components/label/label";
import styles from "./page.module.css";

export default function Home({
  searchParams,
}: {
  searchParams?: MovieSearchParam;
}) {
  return (
    <main>
      <div className={styles.Wrapper}>
        <div className={styles.Filter}>
          <Label>Recommend me</Label> <FilmType />
        </div>
        <div className={styles.Filter}>
          <Label>Genre(s)</Label> <Genre type={searchParams?.type ?? "movie"} />
        </div>
        <div className={styles.Filter}>
          <Label>Rating</Label> <Rating />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResult searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
