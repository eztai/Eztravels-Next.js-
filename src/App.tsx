
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { View } from 'react-native-web';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger />
                <div className="flex-1" />
                {/* Profile section will go here */}
              </div>
              <div className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* Placeholder routes for now */}
                  <Route path="/trips" element={<div className="p-6"><h1 className="text-2xl font-bold">My Trips - Coming Soon</h1></div>} />
                  <Route path="/itinerary" element={<div className="p-6"><h1 className="text-2xl font-bold">Itinerary - Coming Soon</h1></div>} />
                  <Route path="/budget" element={<div className="p-6"><h1 className="text-2xl font-bold">Budget - Coming Soon</h1></div>} />
                  <Route path="/profile" element={<div className="p-6"><h1 className="text-2xl font-bold">Profile - Coming Soon</h1></div>} />
                  <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
