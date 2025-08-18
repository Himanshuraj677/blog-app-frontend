import React from 'react'
import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
export default function Register() {
  return (
    <div className='min-h-screen bg-gray-950 mx-auto'>
      <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-100">Create Account</CardTitle>
            <CardDescription className="text-center text-gray-400">Start your blogging journey today</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-100">
                  Username
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="pl-10 bg-gray-800/50 border-gray-700 focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-100">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-gray-800/50 border-gray-700 focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-100">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="pl-10 bg-gray-800/50 border-gray-700 focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-cyan-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}
