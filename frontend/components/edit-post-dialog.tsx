"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface EditPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: string
  initialContent: string
  onUpdate: (newContent: string) => void
}

export function EditPostDialog({ open, onOpenChange, postId, initialContent, onUpdate }: EditPostDialogProps) {
  const [content, setContent] = useState(initialContent)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleUpdate = async () => {
    if (!content.trim()) return

    setIsUpdating(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: content.trim() }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Post updated successfully",
        })
        onUpdate(content.trim())
        onOpenChange(false)
      } else {
        throw new Error("Failed to update post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>Make changes to your post here.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
            maxLength={500}
          />
          <div className="text-sm text-gray-500">{content.length}/500 characters</div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!content.trim() || isUpdating}>
            {isUpdating ? "Updating..." : "Update Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
