import { RoleSelection } from "@/components/role-selection"

export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white">
      <RoleSelection />
    </main>
  )
}
