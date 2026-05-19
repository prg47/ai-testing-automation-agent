// api/users/route.ts
import { db, users } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, name } = await req.json(); // ✅ read from body

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const userResult = await db.select().from(users).where(
            eq(users.email, email)
        );

        if (userResult.length === 0) {
            const newUser = await db.insert(users).values({
                email,
                name: name ?? 'New User'
            }).returning();

            return NextResponse.json({ user: newUser[0] });
        } else {
            return NextResponse.json({ user: userResult[0] });
        }

    } catch (e) {
        console.log("Error Creating User:", e);
        return NextResponse.json({ error: "Failed to create new user" }, { status: 500 });
    }
}