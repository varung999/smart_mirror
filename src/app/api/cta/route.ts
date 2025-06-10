import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const apiKey = "64934048aea143b9b5beb959370995b6";
    const mapId = "40560";
    const url =
        `http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${apiKey}&mapid=${mapId}&outputType=JSON`;

    try {
        const response = await fetch(url);
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching CTA data:', error)
        return new NextResponse("Error fetching CTA data:", { status: 500 });
    }
}