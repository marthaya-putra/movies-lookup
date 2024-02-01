import styles from "./page.module.css";
import { Suspense } from "react";
import { Profile } from "@/app/ui/profile/profile";
import { FilmType } from "@/lib/definitions";
import { ActorFilms } from "@/app/ui/actor-films/actor-films";
import { MovieCardSkeletons } from "@/components/movie-card-container/movie-card-skeletons";

type ActorPageProps = {
  params: {
    id: number;
  };
  searchParams?: {
    filmType: FilmType;
    page: number;
  };
};
export default function ActorPage({ params, searchParams }: ActorPageProps) {
  const { filmType } = searchParams || {};
  const getFilmTypePath = (type: FilmType) => {
    return `/actors/${params.id}?filmType=${type}`;
  };
  return (
    <>
      <Suspense>
        <Profile id={params.id} />
      </Suspense>
      <div className={styles.FilmTypeWrapper}>
        <a
          href={getFilmTypePath("movie")}
          className={!filmType || filmType === "movie" ? styles.Selected : ""}
        >
          Movies
        </a>
        <a
          href={getFilmTypePath("tv")}
          className={filmType === "tv" ? styles.Selected : ""}
        >
          TVs
        </a>
      </div>
      <Suspense fallback={<MovieCardSkeletons />}>
        <ActorFilms
          actor={params.id}
          filmType={searchParams?.filmType}
          page={searchParams?.page}
        />
      </Suspense>
    </>
  );
}
