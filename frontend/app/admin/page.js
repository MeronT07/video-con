"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { MeetingManagement } from "@/components/admin/meeting-management"
import { SystemLogs } from "@/components/admin/system-logs"
import { SystemSettings } from "@/components/admin/system-settings"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { LiveMeetingControl } from "@/components/admin/live-meeting-control"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminPage({ onBackToLogin, adminData }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter();

  const handleOpenLiveMeetingControl = (meetingId) => {
    setActiveTab("live-control")
    // If a specific meeting ID is provided, you could pass it to the component
    if (meetingId) {
      // Handle pre-selecting the meeting
      console.log("Pre-selecting meeting:", meetingId)
    }
  }

  const handleLogout = () => {
    router.push("/");
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard onOpenLiveMeetingControl={handleOpenLiveMeetingControl} />
      case "meetings":
        return <MeetingManagement />
      case "logs":
        return <SystemLogs />
      case "settings":
        return <SystemSettings />
      case "live-control":
        return <LiveMeetingControl />
      case "user-management":
        return <UserManagement />
      default:
        return <AdminDashboard onOpenLiveMeetingControl={handleOpenLiveMeetingControl} />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
          adminData={adminData}
        />

        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
