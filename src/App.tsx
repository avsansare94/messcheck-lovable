
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { NetworkStatus } from "@/components/network-status"
import { GlobalErrorHandler } from "@/components/global-error-handler"
import { TestAuthProvider } from "@/lib/test-auth-context"
import { LanguageProvider } from "@/components/language-context-provider"
import { Toaster } from "@/components/ui/toaster"
import { TestRoleSwitcher } from "@/components/test-role-switcher"

// Import converted page components
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import ExplorePage from './pages/ExplorePage'
import MyMessPage from './pages/MyMessPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import UserDashboardPage from './pages/UserDashboardPage'
import ProviderHomePage from './pages/ProviderHomePage'
import ProviderDashboardPage from './pages/ProviderDashboardPage'
import UnauthorizedPage from './pages/UnauthorizedPage'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <LanguageProvider>
        <TestAuthProvider>
          <GlobalErrorHandler>
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
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/user/dashboard" element={<UserDashboardPage />} />
                <Route path="/provider/home" element={<ProviderHomePage />} />
                <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster />
              <TestRoleSwitcher />
            </Router>
          </GlobalErrorHandler>
        </TestAuthProvider>
      </LanguageProvider>
      <NetworkStatus />
    </ThemeProvider>
  )
}

export default App
