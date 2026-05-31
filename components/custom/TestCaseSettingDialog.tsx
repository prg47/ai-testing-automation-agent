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
import { Input } from "../ui/input"

import { Button } from "../ui/button"
import { SettingsIcon } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { TestCase } from "./UserRepoList"
import { useState } from "react"
import { title } from "process"
import axios from "axios"

type props = {
    testCase?: TestCase,
    setReload : any
}


function TestCaseSettingDialog({testCase , setReload} : props){
    const [formTestCase, setFormTestCase] = useState({
        title : testCase?.title || '',
        description : testCase?.description || '',
        targetRoute : testCase?.targetRoute || '',
        expectedResult : testCase?.expectedResult || ''
    })
    
    const handleInputChange = (fieldName : string,value : string)=>{
            setFormTestCase((prev)=>({
                ...prev,
                [fieldName] : value
            }))
    }

    const updateCase = async()=>{
           const result =  await axios.post('/api/test-cases/settings',{
            ...formTestCase,
            testCaseId : testCase?.id
           }) 
           console.log(result?.data)
           setReload(testCase?.repoId)
    }

    return(
        <Dialog>
  <DialogTrigger asChild>
    <Button size={'icon'} variant={'outline'}>
                                <SettingsIcon className="h-4 w-4"/>
                            </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Testing Requirements</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>

    <div>
        <div>
            <label>TEST TITLE</label>
            <Input value={formTestCase.title} 
            onChange={(e)=>handleInputChange('title',e.target.value)}
            placeholder="Test Title" className="mt-1"/>
        </div>
        <div className="mt-5">
            <label>DESCRIPTION / ACTION</label>
            <Textarea 
            value={formTestCase.description} 
            onChange={(e)=>handleInputChange('description',e.target.value)}
            placeholder="Description" className="mt-1"/>
        </div>
        <div className="mt-5">
            <label>TARGET ROUTE</label>
            <Input value={formTestCase.targetRoute} 
            onChange={(e)=>handleInputChange('targetRoute',e.target.value)}
             placeholder="Target Route" className="mt-1"/>
        </div>
        <div className="mt-5">
            <label>EXPECTED RESULT</label>
            <Textarea value = {formTestCase.expectedResult} 
            onChange={(e)=>handleInputChange('expectedResult',e.target.value)}
            placeholder="Expected Result" className="mt-1"/>
        </div>
    </div>
    <DialogFooter>
        <DialogClose>Cancel</DialogClose>
        <Button onClick = {updateCase} variant={'outline'}>Update Case</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    )
}

export default TestCaseSettingDialog