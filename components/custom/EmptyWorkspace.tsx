import React from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { Link } from "lucide-react"


function EmptyWorkspace(){
    return(
        <div className="flex flex-col mt-10 items-center justify-center">
            <Image src={'/repo.png'} alt="repo" width={70} height={70} />
            <h2 className="font-medium text-2xl mt-5 mb-4">No Repository Connected </h2>
            <p className="text-center mx-10">Connect your Github account and add repos to generate and test cases</p>
            
            <Button className="mt-5"> <Link className="h-4 w-4 mr-2"/> Connect Repo</Button>

        </div>
    )
}

export default EmptyWorkspace