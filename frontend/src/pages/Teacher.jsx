import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'

import {
    Card,
} from "@/components/ui/card"
import { backendConfig } from '../config'
import axios from 'axios'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"

const Teacher = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [recentDoubt, setRecentDoubt] = useState([])
    const subjects = backendConfig.userDetails?.teacherDetails?.subjectsAllowed
    const language = backendConfig.userDetails?.language

    console.log(recentDoubt)

    const handleResolve = (id) => {
        const data = {
            isResolved: true
        }
        axios.put(`${backendConfig.baseUrl}doubt/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${backendConfig.userDetails?.token}`,
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Uh oh!",
                description: "Something went wrong",
            })
        })

    }

    const getDoubtNotification = () => {
        axios.get(`${backendConfig.baseUrl}doubt?subjects=${subjects.map((sub) => sub,)}&language=${language}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${backendConfig.userDetails?.token}`,
            },
        }).then((res) => {
            console.log(res.data)
            const doubtJustRecieved = res.data.matchingDoubts.filter((doubt) => doubt.isResolved === false)
            setRecentDoubt(doubtJustRecieved)
        }).catch((err) => {
            console.log(err.response.data)
            toast({
                variant: "destructive",
                title: "Uh oh!",
                description: `${err.response.data.message} Please Login`,
            })
            localStorage.clear()
            navigate('/login')
        })
    }

    useEffect(() => {
        getDoubtNotification()
        const pollingInterval = 3000;
        const intervalId = setInterval(() => {
            getDoubtNotification()
            console.log('api called')
            recentDoubt.length > 0 && toast({
                description: "You have some doubts to resolve",
            })
        }, pollingInterval)
        return () => clearInterval(intervalId);

    }, [])

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className=" h-full flex-1 flex-col space-y-8 p-8 relative">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Hello Teacher,</h2>
                        <p className="text-muted-foreground">
                            Hope you are doing good!
                        </p>
                    </div>
                </div>
                {
                    recentDoubt.length !== 0 && recentDoubt.map((doubt) =>
                        <Card key={doubt._id} className="p-3 shadow-sm mt-5 text-muted-foreground border rounded-md flex justify-between items-center">
                            <div>
                                <h2 className='text-primary font-semibold'>
                                    {doubt.doubtTitle}
                                </h2>
                                <p className='text-sm'>{doubt.doubtContent}</p>
                            </div>
                            <Button onClick={() => handleResolve(doubt._id)}>Resolve This doubt</Button>
                        </Card>)
                }
            </div>
        </div>
    )
}

export default Teacher