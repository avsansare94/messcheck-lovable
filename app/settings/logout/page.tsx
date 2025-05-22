"use client"

import { useState } from "react"
import { SettingsLayout } from "@/components/settings-layout"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/utils/auth"
import { LogOut } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function LogoutPage() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { logout } = useLogout()

  return (
    <SettingsLayout title="Logout" description="Sign out of your account">
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <LogOut className="h-8 w-8 text-red-600" />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold">Ready to leave?</h2>
          <p className="text-gray-500 mt-2">You will be logged out of your account and redirected to the login page.</p>
        </div>

        <Button variant="destructive" className="w-full max-w-xs" onClick={() => setShowConfirmation(true)}>
          Logout
        </Button>

        <Button variant="outline" className="w-full max-w-xs" onClick={() => history.back()}>
          Cancel
        </Button>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account and redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={logout} className="bg-red-600 hover:bg-red-700">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SettingsLayout>
  )
}
