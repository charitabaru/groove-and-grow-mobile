
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AddHabit from "./pages/AddHabit";
import TodayHabits from "./pages/TodayHabits";
import ViewStats from "./pages/ViewStats";
import Journals from "./pages/Journals";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import { Navigation } from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/add-habit" element={<AddHabit />} />
            <Route path="/today" element={<TodayHabits />} />
            <Route path="/stats" element={<ViewStats />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Navigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
