"use client";
import { Popover } from "@/components/popover/popover";
import { RadioGroup } from "@/components/radio-group/radio-group";
import { RatingItems } from "@/lib/definitions";
import { useQueryString } from "@/lib/useQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RATING_QUERY_STRING = "rating";

export const Rating = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { createQueryString } = useQueryString();

  const ratingParam =
    searchParams.get(RATING_QUERY_STRING) || RatingItems[0].value;

  const handleRatingChanged = (value: string) => {
    const queryString = createQueryString(RATING_QUERY_STRING, value);
    router.push(`${pathname}?${queryString}`);
  };

  const currentRating = RatingItems.find((r) => r.value === ratingParam);

  return (
    <Popover trigger={currentRating ? currentRating.label : "Select rating"}>
      <div style={{ color: "var(--violet-11)" }}>
        <RadioGroup
          items={RatingItems}
          defaultValue={ratingParam}
          onValueChange={handleRatingChanged}
        />
      </div>
    </Popover>
  );
};
