import type { PageableRequest } from "../core/pageable-request.interface";

export interface PageableHistoryRequest extends PageableRequest {
  sources?: string;
  riskLevels?: string;
  piiTypes?: string;
  startDate?: string;
  endDate?: string;
}
