'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TimePicker({ value, onChange, placeholder = "Select time", className }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate time options (15-minute intervals)
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? 'AM' : 'PM';
      const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
      timeOptions.push({ value: time24, label: time12 });
    }
  }

  // Convert 24-hour to 12-hour format for display
  const formatDisplayTime = (time24: string) => {
    if (!time24 || !time24.includes(':')) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Convert 12-hour to 24-hour format
  const parse12HourTo24Hour = (time12: string) => {
    const match = time12.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return null;
    
    let [, hours, minutes, ampm] = match;
    let hour = parseInt(hours);
    
    if (ampm.toUpperCase() === 'PM' && hour !== 12) {
      hour += 12;
    } else if (ampm.toUpperCase() === 'AM' && hour === 12) {
      hour = 0;
    }
    
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  };

  // Validate and format input
  const validateAndFormatInput = (input: string) => {
    // Remove any non-time characters except numbers, colons, spaces, A, M, P
    const cleaned = input.replace(/[^0-9:AMP\s]/gi, '');
    
    // Try to parse as 12-hour format first
    const time24From12 = parse12HourTo24Hour(cleaned);
    if (time24From12) {
      return time24From12;
    }
    
    // Try to parse as 24-hour format
    const match24 = cleaned.match(/^(\d{1,2}):(\d{2})$/);
    if (match24) {
      const [, hours, minutes] = match24;
      const hour = parseInt(hours);
      const minute = parseInt(minutes);
      
      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      }
    }
    
    return null;
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    const validated = validateAndFormatInput(inputValue);
    if (validated) {
      onChange(validated);
      setInputValue(validated);
    } else {
      // Revert to previous valid value
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, colons, spaces, and letters A, M, P
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
    const allowedChars = /[0-9:AMP\s]/i;
    
    if (!allowedKeys.includes(e.key) && !allowedChars.test(e.key)) {
      e.preventDefault();
    }
    
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const handleTimeSelect = (selectedTime: string) => {
    onChange(selectedTime);
    setInputValue(selectedTime);
    setOpen(false);
  };

  const displayValue = inputValue ? formatDisplayTime(inputValue) : '';

  return (
    <div className={cn("relative", className)}>
      <div className="flex">
        <Input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pr-10"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              type="button"
            >
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="end">
            <ScrollArea className="h-60">
              <div className="p-1">
                {timeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full justify-start text-sm font-normal",
                      value === option.value && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => handleTimeSelect(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}