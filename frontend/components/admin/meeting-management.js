"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Users,
  Video,
  Edit,
  Trash2,
  Play,
  Key,
  Send,
  UserPlus,
  AlertTriangle,
  Shield,
  Copy,
  Eye,
  EyeOff,
  Crown,
  Ban,
  MessageSquare,
} from "lucide-react"

export function MeetingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showMeetingDetails, setShowMeetingDetails] = useState(null)
  const [showEncryptionKey, setShowEncryptionKey] = useState({})

  const meetings = [
    {
      id: 1,
      title: "Weekly Team Standup",
      host: "John Doe",
      participants: 12,
      scheduledTime: "2024-01-15 10:00 AM",
      duration: "30 min",
      status: "Scheduled",
      recurring: true,
      roomId: "ROOM-001",
      encryptionKey: "AES256-GCM-7F8E9A2B3C4D5E6F",
      moderators: ["john.doe@company.com", "sarah.johnson@company.com"],
      invitees: ["mike.chen@company.com", "emily.davis@company.com", "alex.rodriguez@company.com"],
      meetingLink: "https://conference.company.com/join/ROOM-001",
    },
    {
      id: 2,
      title: "Project Review Meeting",
      host: "Sarah Johnson",
      participants: 8,
      scheduledTime: "2024-01-15 02:00 PM",
      duration: "60 min",
      status: "In Progress",
      recurring: false,
      roomId: "ROOM-002",
      encryptionKey: "AES256-GCM-1A2B3C4D5E6F7G8H",
      moderators: ["sarah.johnson@company.com"],
      invitees: ["john.doe@company.com", "mike.chen@company.com"],
      meetingLink: "https://conference.company.com/join/ROOM-002",
      activePparticipants: [
        { id: 1, name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "host", status: "speaking" },
        { id: 2, name: "Mike Chen", email: "mike.chen@company.com", role: "participant", status: "muted" },
        { id: 3, name: "Emily Davis", email: "emily.davis@company.com", role: "participant", status: "active" },
      ],
    },
  ]

  const ScheduleMeetingModal = () => {
    const [formData, setFormData] = useState({
      title: "",
      date: "",
      time: "",
      duration: "60",
      recurring: false,
      invitees: "",
      moderators: "",
      description: "",
    })

    const generateEncryptionKey = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      let key = "AES256-GCM-"
      for (let i = 0; i < 16; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return key
    }

    const handleSchedule = () => {
      const encryptionKey = generateEncryptionKey()
      const roomId = `ROOM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

      // Here you would typically send the meeting invitation with encryption key
      alert(
        `Meeting scheduled successfully!\nRoom ID: ${roomId}\nEncryption Key: ${encryptionKey}\n\nInvitation emails will be sent to all participants.`,
      )
      setShowScheduleModal(false)
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <CardTitle>Schedule New Meeting</CardTitle>
            <CardDescription>Create a new encrypted video conference</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Meeting Title</label>
                <Input
                  placeholder="Enter meeting title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Invitees (comma-separated emails)</label>
              <textarea
                className="w-full px-3 py-2 border border-slate-200 rounded-md"
                rows="3"
                placeholder="john@company.com, sarah@company.com, mike@company.com"
                value={formData.invitees}
                onChange={(e) => setFormData({ ...formData, invitees: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Moderators (comma-separated emails)</label>
              <textarea
                className="w-full px-3 py-2 border border-slate-200 rounded-md"
                rows="2"
                placeholder="admin@company.com, manager@company.com"
                value={formData.moderators}
                onChange={(e) => setFormData({ ...formData, moderators: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description (Optional)</label>
              <textarea
                className="w-full px-3 py-2 border border-slate-200 rounded-md"
                rows="3"
                placeholder="Meeting agenda and additional details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.recurring}
                onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
              />
              <label className="text-sm">Recurring meeting (weekly)</label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSchedule} className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule & Send Invitations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const MeetingDetailsModal = ({ meeting }) => {
    const [selectedParticipants, setSelectedParticipants] = useState([])

    const handleSendWarning = (participantId) => {
      alert(`Warning sent to participant ${participantId}`)
    }

    const handleRemoveUser = (participantId) => {
      if (confirm("Are you sure you want to remove this user from the meeting?")) {
        alert(`User ${participantId} removed from meeting`)
      }
    }

    const handlePromoteToModerator = (participantId) => {
      alert(`User ${participantId} promoted to moderator`)
    }

    const handleMuteUser = (participantId) => {
      alert(`User ${participantId} muted`)
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{meeting.title}</span>
              <Badge
                className={
                  meeting.status === "In Progress" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }
              >
                {meeting.status}
              </Badge>
            </CardTitle>
            <CardDescription>Meeting ID: {meeting.roomId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Meeting Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Meeting Details</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Host:</strong> {meeting.host}
                  </p>
                  <p>
                    <strong>Scheduled:</strong> {meeting.scheduledTime}
                  </p>
                  <p>
                    <strong>Duration:</strong> {meeting.duration}
                  </p>
                  <p>
                    <strong>Participants:</strong> {meeting.participants}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Security</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Encryption Key:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShowEncryptionKey({ ...showEncryptionKey, [meeting.id]: !showEncryptionKey[meeting.id] })
                      }
                    >
                      {showEncryptionKey[meeting.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="bg-slate-100 p-2 rounded text-xs font-mono">
                    {showEncryptionKey[meeting.id] ? meeting.encryptionKey : "••••••••••••••••"}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(meeting.encryptionKey)}
                      className="ml-2"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Moderators */}
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Crown className="h-4 w-4 mr-2 text-yellow-600" />
                Moderators
              </h4>
              <div className="flex flex-wrap gap-2">
                {meeting.moderators.map((moderator, index) => (
                  <Badge key={index} className="bg-yellow-100 text-yellow-800">
                    {moderator}
                  </Badge>
                ))}
                <Button size="sm" variant="outline">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Add Moderator
                </Button>
              </div>
            </div>

            {/* Active Participants (for in-progress meetings) */}
            {meeting.status === "In Progress" && meeting.activePparticipants && (
              <div>
                <h4 className="font-medium mb-2">Active Participants</h4>
                <div className="space-y-2">
                  {meeting.activePparticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-slate-600">{participant.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {participant.role === "host" && <Crown className="h-4 w-4 text-yellow-600" />}
                          {participant.role === "moderator" && <Shield className="h-4 w-4 text-blue-600" />}
                          <Badge
                            className={
                              participant.status === "speaking"
                                ? "bg-green-100 text-green-800"
                                : participant.status === "muted"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {participant.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleSendWarning(participant.id)}>
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleMuteUser(participant.id)}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handlePromoteToModerator(participant.id)}>
                          <Crown className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveUser(participant.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Invitees */}
            <div>
              <h4 className="font-medium mb-2">Invitees</h4>
              <div className="flex flex-wrap gap-2">
                {meeting.invitees.map((invitee, index) => (
                  <Badge key={index} variant="outline">
                    {invitee}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(meeting.meetingLink)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Meeting Link
                </Button>
                <Button variant="outline" onClick={() => alert("Sending encryption key to all participants...")}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Encryption Key
                </Button>
              </div>
              <Button variant="outline" onClick={() => setShowMeetingDetails(null)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.host.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "scheduled") return matchesSearch && meeting.status === "Scheduled"
    if (activeTab === "active") return matchesSearch && meeting.status === "In Progress"
    if (activeTab === "completed") return matchesSearch && meeting.status === "Completed"

    return matchesSearch
  })

  const tabs = [
    { id: "all", label: "All Meetings", count: meetings.length },
    { id: "scheduled", label: "Scheduled", count: meetings.filter((m) => m.status === "Scheduled").length },
    { id: "active", label: "Active", count: meetings.filter((m) => m.status === "In Progress").length },
    { id: "completed", label: "Completed", count: meetings.filter((m) => m.status === "Completed").length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meeting Management</h1>
          <p className="text-slate-600">Create, schedule, and manage encrypted video conferences</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowScheduleModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-slate-600">Total Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-slate-600">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">234</p>
                <p className="text-sm text-slate-600">Total Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">12.5h</p>
                <p className="text-sm text-slate-600">Total Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Tabs */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search meetings by title or host..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced meeting table with new actions */}
      <Card>
        <CardHeader>
          <CardTitle>Meetings ({meetings.length})</CardTitle>
          <CardDescription>Manage scheduled and ongoing meetings with encryption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Meeting</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Host</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Participants</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Schedule</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Security</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting) => (
                  <tr key={meeting.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{meeting.title}</p>
                        <p className="text-sm text-slate-600">Room: {meeting.roomId}</p>
                        {meeting.recurring && (
                          <Badge variant="outline" className="mt-1">
                            Recurring
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">{meeting.host}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{meeting.participants}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-slate-900">{meeting.scheduledTime}</p>
                        <p className="text-xs text-slate-600">{meeting.duration}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          meeting.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : meeting.status === "In Progress"
                              ? "bg-green-100 text-green-800"
                              : meeting.status === "Completed"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                        }
                      >
                        {meeting.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Key className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-600">Encrypted</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setShowMeetingDetails(meeting)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert(`Sending encryption key for ${meeting.title}...`)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                        {meeting.status === "In Progress" && (
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showScheduleModal && <ScheduleMeetingModal />}
      {showMeetingDetails && <MeetingDetailsModal meeting={showMeetingDetails} />}
    </div>
  )
}
