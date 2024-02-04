import { fetchActors } from "@/lib/data";
import { ActorSearchParams, Person } from "@/lib/definitions";
import { ActorsAutocomplete } from "./actors-autocomplete";

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
    <div style={{ padding: "0 16px" }}>
      <ActorsAutocomplete actors={actors} />
    </div>
  );
};
