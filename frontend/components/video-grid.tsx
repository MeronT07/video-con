"use client"

import { VideoTile } from "@/components/video-tile"

const mockParticipants = [
  { id: "1", name: "You", isLocal: true, isMuted: false, isVideoOff: false, role: "admin" },
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
  {
    id: "6",
    name: "Lisa Wang",
    isLocal: false,
    isMuted: true,
    isVideoOff: false,
    role: "participant",
    email: "lisa@company.com",
  },
]

interface VideoGridProps {
  participants?: typeof mockParticipants
  isAdminMode?: boolean
  onAdminAction?: (action: string, participantId: string, participantName: string, data?: any) => void
}

export function VideoGrid({ participants = mockParticipants, isAdminMode = false, onAdminAction }: VideoGridProps) {
  const getGridCols = (count: number) => {
    if (count <= 1) return "grid-cols-1"
    if (count <= 2) return "grid-cols-2"
    if (count <= 4) return "grid-cols-2"
    if (count <= 6) return "grid-cols-3"
    return "grid-cols-4"
  }

  const handleAdminAction = (action: string, participantId: string, participantName: string, data?: any) => {
    // Handle the admin action
    console.log(`Admin action: ${action} on ${participantName} (${participantId})`, data)

    // Show feedback to admin
    switch (action) {
      case "mute":
        alert(`${participantName} has been muted`)
        break
      case "unmute":
        alert(`${participantName} has been unmuted`)
        break
      case "disable_video":
        alert(`${participantName}'s video has been disabled`)
        break
      case "enable_video":
        alert(`${participantName}'s video has been enabled`)
        break
      case "promote_to_moderator":
        alert(`${participantName} has been promoted to moderator`)
        break
      case "send_warning":
        alert(`Warning sent to ${participantName}: ${data?.message}`)
        break
      case "remove":
        alert(`${participantName} has been removed from the meeting`)
        break
    }

    // Call the parent handler if provided
    onAdminAction?.(action, participantId, participantName, data)
  }

  return (
    <div className="flex-1 p-4">
      {isAdminMode && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 text-sm font-medium">
              Admin Mode: Click on any participant to control them
            </span>
          </div>
        </div>
      )}

      <div className={`grid ${getGridCols(participants.length)} gap-4 h-full`}>
        {participants.map((participant) => (
          <VideoTile
            key={participant.id}
            participant={participant}
            isAdminMode={isAdminMode}
            onAdminAction={handleAdminAction}
          />
        ))}
      </div>
    </div>
  )
}
