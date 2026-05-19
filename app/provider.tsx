// provider.tsx
"use client"
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { user, isLoaded } = useUser(); // ✅ use Clerk's client-side hook
    const [userDetail, setUserDetail] = useState<any>()

    useEffect(() => {
        if (isLoaded && user) {  // ✅ wait until Clerk is ready
            CreateNewUser();
        }
    }, [isLoaded, user])  // ✅ depend on user state

    const CreateNewUser = async () => {
        const result = await axios.post('/api/users', {
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName
        });
        console.log("Result", result);
        setUserDetail(result.data?.user)
    }

    return( 
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
        <div>{children}</div>
        </UserDetailContext.Provider>
)
}

export default Provider