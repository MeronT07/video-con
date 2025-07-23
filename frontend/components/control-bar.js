"use client"

import { Button } from "@/components/ui/button"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Users,
  Settings,
  Phone,
  MoreHorizontal,
  Shield,
} from "lucide-react"

export function ControlBar({
  isMuted,
  isVideoOff,
  isScreenSharing,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onToggleChat,
  onToggleParticipants,
  onLeaveMeeting,
  isAdminMode = false,
  onToggleAdminPanel,
}) {
  return (
    <div className="bg-slate-800 border-t border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={onToggleMute}
            className={isMuted ? "bg-red-600 hover:bg-red-700" : "bg-slate-600 hover:bg-slate-500"}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoOff ? "destructive" : "secondary"}
            size="lg"
            onClick={onToggleVideo}
            className={isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-slate-600 hover:bg-slate-500"}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
        </div>

        {/* Center Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="lg"
            onClick={onToggleScreenShare}
            className={isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-600 hover:bg-slate-500"}
          >
            {isScreenSharing ? <MonitorOff className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
            <span className="ml-2 hidden sm:inline">{isScreenSharing ? "Stop Sharing" : "Share Screen"}</span>
          </Button>

          <Button variant="secondary" size="lg" onClick={onToggleChat} className="bg-slate-600 hover:bg-slate-500">
            <MessageSquare className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Chat</span>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={onToggleParticipants}
            className="bg-slate-600 hover:bg-slate-500"
          >
            <Users className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Participants</span>
          </Button>

          {/* Admin Control Button */}
          {isAdminMode && (
            <Button
              variant="secondary"
              size="lg"
              onClick={onToggleAdminPanel}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Shield className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Admin</span>
            </Button>
          )}

          <Button variant="secondary" size="lg" className="bg-slate-600 hover:bg-slate-500">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="secondary" size="lg" className="bg-slate-600 hover:bg-slate-500">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          <Button variant="destructive" size="lg" onClick={onLeaveMeeting} className="bg-red-600 hover:bg-red-700">
            <Phone className="h-5 w-5 rotate-[135deg]" />
            <span className="ml-2 hidden sm:inline">{isAdminMode ? "Leave Admin" : "Leave"}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
