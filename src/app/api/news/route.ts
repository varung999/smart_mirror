import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
        const response = await fetch(url)
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('failed to fetch the news', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}