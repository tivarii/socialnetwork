"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { LoadMorePosts } from "@/components/load-more-posts"
import { PostActions } from "@/components/post-actions"
import { EditPostDialog } from "@/components/edit-post-dialog"

interface Post {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    email: string
  }
}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)
  const [editingPost, setEditingPost] = useState<{ id: string; content: string } | null>(null)

  const fetchPosts = async (pageNum = 1, reset = false) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?page=${pageNum}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (reset) {
          setPosts(data.posts || [])
        } else {
          setPosts((prev) => [...prev, ...(data.posts || [])])
        }
        setHasMore(data.hasMore || false)
        setTotalPosts(data.total || 0)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()

    // Listen for new posts
    const handlePostCreated = () => {
      setPage(1)
      fetchPosts(1, true)
    }

    window.addEventListener("postCreated", handlePostCreated)
    return () => window.removeEventListener("postCreated", handlePostCreated)
  }, [])

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

  const handlePostUpdate = (postId: string, newContent: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, content: newContent } : post)))
  }

  const handlePostDelete = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId))
    // Trigger a refresh to get updated data
    window.dispatchEvent(new CustomEvent("postCreated"))
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No posts yet. Be the first to share something!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Link href={`/profile/${post.author.id}`} className="font-semibold hover:text-blue-600">
                  {post.author.name}
                </Link>
                <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
              </div>
            </div>
            <PostActions
              postId={post.id}
              authorId={post.author.id}
              onEdit={() => setEditingPost({ id: post.id, content: post.content })}
              onDelete={() => handlePostDelete(post.id)}
            />
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{post.content}</p>
          </CardContent>
        </Card>
      ))}
      <LoadMorePosts
        onLoadMore={() => {
          const nextPage = page + 1
          setPage(nextPage)
          fetchPosts(nextPage, false)
        }}
        hasMore={hasMore}
        loading={loading}
      />
      {editingPost && (
        <EditPostDialog
          open={!!editingPost}
          onOpenChange={(open) => !open && setEditingPost(null)}
          postId={editingPost.id}
          initialContent={editingPost.content}
          onUpdate={(newContent) => handlePostUpdate(editingPost.id, newContent)}
        />
      )}
    </div>
  )
}
