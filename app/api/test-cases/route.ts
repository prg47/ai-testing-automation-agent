import { db } from "@/db";
import { TestCasesTable } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const searchParams = new URL(req.url).searchParams
    const repoId = searchParams.get('repoId');

    if(!repoId){
        return new Response(JSON.stringify({error : 'repoId is required'}),{status : 400})
    }

    const result = await db.select().from(TestCasesTable).where(
        eq(TestCasesTable.repoId,repoId)
    )

    return NextResponse.json(result)
}