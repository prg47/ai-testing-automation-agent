import { TestCase } from "./UserRepoList"
import { Checkbox } from "../ui/checkbox"
import { Badge } from "../ui/badge"
import { Play, RefreshCw, SettingsIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
type Props = {
    testCases : TestCase[],
    onReload : any
}

function TestCaseList({testCases,onReload} : Props){
    const  [selectedTestCases, setSelectedTestCases] = useState<TestCase[]>([])

    const handleSelectedTestCase = (checked : boolean | string,testCase : TestCase)=>{
        if(checked){
            setSelectedTestCases((prev)=>[...prev,testCase])
        }else{
            setSelectedTestCases((prev)=>prev.filter(item=>item.id !== testCase.id))
        }
    }
    return (
        <div>
            <div className="flex items-center justify-between">
            <h2 className="font-medium">Generated Test Cases</h2>
            <Button size={'sm'} onClick={()=>onReload(testCases?.[0].repoId)}> <RefreshCw className="h-3 w-3 mr-1"/> Refresh </Button>
            </div>
            <div className="border rounded-md mt-4">
                {testCases.map((testCase,index)=>(
                    <div key={index} className="p-4 border-b flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                        <Checkbox
                                checked={selectedTestCases?.some(
                                    (item: any) => item.id === testCase?.id
                                )}
                                onCheckedChange={(checked) =>
                                    handleSelectedTestCase(checked, testCase)
                                }
                                />
                        <div>
                            <h2>{testCase?.title}</h2>
                            <p className="text-xs">{testCase?.description}</p>
                        </div>
                        </div>

                        <div className="gap-4 flex">
                            <Badge variant={'secondary'}>{testCase.type}</Badge>
                            <Badge variant={'secondary'}>Pending</Badge>
                            <Button size={'icon'} variant={'outline'}>
                                <SettingsIcon className="h-4 w-4"/>
                            </Button>
                            
                        </div>
                    </div>
                ))}
                <div className="p-4 flex items-center justify-between">
                    <h2>
                        Run Selected TestCase
                    </h2>
                    <Button disabled={selectedTestCases.length === 0}><Play className="h-4 w-4 mr-2"/> Run </Button>
                </div>
            </div>
        </div>
    )
}

export default TestCaseList