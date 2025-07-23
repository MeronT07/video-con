"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Shield, Activity, TrendingUp, AlertTriangle, Video } from "lucide-react"

export function AdminDashboard({ onOpenLiveMeetingControl }) {
  const stats = [
    {
      title: "Active Meetings",
      value: "12",
      change: "+8%",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Participants",
      value: "145",
      change: "+15%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Security Events",
      value: "23",
      change: "-5%",
      icon: Shield,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "+0.1%",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentActivities = [
    { id: 1, action: "New meeting started", user: "Meeting ROOM-001", time: "2 minutes ago" },
    { id: 2, action: "Meeting scheduled", user: "admin@company.com", time: "5 minutes ago" },
    { id: 3, action: "Security alert resolved", user: "system", time: "10 minutes ago" },
    { id: 4, action: "Participant removed from meeting", user: "admin@company.com", time: "15 minutes ago" },
    { id: 5, action: "System backup completed", user: "system", time: "1 hour ago" },
  ]

  const activeMeetings = [
    {
      id: "ROOM-002",
      title: "Project Review Meeting",
      host: "Sarah Johnson",
      participants: 8,
      status: "In Progress",
      duration: "25 min",
    },
    {
      id: "ROOM-001",
      title: "Weekly Team Standup",
      host: "John Doe",
      participants: 12,
      status: "In Progress",
      duration: "15 min",
    },
    {
      id: "ROOM-003",
      title: "Client Presentation",
      host: "Emily Davis",
      participants: 6,
      status: "In Progress",
      duration: "45 min",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Welcome to the Video Conference Admin Panel</p>
        </div>
        <Button onClick={() => onOpenLiveMeetingControl?.()} className="bg-red-600 hover:bg-red-700 text-white">
          <Video className="h-4 w-4 mr-2" />
          Live Meeting Control
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Active Meetings Quick Access */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Active Meetings</span>
              </CardTitle>
              <CardDescription>Currently running meetings - click to join as admin</CardDescription>
            </div>
            <Button variant="outline" onClick={() => onOpenLiveMeetingControl?.()}>
              View All Live Controls
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeMeetings.map((meeting) => (
              <Card key={meeting.id} className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900">{meeting.title}</h4>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>

                    <div className="space-y-1 text-sm text-slate-600">
                      <p>
                        <strong>Host:</strong> {meeting.host}
                      </p>
                      <p>
                        <strong>Participants:</strong> {meeting.participants}
                      </p>
                      <p>
                        <strong>Duration:</strong> {meeting.duration}
                      </p>
                      <p>
                        <strong>Room ID:</strong> {meeting.id}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">{meeting.status}</span>
                      </div>

                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => onOpenLiveMeetingControl?.(meeting.id)}
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        Join as Admin
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>System Performance</span>
            </CardTitle>
            <CardDescription>Server metrics and performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span>67%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Storage Usage</span>
                  <span>23%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "23%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest system activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-600">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>System Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">High CPU usage detected</p>
                <p className="text-xs text-slate-600">Server load is above 80% for the last 10 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Security scan completed</p>
                <p className="text-xs text-slate-600">No vulnerabilities found in the latest scan</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
