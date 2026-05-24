"use client"
import { UserDetailContext } from "@/context/UserDetailContext"
import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import EmptyWorkspace from "./EmptyWorkspace"
import { CardContent } from "../ui/card"
import { useRouter } from "next/navigation"
import axios from "axios"
import RepoDialog from "./RepoDialog"
import { refresh } from "next/cache"


function WorkspaceBody(){
    
    const {userDetail} = useContext(UserDetailContext)

    const router = useRouter()

    const [hasGithubConnection, setHasGithubConnection] = useState(false)

    useEffect(()=>{
        getGithubUserToken()
    },[])

    const getGithubUserToken = async()=>{
        try {
            const result = await axios.get('/api/github/token'); 
            setHasGithubConnection(Boolean(result.data.connected));
        } catch {
            setHasGithubConnection(false);
        }
    }

    const onAddRepo = async()=>{
        router.push('/api/github')
    }
    return(
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-4xl font-medium">Workspace</h2>
            </div>

            <Card className="mt-5 flex justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-5">
                <Image src={'/github.png'} alt='github' width={40} height={40} loading="eager"/>
                <h2 className="text-lg">Connect Github & Add Repository</h2>
                </div>
                <div>
                    {!hasGithubConnection? <Button onClick={onAddRepo}>Setup</Button>
                    : <RepoDialog setRefreshPage={(refresh : boolean)=>console.log(refresh)}/>}
                </div>
            </Card>

            <Card className="mt-1.5">
                <CardContent>
                <EmptyWorkspace/>
                </CardContent>
            </Card>
        </div>
    )
}

export default WorkspaceBody