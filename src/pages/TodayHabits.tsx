
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits, useTodayCompletions, useMarkHabitComplete } from "@/hooks/useHabits";

const TodayHabits = () => {
  const { data: habits = [], isLoading: habitsLoading } = useHabits();
  const { data: todayCompletions = [], isLoading: completionsLoading } = useTodayCompletions();
  const markHabitCompleteMutation = useMarkHabitComplete();

  const habitsWithCompletions = useMemo(() => {
    return habits.map(habit => {
      const completion = todayCompletions.find(c => c.habitId === habit.id);
      return {
        ...habit,
        completed: !!completion,
        completionCount: completion?.count || 0,
      };
    });
  }, [habits, todayCompletions]);

  const toggleHabit = async (habitId: string, isCompleted: boolean) => {
    if (!isCompleted) {
      try {
        await markHabitCompleteMutation.mutateAsync({ habitId });
      } catch (error) {
        console.error('Error marking habit complete:', error);
      }
    }
  };

  const completedHabits = habitsWithCompletions.filter(h => h.completed).length;
  const totalHabits = habitsWithCompletions.length;

  if (habitsLoading || completionsLoading) {
    return (
      <div className="p-4 pb-20 max-w-md mx-auto">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Today's Habits</h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {totalHabits > 0 && (
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Progress</p>
                <p className="text-2xl font-bold">{completedHabits}/{totalHabits}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Completion Rate</p>
                <p className="text-2xl font-bold">{totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0}%</p>
              </div>
            </div>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {habitsWithCompletions.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 mb-4">No habits yet!</p>
              <p className="text-sm text-gray-400">Add your first habit to get started on your journey.</p>
            </CardContent>
          </Card>
        ) : (
          habitsWithCompletions.map((habit) => (
            <Card 
              key={habit.id} 
              className={cn(
                "transition-all duration-300 cursor-pointer hover:shadow-md",
                habit.completed && "bg-green-50 border-green-200"
              )}
              onClick={() => toggleHabit(habit.id, habit.completed)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {markHabitCompleteMutation.isPending ? (
                      <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    ) : habit.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 animate-scale-in" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={cn(
                        "font-medium transition-all duration-200",
                        habit.completed && "line-through text-gray-500"
                      )}>
                        {habit.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {habit.targetCount} target
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{habit.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {habit.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {completedHabits === totalHabits && totalHabits > 0 && (
        <Card className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <p className="text-lg font-semibold text-yellow-800">🎉 All habits completed!</p>
            <p className="text-sm text-yellow-700">Great job staying consistent!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TodayHabits;
