import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { backendConfig } from '../config'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setRole }) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  })

  const handleLogin = () => {
    axios.post(`${backendConfig.baseUrl}auth/login`, userDetails)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('userDetails', JSON.stringify({
          email: res.data.user?.email,
          role: res.data.user?.role,
          username: res.data.user?.username,
          token: res.data.tokens.access.token,
          language: res.data.user?.language,
          teacherDetails: { subjectsAllowed: res.data.user.role === "teacher" ? res.data.user.subjectsAllowed : null }
        }))
        localStorage.setItem('isLoggedIn', true)
        setRole(res.data.user?.role)
        res.data.user.role === "teacher" ? navigate('/teacher') : navigate('/student')
      })
      .catch((err) => {
        console.log(err.request.status, 'error')
        toast({
          variant: "destructive",
          title: "Uh oh!",
          description: err.request.status === 401 ? "Email or password incorrect" : "Something went wrong please try again after sometimes",
        })
      })
  }
  return (
    <>
      <Toaster />
      <div className='flex items-center justify-center h-full border'>
        <Card className='max-w-[400px] w-full'>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Log In</CardTitle>
            <CardDescription>
              Enter your email and password below to Login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userDetails.password}
                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleLogin}>Login</Button>
            <p className='mt-2 text-sm'>Don't have an account?<Link to="/register" className="text-blue-400"> Register</Link></p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Login