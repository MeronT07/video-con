"use client"

import { Mic, MicOff, Video, VideoOff, Pin, Crown, Shield, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AdminParticipantMenu } from "@/components/admin-participant-menu"

interface Participant {
  id: string
  name: string
  isLocal: boolean
  isMuted: boolean
  isVideoOff: boolean
  role?: string
  email?: string
}

interface VideoTileProps {
  participant: Participant
  isAdminMode?: boolean
  onAdminAction?: (action: string, participantId: string, participantName: string) => void
}

export function VideoTile({ participant, isAdminMode = false, onAdminAction }: VideoTileProps) {
  const [showAdminMenu, setShowAdminMenu] = useState(false)

  const handleParticipantClick = () => {
    if (isAdminMode && !participant.isLocal) {
      setShowAdminMenu(true)
    }
  }

  return (
    <div className="relative bg-slate-800 rounded-lg overflow-hidden group">
      {/* Video/Avatar Area */}
      <div
        className={`aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ${
          isAdminMode && !participant.isLocal ? "cursor-pointer hover:bg-slate-700" : ""
        }`}
        onClick={handleParticipantClick}
      >
        {participant.isVideoOff ? (
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xl">
              {participant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Video className="h-8 w-8 text-white/50" />
          </div>
        )}
      </div>

      {/* Admin Click Indicator */}
      {isAdminMode && !participant.isLocal && (
        <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-red-600/80 text-white px-2 py-1 rounded text-xs font-medium">Click to Control</div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        {!isAdminMode ? (
          <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
            <Pin className="h-4 w-4" />
          </Button>
        ) : !participant.isLocal ? (
          <Button
            size="sm"
            variant="secondary"
            className="bg-red-600/80 hover:bg-red-700/80 text-white border-0"
            onClick={handleParticipantClick}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {/* Name and Status */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium text-sm truncate">
              {participant.name}
              {participant.isLocal && " (You)"}
            </span>
            {participant.role === "host" && <Crown className="h-3 w-3 text-yellow-400" />}
            {participant.role === "moderator" && <Shield className="h-3 w-3 text-blue-400" />}
          </div>
          <div className="flex items-center space-x-1">
            {participant.isMuted ? (
              <MicOff className="h-4 w-4 text-red-400" />
            ) : (
              <Mic className="h-4 w-4 text-green-400" />
            )}
            {participant.isVideoOff && <VideoOff className="h-4 w-4 text-red-400" />}
          </div>
        </div>
      </div>

      {/* Speaking Indicator */}
      {!participant.isMuted && (
        <div className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      )}

      {/* Admin Mode Indicator */}
      {isAdminMode && participant.isLocal && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">ADMIN</div>
      )}

      {/* Admin Participant Menu */}
      {showAdminMenu && (
        <AdminParticipantMenu
          participant={participant}
          onClose={() => setShowAdminMenu(false)}
          onAction={onAdminAction}
        />
      )}
    </div>
  )
}
