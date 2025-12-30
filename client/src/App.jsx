import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
// import ThemeToggle from "./components/common/ThemeToggle";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Tasks from "./pages/tasks/Tasks";
import Notes from "./pages/notes/Notes";
import Flashcards from "./pages/flashcards/Flashcards";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";

export default function App() {
  return (
    <>
      {/* GLOBAL THEME TOGGLE – visible everywhere */}
      {/* <div className="global-theme-toggle">
        <ThemeToggle />
      </div> */}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        {/* Protected Tasks */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Tasks />
              </>
            </ProtectedRoute>
          }
        />

        {/* Protected Notes */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Notes />
              </>
            </ProtectedRoute>
          }
        />

        {/* Protected Flashcards */}
<Route
  path="/flashcards"
  element={
    <ProtectedRoute>
      <>
        <Navbar />
        <Flashcards />
      </>
    </ProtectedRoute>
  }
/>

      </Routes>
    </>
  );
}