import { redirect } from "next/navigation"

export default function ProviderProfilePage() {
  redirect("/provider/settings/profile")
  return null
}
