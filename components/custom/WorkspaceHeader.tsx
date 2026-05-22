"use client"
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Image from 'next/image';

function WorkspaceHeader() {
    const { isLoaded } = useAuth();

    return (
        <div className='flex w-full justify-between p-4'>
            <Image src={'/logo.svg'} alt='logo' width={50} height={50} />

            <ul className='flex gap-5 text-xl'>
                <li>Workspace</li>
                <li>Support</li>
            </ul>

            {/* Always mounted, just invisible until Clerk is ready */}
            <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
                <UserButton />
            </div>
        </div>
    );
}

export default WorkspaceHeader;