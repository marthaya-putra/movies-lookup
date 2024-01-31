import { fetchActors } from "@/lib/data";
import { ActorSearchParams, Person } from "@/lib/definitions";
import { ActorsAutocomplete } from "./actors-autocomplete";
import { Suspense } from "react";

export const SearchActor = async ({
  searchParams,
}: {
  searchParams?: ActorSearchParams;
}) => {
  const { searchTerm } = searchParams || {};
  let actors: Person[] = [];

  if (searchTerm) {
    actors = await fetchActors(searchTerm);
  }

  return (
    <Suspense>
      <ActorsAutocomplete actors={actors} />
    </Suspense>
  );
};
