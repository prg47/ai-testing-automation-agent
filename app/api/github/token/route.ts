import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req:NextRequest){
    const cookieStore = await cookies()
    const hasToken = Boolean(cookieStore.get('gh_token')?.value)

    return NextResponse.json({
        connected: hasToken
    })
}

