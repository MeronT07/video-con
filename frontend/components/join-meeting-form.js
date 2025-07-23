"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Shield, Users, MessageSquare } from "lucide-react"

export function JoinMeetingForm({ onJoinMeeting }) {
  const [roomId, setRoomId] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (roomId && userName && userEmail) {
      // Check if user is admin based on email or username
      const isAdmin =
        userEmail.toLowerCase().includes("admin") ||
        userName.toLowerCase().includes("admin") ||
        userEmail === "admin@company.com" ||
        userName.toLowerCase() === "admin"

      onJoinMeeting({
        roomId,
        userName,
        userEmail,
        isAdmin: isAdmin,
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Video className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SecureConf</h1>
          <p className="text-slate-300 text-lg">Enterprise Video Conferencing Platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">End-to-End Encryption</h3>
                <p className="text-slate-400 text-sm">Military-grade security for all communications</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">HD Video & Audio</h3>
                <p className="text-slate-400 text-sm">Crystal clear communication with up to 100 participants</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Integrated Chat</h3>
                <p className="text-slate-400 text-sm">Real-time messaging with file sharing capabilities</p>
              </div>
            </div>
          </div>

          {/* Join Form */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Join Meeting</CardTitle>
              <CardDescription className="text-slate-300">
                Enter your details to join the secure conference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="roomId" className="text-white">
                    Meeting ID
                  </Label>
                  <Input
                    id="roomId"
                    type="text"
                    placeholder="Enter meeting ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userName" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="userName"
                    type="text"
                    placeholder="Enter your full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="userEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  Join Meeting
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
