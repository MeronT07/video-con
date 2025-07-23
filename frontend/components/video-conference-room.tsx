"use client"

import { useState } from "react"
import { VideoGrid } from "@/components/video-grid"
import { ControlBar } from "@/components/control-bar"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ParticipantsSidebar } from "@/components/participants-sidebar"
import { ScreenShareView } from "@/components/screen-share-view"
import React from "react"
import { AdminMeetingToolbar } from "@/components/admin-meeting-toolbar"
import { AdminAnnouncementModal } from "@/components/admin-announcement-modal"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"

interface VideoConferenceRoomProps {
  meetingData: {
    roomId: string
    userName: string
    userEmail: string
    isAdmin?: boolean
    isHiddenModerator?: boolean
    encryptionKey?: string
  }
  onLeaveMeeting: () => void
  isAdminMode?: boolean
  onAdminAction?: (action: string, data: any) => void
}

export function VideoConferenceRoom({
  meetingData,
  onLeaveMeeting,
  isAdminMode = meetingData?.isAdmin || false,
  onAdminAction,
}: VideoConferenceRoomProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)
  const [isAdminVisible, setIsAdminVisible] = useState(false)
  const [showAdminSettings, setShowAdminSettings] = useState(false)
  const [showAdminToolbar, setShowAdminToolbar] = useState(false)
  const [canRecord, setCanRecord] = useState(true) // User permission to record

  // Add recording timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  // Add recording controls
  const handleStartRecording = () => {
    if (!canRecord) {
      alert("Recording is not allowed for this meeting or your role.")
      return
    }
    setIsRecording(true)
    setRecordingDuration(0)
    console.log("Recording started by user")
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    console.log("Recording stopped by user")
    alert(
      `Recording saved! Duration: ${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, "0")}`,
    )
  }

  // Mock participants data
  const actualAdminMode = meetingData?.isAdmin || isAdminMode
  const [participants, setParticipants] = useState([
    {
      id: "1",
      name: meetingData.userName,
      isLocal: true,
      isMuted: false,
      isVideoOff: false,
      role: meetingData.isAdmin ? "admin" : "participant",
      email: meetingData.userEmail,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      isLocal: false,
      isMuted: false,
      isVideoOff: false,
      role: "host",
      email: "sarah@company.com",
    },
    {
      id: "3",
      name: "Mike Chen",
      isLocal: false,
      isMuted: true,
      isVideoOff: false,
      role: "participant",
      email: "mike@company.com",
    },
    {
      id: "4",
      name: "Emily Davis",
      isLocal: false,
      isMuted: false,
      isVideoOff: true,
      role: "moderator",
      email: "emily@company.com",
    },
    {
      id: "5",
      name: "Alex Rodriguez",
      isLocal: false,
      isMuted: false,
      isVideoOff: false,
      role: "participant",
      email: "alex@company.com",
    },
  ])

  // Admin actions handler
  const handleAdminAction = (action: string, participantId: string, participantName: string, data?: any) => {
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === participantId) {
          switch (action) {
            case "mute":
              return { ...p, isMuted: true }
            case "unmute":
              return { ...p, isMuted: false }
            case "disable_video":
              return { ...p, isVideoOff: true }
            case "enable_video":
              return { ...p, isVideoOff: false }
            case "promote_to_moderator":
              return { ...p, role: "moderator" }
            default:
              return p
          }
        }
        return p
      }),
    )

    if (action === "remove") {
      setParticipants((prev) => prev.filter((p) => p.id !== participantId))
    }

    onAdminAction?.(action, { participantId, participantName, ...data })
  }

  const handleAdminChatCommand = (command: string, target?: string, message?: string) => {
    switch (command) {
      case "mute":
        if (target) {
          const participant = participants.find((p) => p.name.toLowerCase().includes(target.toLowerCase()))
          if (participant) {
            handleAdminAction("mute", participant.id, participant.name)
          }
        }
        break
      case "unmute":
        if (target) {
          const participant = participants.find((p) => p.name.toLowerCase().includes(target.toLowerCase()))
          if (participant) {
            handleAdminAction("unmute", participant.id, participant.name)
          }
        }
        break
      case "warn":
        if (target && message) {
          const participant = participants.find((p) => p.name.toLowerCase().includes(target.toLowerCase()))
          if (participant) {
            handleAdminAction("send_warning", participant.id, participant.name, { message })
          }
        }
        break
      case "muteall":
        handleMuteAll()
        break
      case "record":
        if (isRecording) {
          handleStopRecording()
        } else {
          handleStartRecording()
        }
        break
    }
  }

  const handleMuteAll = () => {
    participants.forEach((p) => {
      if (!p.isLocal && !p.isMuted) {
        handleAdminAction("mute", p.id, p.name)
      }
    })
    alert("All participants have been muted")
  }

  const handleUnmuteAll = () => {
    participants.forEach((p) => {
      if (!p.isLocal && p.isMuted) {
        handleAdminAction("unmute", p.id, p.name)
      }
    })
    alert("All participants have been unmuted")
  }

  const handleSendAnnouncement = (message: string, type: "info" | "warning" | "urgent") => {
    console.log(`Admin announcement (${type}):`, message)
    alert(`Announcement sent to all participants: ${message}`)
  }

  const handleEndMeeting = () => {
    console.log("Admin ended the meeting")
    alert("Meeting ended by admin")
    onLeaveMeeting()
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onLeaveMeeting} className="text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-white font-semibold">Meeting: {meetingData.roomId}</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Encrypted</span>
          </div>
          {actualAdminMode && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm font-medium">Admin Mode</span>
            </div>
          )}
        </div>
        <div className="text-slate-400 text-sm flex items-center space-x-4">
          <span>
            Joined as {meetingData.userName}
            {actualAdminMode && " (Admin)"}
          </span>
          {actualAdminMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdminToolbar(!showAdminToolbar)}
              className={`${showAdminToolbar ? "text-red-400 hover:text-red-300" : "text-slate-400 hover:text-white"}`}
            >
              <Shield className="h-4 w-4 mr-2" />
              {showAdminToolbar ? "Hide Controls" : "Show Controls"}
            </Button>
          )}
        </div>
      </div>

      {/* Floating Admin Button - Only show when admin toolbar is hidden */}
      {actualAdminMode && !showAdminToolbar && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setShowAdminToolbar(true)}
            className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
            size="sm"
          >
            <Shield className="h-4 w-4 mr-2" />
            Admin Controls
          </Button>
        </div>
      )}

      {/* Admin Toolbar - Only show when enabled */}
      {actualAdminMode && showAdminToolbar && (
        <div className="px-4 py-2">
          <AdminMeetingToolbar
            participantCount={participants.length}
            onMuteAll={handleMuteAll}
            onUnmuteAll={handleUnmuteAll}
            onEndMeeting={handleEndMeeting}
            onSendAnnouncement={() => setShowAnnouncementModal(true)}
            onToggleAdminVisibility={() => setIsAdminVisible(!isAdminVisible)}
            isAdminVisible={isAdminVisible}
            onOpenSettings={() => setShowAdminSettings(true)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col">
          {isScreenSharing ? (
            <ScreenShareView />
          ) : (
            <VideoGrid participants={participants} isAdminMode={actualAdminMode} onAdminAction={handleAdminAction} />
          )}

          {/* Control Bar */}
          <ControlBar
            isMuted={isMuted}
            isVideoOff={isVideoOff}
            isScreenSharing={isScreenSharing}
            isRecording={isRecording}
            recordingDuration={recordingDuration}
            onToggleMute={() => setIsMuted(!isMuted)}
            onToggleVideo={() => setIsVideoOff(!isVideoOff)}
            onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
            onStartRecording={canRecord ? handleStartRecording : undefined}
            onStopRecording={handleStopRecording}
            onToggleChat={() => setIsChatOpen(!isChatOpen)}
            onToggleParticipants={() => setIsParticipantsOpen(!isParticipantsOpen)}
            onLeaveMeeting={onLeaveMeeting}
            isAdminMode={actualAdminMode}
          />
        </div>

        {/* Participants Sidebar */}
        {isParticipantsOpen && (
          <ParticipantsSidebar
            onClose={() => setIsParticipantsOpen(false)}
            participants={participants}
            isAdminMode={actualAdminMode}
            onAdminAction={handleAdminAction}
          />
        )}

        {/* Chat Sidebar */}
        {isChatOpen && (
          <ChatSidebar
            currentUser={meetingData.userName}
            onClose={() => setIsChatOpen(false)}
            isAdminMode={actualAdminMode}
            onAdminChatCommand={handleAdminChatCommand}
          />
        )}
      </div>

      {/* Admin Announcement Modal */}
      {showAnnouncementModal && (
        <AdminAnnouncementModal
          onClose={() => setShowAnnouncementModal(false)}
          onSendAnnouncement={handleSendAnnouncement}
          participantCount={participants.length}
        />
      )}
    </div>
  )
}
