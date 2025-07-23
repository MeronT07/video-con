"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, VolumeX, Ban, MessageSquare, Settings, Eye, EyeOff } from "lucide-react"

interface AdminMeetingToolbarProps {
  participantCount: number
  onMuteAll: () => void
  onUnmuteAll: () => void
  onEndMeeting: () => void
  onSendAnnouncement: () => void
  onToggleAdminVisibility: () => void
  isAdminVisible: boolean
  onOpenSettings: () => void
}

export function AdminMeetingToolbar({
  participantCount,
  onMuteAll,
  onUnmuteAll,
  onEndMeeting,
  onSendAnnouncement,
  onToggleAdminVisibility,
  isAdminVisible,
  onOpenSettings,
}: AdminMeetingToolbarProps) {
  return (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-900">Admin Controls</span>
              <Badge className="bg-red-100 text-red-800">{participantCount} Participants</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <Button
              variant="outline"
              size="sm"
              onClick={onMuteAll}
              className="border-yellow-200 hover:bg-yellow-50 bg-transparent"
              title="Mute All Participants"
            >
              <VolumeX className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onSendAnnouncement}
              className="border-blue-200 hover:bg-blue-50 bg-transparent"
              title="Send Announcement"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onToggleAdminVisibility}
              className="border-purple-200 hover:bg-purple-50 bg-transparent"
              title={isAdminVisible ? "Hide from Participants" : "Show to Participants"}
            >
              {isAdminVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSettings}
              className="border-slate-200 hover:bg-slate-50 bg-transparent"
              title="Admin Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm("Are you sure you want to end this meeting for all participants?")) {
                  onEndMeeting()
                }
              }}
              className="border-red-200 hover:bg-red-50 text-red-600"
              title="End Meeting"
            >
              <Ban className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
