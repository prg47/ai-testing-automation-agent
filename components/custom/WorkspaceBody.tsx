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
import RepoDialog, { Repo } from "./RepoDialog"
import { refresh } from "next/cache"
import toast from "react-hot-toast"
import UserRepoList from "./UserRepoList"

export type userRepo = {
    id:number,
  name: string,
  fullName: string,
  private_: boolean,
  htmlUrl: string,
  description: string,
  updated_at: string,
  language: string,
  defaultBranch: string,
  owner: string,
}



function WorkspaceBody(){
    
    const {userDetail} = useContext(UserDetailContext)

    const router = useRouter()

    const [hasGithubConnection, setHasGithubConnection] = useState(false)

    const [userRepoList,setUserRepoList] = useState<userRepo[]>([])

    useEffect(()=>{
        getGithubUserToken()
    },[])

    useEffect(()=>{
        userDetail && getUserAddedRepoList()
    },[userDetail])

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

    const getUserAddedRepoList = async () => {
        try {
            const result = await axios.get(
            `/api/user-repo?userId=${userDetail?.id}`
            );

            console.log(result.data);
            setUserRepoList(result.data.data)

            toast.success("Repositories fetched successfully");
        } catch (error: any) {
            console.error(error);

            // Backend error message
            const errorMessage =
            error?.response?.data?.error ||
            "Failed to fetch repositories";

            toast.error(errorMessage);
        }
        };
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
                    : <RepoDialog setRefreshPage={(refresh : boolean)=>getUserAddedRepoList()}/>}
                </div>
            </Card>

            {userRepoList.length === 0 ? <Card className="mt-1.5">
                <CardContent>
                <EmptyWorkspace/> 
                </CardContent>
                </Card>:
                <UserRepoList repoList={userRepoList}/>}
                
            
        </div>
    )
}

export default WorkspaceBody