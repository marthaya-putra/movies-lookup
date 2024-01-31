import { ActorSearchParams } from "@/lib/definitions";
import { SearchActor } from "../ui/search-actors/search-actor";

type ActorsProps = {
  searchParams?: ActorSearchParams;
};

export default function Actors({ searchParams }: ActorsProps) {
  return <SearchActor searchParams={searchParams} />;
}
