import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getHistory } from "../services/history.service";
import type { PageableRequest } from "@/interfaces/core/pageable-request.interface";

export function useHistory(params: PageableRequest = {}) {
  return useQuery({
    queryKey: ["history", params],
    queryFn: () => getHistory(params),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
}
