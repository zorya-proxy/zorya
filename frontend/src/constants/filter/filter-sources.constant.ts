import type { RequestSource } from "@/types/theme/analyze/request-source.type";

export const SOURCES: { label: string; value: RequestSource }[] = [
  { label: "API", value: "API" },
  { label: "Playground", value: "PLAYGROUND" },
];
