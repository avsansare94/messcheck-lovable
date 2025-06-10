
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  Shield,
  Building2,
  Crown,
  Mail,
  Calendar,
  MoreHorizontal,
} from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: "user" | "provider" | "admin" | "zeus"
  phone_number?: string
  created_at: string
  updated_at: string
  is_blocked?: boolean
  last_sign_in?: string
}

interface UserStats {
  totalUsers: number
  activeUsers: number
  blockedUsers: number
  adminUsers: number
  providerUsers: number
}

export default function AdminUsersManagement() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    adminUsers: 0,
    providerUsers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, roleFilter])

  const fetchUsers = async () => {
    try {
      // Fetch all profiles with auth data
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      // Get auth users for additional data
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

      // Merge profile and auth data
      const mergedUsers =
        profiles?.map((profile) => {
          const authUser = authUsers?.users.find((u) => u.id === profile.id)
          // Check if user is banned by looking at ban_duration or user_metadata
          const isBanned = authUser?.user_metadata?.banned || 
                          (authUser?.banned_until && new Date(authUser.banned_until) > new Date())
          return {
            ...profile,
            last_sign_in: authUser?.last_sign_in_at,
            is_blocked: isBanned || false,
          }
        }) || []

      setUsers(mergedUsers)

      // Calculate stats
      const totalUsers = mergedUsers.length
      const activeUsers = mergedUsers.filter((u) => !u.is_blocked).length
      const blockedUsers = mergedUsers.filter((u) => u.is_blocked).length
      const adminUsers = mergedUsers.filter((u) => u.role === "admin" || u.role === "zeus").length
      const providerUsers = mergedUsers.filter((u) => u.role === "provider").length

      setStats({
        totalUsers,
        activeUsers,
        blockedUsers,
        adminUsers,
        providerUsers,
      })
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }

  const handleBlockUser = async (userId: string, block: boolean) => {
    setActionLoading(userId)
    try {
      if (block) {
        // Update user metadata to mark as banned
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { banned: true },
        })
        if (error) throw error
      } else {
        // Remove ban from user metadata
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { banned: false },
        })
        if (error) throw error
      }

      // Log admin activity
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        await supabase.from("admin_activity_logs").insert({
          admin_id: user.id,
          action: block ? "USER_BLOCKED" : "USER_UNBLOCKED",
          target_table: "profiles",
          target_id: userId,
          details: {
            user_email: users.find((u) => u.id === userId)?.email,
            action: block ? "Blocked user account" : "Unblocked user account",
          },
        })
      }

      toast.success(block ? "User blocked successfully" : "User unblocked successfully")
      fetchUsers() // Refresh data
    } catch (error) {
      console.error("Error updating user status:", error)
      toast.error("Failed to update user status")
    } finally {
      setActionLoading(null)
    }
  }

  const handleChangeRole = async (userId: string, newRole: "user" | "provider" | "admin") => {
    setActionLoading(userId)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq("id", userId)

      if (error) throw error

      // Log admin activity
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        await supabase.from("admin_activity_logs").insert({
          admin_id: user.id,
          action: "ROLE_CHANGED",
          target_table: "profiles",
          target_id: userId,
          details: {
            user_email: users.find((u) => u.id === userId)?.email,
            old_role: users.find((u) => u.id === userId)?.role,
            new_role: newRole,
            action: `Changed user role to ${newRole}`,
          },
        })
      }

      toast.success("User role updated successfully")
      fetchUsers() // Refresh data
    } catch (error) {
      console.error("Error updating user role:", error)
      toast.error("Failed to update user role")
    } finally {
      setActionLoading(null)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "zeus":
        return <Crown className="h-4 w-4 text-purple-600" />
      case "admin":
        return <Shield className="h-4 w-4 text-red-600" />
      case "provider":
        return <Building2 className="h-4 w-4 text-blue-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "zeus":
        return "default"
      case "admin":
        return "destructive"
      case "provider":
        return "secondary"
      default:
        return "outline"
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage users, roles, and permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blockedUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.adminUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Providers</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.providerUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Search and filter users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="provider">Providers</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
                <SelectItem value="zeus">Zeus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Sign In</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                          <AvatarFallback>{user.full_name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.full_name || "No name"}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1 w-fit">
                        {getRoleIcon(user.role)}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.is_blocked ? "destructive" : "default"}>
                        {user.is_blocked ? "Blocked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {user.last_sign_in ? new Date(user.last_sign_in).toLocaleDateString() : "Never"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={actionLoading === user.id}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          {/* Role Change Options */}
                          {user.role !== "user" && (
                            <DropdownMenuItem onClick={() => handleChangeRole(user.id, "user")}>
                              <Users className="h-4 w-4 mr-2" />
                              Make User
                            </DropdownMenuItem>
                          )}
                          {user.role !== "provider" && (
                            <DropdownMenuItem onClick={() => handleChangeRole(user.id, "provider")}>
                              <Building2 className="h-4 w-4 mr-2" />
                              Make Provider
                            </DropdownMenuItem>
                          )}
                          {user.role !== "admin" && user.role !== "zeus" && (
                            <DropdownMenuItem onClick={() => handleChangeRole(user.id, "admin")}>
                              <Shield className="h-4 w-4 mr-2" />
                              Make Admin
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />

                          {/* Block/Unblock */}
                          {user.is_blocked ? (
                            <DropdownMenuItem
                              onClick={() => handleBlockUser(user.id, false)}
                              className="text-green-600"
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleBlockUser(user.id, true)} className="text-red-600">
                              <UserX className="h-4 w-4 mr-2" />
                              Block User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">No users found matching your criteria.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
