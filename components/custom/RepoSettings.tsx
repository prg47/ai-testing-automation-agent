import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Settings2 } from "lucide-react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { userRepo } from "./WorkspaceBody"
import { useState } from "react"
import axios from "axios"

type props = {
    repo : userRepo,
    setReload : any
}

function RepoSettings({repo,setReload} : props){
    const [isOpen,setIsOpen] = useState(false)
    const [repoSettings,setRepoSettings] = useState({
        targetDomain : repo?.targetDomain || '',
        globalInstruction : repo?.globalInstruction || '',
    })

    const handleSaveSettings = async()=>{
        const result = await axios.post('/api/user-repo/settings',{
            repoId : repo.id,
            targetDomain : repoSettings.targetDomain,
            globalInstruction : repoSettings.globalInstruction
        })

        setIsOpen(false)
        setReload()

    }
    return(
        <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
        <DialogTrigger asChild>
            <Button> <Settings2 className="h-4 w-4 mr-1"/> Project Config</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">Project / Repo Settings</DialogTitle>
            <DialogDescription>
                Copy project Level defaults used during script generation and execution 
            </DialogDescription>
            </DialogHeader>
            <div>
                <div>
                    <label >APP URL/DEFAULT WEBSITE</label>
                    <Input 
                    value={repoSettings?.targetDomain}
                    onChange={(e)=>setRepoSettings({...repoSettings,targetDomain : e.target.value})}
                     placeholder="App Url" className="mt-1"
                     />
                    <p className="text-xs">The target address where automated headless browser will run test cases</p>
                </div>
                <div className="mt-4">
                    <label>GLOBAL TEST INSTRUCTIONS</label>
                    <Textarea 
                    value={repoSettings?.globalInstruction}
                    onChange={(e)=>setRepoSettings({...repoSettings,globalInstruction : e.target.value})}
                     placeholder="Instructions" 
                     className="mt-1"/>
                    <p className="text-xs">Include any authentication credentials, cookies, setup or teardown instructions.
                        These will be automatically provided to the agent
                    </p>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant={'outline'}>Cancel</Button>
                </DialogClose>
                <Button onClick={handleSaveSettings}>Save</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

export default RepoSettings