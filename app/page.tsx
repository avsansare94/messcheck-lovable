import { RoleSelection } from "@/components/role-selection"
import { isLocalStorageAvailable } from "@/utils/storage-check"

export default function RootPage() {
  // Server-side rendering safe
  const storageAvailable = typeof window !== "undefined" ? isLocalStorageAvailable() : false

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white">
      {!storageAvailable && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 max-w-md">
          <p className="font-bold">Warning</p>
          <p>Local storage is not available. This may affect app functionality.</p>
        </div>
      )}
      <RoleSelection />
    </main>
  )
}
