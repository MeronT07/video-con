"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Ban,
  AlertTriangle,
  Crown,
  Shield,
  MessageSquare,
  X,
  Volume2,
  VolumeX,
  UserPlus,
} from "lucide-react"

interface AdminParticipantMenuProps {
  participant: {
    id: string
    name: string
    email?: string
    isMuted: boolean
    isVideoOff: boolean
    role?: string
  }
  onClose: () => void
  onAction?: (action: string, participantId: string, participantName: string, data?: any) => void
}

export function AdminParticipantMenu({ participant, onClose, onAction }: AdminParticipantMenuProps) {
  const [showWarningInput, setShowWarningInput] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")

  const handleAction = (action: string, data?: any) => {
    onAction?.(action, participant.id, participant.name, data)
    if (action !== "send_warning") {
      onClose()
    }
  }

  const handleSendWarning = () => {
    if (warningMessage.trim()) {
      handleAction("send_warning", { message: warningMessage })
      setWarningMessage("")
      setShowWarningInput(false)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-semibold">{participant.name}</p>
                <div className="flex items-center space-x-1">
                  {participant.role === "host" && <Crown className="h-3 w-3 text-yellow-600" />}
                  {participant.role === "moderator" && <Shield className="h-3 w-3 text-blue-600" />}
                  <span className="text-xs text-slate-600 capitalize">{participant.role || "participant"}</span>
                </div>
              </div>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center justify-center space-x-4 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-2">
              {participant.isMuted ? (
                <MicOff className="h-4 w-4 text-red-500" />
              ) : (
                <Mic className="h-4 w-4 text-green-500" />
              )}
              <span className="text-sm">{participant.isMuted ? "Muted" : "Unmuted"}</span>
            </div>
            <div className="flex items-center space-x-2">
              {participant.isVideoOff ? (
                <VideoOff className="h-4 w-4 text-red-500" />
              ) : (
                <Video className="h-4 w-4 text-green-500" />
              )}
              <span className="text-sm">{participant.isVideoOff ? "Video Off" : "Video On"}</span>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleAction(participant.isMuted ? "unmute" : "mute")}
              className={participant.isMuted ? "border-green-200 hover:bg-green-50" : "border-red-200 hover:bg-red-50"}
            >
              {participant.isMuted ? (
                <>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Unmute
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 mr-2" />
                  Mute
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => handleAction(participant.isVideoOff ? "enable_video" : "disable_video")}
              className={
                participant.isVideoOff ? "border-green-200 hover:bg-green-50" : "border-red-200 hover:bg-red-50"
              }
            >
              {participant.isVideoOff ? (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  Enable Video
                </>
              ) : (
                <>
                  <VideoOff className="h-4 w-4 mr-2" />
                  Disable Video
                </>
              )}
            </Button>
          </div>

          {/* Role Management */}
          {participant.role === "participant" && (
            <Button
              variant="outline"
              onClick={() => handleAction("promote_to_moderator")}
              className="w-full border-blue-200 hover:bg-blue-50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Promote to Moderator
            </Button>
          )}

          {/* Warning */}
          {!showWarningInput ? (
            <Button
              variant="outline"
              onClick={() => setShowWarningInput(true)}
              className="w-full border-yellow-200 hover:bg-yellow-50"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Send Warning
            </Button>
          ) : (
            <div className="space-y-2">
              <Input
                placeholder="Enter warning message..."
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                className="w-full"
              />
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleSendWarning}
                  disabled={!warningMessage.trim()}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowWarningInput(false)
                    setWarningMessage("")
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Remove Participant */}
          <Button
            variant="outline"
            onClick={() => {
              if (confirm(`Are you sure you want to remove ${participant.name} from the meeting?`)) {
                handleAction("remove")
              }
            }}
            className="w-full border-red-200 hover:bg-red-50 text-red-600"
          >
            <Ban className="h-4 w-4 mr-2" />
            Remove from Meeting
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
