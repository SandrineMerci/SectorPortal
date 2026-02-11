
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Services from "./pages/Services";
import Complaints from "./pages/Complaints";
import Index from "./pages/Index";
import UserDashboard from "./pages/UserDashboard";
import Track from "./pages/Track";
import Chatbot from "./pages/Chatbot";
import Privacy from "./pages/Privacy";
import Transparency from "./pages/Transparency";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StaffDashboard from "./pages/StaffDashboard";
import StaffCases from "./pages/StaffCases";
import StaffCaseDetail from "./pages/StaffCaseDetail";
import StaffCaseAssign from "./pages/StaffCaseAssign";
import StaffPriority from "./pages/StaffPriority";
import StaffTeam from "./pages/StaffTeam";
import StaffSettings from "./pages/StaffSettings";
import OfficerDashboard from "./pages/OfficerDashboard";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
   
   <LanguageProvider>
        <BrowserRouter>
          <Routes>
         <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/track" element={<Track />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/staff/cases" element={<StaffCases />} />
            <Route path="/staff/cases/:id" element={<StaffCaseDetail />} />
            <Route path="/staff/cases/:id/assign" element={<StaffCaseAssign />} />
            <Route path="/staff/priority" element={<StaffPriority />} />
            <Route path="/staff/team" element={<StaffTeam />} />
            <Route path="/staff/settings" element={<StaffSettings />} />
            <Route path="/officer" element={<OfficerDashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/transparency" element={<Transparency />} />
          </Routes>
        </BrowserRouter>
        </LanguageProvider>
  </QueryClientProvider>
);

export default App;