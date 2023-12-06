import React, { useEffect, useState } from 'react'
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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IoMdClose } from "react-icons/io";
import axios from "axios"
import { backendConfig } from '../config'
import { allSubjects, languages } from '../constants'
import { useToast } from "@/components/ui/use-toast"

const SideDrawer = ({ setIsOpen, open }) => {
    const { toast } = useToast()
    
    const [newDoubt, setNewDoubt] = useState({
        doubtTitle: "",
        doubtContent: "",
        subject: "",
        language: ""
    })

    // console.log(backendConfig.userDetails.token)

    const handlePostDoubt = () => {
        axios.post(`${backendConfig.baseUrl}doubt`, newDoubt, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${backendConfig.userDetails.token}`,
            },
        })
            .then((res) => {
                console.log(res)
                toast({
                    description: "Your doubt has been created successfully and will be resolved shortly by our teachers"
                })
                setIsOpen(false)
            })
            .catch((err) => {
                console.log(err)
                toast({
                    variant: "destructive",
                    title: "Uh oh!",
                    description: "Something went wrong please try again after sometimes",
                })
            })
    }

    return (
        <>
            <Card className='w-[600px] fixed top-0 right-0 h-full shadow-lg transition-transform' style={{
                visibility: open ? 'visible' : 'hidden',
                transform: open ? 'translate(0px, 0px)' : 'translate(600px, 0px)'
            }}>
                <CardHeader className="">
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle className="text-2xl">New Doubt</CardTitle>
                            <CardDescription>
                                Add new doubt and discussion
                            </CardDescription>
                        </div>
                        <Button className="p-3" onClick={() => setIsOpen(false)}>
                            <IoMdClose size={20} />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='flex w-full gap-4'>
                        <div className="grid gap-2 mt-5 w-full">
                            <Label htmlFor="title">Select Subject</Label>
                            <Select onValueChange={(value) => setNewDoubt({ ...newDoubt, subject: value })}>
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
                        <div className="grid gap-2 mt-5 w-full">
                            <Label htmlFor="title">Select your preffered Language</Label>
                            <Select onValueChange={(value) => setNewDoubt({ ...newDoubt, language: value })}>
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
                    <div className="grid gap-2 mt-8">
                        <Label htmlFor="title">Add Doubt Title</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Title"
                            onChange={(e) => setNewDoubt({ ...newDoubt, doubtTitle: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2 mt-8">
                        <Label htmlFor="content">Describe your Doubt</Label>
                        <Textarea
                            id="content"
                            type="text"
                            placeholder="Describe your doubt"
                            rows="4"
                            onChange={(e) => setNewDoubt({ ...newDoubt, doubtContent: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handlePostDoubt}>Post Your Doubt</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default SideDrawer