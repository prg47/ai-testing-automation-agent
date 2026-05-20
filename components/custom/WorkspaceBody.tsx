"use client"
import { UserDetailContext } from "@/context/UserDetailContext"
import React, { useContext } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import EmptyWorkspace from "./EmptyWorkspace"
import { CardContent } from "../ui/card"


function WorkspaceBody(){
    const {userDetail} = useContext(UserDetailContext)
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
                    <Button>Install</Button>
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