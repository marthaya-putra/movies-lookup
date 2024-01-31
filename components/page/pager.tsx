"use client";
import { useQueryString } from "@/lib/useQueryString";
import styles from "./pager.module.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { usePathname, useSearchParams } from "next/navigation";

export const Pager = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString();

  const page = Number(searchParams.get("page") || 1);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  const prevLink = () => {
    if (!hasPrevious) {
      return undefined;
    }

    const queryString = createQueryString("page", String(page - 1));
    return `${pathname}?${queryString}`;
  };

  const nextLink = () => {
    if (!hasNext) {
      return undefined;
    }

    const queryString = createQueryString("page", String(page + 1));
    return `${pathname}?${queryString}`;
  };

  return (
    <div className={styles.PagerContainer}>
      <a className={styles.Pager} href={prevLink()} aria-disabled={page === 1}>
        <ChevronLeftIcon />
      </a>
      <div className={styles.PageNumber}>{page}</div>
      <a
        className={styles.Pager}
        href={nextLink()}
        aria-disabled={page === totalPages}
      >
        <ChevronRightIcon />
      </a>
    </div>
  );
};
