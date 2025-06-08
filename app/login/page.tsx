import { GoogleLoginButton } from "@/components/auth/google-login-button"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white">
      <div className="w-full max-w-sm mx-auto">
        {/* App Logo & Branding */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">MessCheck</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to MessCheck</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your go-to app to discover and manage daily mess services.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <GoogleLoginButton />
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  )
}
