"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, User, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { EditProfileDialog } from "@/components/edit-profile-dialog"

interface UserProfile {
  id: string
  name: string
  email: string
  bio?: string
}

interface Post {
  id: string
  content: string
  createdAt: string
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")

        // Fetch user profile
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (userResponse.ok) {
          const userData = await userResponse.json()
          setProfile(userData.user || userData)
        }

        // Fetch user's posts
        const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/user/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (postsResponse.ok) {
          const postsData = await postsResponse.json()
          setPosts(postsData.posts || postsData)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [params.id, user, router])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center space-y-0 space-x-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">User not found</p>
              <Button onClick={() => router.push("/")} className="mt-4">
                Go Home
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const isOwnProfile = user?.id === profile.id

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-2xl">{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                {profile.bio && <p className="text-gray-700 mt-2">{profile.bio}</p>}
                {isOwnProfile && (
                  <div className="flex items-center space-x-2 text-sm text-blue-600 mt-2">
                    <User className="h-4 w-4" />
                    <span>This is your profile</span>
                  </div>
                )}
                {isOwnProfile && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)} className="mt-2">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Posts Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">{isOwnProfile ? "Your Posts" : `${profile.name}'s Posts`}</h2>

            {posts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">{isOwnProfile ? "You haven't posted anything yet." : "No posts yet."}</p>
                  {isOwnProfile && (
                    <Button onClick={() => router.push("/")} className="mt-4">
                      Create Your First Post
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                      <Avatar>
                        <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{profile.name}</p>
                        <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{post.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <EditProfileDialog open={isEditingProfile} onOpenChange={setIsEditingProfile} />
    </div>
  )
}
