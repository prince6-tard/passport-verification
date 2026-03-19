import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import Layout from './components/Layout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import AppIntro from './pages/AppIntro';
import ApplicationForm from './pages/ApplicationForm';
import DocumentUpload from './pages/DocumentUpload';
import AppointmentBooking from './pages/AppointmentBooking';
import Success from './pages/Success';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              
              <Route path="setup" element={
                <ProtectedRoute>
                  <Setup />
                </ProtectedRoute>
              } />
              
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              <Route path="apply/intro" element={
                <ProtectedRoute>
                  <AppIntro />
                </ProtectedRoute>
              } />

              <Route path="apply/form" element={
                <ProtectedRoute>
                  <ApplicationForm />
                </ProtectedRoute>
              } />

              <Route path="apply/documents" element={
                <ProtectedRoute>
                  <DocumentUpload />
                </ProtectedRoute>
              } />

              <Route path="apply/appointment" element={
                <ProtectedRoute>
                  <AppointmentBooking />
                </ProtectedRoute>
              } />

              <Route path="apply/success" element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </ApplicationProvider>
    </AuthProvider>
  );
}

export default App;
