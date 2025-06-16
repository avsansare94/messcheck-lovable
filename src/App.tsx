
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { TestAuthProvider } from "@/lib/test-auth-context"
import { Toaster } from "@/components/ui/toaster"
import { TestRoleSwitcher } from "@/components/test-role-switcher"

// Import page components
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import ExplorePage from './pages/ExplorePage'
import MyMessPage from './pages/MyMessPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import ScannerPage from './pages/ScannerPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import UserDashboardPage from './pages/UserDashboardPage'
import ProviderHomePage from './pages/ProviderHomePage'
import ProviderManagePage from './pages/ProviderManagePage'
import ProviderSubscriptionPage from './pages/ProviderSubscriptionPage'
import ProviderCheckinPage from './pages/ProviderCheckinPage'
import ProviderSettingsPage from './pages/ProviderSettingsPage'

function App() {
  return (
    <TestAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/my-mess" element={<MyMessPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/provider/home" element={<ProviderHomePage />} />
          <Route path="/provider/dashboard" element={<Navigate to="/provider/home" replace />} />
          <Route path="/provider/manage" element={<ProviderManagePage />} />
          <Route path="/provider/subscription" element={<ProviderSubscriptionPage />} />
          <Route path="/provider/checkin" element={<ProviderCheckinPage />} />
          <Route path="/provider/settings" element={<ProviderSettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
        <TestRoleSwitcher />
      </Router>
    </TestAuthProvider>
  )
}

export default App
