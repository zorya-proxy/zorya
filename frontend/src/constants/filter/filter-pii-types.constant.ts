import type { RiskType } from "@/types/theme/analyze/risk-type.type";

export const PII_TYPES: { label: string; value: RiskType }[] = [
  { label: "Email", value: "EMAIL" },
  { label: "PESEL", value: "PESEL" },
  { label: "Phone", value: "PHONE" },
  { label: "IBAN", value: "IBAN" },
  { label: "CNN", value: "CCN" },
  { label: "Person", value: "PERSON" },
  { label: "Medical", value: "MEDICAL" },
  { label: "Address", value: "ADDRESS" },
  { label: "Offensive", value: "OFFENSIVE" },
  { label: "Unknown", value: "UNKNOWN" },
];
