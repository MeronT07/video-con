"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, AlertTriangle, Info, CheckCircle, XCircle, Calendar, Clock } from "lucide-react"

export function SystemLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  const logs = [
    {
      id: 1,
      timestamp: "2024-01-15 10:30:45",
      level: "ERROR",
      category: "Security",
      message: "Failed meeting join attempt with invalid encryption key",
      user: "unknown",
      details: "Multiple failed attempts detected from IP 192.168.1.100",
      action: "join_failed",
      severity: "high",
    },
    {
      id: 2,
      timestamp: "2024-01-15 10:28:12",
      level: "INFO",
      category: "Meeting",
      message: "Meeting ROOM-001 started successfully",
      user: "john.doe@company.com",
      details: "12 participants joined, encryption key sent",
      action: "meeting_started",
      severity: "low",
    },
    {
      id: 3,
      timestamp: "2024-01-15 10:27:33",
      level: "SUCCESS",
      category: "Admin",
      message: "Admin scheduled new meeting with encryption",
      user: "admin@company.com",
      details: "Meeting: Weekly Team Standup, Encryption key: AES256-GCM-7F8E9A2B, Invitees: 5",
      action: "meeting_scheduled",
      severity: "low",
    },
    {
      id: 4,
      timestamp: "2024-01-15 10:25:33",
      level: "WARNING",
      category: "Meeting",
      message: "Participant removed from meeting by moderator",
      user: "sarah.johnson@company.com",
      details: "Participant removed from ROOM-002 for disruptive behavior",
      action: "participant_removed",
      severity: "medium",
    },
    {
      id: 5,
      timestamp: "2024-01-15 10:24:18",
      level: "INFO",
      category: "Admin",
      message: "Warning sent to meeting participant",
      user: "admin@company.com",
      details: "Warning sent to participant in meeting ROOM-002",
      action: "warning_sent",
      severity: "low",
    },
    {
      id: 6,
      timestamp: "2024-01-15 10:22:18",
      level: "SUCCESS",
      category: "Admin",
      message: "Participant promoted to moderator",
      user: "admin@company.com",
      details: "Participant promoted to moderator in ROOM-001",
      action: "moderator_added",
      severity: "low",
    },
    {
      id: 7,
      timestamp: "2024-01-15 10:20:05",
      level: "INFO",
      category: "Security",
      message: "Encryption key sent to meeting participants",
      user: "system",
      details: "Encryption key for ROOM-003 sent to 8 participants",
      action: "encryption_key_sent",
      severity: "low",
    },
    {
      id: 8,
      timestamp: "2024-01-15 10:18:42",
      level: "ERROR",
      category: "Meeting",
      message: "Failed to join meeting - invalid encryption key",
      user: "unknown.participant@external.com",
      details: "Participant attempted to join ROOM-001 with incorrect encryption key",
      action: "join_failed",
      severity: "medium",
    },
    {
      id: 9,
      timestamp: "2024-01-15 10:15:27",
      level: "WARNING",
      category: "Admin",
      message: "Multiple moderator actions detected",
      user: "admin@company.com",
      details: "Admin performed 5 moderator actions in ROOM-002 within 2 minutes",
      action: "admin_activity",
      severity: "medium",
    },
    {
      id: 10,
      timestamp: "2024-01-15 10:12:14",
      level: "SUCCESS",
      category: "Meeting",
      message: "Meeting encryption key rotated",
      user: "system",
      details: "Encryption key for ROOM-001 rotated successfully, new key sent to participants",
      action: "key_rotated",
      severity: "low",
    },
  ]

  const getLevelIcon = (level) => {
    switch (level) {
      case "ERROR":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "INFO":
        return <Info className="h-4 w-4 text-blue-600" />
      case "SUCCESS":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "ERROR":
        return "bg-red-100 text-red-800"
      case "WARNING":
        return "bg-yellow-100 text-yellow-800"
      case "INFO":
        return "bg-blue-100 text-blue-800"
      case "SUCCESS":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = selectedLevel === "all" || log.level === selectedLevel
    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory
    const matchesSeverity = selectedSeverity === "all" || log.severity === selectedSeverity

    return matchesSearch && matchesLevel && matchesCategory && matchesSeverity
  })

  const logStats = {
    total: logs.length,
    errors: logs.filter((log) => log.level === "ERROR").length,
    warnings: logs.filter((log) => log.level === "WARNING").length,
    info: logs.filter((log) => log.level === "INFO").length,
    success: logs.filter((log) => log.level === "SUCCESS").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Logs</h1>
          <p className="text-slate-600">Monitor system activities and events</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Log Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-slate-600" />
              <div>
                <p className="text-2xl font-bold">{logStats.total}</p>
                <p className="text-sm text-slate-600">Total Logs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{logStats.errors}</p>
                <p className="text-sm text-slate-600">Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{logStats.warnings}</p>
                <p className="text-sm text-slate-600">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{logStats.info}</p>
                <p className="text-sm text-slate-600">Info</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{logStats.success}</p>
                <p className="text-sm text-slate-600">Success</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search logs by message, category, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-md bg-white"
            >
              <option value="all">All Levels</option>
              <option value="ERROR">Errors</option>
              <option value="WARNING">Warnings</option>
              <option value="INFO">Info</option>
              <option value="SUCCESS">Success</option>
            </select>
          </div>

          {/* Enhanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <select
              className="px-3 py-2 border border-slate-200 rounded-md bg-white"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Admin">Admin Actions</option>
              <option value="Meeting">Meeting Events</option>
              <option value="Security">Security Events</option>
              <option value="System">System Events</option>
            </select>

            <select
              className="px-3 py-2 border border-slate-200 rounded-md bg-white"
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="all">All Severity</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <Input type="date" className="px-3 py-2 border border-slate-200 rounded-md" placeholder="Filter by date" />

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Filtered
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Logs ({filteredLogs.length})</CardTitle>
          <CardDescription>Real-time system activity monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getLevelIcon(log.level)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={getLevelColor(log.level)}>{log.level}</Badge>
                        <Badge variant="outline">{log.category}</Badge>
                        <span className="text-xs text-slate-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {log.timestamp}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 mb-1">{log.message}</p>
                      <p className="text-xs text-slate-600 mb-2">{log.details}</p>
                      <p className="text-xs text-slate-500">User: {log.user}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
