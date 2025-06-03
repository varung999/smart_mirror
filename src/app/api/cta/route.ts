import { NextRequest, NextResponse } from 'next/server';
import xml2js from 'xml2js';

export async function GET(request: NextRequest) {
    const apiKey = "64934048aea143b9b5beb959370995b6";
    const stationId = "40380";
    const url =
        "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=64934048aea143b9b5beb959370995b6&mapid=40380";

    try {
        const response = await fetch(url);
        const res = await response.text()
        //const data = await response.json();
        console.log({res});
        const data = await xml2js.parseStringPromise(res)
        console.log({data})
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching CTA data:', error)
        return new NextResponse("Error fetching CTA data:", { status: 500 });
    }
}