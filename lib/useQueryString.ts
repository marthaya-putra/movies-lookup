import { useSearchParams } from "next/navigation";

export function useQueryString() {
  const searchParams = useSearchParams();
  const deleteQueryString = (name: string, fromQueryString?: string) => {
    const params = new URLSearchParams(
      fromQueryString || searchParams.toString()
    );
    params.delete(name);

    return params.toString();
  };
  const createQueryString = (
    name: string,
    value: string,
    fromQueryString?: string
  ) => {
    const params = new URLSearchParams(
      fromQueryString || searchParams.toString()
    );
    params.set(name, value);

    return params.toString();
  };

  return { createQueryString, deleteQueryString };
}
