import { db, TestCasesTable } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const { title, description, targetRoute, expectedResult, testCaseId } = await req.json()

    if (!testCaseId) {
        return NextResponse.json({ error: 'testCaseId is required' }, { status: 400 })
    }

    try {
        const result = await db.update(TestCasesTable).set({
            title,
            description,
            targetRoute,
            expectedResult
        }).where(eq(TestCasesTable.id, Number(testCaseId))).returning()

        if (!result.length) {
            return NextResponse.json({ error: 'Test case not found' }, { status: 404 })
        }

        return NextResponse.json(result[0])
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Failed to update test case' }, { status: 500 })
    }
}