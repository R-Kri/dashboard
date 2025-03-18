import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import CustomerList from "./pages/dashboard/CustomerList";
import AgentList from "./pages/dashboard/AgentList";
import FundRequest from "./pages/dashboard/FundRequest";
import DashboardHome from "./pages/dashboard/DashboardHome";
import NotFound from "./pages/NotFound";
import FlightPage from "./pages/Flights/FlightPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="agents" element={<AgentList />} />
            <Route path="fund-request" element={<FundRequest />} />
          </Route>
          <Route path="/flights" element={<FlightPage />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
