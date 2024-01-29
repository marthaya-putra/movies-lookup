"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select } from "@/components/select/select";
import { useQueryString } from "@/lib/useQueryString";

export const FilmType = ({ items }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString, deleteQueryString } = useQueryString();

  const handleValueChanged = (value: string) => {
    let queryString = createQueryString("type", value);
    queryString = deleteQueryString("genres", queryString);
    queryString = deleteQueryString("page", queryString);
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <Select
      items={items}
      onValueChange={handleValueChanged}
      value={searchParams.get("type") ?? "movie"}
    />
  );
};
