"use client"

import { Button } from "@/components/ui/button"

interface LoadMorePostsProps {
  onLoadMore: () => void
  hasMore: boolean
  loading: boolean
}

export function LoadMorePosts({ onLoadMore, hasMore, loading }: LoadMorePostsProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No more posts to load</p>
      </div>
    )
  }

  return (
    <div className="text-center py-4">
      <Button onClick={onLoadMore} disabled={loading} variant="outline">
        {loading ? "Loading..." : "Load More Posts"}
      </Button>
    </div>
  )
}
