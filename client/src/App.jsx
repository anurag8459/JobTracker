import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import Applications from "./pages/Applications";
import EditJob from "./pages/EditJob";
import ResumeManager from "./pages/ResumeManager";
import InterviewPrep from "./pages/InterviewPrep";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Hero / Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-job"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-job/:id"
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resumes"
            element={
              <ProtectedRoute>
                <ResumeManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview-prep"
            element={
              <ProtectedRoute>
                <InterviewPrep />
              </ProtectedRoute>
            }
          />

          {/* Unknown Routes */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;