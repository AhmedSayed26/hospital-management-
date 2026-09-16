"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DataPickerProps = {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  id?: string
  name?: string
  className?: string
  disabled?: boolean
}

export function DataPicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  id,
  name,
  className,
  disabled,
}: DataPickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date>()
  const selectedDate = date !== undefined ? date : internalDate

  const handleSelect = (nextDate: Date | undefined) => {
    if (date === undefined) {
      setInternalDate(nextDate)
    }
    onDateChange?.(nextDate)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger
          disabled={disabled}
          render={
            <Button
              id={id}
              type="button"
              variant="outline"
              disabled={disabled}
              data-empty={!selectedDate}
              className={cn(
                "w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground",
                className
              )}
            >
              {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder}</span>}
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            defaultMonth={selectedDate}
          />
        </PopoverContent>
      </Popover>
      {name ? (
        <input
          type="hidden"
          name={name}
          value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
        />
      ) : null}
    </>
  )
}
