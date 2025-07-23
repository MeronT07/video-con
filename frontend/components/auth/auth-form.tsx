"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Video, User, Mail, Lock, Eye, EyeOff, Building, Shield, Crown, LogIn, UserPlus } from "lucide-react"

interface AuthFormProps {
  onLogin: (data: any) => void
  onRegister: (data: any) => void
}

export function AuthForm({ onLogin, onRegister }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
    department: "Engineering",
    role: "participant",
  })

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
    "IT",
    "Support",
    "Management",
    "Design",
  ]

  const roles = [
    { value: "participant", label: "Participant", icon: User, description: "Join meetings and participate" },
    { value: "moderator", label: "Moderator", icon: Shield, description: "Moderate meetings and manage users" },
    { value: "host", label: "Host", icon: Crown, description: "Host meetings and full control" },
    { value: "admin", label: "Admin", icon: Shield, description: "Full system administration" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      // Mock login validation
      if (formData.userEmail && formData.password) {
        const loginData = {
          userName: formData.userName || formData.userEmail.split("@")[0],
          userEmail: formData.userEmail,
          role: formData.role,
          department: formData.department,
          isAdmin: formData.userEmail === "admin@company.com" || formData.role === "admin",
        }
        onLogin(loginData)
      }
    } else {
      // Registration validation
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!")
        return
      }

      if (formData.userName && formData.userEmail && formData.password) {
        const registerData = {
          userName: formData.userName,
          userEmail: formData.userEmail,
          department: formData.department,
          role: formData.role,
          password: formData.password,
        }
        onRegister(registerData)
      }
    }
  }

  const getRoleIcon = (roleValue: string) => {
    const role = roles.find((r) => r.value === roleValue)
    return role ? role.icon : User
  }

  const getRoleColor = (roleValue: string) => {
    switch (roleValue) {
      case "admin":
        return "text-red-600"
      case "host":
        return "text-yellow-600"
      case "moderator":
        return "text-blue-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Video className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">SecureConf</h1>
              <p className="text-blue-400">Video Conference Platform</p>
            </div>
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-slate-600">
              {isLogin
                ? "Sign in to access your dashboard and join meetings"
                : "Register to start using SecureConf platform"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field for registration */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.userEmail}
                    onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Department and Role for registration */}
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <div className="space-y-2">
                      {roles.map((role) => {
                        const Icon = role.icon
                        return (
                          <label
                            key={role.value}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              formData.role === role.value
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="role"
                              value={role.value}
                              checked={formData.role === role.value}
                              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                              className="sr-only"
                            />
                            <Icon className={`h-5 w-5 mr-3 ${getRoleColor(role.value)}`} />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-slate-900">{role.label}</span>
                                {role.value === "admin" && (
                                  <Badge className="bg-red-100 text-red-800 text-xs">Admin</Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600">{role.description}</p>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password for registration */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">
                {isLogin ? (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            {/* Toggle between login and register */}
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isLogin ? "Register here" : "Sign in here"}
                </button>
              </p>
            </div>

            {/* Demo credentials */}
            {isLogin && (
              <div className="mt-4 p-3 bg-slate-100 rounded-lg">
                <p className="text-xs text-slate-600 mb-2">Demo Credentials:</p>
                <div className="text-xs space-y-1">
                  <p>
                    <strong>Admin:</strong> admin@company.com
                  </p>
                  <p>
                    <strong>User:</strong> user@company.com
                  </p>
                  <p>
                    <strong>Password:</strong> Any password
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
