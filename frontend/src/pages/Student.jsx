import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SideDrawer from '../components/side-drawer'
import Navbar from '../components/navbar'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'
import { backendConfig } from '../config'

const Home = () => {
  const { toast } = useToast()
  const [open, setIsOpen] = useState(false)
  const [doubtsHistory, setDoubtHistory] = useState([])

  useEffect(() => {
    axios.get(`${backendConfig.baseUrl}doubt`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${backendConfig.userDetails.token}`,
      },
    })
      .then((res) => {
        console.log(res.data.studentDoubtHistory)
        setDoubtHistory(res.data.studentDoubtHistory.doubts)
        toast({
          description: "Your all doubts history fetched",
        })
      })
      .catch((err) => {
        console.log(err)
        toast({
          variant: "destructive",
          title: "Uh oh!",
          description: "Something went wrong please try login again",
        })
      })
  }, [])

  return (
    <>
      <Toaster />
      <Navbar />
      <div className=" h-full flex-1 flex-col p-8 relative">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{`Welcome Student :)`}</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your recent doubts
            </p>
          </div>
          <Button onClick={() => setIsOpen(!open)}>Start new doubt</Button>
        </div>
        {
          doubtsHistory.length !== 0 && doubtsHistory.map((doubt) =>
            <Card key={doubt._id} className="p-3 shadow-sm mt-5 text-muted-foreground border rounded-md flex justify-between items-center">
              <div>
                <h2 className='text-primary font-semibold'>
                  {doubt.doubtTitle}
                </h2>
                <p className='text-sm'>{doubt.doubtContent}</p>
              </div>
              <div className={`px-3 py-2 rounded text-xs text-white font-medium ${!doubt.isResolved ? " bg-orange-300" : "bg-green-400 "}`}>
                {doubt.isResolved ? "Resolved" : "Not resolved"}
              </div>
            </Card>)
        }
      </div>
      <SideDrawer setIsOpen={setIsOpen} open={open} />
    </>
  )
}

export default Home