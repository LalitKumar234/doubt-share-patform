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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios';
import { SelectedItems } from '@/components/ui/selected'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { backendConfig } from '../config'
import { Link, useNavigate } from 'react-router-dom'
import { allSubjects, languages } from '../constants'

// const languages = ['English', 'Hindi', 'Spanish', 'German']
// const allSubjects = ['Maths', 'Science', 'SocialScience', 'GeneralKnowledge', 'IT']

const Register = ({ setIsLoggedIn, setRole }) => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        email: "",
        username: "",
        password: "",
        role: "",
        language: "",
        subjectsAllowed: []
    })

    console.log(userDetails)


    const handleChange = (value) => {
        console.log(value)
        if (userDetails.subjectsAllowed.includes(value)) {
            toast({
                variant: "destructive",
                title: "Uh oh!",
                description: "You can't add one subject twice",
            })
            return
        }
        setUserDetails({ ...userDetails, subjectsAllowed: [...userDetails.subjectsAllowed, value] })
    }

    const handleSignUp = () => {
        axios.post(`${backendConfig.baseUrl}auth/register`, userDetails)
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
                setIsLoggedIn(true)
                res.data.user.role === "teacher" ? navigate('/teacher') : navigate('/student')
            })
            .catch(err => {
                console.log(err.request.status, 'error')
                toast({
                    variant: "destructive",
                    title: "Uh oh!",
                    description: err.request.status === 409 ? "Email already in use please login" : "Something went wrong please try again after sometimes",
                })
            })
    }

    return (
        <>
            <Toaster />
            <div className='flex items-center justify-center h-full border'>
                <Card className='max-w-[400px] w-full'>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your email and password below to Login
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                value={userDetails.username}
                                id="username"
                                type="text"
                                placeholder="@username"
                                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value.trim() })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                value={userDetails.email}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value.trim() })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                value={userDetails.password}
                                id="password"
                                type="password"
                                placeholder="********"
                                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value.trim() })}
                            />
                        </div>
                        <div className="grid gap-2 w-full">
                            <Label htmlFor="title">Select Role</Label>
                            <Select onValueChange={(value) => setUserDetails({ ...userDetails, role: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex w-full gap-4'>
                            <div className="grid gap-2 w-full">
                                <Label htmlFor="title">Select your Language</Label>
                                <Select onValueChange={(value) => setUserDetails({ ...userDetails, language: value })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            languages.map((lang, id) => <SelectItem key={id} value={lang.toLocaleLowerCase()}>{lang}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {
                            userDetails.role === 'teacher' && (
                                <>
                                    <div className='flex w-full gap-4'>
                                        <div className="grid gap-2 w-full">
                                            <Label htmlFor="title">Select Your Subjects</Label>
                                            <Select onValueChange={handleChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Your Subjects" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        allSubjects.map((sub, id) => <SelectItem key={id} value={sub.toLocaleLowerCase()}>{sub}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {
                                        userDetails.subjectsAllowed.length !== 0 && <SelectedItems items={userDetails.subjectsAllowed} />
                                    }
                                </>
                            )
                        }
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full" onClick={handleSignUp}>Create account</Button>
                        <p className='mt-2 text-sm'>Already have an account?<Link to="/login" className="text-blue-400"> Login</Link></p>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Register