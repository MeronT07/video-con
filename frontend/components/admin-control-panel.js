"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Shield,
  Crown,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Ban,
  AlertTriangle,
  UserPlus,
  Volume2,
  VolumeX,
  MessageSquare,
  Users,
  Key,
  Copy,
} from "lucide-react"

export function AdminControlPanel({
  participants,
  onMuteUser,
  onUnmuteUser,
  onRemoveUser,
  onSendWarning,
  onClose,
  meetingData,
}) {
  const [showWarningModal, setShowWarningModal] = useState(null)
  const [warningMessage, setWarningMessage] = useState("")
  const [adminMessage, setAdminMessage] = useState("")

  const handleSendWarning = (participant) => {
    if (warningMessage.trim()) {
      onSendWarning(participant.id, warningMessage)
      alert(`Warning sent to ${participant.name}: ${warningMessage}`)
      setShowWarningModal(null)
      setWarningMessage("")
    }
  }

  const handleSendAnnouncement = () => {
    if (adminMessage.trim()) {
      alert(`Announcement sent to all participants: ${adminMessage}`)
      setAdminMessage("")
    }
  }

  const handleMuteAll = () => {
    if (confirm("Are you sure you want to mute all participants?")) {
      participants.forEach((p) => {
        if (!p.isLocal) {
          onMuteUser(p.id)
        }
      })
      alert("All participants have been muted")
    }
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
            <Button onClick={() => handleSendWarning(participant)} className="bg-yellow-600 hover:bg-yellow-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Send Warning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-400" />
          <h3 className="text-white font-semibold">Admin Control</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Meeting Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Key className="h-4 w-4 text-green-400" />
            <span className="text-slate-300">Encrypted Meeting</span>
          </div>
          <div className="bg-slate-700 p-2 rounded text-xs font-mono text-slate-300">
            {meetingData.encryptionKey || "AES256-GCM-ENCRYPTED"}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(meetingData.encryptionKey)}
              className="ml-2 p-0 h-auto"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-slate-700">
        <h4 className="text-white font-medium mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button size="sm" onClick={handleMuteAll} className="w-full bg-slate-700 hover:bg-slate-600">
            <VolumeX className="h-4 w-4 mr-2" />
            Mute All
          </Button>

          {/* Admin Announcement */}
          <div className="space-y-2">
            <Input
              placeholder="Send announcement..."
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
            <Button
              size="sm"
              onClick={handleSendAnnouncement}
              disabled={!adminMessage.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send to All
            </Button>
          </div>
        </div>
      </div>

      {/* Participants Control */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h4 className="text-white font-medium mb-3 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Participants ({participants.length})
          </h4>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="bg-slate-700 rounded-lg p-3">
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
                      <p className="text-white text-sm font-medium">{participant.name}</p>
                      <div className="flex items-center space-x-1">
                        {participant.isLocal && <Badge className="bg-green-100 text-green-800 text-xs">You</Badge>}
                        {participant.role === "host" && <Crown className="h-3 w-3 text-yellow-400" />}
                        {participant.role === "moderator" && <Shield className="h-3 w-3 text-blue-400" />}
                      </div>
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
                  </div>
                </div>

                {/* Admin Controls for each participant */}
                {!participant.isLocal && (
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => (participant.isMuted ? onUnmuteUser(participant.id) : onMuteUser(participant.id))}
                      className="flex-1 text-xs bg-slate-600 border-slate-500 hover:bg-slate-500"
                    >
                      {participant.isMuted ? (
                        <>
                          <Volume2 className="h-3 w-3 mr-1" />
                          Unmute
                        </>
                      ) : (
                        <>
                          <VolumeX className="h-3 w-3 mr-1" />
                          Mute
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowWarningModal(participant)}
                      className="px-2 bg-yellow-600 border-yellow-500 hover:bg-yellow-500 text-white"
                    >
                      <AlertTriangle className="h-3 w-3" />
                    </Button>

                    {participant.role === "participant" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => alert(`${participant.name} promoted to moderator`)}
                        className="px-2 bg-blue-600 border-blue-500 hover:bg-blue-500 text-white"
                      >
                        <UserPlus className="h-3 w-3" />
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (confirm(`Remove ${participant.name} from the meeting?`)) {
                          onRemoveUser(participant.id)
                        }
                      }}
                      className="px-2 bg-red-600 border-red-500 hover:bg-red-500 text-white"
                    >
                      <Ban className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarningModal && <WarningModal participant={showWarningModal} />}
    </div>
  )
}
