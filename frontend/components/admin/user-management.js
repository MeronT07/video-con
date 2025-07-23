"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Activity,
  Shield,
  Crown,
  User,
  Mail,
  Building,
  MoreVertical,
  UserCheck,
} from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)

  // Mock user data with registration info
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      role: "host",
      status: "active",
      lastActive: "2 minutes ago",
      joinDate: "2024-01-15",
      registrationDate: "2024-01-15 09:30:00",
      meetingsAttended: 45,
      meetingsHosted: 12,
      totalHours: 120,
      avatar: "JD",
      isAdmin: false,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      role: "moderator",
      status: "active",
      lastActive: "5 minutes ago",
      joinDate: "2024-01-10",
      registrationDate: "2024-01-10 14:20:00",
      meetingsAttended: 38,
      meetingsHosted: 8,
      totalHours: 95,
      avatar: "SJ",
      isAdmin: false,
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Engineering",
      role: "participant",
      status: "inactive",
      lastActive: "2 hours ago",
      joinDate: "2024-01-20",
      registrationDate: "2024-01-20 11:45:00",
      meetingsAttended: 22,
      meetingsHosted: 0,
      totalHours: 48,
      avatar: "MC",
      isAdmin: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      department: "Sales",
      role: "moderator",
      status: "active",
      lastActive: "1 minute ago",
      joinDate: "2024-01-05",
      registrationDate: "2024-01-05 16:10:00",
      meetingsAttended: 67,
      meetingsHosted: 15,
      totalHours: 180,
      avatar: "ED",
      isAdmin: false,
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      email: "alex.rodriguez@company.com",
      department: "HR",
      role: "participant",
      status: "active",
      lastActive: "10 minutes ago",
      joinDate: "2024-01-25",
      registrationDate: "2024-01-25 08:15:00",
      meetingsAttended: 15,
      meetingsHosted: 2,
      totalHours: 32,
      avatar: "AR",
      isAdmin: false,
    },
    {
      id: 6,
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      department: "Finance",
      role: "host",
      status: "suspended",
      lastActive: "1 day ago",
      joinDate: "2024-01-12",
      registrationDate: "2024-01-12 13:25:00",
      meetingsAttended: 28,
      meetingsHosted: 6,
      totalHours: 65,
      avatar: "LW",
      isAdmin: false,
    },
    {
      id: 7,
      name: "Admin User",
      email: "admin@company.com",
      department: "IT",
      role: "admin",
      status: "active",
      lastActive: "Just now",
      joinDate: "2024-01-01",
      registrationDate: "2024-01-01 00:00:00",
      meetingsAttended: 5,
      meetingsHosted: 2,
      totalHours: 15,
      avatar: "AU",
      isAdmin: true,
    },
    {
      id: 8,
      name: "David Kim",
      email: "david.kim@company.com",
      department: "Operations",
      role: "admin",
      status: "active",
      lastActive: "30 minutes ago",
      joinDate: "2024-01-03",
      registrationDate: "2024-01-03 10:30:00",
      meetingsAttended: 12,
      meetingsHosted: 4,
      totalHours: 28,
      avatar: "DK",
      isAdmin: true,
    },
  ]

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-600" />
      case "host":
        return <Crown className="h-4 w-4 text-yellow-600" />
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-600" />
      default:
        return <User className="h-4 w-4 text-slate-600" />
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "host":
        return "bg-yellow-100 text-yellow-800"
      case "moderator":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    adminUsers: users.filter((u) => u.isAdmin).length,
    newRegistrations: users.filter((u) => {
      const regDate = new Date(u.registrationDate)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return regDate > weekAgo
    }).length,
    totalMeetings: users.reduce((acc, u) => acc + u.meetingsAttended, 0),
    totalHours: users.reduce((acc, u) => acc + u.totalHours, 0),
  }

  const departments = ["all", "Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "IT", "Support"]
  const roles = ["all", "participant", "moderator", "host", "admin"]
  const statuses = ["all", "active", "inactive", "suspended"]

  const handlePromoteToAdmin = (userId) => {
    console.log("Promoting user to admin:", userId)
    alert("User promoted to admin successfully!")
  }

  const handleAddNewAdmin = () => {
    setShowAddAdminModal(true)
  }

  const AddAdminModal = () => {
    const [newAdminData, setNewAdminData] = useState({
      name: "",
      email: "",
      department: "IT",
      password: "",
      confirmPassword: "",
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      if (newAdminData.password !== newAdminData.confirmPassword) {
        alert("Passwords don't match!")
        return
      }
      console.log("Creating new admin:", newAdminData)
      alert("New admin created successfully!")
      setShowAddAdminModal(false)
      setNewAdminData({ name: "", email: "", department: "IT", password: "", confirmPassword: "" })
    }

    if (!showAddAdminModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Add New Admin</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowAddAdminModal(false)}>
              ×
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                type="text"
                value={newAdminData.name}
                onChange={(e) => setNewAdminData({ ...newAdminData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={newAdminData.email}
                onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                value={newAdminData.department}
                onChange={(e) => setNewAdminData({ ...newAdminData, department: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white"
              >
                {departments
                  .filter((d) => d !== "all")
                  .map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={newAdminData.password}
                onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <Input
                type="password"
                value={newAdminData.confirmPassword}
                onChange={(e) => setNewAdminData({ ...newAdminData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                <Shield className="h-4 w-4 mr-2" />
                Create Admin
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddAdminModal(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-600">Manage user accounts, registrations, and admin privileges</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleAddNewAdmin} className="bg-red-600 hover:bg-red-700">
            <Shield className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                <p className="text-xs text-slate-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                <p className="text-xs text-slate-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.adminUsers}</p>
                <p className="text-xs text-slate-600">Admin Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.newRegistrations}</p>
                <p className="text-xs text-slate-600">New (7 days)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.totalMeetings}</p>
                <p className="text-xs text-slate-600">Total Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-2xl font-bold text-indigo-600">{stats.totalHours}h</p>
                <p className="text-xs text-slate-600">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role === "all" ? "All Roles" : role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedDepartment("all")
                    setSelectedRole("all")
                    setSelectedStatus("all")
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Users ({filteredUsers.length})</CardTitle>
          <CardDescription>All registered users with their activity and admin privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Avatar */}
                    <div
                      className={`w-12 h-12 ${user.isAdmin ? "bg-red-600" : "bg-blue-600"} rounded-full flex items-center justify-center`}
                    >
                      <span className="text-white font-semibold">{user.avatar}</span>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{user.name}</h4>
                        {user.isAdmin && (
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                        <span className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Building className="h-3 w-3" />
                          <span>{user.department}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Registered: {new Date(user.registrationDate).toLocaleDateString()}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(user.role)}>
                          <div className="flex items-center space-x-1">
                            {getRoleIcon(user.role)}
                            <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                          </div>
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-slate-500">Last active: {user.lastActive}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-slate-900">{user.meetingsAttended}</p>
                        <p className="text-xs text-slate-600">Attended</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-slate-900">{user.meetingsHosted}</p>
                        <p className="text-xs text-slate-600">Hosted</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-slate-900">{user.totalHours}h</p>
                        <p className="text-xs text-slate-600">Total Time</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Edit User">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {!user.isAdmin && (
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Promote to Admin"
                        onClick={() => handlePromoteToAdmin(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" title="More Actions">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" title="Delete User">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="md:hidden mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span>
                        <strong>{user.meetingsAttended}</strong> attended
                      </span>
                      <span>
                        <strong>{user.meetingsHosted}</strong> hosted
                      </span>
                      <span>
                        <strong>{user.totalHours}h</strong> total
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      Registered {new Date(user.registrationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Admin Modal */}
      <AddAdminModal />
    </div>
  )
}
