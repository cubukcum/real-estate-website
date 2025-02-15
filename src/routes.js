import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageProjects from "./admin/ManageProjects";
import AddProjectForm from "./admin/AddProjectForm";
import EditProjectForm from "./admin/EditProject";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./layouts/AdminLayout";
import MaintenancePage from "./pages/MaintenancePage";

const MAINTENANCE_MODE = true; // You can toggle this to true/false
const BYPASS_KEY = "bypass_maintenance"; // This will be used in the URL

function App() {
  // Check if there's a bypass parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const bypassMaintenance = urlParams.get(BYPASS_KEY) === "true";

  if (MAINTENANCE_MODE && !bypassMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <ProjectsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <AboutPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <ContactPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <>
              <Navbar />
              <ProjectDetailPage />
              <Footer />
            </>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-projects"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageProjects />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-project"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AddProjectForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-project/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EditProjectForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
