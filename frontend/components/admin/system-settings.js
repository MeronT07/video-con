"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Server, Mail, Bell, Lock, Key, Database, Save, RefreshCw } from "lucide-react"

export function SystemSettings() {
  const [activeSection, setActiveSection] = useState("general")

  const sections = [
    { id: "general", label: "General Settings", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "server", label: "Server Configuration", icon: Server },
    { id: "email", label: "Email Settings", icon: Mail },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  const GeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Configure basic application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Application Name</label>
              <Input defaultValue="Video Conference Platform" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Default Meeting Duration (minutes)
              </label>
              <Input type="number" defaultValue="60" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Max Participants per Meeting</label>
              <Input type="number" defaultValue="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Time Zone</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-md">
                <option>UTC</option>
                <option>EST</option>
                <option>PST</option>
                <option>GMT</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Defaults</CardTitle>
          <CardDescription>Default settings for new meetings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-record meetings</p>
              <p className="text-sm text-slate-600">Automatically start recording when meetings begin</p>
            </div>
            <input type="checkbox" className="toggle" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Waiting room enabled</p>
              <p className="text-sm text-slate-600">Require host approval for participants to join</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mute participants on join</p>
              <p className="text-sm text-slate-600">Automatically mute participants when they join</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const SecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Meeting Security Settings</span>
          </CardTitle>
          <CardDescription>Configure meeting security and access control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Require Meeting Passwords</p>
              <p className="text-sm text-slate-600">Require password for all meetings</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Waiting Room</p>
              <p className="text-sm text-slate-600">Require host approval to join meetings</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Timeout (minutes)</label>
              <Input type="number" defaultValue="120" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Max Participants per Meeting</label>
              <Input type="number" defaultValue="100" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Encryption Settings</span>
          </CardTitle>
          <CardDescription>Configure end-to-end encryption settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">End-to-End Encryption</p>
              <p className="text-sm text-slate-600">Encrypt all video, audio, and chat data</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Encryption Algorithm</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-md">
                <option>AES-256-GCM</option>
                <option>ChaCha20-Poly1305</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Key Rotation Interval (days)</label>
              <Input type="number" defaultValue="30" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ServerSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Server Configuration</span>
          </CardTitle>
          <CardDescription>Configure server and infrastructure settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Server Region</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-md">
                <option>US East (N. Virginia)</option>
                <option>US West (Oregon)</option>
                <option>Europe (Ireland)</option>
                <option>Asia Pacific (Singapore)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Max Concurrent Meetings</label>
              <Input type="number" defaultValue="50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bandwidth Limit (Mbps)</label>
              <Input type="number" defaultValue="1000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Storage Limit (GB)</label>
              <Input type="number" defaultValue="500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Database Settings</span>
          </CardTitle>
          <CardDescription>Configure database and backup settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automatic Backups</p>
              <p className="text-sm text-slate-600">Daily automated database backups</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Backup Retention (days)</label>
              <Input type="number" defaultValue="30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Backup Time (UTC)</label>
              <Input type="time" defaultValue="02:00" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSettings />
      case "security":
        return <SecuritySettings />
      case "server":
        return <ServerSettings />
      case "email":
        return <div className="text-center py-8 text-slate-500">Email settings coming soon...</div>
      case "notifications":
        return <div className="text-center py-8 text-slate-500">Notification settings coming soon...</div>
      default:
        return <GeneralSettings />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-600">Configure system-wide settings and security</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeSection === section.id ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{section.label}</span>
                  </button>
                )
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3">{renderContent()}</div>
      </div>
    </div>
  )
}
