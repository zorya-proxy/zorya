import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  onChange: (date: Date | undefined) => void;
  value?: Date;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder = "Pick a date" }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground cursor-pointer select-none"
        >
          <CalendarIcon />
          {value ? format(value, "dd.MM.yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  )
}