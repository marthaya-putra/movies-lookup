"use client";

import { Autocomplete } from "@/components/autocomplete/autocomplete";
import styles from "./actors-autocomplete.module.css";
import { Person } from "@/lib/definitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryString } from "@/lib/useQueryString";
import { useEffect, useRef, useState } from "react";
import debounce from "debounce";

export const ActorsAutocomplete = ({ actors }: { actors: Person[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedActor, setSelectedActor] = useState<Person | undefined>(
    undefined
  );
  const debounceRef = useRef<ReturnType<typeof debounce>>();

  useEffect(() => {
    return () => debounceRef.current?.clear();
  }, []);

  const { createQueryString, deleteQueryString } = useQueryString();

  const handleSearchTerm = (searchTerm: string) => {
    const resetActorQueryString = deleteQueryString("actor");
    const queryString = createQueryString(
      "searchTerm",
      searchTerm,
      resetActorQueryString
    );
    router.push(`${pathname}?${queryString}`);
  };

  debounceRef.current = debounce(handleSearchTerm, 300);

  const handleActorSelected = (actor: Person) => {
    setSelectedActor(actor);
    const queryString = createQueryString("actor", String(actor.id));
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <>
      <div>
        <label className={styles.Label}>Search actor</label>
      </div>
      <Autocomplete
        key={selectedActor?.id}
        value={selectedActor?.name || searchParams.get("searchTerm") || ""}
        onSearchTermChanged={debounceRef.current}
      >
        {actors.map((actor: Person) => (
          <Option key={actor.id} actor={actor} />
        ))}
      </Autocomplete>
    </>
  );
};

type OptionProps = {
  actor: Person;
};
function Option({ actor }: OptionProps) {
  return (
    <a className={styles.OptionWrapper} href={`/actors/${actor.id}`}>
      <img
        width={50}
        height={50}
        src={actor.profileImageUrl}
        alt={actor.name}
        style={{ objectFit: "cover" }}
      />
      <div>{actor.name}</div>
    </a>
  );
}
