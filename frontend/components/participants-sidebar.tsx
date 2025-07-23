"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Mic, MicOff, Video, VideoOff, MoreHorizontal, Crown, Shield } from "lucide-react"

interface Participant {
  id: string
  name: string
  email: string
  role: "host" | "moderator" | "participant" | "admin"
  isMuted: boolean
  isVideoOff: boolean
  isOnline?: boolean
  isLocal?: boolean
}

interface ParticipantsSidebarProps {
  onClose: () => void
  participants?: Participant[]
  isAdminMode?: boolean
  onAdminAction?: (action: string, participantId: string, participantName: string, data?: any) => void
}

export function ParticipantsSidebar({
  onClose,
  participants = [],
  isAdminMode = false,
  onAdminAction,
}: ParticipantsSidebarProps) {
  // Default participants if none provided
  const defaultParticipants: Participant[] = [
    {
      id: "1",
      name: "officer sara ",
      email: "sarah.Alemu@company.com",
      role: "host",
      isMuted: false,
      isVideoOff: false,
      isOnline: true,
    },
    {
      id: "2",
      name: "you",
      email: "you@company.com",
      role: "moderator",
      isMuted: false,
      isVideoOff: false,
      isOnline: true,
    },
    {
      id: "3",
      name: "Micael Aregawi",
      email: "micael.Aregawi@company.com",
      role: "participant",
      isMuted: true,
      isVideoOff: false,
      isOnline: true,
    },
    {
      id: "4",
      name: "Inspector Emebet",
      email: "emebet@company.com",
      role: "participant",
      isMuted: false,
      isVideoOff: true,
      isOnline: true,
    },
    {
      id: "5",
      name: "Offiicer Abreham",
      email: "abreham@company.com",
      role: "participant",
      isMuted: false,
      isVideoOff: false,
      isOnline: true,
    },
    {
      id: "6",
      name: "Inspector Leul ",
      email: "leul@company.com",
      role: "participant",
      isMuted: true,
      isVideoOff: false,
      isOnline: false,
    },
  ]

  const participantsList = participants.length > 0 ? participants : defaultParticipants

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "host":
        return <Crown className="h-4 w-4 text-yellow-400" />
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-400" />
      case "admin":
        return <Shield className="h-4 w-4 text-red-400" />
      default:
        return null
    }
  }

  const handleParticipantClick = (participant: Participant) => {
    if (isAdminMode && !participant.isLocal && participant.role !== "admin") {
      // Open admin menu for this participant
      onAdminAction?.("open_menu", participant.id, participant.name, participant)
    }
  }

  const onlineParticipants = participantsList.filter((p) => p.isOnline !== false)
  const offlineParticipants = participantsList.filter((p) => p.isOnline === false)

  return (
    <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Participants</h3>
          <p className="text-slate-400 text-sm">
            {onlineParticipants.length} online
            {isAdminMode && " • Click to control"}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Admin Instructions */}
      {isAdminMode && (
        <div className="p-4 border-b border-slate-700">
          <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-300 text-xs">
              <Shield className="h-3 w-3 inline mr-1" />
              Admin Mode: Click on any participant to control them
            </p>
          </div>
        </div>
      )}

      {/* Participants List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Online Participants */}
          <div>
            <h4 className="text-slate-300 text-sm font-medium mb-3">Online ({onlineParticipants.length})</h4>
            <div className="space-y-2">
              {onlineParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    isAdminMode && !participant.isLocal && participant.role !== "admin"
                      ? "hover:bg-red-700/20 cursor-pointer border border-transparent hover:border-red-500/20"
                      : "hover:bg-slate-700"
                  }`}
                  onClick={() => handleParticipantClick(participant)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm font-medium truncate">
                          {participant.name}
                          {participant.isLocal && " (You)"}
                        </span>
                        {getRoleIcon(participant.role)}
                      </div>
                      <p className="text-slate-400 text-xs truncate">{participant.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {participant.isMuted ? (
                      <MicOff className="h-4 w-4 text-red-400" />
                    ) : (
                      <Mic className="h-4 w-4 text-green-400" />
                    )}
                    {participant.isVideoOff ? (
                      <VideoOff className="h-4 w-4 text-red-400" />
                    ) : (
                      <Video className="h-4 w-4 text-green-400" />
                    )}
                    {isAdminMode && !participant.isLocal && participant.role !== "admin" && (
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offline Participants */}
          {offlineParticipants.length > 0 && (
            <div>
              <h4 className="text-slate-300 text-sm font-medium mb-3">Offline ({offlineParticipants.length})</h4>
              <div className="space-y-2">
                {offlineParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 rounded-lg opacity-60">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                          <span className="text-slate-300 text-sm font-medium">
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-slate-500 rounded-full border-2 border-slate-800"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-300 text-sm font-medium truncate">{participant.name}</span>
                          {getRoleIcon(participant.role)}
                        </div>
                        <p className="text-slate-500 text-xs truncate">{participant.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
