'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarEvent, Template } from '@/types/planner-types';
import { Trash2 } from 'lucide-react';

const eventSchema = z.object({
  templateId: z.string().min(1, 'Template is required'),
});

type EventFormData = z.infer<typeof eventSchema>;

interface CalendarEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: () => void;
  title: string;
  initialData?: CalendarEvent;
  selectedSlot?: { start: Date; end: Date } | null;
  templates: Template[];
}

export function CalendarEventDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  onDelete, 
  title, 
  initialData, 
  selectedSlot,
  templates 
}: CalendarEventDialogProps) {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      templateId: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        templateId: initialData.templateId,
      });
    } else {
      form.reset({
        templateId: templates[0]?.id || '',
      });
    }
  }, [initialData, form, templates]);

  const handleSubmit = (data: EventFormData) => {
    const selectedTemplate = templates.find(t => t.id === data.templateId);
    if (!selectedTemplate) return;

    const eventData: Omit<CalendarEvent, 'id'> = {
      title: selectedTemplate.name,
      start: selectedSlot?.start || initialData?.start || new Date(),
      end: selectedSlot?.end || initialData?.end || new Date(),
      templateId: data.templateId,
      allDay: true,
    };

    onSubmit(eventData);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Template</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a template to assign" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-gray-500">{template.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedSlot && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p><strong>Selected Date:</strong> {selectedSlot.start.toLocaleDateString()}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? 'Update' : 'Assign'} Template
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}