import { db,repositories } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
   const { repoId, userId, name, full_name, private: private_, htmlUrl, description, owner } = await req.json()
   

    
    //@ts-ignore
   const result = await db.insert(repositories).values({
    repoId,
    userId,
    name,
    fullName: full_name || name,
    private: !!private_,
    htmlUrl,        // ← camelCase to match schema
    description,
    owner
}).returning()

   return NextResponse.json(result[0])
}