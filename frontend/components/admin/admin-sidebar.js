"use client"

import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Video,
  Users,
} from "lucide-react"

export function AdminSidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "meetings", label: "Meeting Management", icon: Calendar },
    { id: "live-control", label: "Live Meeting Control", icon: Video },
    { id: "user-management", label: "User Management", icon: Users },
    { id: "logs", label: "System Logs", icon: FileText },
    { id: "settings", label: "System Settings", icon: Settings },
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start text-left ${
                activeTab === item.id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {isOpen && <span>{item.label}</span>}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
