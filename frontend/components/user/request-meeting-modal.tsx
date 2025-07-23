"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send, AlertCircle } from "lucide-react"

interface RequestMeetingModalProps {
  onClose: () => void
  onSubmitRequest: (requestData: any) => void
  userData: {
    userName: string
    userEmail: string
  }
}

export function RequestMeetingModal({ onClose, onSubmitRequest, userData }: RequestMeetingModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
    duration: "60",
    participants: "",
    priority: "normal",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const requestData = {
      ...formData,
      requesterName: userData.userName,
      requesterEmail: userData.userEmail,
      requestDate: new Date().toISOString(),
      status: "pending",
    }

    onSubmitRequest(requestData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Request New Meeting</CardTitle>
              <CardDescription>Submit a request for a new meeting to be scheduled</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Meeting Details</h3>

              <div>
                <label className="block text-sm font-medium mb-2">Meeting Title *</label>
                <Input
                  placeholder="Enter meeting title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-200 rounded-md resize-none"
                  rows={3}
                  placeholder="Describe the purpose and agenda of the meeting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            {/* Scheduling */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferred Schedule</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time *</label>
                  <Input
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Participants</h3>

              <div>
                <label className="block text-sm font-medium mb-2">Expected Participants (emails)</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-200 rounded-md resize-none"
                  rows={3}
                  placeholder="Enter participant emails separated by commas&#10;example: john@company.com, sarah@company.com"
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                />
              </div>
            </div>

            {/* Priority and Reason */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Priority Level</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Reason for Meeting Request</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-200 rounded-md resize-none"
                  rows={3}
                  placeholder="Explain why this meeting is needed and any special requirements..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Meeting Request Process</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Your request will be reviewed by an administrator</li>
                    <li>• You'll receive an email notification about the approval status</li>
                    <li>• If approved, meeting invitations will be sent to all participants</li>
                    <li>• The meeting will appear in your dashboard once scheduled</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
