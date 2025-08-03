"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Home, Users } from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600">
              MiniLinkedIn
            </Link>
            {user && (
              <div className="flex space-x-4">
                <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link href="/users" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <Users className="h-4 w-4" />
                  <span>People</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block">{user.name}</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block ml-1">Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
