"use client"

import { useState } from "react"
import { VideoGrid } from "@/components/video-grid"
import { ControlBar } from "@/components/control-bar"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ParticipantsSidebar } from "@/components/participants-sidebar"
import { ScreenShareView } from "@/components/screen-share-view"
import { AdminControlPanel } from "@/components/admin-control-panel"

export function VideoConferenceRoom({ meetingData, onLeaveMeeting, isAdminMode = false, onAdminAction }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(isAdminMode)

  // Admin-specific state
  const [participants, setParticipants] = useState([
    { id: "1", name: "You", isLocal: true, isMuted: false, isVideoOff: false },
    { id: "2", name: "Sarah Johnson", isLocal: false, isMuted: false, isVideoOff: false },
    { id: "3", name: "Mike Chen", isLocal: false, isMuted: true, isVideoOff: false },
    { id: "4", name: "Emily Davis", isLocal: false, isMuted: false, isVideoOff: true },
    { id: "5", name: "Alex Rodriguez", isLocal: false, isMuted: false, isVideoOff: false },
  ])

  // Admin actions
  const handleAdminMuteUser = (participantId) => {
    setParticipants((prev) => prev.map((p) => (p.id === participantId ? { ...p, isMuted: true } : p)))
    onAdminAction?.("mute_user", { participantId })
  }

  const handleAdminUnmuteUser = (participantId) => {
    setParticipants((prev) => prev.map((p) => (p.id === participantId ? { ...p, isMuted: false } : p)))
    onAdminAction?.("unmute_user", { participantId })
  }

  const handleAdminRemoveUser = (participantId) => {
    setParticipants((prev) => prev.filter((p) => p.id !== participantId))
    onAdminAction?.("remove_user", { participantId })
  }

  const handleAdminSendWarning = (participantId, message) => {
    onAdminAction?.("send_warning", { participantId, message })
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold">Meeting: {meetingData.roomId}</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Encrypted</span>
          </div>
          {isAdminMode && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm font-medium">Admin Mode</span>
            </div>
          )}
        </div>
        <div className="text-slate-400 text-sm">
          Joined as {meetingData.userName}
          {isAdminMode && " (Hidden Admin)"}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col">
          {isScreenSharing ? <ScreenShareView /> : <VideoGrid participants={participants} isAdminMode={isAdminMode} />}

          {/* Control Bar */}
          <ControlBar
            isMuted={isMuted}
            isVideoOff={isVideoOff}
            isScreenSharing={isScreenSharing}
            onToggleMute={() => setIsMuted(!isMuted)}
            onToggleVideo={() => setIsVideoOff(!isVideoOff)}
            onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
            onToggleChat={() => setIsChatOpen(!isChatOpen)}
            onToggleParticipants={() => setIsParticipantsOpen(!isParticipantsOpen)}
            onLeaveMeeting={onLeaveMeeting}
            isAdminMode={isAdminMode}
            onToggleAdminPanel={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
          />
        </div>

        {/* Admin Control Panel */}
        {isAdminMode && isAdminPanelOpen && (
          <AdminControlPanel
            participants={participants}
            onMuteUser={handleAdminMuteUser}
            onUnmuteUser={handleAdminUnmuteUser}
            onRemoveUser={handleAdminRemoveUser}
            onSendWarning={handleAdminSendWarning}
            onClose={() => setIsAdminPanelOpen(false)}
            meetingData={meetingData}
          />
        )}

        {/* Participants Sidebar */}
        {isParticipantsOpen && (
          <ParticipantsSidebar
            onClose={() => setIsParticipantsOpen(false)}
            participants={participants}
            isAdminMode={isAdminMode}
          />
        )}

        {/* Chat Sidebar */}
        {isChatOpen && (
          <ChatSidebar
            currentUser={meetingData.userName}
            onClose={() => setIsChatOpen(false)}
            isAdminMode={isAdminMode}
          />
        )}
      </div>
    </div>
  )
}
