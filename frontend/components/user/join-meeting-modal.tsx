"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Key, Lock, AlertTriangle, CheckCircle } from "lucide-react"

interface JoinMeetingModalProps {
  meeting: {
    id: string
    title: string
    host: string
    participants: number
    status: string
    encryptionKey?: string
  }
  onClose: () => void
  onJoinSuccess: (meetingData: any) => void
  userData: {
    userName: string
    userEmail: string
  }
}

export function JoinMeetingModal({ meeting, onClose, onJoinSuccess, userData }: JoinMeetingModalProps) {
  const [encryptionKey, setEncryptionKey] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle")

  // Mock encryption keys for demo (in real app, these would be validated server-side)
  const validKeys = {
    "ROOM-001": "AES256-GCM-7F8E9A2B3C4D5E6F",
    "ROOM-002": "AES256-GCM-1A2B3C4D5E6F7G8H",
    "ROOM-003": "AES256-GCM-9I8J7K6L5M4N3O2P",
    "ROOM-004": "AES256-GCM-5Q4R3S2T1U0V9W8X",
  }

  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!encryptionKey.trim()) {
      alert("Please enter the encryption key")
      return
    }

    setIsVerifying(true)
    setVerificationStatus("idle")

    // Simulate key verification delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if the key is valid
    const correctKey = validKeys[meeting.id as keyof typeof validKeys]

    if (encryptionKey.trim() === correctKey) {
      setVerificationStatus("success")

      // Wait a moment to show success state
      setTimeout(() => {
        const meetingData = {
          roomId: meeting.id,
          userName: userData.userName,
          userEmail: userData.userEmail,
          encryptionKey: encryptionKey,
          meetingTitle: meeting.title,
          host: meeting.host,
        }
        onJoinSuccess(meetingData)
      }, 1000)
    } else {
      setVerificationStatus("error")
      setIsVerifying(false)
    }
  }

  const handleTryAgain = () => {
    setVerificationStatus("idle")
    setEncryptionKey("")
    setIsVerifying(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-blue-600" />
                <span>Join Meeting</span>
              </CardTitle>
              <CardDescription>Enter encryption key to join the secure meeting</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Meeting Info */}
          <div className="p-3 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-900">{meeting.title}</h4>
            <div className="text-sm text-slate-600 space-y-1 mt-1">
              <p>
                <strong>Host:</strong> {meeting.host}
              </p>
              <p>
                <strong>Participants:</strong> {meeting.participants}
              </p>
              <p>
                <strong>Meeting ID:</strong> {meeting.id}
              </p>
            </div>
          </div>

          {/* Verification Status */}
          {verificationStatus === "success" && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="text-green-800">
                <p className="font-medium">Access Granted!</p>
                <p className="text-sm">Joining meeting...</p>
              </div>
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div className="text-red-800">
                <p className="font-medium">Invalid Encryption Key</p>
                <p className="text-sm">Please check the key and try again</p>
              </div>
            </div>
          )}

          {/* Key Input Form */}
          {verificationStatus !== "success" && (
            <form onSubmit={handleJoinMeeting} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Lock className="h-4 w-4 inline mr-1" />
                  Encryption Key
                </label>
                <Input
                  type="text"
                  placeholder="Enter the meeting encryption key"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                  className="font-mono"
                  disabled={isVerifying}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  The encryption key should have been provided by the meeting host
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                {verificationStatus === "error" ? (
                  <>
                    <Button type="button" variant="outline" onClick={handleTryAgain}>
                      Try Again
                    </Button>
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="button" variant="outline" onClick={onClose} disabled={isVerifying}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isVerifying || !encryptionKey.trim()}
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Key className="h-4 w-4 mr-2" />
                          Join Meeting
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </form>
          )}

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Lock className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Security Notice</p>
                <p className="text-xs mt-1">
                  This meeting uses end-to-end encryption. Only participants with the correct encryption key can join.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
