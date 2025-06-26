
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useCreateHabit } from "@/hooks/useHabits";

const AddHabit = () => {
  const navigate = useNavigate();
  const createHabitMutation = useCreateHabit();
  
  const [habitData, setHabitData] = useState({
    name: "",
    description: "",
    category: "",
    frequency: "daily" as "daily" | "weekly" | "monthly",
    targetCount: 1,
    color: "#3B82F6",
    selectedDays: [] as string[],
    specificDate: "",
  });

  const weekdays = [
    { id: "monday", label: "Mon" },
    { id: "tuesday", label: "Tue" },
    { id: "wednesday", label: "Wed" },
    { id: "thursday", label: "Thu" },
    { id: "friday", label: "Fri" },
    { id: "saturday", label: "Sat" },
    { id: "sunday", label: "Sun" },
  ];

  const handleDayToggle = (dayId: string) => {
    setHabitData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayId)
        ? prev.selectedDays.filter(d => d !== dayId)
        : [...prev.selectedDays, dayId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!habitData.name.trim()) {
      return;
    }

    try {
      await createHabitMutation.mutateAsync({
        name: habitData.name,
        description: habitData.description,
        category: habitData.category,
        frequency: habitData.frequency,
        targetCount: habitData.targetCount,
        color: habitData.color,
        isActive: true,
      });
      
      navigate('/today');
    } catch (error) {
      console.error('Error creating habit:', error);
    }
  };

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-2 p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Add New Habit</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Your Habit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="habitName">Habit Name *</Label>
              <Input
                id="habitName"
                placeholder="e.g., Morning Meditation"
                value={habitData.name}
                onChange={(e) => setHabitData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What does this habit involve?"
                value={habitData.description}
                onChange={(e) => setHabitData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={habitData.category} 
                onValueChange={(value) => setHabitData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="creativity">Creativity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetCount">Daily Target</Label>
              <Input
                id="targetCount"
                type="number"
                min="1"
                value={habitData.targetCount}
                onChange={(e) => setHabitData(prev => ({ ...prev, targetCount: parseInt(e.target.value) || 1 }))}
              />
            </div>

            <div className="space-y-3">
              <Label>Frequency</Label>
              <Select 
                value={habitData.frequency} 
                onValueChange={(value: "daily" | "weekly" | "monthly") => setHabitData(prev => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              disabled={createHabitMutation.isPending}
            >
              {createHabitMutation.isPending ? 'Creating...' : 'Create Habit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddHabit;
