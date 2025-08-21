import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MoveLeft } from "lucide-react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent>
          {children}
        </CardContent>
      </Card>
      <Link href="/" className="text-sm flex flex-row gap-2 items-center">
        <MoveLeft size={18} />
        <span>Back to profile</span>
      </Link>
    </div>
  )
}
