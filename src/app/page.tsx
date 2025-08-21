import React from "react"
import User from "@/components/User"
import { Card, CardContent } from "@/components/ui/card"

export default function page() {
  return (
    <div className="p-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent>
          <User />
        </CardContent>
      </Card>
    </div>
  )
}