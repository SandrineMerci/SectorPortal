
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
   
   <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/track" element={<Track />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/staff" element={<StaffDashboard />} />
          </Routes>
        </BrowserRouter>
        </LanguageProvider>
  </QueryClientProvider>
);

export default App;