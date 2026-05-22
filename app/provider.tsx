"use client"
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { user, isLoaded } = useUser();
    const [userDetail, setUserDetail] = useState<any>();

    useEffect(() => {
        if (isLoaded && user) {
            CreateNewUser();
        }
    }, [isLoaded, user]);

    const CreateNewUser = async () => {
        try {
            const result = await axios.post('/api/users', {
                email: user?.primaryEmailAddress?.emailAddress,
                name: user?.fullName
            });
            setUserDetail(result.data?.user);
        } catch (e) {
            console.error("Failed to create user", e);
        }
    };

    // ✅ Always render children — never block on Clerk state here
    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            {children}
        </UserDetailContext.Provider>
    );
}

export default Provider