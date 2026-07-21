import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QADashboard from './pages/QADashboard';
import ProjectView from './pages/ProjectView';
import NewRegistration from './pages/NewRegistration';
import RegistrationStatus from './pages/RegistrationStatus';
import RaisedRequests from './pages/RaisedRequests';
import ServiceCertificate from './pages/ServiceCertificate';
import Communication from './pages/Communication';
import DOAS from './pages/DOAS';
import HelpDocument from './pages/HelpDocument';
import Certificate from './pages/Certificate';
import Header from './components/Header';
import Footer from './components/Footer';

// Context
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="d-flex flex-column min-vh-100">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route 
                path="/*" 
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <main className="flex-grow-1">
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/qa-dashboard" element={<QADashboard />} />
                          <Route path="/project-view/:id" element={<ProjectView />} />
                          <Route path="/new-registration" element={<NewRegistration />} />
                          <Route path="/registration-status" element={<RegistrationStatus />} />
                          <Route path="/raised-requests" element={<RaisedRequests />} />
                          <Route path="/service-certificate" element={<ServiceCertificate />} />
                          <Route path="/communication" element={<Communication />} />
                          <Route path="/doas" element={<DOAS />} />
                          <Route path="/help-document" element={<HelpDocument />} />
                          <Route path="/certificate" element={<Certificate />} />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;