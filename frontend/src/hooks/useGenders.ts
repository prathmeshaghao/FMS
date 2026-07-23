import { useQuery } from "@tanstack/react-query";
import { getGenders } from "../api/gender.api";

export function useGenders() {
  return useQuery({
    queryKey: ["genders"],
    queryFn: getGenders,
  });
}
