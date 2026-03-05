import { Label } from "@/components/ui/label";

interface FilterFieldProps {
  label: string;
  children: React.ReactNode;
}

export function FilterField({ label, children }: FilterFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground text-xs tracking-wider font-semibold">{label}</Label>
      {children}
    </div>
  );
}
