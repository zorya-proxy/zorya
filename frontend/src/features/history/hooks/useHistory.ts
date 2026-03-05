import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getHistory } from "../services/history.service";
import type { PageableHistoryRequest } from "@/interfaces/history/pageable-history-request.interface";

export function useHistory(params: PageableHistoryRequest = {}) {
  return useQuery({
    queryKey: ["history", params],
    queryFn: () => getHistory(params),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
}
