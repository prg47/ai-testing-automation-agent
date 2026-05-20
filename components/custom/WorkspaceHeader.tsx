import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

function WorkspaceHeader(){
    return(
        <div className='flex w-full justify-between p-4'>
            {/*Logo */}
            <Image src={'/logo.svg'} alt='logo' width={50} height={50}/>

            {/*Menu Options */}
            <ul className='flex gap-5 text-xl'>
                <li>Workspace</li>
                <li>Support</li>
            </ul>

            {/*User Button */}
            <UserButton />
        </div>
    )
}

export default WorkspaceHeader