import { ActorSearchParams } from "@/lib/definitions";
import { SearchActor } from "../ui/search-actors/search-actor";
import { Suspense } from "react";

type ActorsProps = {
  searchParams?: ActorSearchParams;
};

export default function Actors({ searchParams }: ActorsProps) {
  return (
    <Suspense>
      <SearchActor searchParams={searchParams} />{" "}
    </Suspense>
  );
}
