import { db,repositories } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";


export async function POST(req : NextRequest){
   const { repoId, userId, name, full_name, private: private_, htmlUrl, description, owner,defaultBranch } = await req.json()
   

    
    //@ts-ignore
   const result = await db.insert(repositories).values({
    repoId,
    userId,
    name,
    fullName: full_name || name,
    private: !!private_,
    htmlUrl,        // ← camelCase to match schema
    description,
    owner,
    defaultBranch
}).returning()

   return NextResponse.json(result[0])
}


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const parsedUserId = Number(userId);

    console.log("userId : ",parsedUserId)

    if (isNaN(parsedUserId)) {
      return NextResponse.json(
        { error: "Invalid userId" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(repositories)
      .where(eq(repositories.userId, parsedUserId));

    // No repositories found
    if (result.length === 0) {
      return NextResponse.json(
        { message: "No repositories found", data: [] },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET repositories error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}