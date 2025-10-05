import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateSelectorProps {
  onDateSelect: (date: Date | undefined) => void;
}

export default function DateSelector({ onDateSelect }: DateSelectorProps) {
  const [date, setDate] = useState<Date>();
  const [month, setMonth] = useState<Date>(date ?? new Date());

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
    if (selectedDate) setMonth(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-12 border-2 hover:border-primary transition-all",
            !date ? "text-muted-foreground" : "text-black"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          initialFocus
          className="pointer-events-auto"
          locale={ptBR}
          fromDate={new Date()}
          toDate={new Date(new Date().setFullYear(new Date().getFullYear() + 10))}
        />
      </PopoverContent>
    </Popover>
  );
}
