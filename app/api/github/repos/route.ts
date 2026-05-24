import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("gh_token")?.value;
    

    if (!token) {
        return NextResponse.json(
            { error: "Github token not found" },
            { status: 401 }
        );
    }

    const allRepos = [];
    let page = 1;

    while (true) {
        const res = await fetch(
            `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );

        // check github response
        if (!res.ok) {
            const errorData = await res.json();
    
    // Clear the bad cookie and force re-auth
        if (res.status === 401) {
        const response = NextResponse.json(
            { error: "Token expired, please reconnect GitHub" },
            { status: 401 }
        );
        response.cookies.delete("gh_token"); // ← clear stale token
        return response;
    }

    return NextResponse.json(
        { error: "Failed to fetch repos", details: errorData },
        { status: res.status }
    );
        }

        const repos = await res.json();

        // stop pagination
        if (repos.length === 0) break;

        allRepos.push(...repos);

        page++;
    }

    return NextResponse.json(
        allRepos.map((r: any) => ({
             id: r.id,
    name: r.name,
    full_name: r.full_name || `${r.owner.login}/${r.name}`,
    private: r.private,   // ← add this, it was mapped as private_ before
    htmlUrl: r.html_url,
    description: r.description,
    updated_at: r.updated_at,
    language: r.language,
    default_branch: r.default_branch,
    owner: r.owner.login,
        }))
    );
}