
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Habit {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  streak: number;
  category: string;
}

const TodayHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning Meditation",
      description: "10 minutes of mindfulness",
      completed: false,
      streak: 5,
      category: "Wellness"
    },
    {
      id: "2",
      name: "Read 30 Pages",
      description: "Daily reading habit",
      completed: true,
      streak: 12,
      category: "Learning"
    },
    {
      id: "3",
      name: "Exercise",
      description: "30 minutes workout",
      completed: false,
      streak: 3,
      category: "Fitness"
    }
  ]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak - 1 : habit.streak + 1 }
        : habit
    ));
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;

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

      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Progress</p>
              <p className="text-2xl font-bold">{completedHabits}/{totalHabits}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Completion Rate</p>
              <p className="text-2xl font-bold">{Math.round((completedHabits / totalHabits) * 100)}%</p>
            </div>
          </div>
          <div className="mt-3 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(completedHabits / totalHabits) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {habits.map((habit) => (
          <Card 
            key={habit.id} 
            className={cn(
              "transition-all duration-300 cursor-pointer hover:shadow-md",
              habit.completed && "bg-green-50 border-green-200"
            )}
            onClick={() => toggleHabit(habit.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {habit.completed ? (
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
                      {habit.streak} day streak
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
        ))}
      </div>

      {completedHabits === totalHabits && (
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
