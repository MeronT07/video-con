"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { JoinMeetingModal } from "@/components/user/join-meeting-modal"
import { UserManagement } from "@/components/user/user-management"
import {
  Calendar,
  Video,
  Clock,
  Users,
  Plus,
  Search,
  MessageSquare,
  Monitor,
  Mic,
  Camera,
  Bell,
  User,
  LogOut,
  Key,
  Settings,
  UserCog,
} from "lucide-react"

interface UserDashboardProps {
  userData: {
    userName: string
    userEmail: string
    role?: string
    department?: string
  }
  onJoinMeeting: (meetingData: any) => void
  onRequestMeeting: () => void
  onLogout: () => void
}

export function UserDashboard({ userData, onJoinMeeting, onRequestMeeting, onLogout }: UserDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Check if user has management permissions (host, moderator, or admin)
  const canManageUsers = userData.role && ["host", "moderator", "admin"].includes(userData.role)

  // Mock data for scheduled meetings
  const scheduledMeetings = [
    {
      id: "ROOM-001",
      title: "Weekly Team Standup",
      host: "John Doe",
      scheduledTime: "Today, 10:00 AM",
      duration: "30 min",
      participants: 12,
      status: "upcoming",
      canJoin: false,
      description: "Weekly team sync and updates",
      encryptionKey: "AES256-GCM-7F8E9A2B3C4D5E6F",
    },
    {
      id: "ROOM-002",
      title: "Project Review Meeting",
      host: "Sarah Johnson",
      scheduledTime: "Today, 2:00 PM",
      duration: "60 min",
      participants: 8,
      status: "live",
      canJoin: true,
      description: "Review project progress and milestones",
      encryptionKey: "AES256-GCM-1A2B3C4D5E6F7G8H",
    },
    {
      id: "ROOM-003",
      title: "Client Presentation",
      host: "Emily Davis",
      scheduledTime: "Tomorrow, 9:00 AM",
      duration: "45 min",
      participants: 6,
      status: "upcoming",
      canJoin: false,
      description: "Present quarterly results to client",
      encryptionKey: "AES256-GCM-9I8J7K6L5M4N3O2P",
    },
    {
      id: "ROOM-004",
      title: "Training Session",
      host: "Mike Chen",
      scheduledTime: "Tomorrow, 3:00 PM",
      duration: "90 min",
      participants: 25,
      status: "upcoming",
      canJoin: false,
      description: "New employee onboarding training",
      encryptionKey: "AES256-GCM-5Q4R3S2T1U0V9W8X",
    },
  ]

  // Mock data for recent meetings
  const recentMeetings = [
    {
      id: "ROOM-005",
      title: "Design Review",
      host: "Alex Rodriguez",
      date: "Yesterday, 11:00 AM",
      duration: "45 min",
      participants: 7,
      status: "completed",
    },
    {
      id: "ROOM-006",
      title: "Sprint Planning",
      host: "Lisa Wang",
      date: "Monday, 2:00 PM",
      duration: "120 min",
      participants: 10,
      status: "completed",
    },
  ]

  const handleJoinMeetingClick = (meeting: any) => {
    setSelectedMeeting(meeting)
    setShowJoinModal(true)
  }

  const handleJoinSuccess = (meetingData: any) => {
    setShowJoinModal(false)
    setSelectedMeeting(null)
    onJoinMeeting(meetingData)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      case "upcoming":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "completed":
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />
      default:
        return null
    }
  }

  const filteredMeetings = scheduledMeetings.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.host.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const liveMeetings = scheduledMeetings.filter((m) => m.status === "live")
  const upcomingMeetings = scheduledMeetings.filter((m) => m.status === "upcoming")

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, {userData.userName.split(" ")[0]}!</h2>
          <p className="text-slate-600">
            Manage your meetings and join video conferences
            {userData.department && ` • ${userData.department}`}
          </p>
        </div>
        <Button onClick={onRequestMeeting} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Request Meeting
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{liveMeetings.length}</p>
                <p className="text-sm text-slate-600">Live Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{upcomingMeetings.length}</p>
                <p className="text-sm text-slate-600">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {scheduledMeetings.reduce((acc, m) => acc + m.participants, 0)}
                </p>
                <p className="text-sm text-slate-600">Total Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{recentMeetings.length}</p>
                <p className="text-sm text-slate-600">Recent Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Meetings - Priority Section */}
      {liveMeetings.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span>Live Meetings - Join Now!</span>
            </CardTitle>
            <CardDescription className="text-green-700">These meetings are currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveMeetings.map((meeting) => (
                <Card key={meeting.id} className="border-green-300 bg-white">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-900">{meeting.title}</h4>
                        <Badge className="bg-green-100 text-green-800">LIVE</Badge>
                      </div>

                      <div className="space-y-1 text-sm text-slate-600">
                        <p>
                          <strong>Host:</strong> {meeting.host}
                        </p>
                        <p>
                          <strong>Participants:</strong> {meeting.participants}
                        </p>
                        <p>
                          <strong>Duration:</strong> {meeting.duration}
                        </p>
                      </div>

                      <Button
                        onClick={() => handleJoinMeetingClick(meeting)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Enter Key & Join
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search meetings by title or host..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Your Scheduled Meetings</CardTitle>
          <CardDescription>Upcoming meetings and those you can join</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    {getStatusIcon(meeting.status)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{meeting.title}</h4>
                      <Badge className={getStatusColor(meeting.status)}>{meeting.status.toUpperCase()}</Badge>
                    </div>

                    <p className="text-sm text-slate-600 mb-1">{meeting.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{meeting.host}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{meeting.scheduledTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{meeting.participants} participants</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {meeting.canJoin || meeting.status === "live" ? (
                    <Button onClick={() => handleJoinMeetingClick(meeting)} className="bg-blue-600 hover:bg-blue-700">
                      <Key className="h-4 w-4 mr-2" />
                      Join with Key
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      <Clock className="h-4 w-4 mr-2" />
                      Scheduled
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Meetings</CardTitle>
          <CardDescription>Your recently attended meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{meeting.title}</p>
                    <p className="text-sm text-slate-600">
                      {meeting.host} • {meeting.date} • {meeting.duration}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(meeting.status)}>{meeting.status.toUpperCase()}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>Your Meeting Capabilities</CardTitle>
          <CardDescription>What you can do in meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Camera className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Video Chat</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Mic className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Audio Chat</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">Messaging</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Monitor className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium">Screen Share</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">SecureConf</h1>
                <p className="text-sm text-slate-600">Video Conference Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-3 px-3 py-2 bg-slate-100 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-slate-900">{userData.userName}</p>
                <p className="text-xs text-slate-600">{userData.role || "Participant"}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-4 border-b border-slate-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Dashboard
            </button>
            {canManageUsers && (
              <button
                onClick={() => setActiveTab("users")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <UserCog className="h-4 w-4 inline mr-2" />
                User Management
              </button>
            )}
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "settings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Settings
            </button>
          </nav>
        </div>
      </header>

      <div className="p-6">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "users" && canManageUsers && <UserManagement currentUser={userData} />}
        {activeTab === "settings" && (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Settings</h3>
            <p className="text-slate-600">User settings panel coming soon...</p>
          </div>
        )}
      </div>

      {/* Join Meeting Modal */}
      {showJoinModal && selectedMeeting && (
        <JoinMeetingModal
          meeting={selectedMeeting}
          onClose={() => {
            setShowJoinModal(false)
            setSelectedMeeting(null)
          }}
          onJoinSuccess={handleJoinSuccess}
          userData={userData}
        />
      )}
    </div>
  )
}
