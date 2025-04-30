"use client"
import { createContext, useEffect, useState } from "react"
import { User } from "@/app/users.schema"

export interface UserContextType {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | null>(null)

export interface UserProviderProps {
    children: React.ReactNode
}

export const UserProvider = ({children}: UserProviderProps) =>{
    // const loggedInUser = localStorage.getItem("user");
    // const [user, setUser] = useState<User | null>(loggedInUser? JSON.parse(loggedInUser) : null);
    // return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>

    const loggedInUser = localStorage.getItem("user");
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        if(loggedInUser){
            setUser(JSON.parse(loggedInUser));
        }
    },[loggedInUser])

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>

}