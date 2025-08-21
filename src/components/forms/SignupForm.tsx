"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { Loader2Icon } from "lucide-react"


const formSchema = z.object({
  email: z.email("Please enter a valid email"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
})

export default function SignupForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          username: values.username,
          password: values.password,
          name: values.name || values.username,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast(data.error || "Sign Up failed!")
        return
      }

      const loginRes = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if (loginRes?.error) {
        toast("Sign Up succeeded, but login failed: " + loginRes.error)
      } else {
        toast("Signup successful.")
        router.push("/")
      }
    } catch (err) {
      console.error("Signup error:", err)
      toast("Error singing up!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign up</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your credentials below in order to continue
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="gholam123" {...field} />
              </FormControl>
              <FormDescription>Your public display name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Gholam Commando (optional)" {...field} />
              </FormControl>
              <FormDescription>If left blank, username will be used</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {!isLoading ? "Sign Up" : (
            <>
              <Loader2Icon className="animate-spin" />
              Please wait
            </>
          )}
        </Button>

        <div className="text-center text-sm">
          Have an account?{" "}
          <Link href="/auth/signin" className="underline underline-offset-4">
            Sign in here
          </Link>
        </div>
      </form>
    </Form>
  )
}
