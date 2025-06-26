
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit3, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalEntry {
  date: string;
  content: string;
  mood: string;
}

const Journals = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isWriting, setIsWriting] = useState(false);
  const [entryText, setEntryText] = useState("");
  
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      date: "2024-01-15",
      content: "Had a great day today! Completed all my habits and felt really productive. The morning meditation helped me stay focused throughout the day.",
      mood: "happy"
    },
    {
      date: "2024-01-14",
      content: "Struggled a bit with motivation today, but managed to push through. Sometimes consistency is about showing up even when you don't feel like it.",
      mood: "okay"
    }
  ]);

  const getCurrentEntry = () => {
    return journalEntries.find(entry => entry.date === selectedDate);
  };

  const handleSaveEntry = () => {
    const existingEntry = getCurrentEntry();
    const newEntry: JournalEntry = {
      date: selectedDate,
      content: entryText,
      mood: "happy" // Default mood, could be made selectable
    };

    if (existingEntry) {
      setJournalEntries(prev => 
        prev.map(entry => 
          entry.date === selectedDate ? newEntry : entry
        )
      );
    } else {
      setJournalEntries(prev => [...prev, newEntry]);
    }

    setIsWriting(false);
    setEntryText("");
  };

  const handleStartWriting = () => {
    const existingEntry = getCurrentEntry();
    setEntryText(existingEntry?.content || "");
    setIsWriting(true);
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEntry = journalEntries.some(entry => entry.date === dateStr);
      const isSelected = dateStr === selectedDate;
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={cn(
            "w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 relative",
            isSelected && "bg-blue-500 text-white shadow-md",
            !isSelected && isToday && "bg-blue-100 text-blue-600",
            !isSelected && !isToday && "hover:bg-gray-100",
            hasEntry && !isSelected && "bg-green-100 text-green-700"
          )}
        >
          {day}
          {hasEntry && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
          )}
        </button>
      );
    }
    
    return days;
  };

  const selectedEntry = getCurrentEntry();

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Journal</h1>
        <p className="text-gray-600">Reflect on your daily journey</p>
      </div>

      {/* Calendar */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar size={20} />
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays()}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Entry */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
            {selectedEntry && (
              <Badge variant="outline" className="text-green-600">
                Entry exists
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!isWriting ? (
            <div className="space-y-4">
              {selectedEntry ? (
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEntry.content}
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <Badge variant="secondary">
                      {selectedEntry.mood}
                    </Badge>
                    <Button
                      onClick={handleStartWriting}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Edit3 size={14} />
                      Edit Entry
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No entry for this date</p>
                  <Button
                    onClick={handleStartWriting}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    <Edit3 size={16} className="mr-2" />
                    Write Journal Entry
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Textarea
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
                placeholder="What's on your mind today? How did your habits go? What are you grateful for?"
                rows={6}
                className="resize-none"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEntry}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  <Save size={16} className="mr-2" />
                  Save Entry
                </Button>
                <Button
                  onClick={() => {
                    setIsWriting(false);
                    setEntryText("");
                  }}
                  variant="outline"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Journals;
