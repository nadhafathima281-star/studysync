import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/common/ProtectedRoute";
import ProtectedLayout from "./components/common/ProtectedLayout";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Tasks from "./pages/tasks/Tasks";
import Notes from "./pages/notes/Notes";
import Flashcards from "./pages/flashcards/Flashcards";
import Resources from "./pages/resources/Resources";
import AIPage from "./pages/ai/AIPage";
// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";

export default function App() {
  return (
    <Routes>
      {/* ========== Public Routes ========== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* ========== Protected Routes ========== */}
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/ai-chat" element={<AIPage />} />
      </Route>
    </Routes>
  );
}