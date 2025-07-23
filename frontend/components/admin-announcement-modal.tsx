"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, X, Send, AlertTriangle, Info, Megaphone } from "lucide-react"

interface AdminAnnouncementModalProps {
  onClose: () => void
  onSendAnnouncement: (message: string, type: "info" | "warning" | "urgent") => void
  participantCount: number
}

export function AdminAnnouncementModal({ onClose, onSendAnnouncement, participantCount }: AdminAnnouncementModalProps) {
  const [message, setMessage] = useState("")
  const [announcementType, setAnnouncementType] = useState<"info" | "warning" | "urgent">("info")

  const handleSend = () => {
    if (message.trim()) {
      onSendAnnouncement(message.trim(), announcementType)
      onClose()
    }
  }

  const announcementTypes = [
    { id: "info", label: "Information", icon: Info, color: "blue" },
    { id: "warning", label: "Warning", icon: AlertTriangle, color: "yellow" },
    { id: "urgent", label: "Urgent", icon: Megaphone, color: "red" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Send Announcement</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Send a message to all {participantCount} participants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Announcement Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Announcement Type</label>
            <div className="grid grid-cols-3 gap-2">
              {announcementTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setAnnouncementType(type.id as any)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      announcementType === type.id
                        ? `border-${type.color}-500 bg-${type.color}-50`
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 mx-auto mb-1 ${
                        announcementType === type.id ? `text-${type.color}-600` : "text-slate-600"
                      }`}
                    />
                    <div
                      className={`text-xs ${
                        announcementType === type.id ? `text-${type.color}-700` : "text-slate-600"
                      }`}
                    >
                      {type.label}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              className="w-full px-3 py-2 border border-slate-200 rounded-md resize-none"
              rows={4}
              placeholder="Enter your announcement message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
            />
            <div className="text-xs text-slate-500 mt-1">{message.length}/500 characters</div>
          </div>

          {/* Preview */}
          {message && (
            <div className="p-3 rounded-lg bg-slate-50 border">
              <div className="text-xs text-slate-600 mb-1">Preview:</div>
              <div
                className={`flex items-start space-x-2 p-2 rounded ${
                  announcementType === "info"
                    ? "bg-blue-100 border-blue-200"
                    : announcementType === "warning"
                      ? "bg-yellow-100 border-yellow-200"
                      : "bg-red-100 border-red-200"
                } border`}
              >
                {announcementType === "info" && <Info className="h-4 w-4 text-blue-600 mt-0.5" />}
                {announcementType === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                {announcementType === "urgent" && <Megaphone className="h-4 w-4 text-red-600 mt-0.5" />}
                <div className="flex-1">
                  <div className="font-medium text-sm">Admin Announcement</div>
                  <div className="text-sm">{message}</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSend} disabled={!message.trim()} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Send to All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
