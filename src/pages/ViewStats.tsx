
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitStats {
  id: string;
  name: string;
  category: string;
  totalDays: number;
  completedDays: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  monthlyData: { [key: string]: boolean[] };
}

const ViewStats = () => {
  const [expandedHabit, setExpandedHabit] = useState<string | null>(null);

  const habitStats: HabitStats[] = [
    {
      id: "1",
      name: "Morning Meditation",
      category: "Wellness",
      totalDays: 30,
      completedDays: 25,
      currentStreak: 5,
      longestStreak: 12,
      completionRate: 83,
      monthlyData: {
        "2024-01": [true, true, false, true, true, true, false, true, true, true, false, true, true, true, true, false, true, true, true, true, false, true, true, true, true, true, false, true, true, true]
      }
    },
    {
      id: "2",
      name: "Read 30 Pages",
      category: "Learning",
      totalDays: 30,
      completedDays: 28,
      currentStreak: 12,
      longestStreak: 15,
      completionRate: 93,
      monthlyData: {
        "2024-01": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, false, true]
      }
    },
    {
      id: "3",
      name: "Exercise",
      category: "Fitness",
      totalDays: 30,
      completedDays: 20,
      currentStreak: 3,
      longestStreak: 8,
      completionRate: 67,
      monthlyData: {
        "2024-01": [true, false, true, true, false, true, false, true, true, false, true, false, true, true, true, false, false, true, true, true, false, true, false, true, true, false, true, true, true, false]
      }
    }
  ];

  const generateCalendarDays = (monthData: boolean[]) => {
    return monthData.map((completed, index) => (
      <div
        key={index}
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200",
          completed 
            ? "bg-green-500 text-white shadow-sm" 
            : "bg-gray-100 text-gray-400"
        )}
      >
        {index + 1}
      </div>
    ));
  };

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Habit Statistics</h1>
        <p className="text-gray-600">Track your progress and consistency</p>
      </div>

      <div className="space-y-4">
        {habitStats.map((habit) => (
          <Card key={habit.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{habit.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {habit.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {habit.completionRate}%
                  </div>
                  <div className="text-xs text-gray-500">completion</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-blue-600">
                    {habit.currentStreak}
                  </div>
                  <div className="text-xs text-gray-500">Current Streak</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-purple-600">
                    {habit.longestStreak}
                  </div>
                  <div className="text-xs text-gray-500">Longest Streak</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">
                    {habit.completedDays}/{habit.totalDays}
                  </div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">January 2024</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedHabit(
                      expandedHabit === habit.id ? null : habit.id
                    )}
                    className="p-1"
                  >
                    {expandedHabit === habit.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays(habit.monthlyData["2024-01"])}
                </div>
              </div>

              {expandedHabit === habit.id && (
                <div className="pt-3 border-t">
                  <div className="text-sm font-medium mb-2">All Time View</div>
                  <div className="text-xs text-gray-500 mb-3">
                    This would show the full calendar history for this habit
                  </div>
                  <div className="grid grid-cols-7 gap-1 opacity-50">
                    {generateCalendarDays(habit.monthlyData["2024-01"])}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewStats;
