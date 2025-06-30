'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Calendar, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Goal } from '@/types/planner-types';
import { GoalDialog } from './goal-dialog';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import { format } from 'date-fns';

interface GoalsSectionProps {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
}

export function GoalsSection({ goals, setGoals }: GoalsSectionProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);

  const handleCreateGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setGoals([...goals, newGoal]);
  };

  const handleEditGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingGoal) return;
    
    const updatedGoal: Goal = {
      ...editingGoal,
      ...goalData,
      updatedAt: new Date(),
    };
    
    setGoals(goals.map(goal => goal.id === editingGoal.id ? updatedGoal : goal));
    setEditingGoal(null);
  };

  const handleDeleteGoal = () => {
    if (!deletingGoal) return;
    setGoals(goals.filter(goal => goal.id !== deletingGoal.id));
    setDeletingGoal(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col bg-muted/50 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 flex-shrink-0">
          <CardTitle className="text-lg font-semibold">Goals</CardTitle>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Goal
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3 p-4 min-h-0">
          {goals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No goals yet. Create your first goal to get started!</p>
            </div>
          ) : (
            goals.map((goal) => (
              <Card key={goal.id} className="group hover:shadow-md transition-shadow bg-muted border-none">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{goal.name}</h3>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingGoal(goal)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingGoal(goal)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{goal.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {goal.category}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>
                      <Flag className="h-3 w-3 mr-1" />
                      {goal.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {format(goal.deadline, 'MMM dd, yyyy')}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      <GoalDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateGoal}
        title="Create New Goal"
      />

      <GoalDialog
        open={!!editingGoal}
        onOpenChange={(open) => !open && setEditingGoal(null)}
        onSubmit={handleEditGoal}
        title="Edit Goal"
        initialData={editingGoal || undefined}
      />

      <DeleteConfirmDialog
        open={!!deletingGoal}
        onOpenChange={(open) => !open && setDeletingGoal(null)}
        onConfirm={handleDeleteGoal}
        title="Delete Goal"
        description={`Are you sure you want to delete "${deletingGoal?.name}"? This action cannot be undone.`}
      />
    </>
  );
}