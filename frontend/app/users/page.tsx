"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Users } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  bio?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    fetchUsers()
  }, [user, router])

  const fetchUsers = async (pageNum = 1, reset = false) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?page=${pageNum}&limit=12`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (reset) {
          setUsers(data.users || [])
        } else {
          setUsers((prev) => [...prev, ...(data.users || [])])
        }
        setHasMore(data.hasMore || false)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchUsers(nextPage, false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Discover People
          </h1>
          <p className="text-gray-600 mt-1">Connect with professionals in our community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((userItem) => (
            <Card key={userItem.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{userItem.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{userItem.name}</h3>
                  <p className="text-sm text-gray-500">{userItem.email}</p>
                </div>
              </CardHeader>
              {userItem.bio && (
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 line-clamp-2">{userItem.bio}</p>
                </CardContent>
              )}
              <CardContent className="pt-2">
                <Link href={`/profile/${userItem.id}`}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <Button onClick={loadMore} variant="outline">
              Load More Users
            </Button>
          </div>
        )}

        {users.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No users found</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
