import { useQuery } from "@tanstack/react-query";
import { getInventory } from "../api/inventory.api";

export function useInventory() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory,
  });
}
