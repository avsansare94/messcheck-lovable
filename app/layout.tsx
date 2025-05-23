import type React from "react"
import type { Metadata, Viewport } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NetworkStatus } from "@/components/network-status"
import { GlobalErrorHandler } from "@/components/global-error-handler"
import { UserContextProvider } from "@/components/user-context-provider"
import { LanguageProvider } from "@/components/language-context-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MessCheck - Discover & Review Mess Services",
  description: "Find, review and subscribe to mess/tiffin services near you",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MessCheck",
  },
  themeColor: "#e11d48",
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#e11d48",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MessCheck" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <UserContextProvider>
              <GlobalErrorHandler>{children}</GlobalErrorHandler>
            </UserContextProvider>
          </LanguageProvider>
          <NetworkStatus />
        </ThemeProvider>
      </body>
    </html>
  )
}
