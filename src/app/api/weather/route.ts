import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const route = `https://api.openweathermap.org/data/3.0/onecall?lat=41.8781&lon=-87.6298&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`
        const response = await fetch(route)
        const data = await response.json() as OpenWeatherResponse
        return NextResponse.json(data)
    } catch (error) {
        console.error('request failed', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}