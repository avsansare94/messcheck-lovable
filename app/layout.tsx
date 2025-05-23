import type React from "react"
import { AuthProvider } from "@/components/auth-provider"
import "./globals.css"

export const metadata = {
  title: "MessCheck - Find and Manage Mess Subscriptions",
  description: "Find, subscribe, and check in to mess services near you",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
