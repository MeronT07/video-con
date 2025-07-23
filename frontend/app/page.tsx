"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserDashboard } from "@/components/user/user-dashboard"
import { VideoConferenceRoom } from "@/components/video-conference-room"

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [meetingData, setMeetingData] = useState(null);

  const handleLogin = (data: any) => {
    if (data.isAdmin) {
      router.push("/admin");
    } else {
      setUserData(data);
    }
  }

  const handleLogout = () => {
    setUserData(null);
    setMeetingData(null);
  }

  const handleJoinMeeting = (meetingData: any) => {
    setMeetingData(meetingData);
  }

  const handleLeaveMeeting = () => {
    setMeetingData(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {!userData ? (
        <AuthForm onLogin={handleLogin} onRegister={() => {}} />
      ) : meetingData ? (
        <VideoConferenceRoom meetingData={meetingData} onLeaveMeeting={handleLeaveMeeting} />
      ) : (
        <UserDashboard userData={userData} onJoinMeeting={handleJoinMeeting} onRequestMeeting={() => {}} onLogout={handleLogout} />
      )}
    </div>
  )
}
