"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VideoConferenceRoom } from "@/components/video-conference-room"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Crown,
  Shield,
  Ban,
  AlertTriangle,
  Volume2,
  VolumeX,
  Send,
  Key,
  Copy,
  Play,
  Eye,
  Monitor,
} from "lucide-react"

export function LiveMeetingControl() {
  const [selectedMeeting, setSelectedMeeting] = useState("ROOM-002")
  const [showWarningModal, setShowWarningModal] = useState(null)
  const [warningMessage, setWarningMessage] = useState("")
  const [isJoinedToMeeting, setIsJoinedToMeeting] = useState(false)
  const [adminMeetingData, setAdminMeetingData] = useState(null)
  const [adminViewMode, setAdminViewMode] = useState("control") // "control" or "participant"

  const activeMeetings = [
    {
      id: "ROOM-002",
      title: "Project Review Meeting",
      host: "Sarah Johnson",
      participants: [
        {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.johnson@company.com",
          role: "host",
          isMuted: false,
          isVideoOn: true,
          isSpeaking: true,
          joinTime: "10:00 AM",
          connectionStatus: "connected",
        },
        {
          id: 2,
          name: "Mike Chen",
          email: "mike.chen@company.com",
          role: "participant",
          isMuted: true,
          isVideoOn: true,
          isSpeaking: false,
          joinTime: "10:02 AM",
          connectionStatus: "connected",
        },
        {
          id: 3,
          name: "Emily Davis",
          email: "emily.davis@company.com",
          role: "moderator",
          isMuted: false,
          isVideoOn: false,
          isSpeaking: false,
          joinTime: "10:01 AM",
          connectionStatus: "connected",
        },
        {
          id: 4,
          name: "Alex Rodriguez",
          email: "alex.rodriguez@company.com",
          role: "participant",
          isMuted: false,
          isVideoOn: true,
          isSpeaking: false,
          joinTime: "10:03 AM",
          connectionStatus: "connected",
        },
      ],
      encryptionKey: "AES256-GCM-1A2B3C4D5E6F7G8H",
      startTime: "2:00 PM",
      duration: "25 minutes",
      status: "In Progress",
    },
    {
      id: "ROOM-001",
      title: "Weekly Team Standup",
      host: "John Doe",
      participants: [
        {
          id: 5,
          name: "John Doe",
          email: "john.doe@company.com",
          role: "host",
          isMuted: false,
          isVideoOn: true,
          isSpeaking: false,
          joinTime: "9:00 AM",
          connectionStatus: "connected",
        },
        {
          id: 6,
          name: "Lisa Wang",
          email: "lisa.wang@company.com",
          role: "participant",
          isMuted: true,
          isVideoOn: true,
          isSpeaking: false,
          joinTime: "9:01 AM",
          connectionStatus: "connected",
        },
      ],
      encryptionKey: "AES256-GCM-7F8E9A2B3C4D5E6F",
      startTime: "9:00 AM",
      duration: "15 minutes",
      status: "In Progress",
    },
  ]

  const currentMeeting = activeMeetings.find((m) => m.id === selectedMeeting)

  const handleJoinMeeting = () => {
    const meetingData = {
      roomId: selectedMeeting,
      userName: "Admin (Live Control)",
      userEmail: "admin@company.com",
      isAdmin: true,
      isHiddenModerator: true,
      encryptionKey: currentMeeting?.encryptionKey,
    }
    setAdminMeetingData(meetingData)
    setIsJoinedToMeeting(true)
  }

  const handleLeaveMeeting = () => {
    setIsJoinedToMeeting(false)
    setAdminMeetingData(null)
    setAdminViewMode("control")
  }

  const handleMuteUser = (userId, userName) => {
    // This would send a real-time command to mute the user
    alert(`${userName} has been muted by admin`)
    console.log(`Admin action: Muted user ${userId} in meeting ${selectedMeeting}`)

    // Log the action
    logAdminAction("user_muted", userId, userName, "User muted by admin for disruption")
  }

  const handleUnmuteUser = (userId, userName) => {
    alert(`${userName} has been unmuted by admin`)
    console.log(`Admin action: Unmuted user ${userId} in meeting ${selectedMeeting}`)

    logAdminAction("user_unmuted", userId, userName, "User unmuted by admin")
  }

  const handleRemoveUser = (userId, userName) => {
    if (confirm(`Are you sure you want to remove ${userName} from the meeting?`)) {
      alert(`${userName} has been removed from the meeting`)
      console.log(`Admin action: Removed user ${userId} from meeting ${selectedMeeting}`)

      logAdminAction("user_removed", userId, userName, "User removed from meeting by admin")

      // Update the participants list (in real app, this would be handled by WebSocket)
      // Remove user from the meeting interface
    }
  }

  const handlePromoteToModerator = (userId, userName) => {
    alert(`${userName} has been promoted to moderator`)
    console.log(`Admin action: Promoted user ${userId} to moderator in meeting ${selectedMeeting}`)

    logAdminAction("user_promoted", userId, userName, "User promoted to moderator by admin")
  }

  const handleSendWarning = (userId, userName) => {
    if (warningMessage.trim()) {
      alert(`Warning sent to ${userName}: ${warningMessage}`)
      console.log(`Admin action: Sent warning to user ${userId} in meeting ${selectedMeeting}: ${warningMessage}`)

      logAdminAction("warning_sent", userId, userName, `Warning sent: ${warningMessage}`)

      setShowWarningModal(null)
      setWarningMessage("")
    }
  }

  const handleSendEncryptionKey = () => {
    alert("Encryption key sent to all participants")
    console.log(`Admin action: Sent encryption key for meeting ${selectedMeeting}`)

    logAdminAction("encryption_key_sent", "all", "All Participants", "Encryption key redistributed")
  }

  const handleMuteAll = () => {
    if (confirm("Are you sure you want to mute all participants?")) {
      alert("All participants have been muted")
      console.log(`Admin action: Muted all participants in meeting ${selectedMeeting}`)

      logAdminAction("all_muted", "all", "All Participants", "All participants muted by admin")
    }
  }

  const handleEndMeeting = () => {
    if (confirm("Are you sure you want to end this meeting for all participants?")) {
      alert("Meeting has been ended by admin")
      console.log(`Admin action: Ended meeting ${selectedMeeting}`)

      logAdminAction("meeting_ended", "all", "All Participants", "Meeting ended by admin")

      handleLeaveMeeting()
    }
  }

  const logAdminAction = (action, userId, userName, details) => {
    // This would send the log to your backend
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      category: "Admin",
      message: `Admin performed ${action} on ${userName}`,
      user: "admin@company.com",
      details: details,
      action: action,
      meetingId: selectedMeeting,
      targetUser: userId,
    }
    console.log("Log Entry:", logEntry)
  }

  const WarningModal = ({ participant }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Send Warning</CardTitle>
          <CardDescription>Send a warning message to {participant.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full px-3 py-2 border border-slate-200 rounded-md"
            rows="4"
            placeholder="Enter warning message..."
            value={warningMessage}
            onChange={(e) => setWarningMessage(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowWarningModal(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleSendWarning(participant.id, participant.name)}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Send Warning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // If admin has joined the meeting, show the integrated view
  if (isJoinedToMeeting && adminMeetingData) {
    return (
      <div className="space-y-4">
        {/* Admin Control Header */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-900">Admin Mode - {currentMeeting?.title}</h3>
                  <p className="text-sm text-red-700">You are connected as a hidden moderator with full control</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAdminViewMode(adminViewMode === "control" ? "participant" : "control")}
                >
                  {adminViewMode === "control" ? (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      View as Participant
                    </>
                  ) : (
                    <>
                      <Monitor className="h-4 w-4 mr-2" />
                      Admin Control
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleLeaveMeeting}>
                  Leave Admin Mode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {adminViewMode === "control" ? (
          /* Admin Control Panel */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Meeting Video View */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Meeting View</CardTitle>
                  <CardDescription>Live video feed with admin controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden">
                    {/* This would be the actual video feed */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-semibold">Live Meeting Feed</p>
                        <p className="text-sm opacity-75">{currentMeeting?.title}</p>
                      </div>
                    </div>

                    {/* Admin overlay controls */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      ADMIN MODE
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Participants Control Panel */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Live Participants ({currentMeeting?.participants.length})</CardTitle>
                  <CardDescription>Real-time participant control</CardDescription>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  <div className="space-y-3">
                    {currentMeeting?.participants.map((participant) => (
                      <div key={participant.id} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{participant.name}</p>
                              <div className="flex items-center space-x-1">
                                {participant.role === "host" && <Crown className="h-3 w-3 text-yellow-600" />}
                                {participant.role === "moderator" && <Shield className="h-3 w-3 text-blue-600" />}
                                {participant.isSpeaking && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">Speaking</Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1">
                            {participant.isMuted ? (
                              <MicOff className="h-3 w-3 text-red-500" />
                            ) : (
                              <Mic className="h-3 w-3 text-green-500" />
                            )}
                            {participant.isVideoOn ? (
                              <Video className="h-3 w-3 text-green-500" />
                            ) : (
                              <VideoOff className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </div>

                        {/* Quick action buttons */}
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              participant.isMuted
                                ? handleUnmuteUser(participant.id, participant.name)
                                : handleMuteUser(participant.id, participant.name)
                            }
                            className="text-xs px-2 py-1"
                          >
                            {participant.isMuted ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                            {participant.isMuted ? "Unmute" : "Mute"}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowWarningModal(participant)}
                            className="text-xs px-2 py-1 bg-yellow-600 hover:bg-yellow-700"
                          >
                            <AlertTriangle className="h-3 w-3" />
                            Warn
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveUser(participant.id, participant.name)}
                            className="text-xs px-2 py-1 text-red-600 hover:text-red-700"
                          >
                            <Ban className="h-3 w-3" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button size="sm" onClick={handleMuteAll} className="w-full bg-transparent" variant="outline">
                    <VolumeX className="h-4 w-4 mr-2" />
                    Mute All Participants
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSendEncryptionKey}
                    className="w-full bg-transparent"
                    variant="outline"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Encryption Key
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleEndMeeting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    End Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Full Meeting Interface for Admin */
          <VideoConferenceRoom
            meetingData={adminMeetingData}
            onLeaveMeeting={handleLeaveMeeting}
            isAdminMode={true}
            onAdminAction={(action, data) => {
              // Handle admin actions from the meeting interface
              console.log("Admin action from meeting:", action, data)
            }}
          />
        )}

        {/* Warning Modal */}
        {showWarningModal && <WarningModal participant={showWarningModal} />}
      </div>
    )
  }

  // Default control panel view (before joining)
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Live Meeting Control</h2>
        <p className="text-slate-600">Join meetings as admin to monitor and control participants in real-time</p>
      </div>

      {/* Meeting Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="font-medium">Select Active Meeting:</label>
              <select
                value={selectedMeeting}
                onChange={(e) => setSelectedMeeting(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md bg-white"
              >
                {activeMeetings.map((meeting) => (
                  <option key={meeting.id} value={meeting.id}>
                    {meeting.title} ({meeting.id}) - {meeting.participants.length} participants
                  </option>
                ))}
              </select>
              <Badge className="bg-green-100 text-green-800">{currentMeeting?.status}</Badge>
            </div>

            <Button onClick={handleJoinMeeting} className="bg-red-600 hover:bg-red-700 text-white">
              <Play className="h-4 w-4 mr-2" />
              Join as Admin & Control
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Meeting Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meeting Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600">Title</p>
                <p className="font-semibold">{currentMeeting?.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Host</p>
                <p>{currentMeeting?.host}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Duration</p>
                <p>{currentMeeting?.duration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Participants</p>
                <p>{currentMeeting?.participants.length} active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security & Encryption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">End-to-End Encrypted</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Encryption Key</p>
                <div className="bg-slate-100 p-2 rounded text-xs font-mono flex items-center justify-between">
                  <span>{currentMeeting?.encryptionKey}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(currentMeeting?.encryptionKey)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participants Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Participants</CardTitle>
          <CardDescription>Preview of active participants (join meeting for full control)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentMeeting?.participants.map((participant) => (
              <div key={participant.id} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm">{participant.name}</p>
                      {participant.role === "host" && <Crown className="h-4 w-4 text-yellow-600" />}
                      {participant.role === "moderator" && <Shield className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {participant.isMuted ? (
                        <MicOff className="h-3 w-3 text-red-500" />
                      ) : (
                        <Mic className="h-3 w-3 text-green-500" />
                      )}
                      {participant.isVideoOn ? (
                        <Video className="h-3 w-3 text-green-500" />
                      ) : (
                        <VideoOff className="h-3 w-3 text-red-500" />
                      )}
                      <span className="text-xs text-slate-500">{participant.joinTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
