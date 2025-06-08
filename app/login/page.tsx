import { GoogleLoginForm } from "@/components/auth/google-login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <GoogleLoginForm />
    </div>
  )
}
