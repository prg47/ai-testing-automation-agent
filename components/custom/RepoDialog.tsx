"use client"
import React, { useContext, useEffect,useMemo,useState } from "react"
import { Button } from "../ui/button"
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
import { useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "../ui/input"
import { UserDetailContext } from "@/context/UserDetailContext"

type Repo = {
  id:number,
  name: string,
  full_name: string,
  private_: boolean,
  htmlUrl: string,
  description: string,
  updated_at: string,
  language: string,
  default_branch: string,
  owner: string,
}

function RepoDialog({ setRefreshPage }: { setRefreshPage: (refresh: boolean) => void }){

  const [open, setOpen] = useState(false)
  const [repos, setRepos] = useState<Repo[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const {userDetail} = useContext(UserDetailContext)

  const router = useRouter()

    useEffect(()=>{
        if (open) getRepoList()
    },[open])

     const getRepoList = async () => {
         try {
        const result = await axios.get('/api/github/repos', {
            withCredentials: true
        })
        setRepos(result.data)
        console.log(repos)
      } catch (error: any) {
        if (error.response?.status === 401) {
            // Redirect to GitHub OAuth again
            router.push('/api/github')
        }
    }
    }

    const filteredRepoList = useMemo(()=>{
      const q = searchTerm.trim().toLowerCase()

      if(!q) return repos

      return repos.filter(r=>r.full_name.toLowerCase().includes(q))
    },[searchTerm,repos])

    const saveRepoToDB= async()=>{
      if(!selectedRepo) return
      console.log("selectedRepo:", JSON.stringify(selectedRepo, null, 2))

      const result = await axios.post('/api/user-repo', {
    repoId: selectedRepo.id,
    name: selectedRepo.name,
    full_name: selectedRepo.full_name || `${selectedRepo.owner}/${selectedRepo.name}`,
    private: false,                  // ← not in selectedRepo at all, default to false
    htmlUrl: selectedRepo.htmlUrl,   // ← was html_url, it's actually htmlUrl
    description: selectedRepo.description,
    userId: userDetail?.id,
    owner: selectedRepo.owner,
    })

      console.log(result.data)
      setOpen(false)
      setRefreshPage(true)

    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>+Add Repo</Button>
</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Repository</DialogTitle>
      <DialogDescription>
        Search and select one of your gihub repositories
      </DialogDescription>
    </DialogHeader>
    <div>
        {/*Repo List */}
        <Input placeholder="Search repository" onChange={(e)=>setSearchTerm(e.target.value)}/>
        <ul className="max-h-60 overflow-y-auto border rounded-2xl mt-2">
          {
            filteredRepoList.map((repo)=>(
              <li key={repo.id} className={`p-1.5 border-b hover:bg-blue-200
                ${selectedRepo?.id == repo.id ? 'bg-blue-200' : null}
                `}
                onClick={()=>setSelectedRepo(repo)}>{repo.full_name}</li>
            ))
          }
        </ul>
    </div>
    <DialogFooter className="flex gap-5">
    <DialogClose>Cancel</DialogClose>
    <Button onClick={()=>saveRepoToDB()}>Add</Button>
  </DialogFooter>
  </DialogContent>
  
</Dialog>
    )
}

export default RepoDialog