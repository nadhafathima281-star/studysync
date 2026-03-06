import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/common/ProtectedRoute";
import ProtectedLayout from "./components/common/ProtectedLayout";

// User Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Tasks from "./pages/tasks/Tasks";
import Notes from "./pages/notes/Notes";
import Flashcards from "./pages/flashcards/Flashcards";
import DeckStudy from "./pages/flashcards/DeckStudy";
import Resources from "./pages/resources/Resources";
import AIPage from "./pages/ai/AIPage";
import Profile from "./pages/profile/Profile";
import Pomodoro from "./pages/pomodoro/Pomodoro";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyResetOtp from "./pages/auth/VerifyResetOtp";
import ResetPassword from "./pages/auth/ResetPassword";

// Admin page
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= USER ROUTES ================= */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["student", "admin"]}>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/flashcards/:deckId" element={<DeckStudy/>}/>
        <Route path="/resources" element={<Resources />} />
        <Route path="/ai-chat" element={<AIPage />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* prevent blank page by redirecting to dashboard */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}