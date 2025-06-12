
import React from "react"
import AdminDashboardOverview from "@/components/admin/admin-dashboard-overview"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminDashboardOverview />
      </div>
    </div>
  )
}
