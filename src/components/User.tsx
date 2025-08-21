"use client"

import { useSession, signOut } from "next-auth/react"

import { Button } from "./ui/button"
import Link from "next/link"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { CircleAlert } from "lucide-react"

export default function User() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p className="text-center">Loading...</p>
  if (!session) return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-center font-bold text-2xl">Profile details</h1>
        <p className="text-center text-muted-foreground">You are not logged in.</p>
      </div>
      <div className="flex flex-row gap-4">
        <Link href="auth/signin" className="flex-1">
          <Button className="w-full">Sign In</Button>
        </Link>
        <Link href="auth/signup" className="flex-1">
          <Button className="w-full">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name || session.user?.email}</h1>
      <p>Email: {session.user?.email}</p>
      <Button
        onClick={() => signOut()}
        className="w-full mt-4"
      >
        Sign Out
      </Button>
      <Alert>
        <CircleAlert />
        <AlertTitle>Data is saved in database.</AlertTitle>
      </Alert>
    </div>
  )
}
