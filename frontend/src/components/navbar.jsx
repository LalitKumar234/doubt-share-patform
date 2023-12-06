import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { backendConfig } from '../config'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const userDetails = backendConfig.userDetails
    const navigate = useNavigate()

    const handleLogout = () =>{
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className='border-b w-full px-8 py-3 flex justify-between items-center'>
            <h1 className='text-2xl font-medium text-foreground'>Doubt<span className='font-bold'>Share</span></h1>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarFallback>{userDetails.email.slice(0, 2).toUpperCase()}</AvatarFallback>
                        <AvatarImage src="" />
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="flex flex-col">
                        <h3>{userDetails.email}</h3>
                        <p className="text-xs font-normal">{userDetails.username}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Navbar