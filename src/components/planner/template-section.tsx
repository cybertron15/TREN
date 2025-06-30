'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Template, Goal } from '@/types/planner-types';
import { TemplateDialog } from './template-dialog';
import { DeleteConfirmDialog } from './delete-confirm-dialog';

interface TemplatesSectionProps {
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
  goals: Goal[];
}

export function TemplatesSection({ templates, setTemplates, goals }: TemplatesSectionProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<Template | null>(null);

  const handleCreateTemplate = (templateData: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTemplate: Template = {
      ...templateData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleEditTemplate = (templateData: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTemplate) return;
    
    const updatedTemplate: Template = {
      ...editingTemplate,
      ...templateData,
      updatedAt: new Date(),
    };
    
    setTemplates(templates.map(template => template.id === editingTemplate.id ? updatedTemplate : template));
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = () => {
    if (!deletingTemplate) return;
    setTemplates(templates.filter(template => template.id !== deletingTemplate.id));
    setDeletingTemplate(null);
  };

  return (
    <>
      <Card className="h-full flex flex-col bg-muted/50 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 flex-shrink-0">
          <CardTitle className="text-lg font-semibold">Templates</CardTitle>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Template
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex-nowrap overflow-x-auto p-4 min-h-0">
          {templates.length === 0 ? (
            <div className="text-center py-8 text-gray-500 ">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No templates yet. Create your first template to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="group hover:shadow-md transition-shadow bg-muted border-none">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingTemplate(template)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletingTemplate(template)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                    <div className="space-y-1 mb-3">
                      {template.tasks.slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center gap-2 text-xs">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          <span className="truncate">{task.name}</span>
                        </div>
                      ))}
                      {template.tasks.length > 3 && (
                        <div className="text-xs text-gray-500 pl-4">
                          +{template.tasks.length - 3} more tasks
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {template.tasks.length} tasks
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <TemplateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateTemplate}
        title="Create New Template"
        goals={goals}
      />

      <TemplateDialog
        open={!!editingTemplate}
        onOpenChange={(open) => !open && setEditingTemplate(null)}
        onSubmit={handleEditTemplate}
        title="Edit Template"
        initialData={editingTemplate || undefined}
        goals={goals}
      />

      <DeleteConfirmDialog
        open={!!deletingTemplate}
        onOpenChange={(open) => !open && setDeletingTemplate(null)}
        onConfirm={handleDeleteTemplate}
        title="Delete Template"
        description={`Are you sure you want to delete "${deletingTemplate?.name}"? This action cannot be undone.`}
      />
    </>
  );
}