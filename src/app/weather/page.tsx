import { fetchWeather } from "@/services/fetchWeather"
import Image from "next/image"
import { Fragment } from "react"

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

export default async function WeatherPage() {
    const weather = await fetchWeather()

    return (
        <div className="p-4 bg-black flex flex-col items-center gap-y-8 px-8">
            <div className="flex flex-col items-center">
                <label className="text-white font-thin text-5xl">Chicago</label>
                <label className="text-white font-thin text-lg">
                    {weather.current.weather[0].description
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                </label>
                <Image
                    src={`${process.env.OPEN_WEATHER_ICON_URL}/${weather.current.weather[0].icon}.png`}
                    alt={weather.current.weather[0].description}
                    width={125}
                    height={125}
                />
                <h1 className="text-white text-8xl font-thin">{weather.current.temp.toFixed(0)}°</h1>
                <div className="text-white flex items-center gap-x-2">
                    <label className="text-lg">H: {weather.daily[0].temp.max.toFixed(0)}°</label>
                    <label className="text-lg">L: {weather.daily[0].temp.min.toFixed(0)}°</label>
                </div>
            </div>
            <div className="flex flex-row gap-x-1 overflow-x-scroll">
                {weather.hourly.slice(36).map(weather => (
                    <div key={weather.dt} className="text-white border border-white flex flex-col items-center p-1 rounded-xl">
                        <label className="whitespace-nowrap">
                            {new Date(weather.dt * 1000).toLocaleTimeString([], { hour: 'numeric' })}
                        </label>
                        {/* <label>{weather.weather[0].description}</label> */}
                        <Image
                            src={`${process.env.OPEN_WEATHER_ICON_URL}//${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                            width={100}
                            height={100}
                        />
                        <label>{weather.temp.toFixed(0)}°</label>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 text-white w-full">
                {weather.daily.map(weather => {
                    const date = new Date(weather.dt * 1000);
                    const day = days[date.getDay()];
                    return (
                        <Fragment key={weather.dt}>
                            <div className="p-1">{day}</div>
                            <Image
                                src={`${process.env.OPEN_WEATHER_ICON_URL}/${weather.weather[0].icon}.png`}
                                alt={weather.weather[0].description}
                                width={50}
                                height={50}
                            />
                            <div className="flex items-center gap-x-4 justify-end">
                                <div>{weather.temp.max.toFixed(0)}</div>
                                <div>{weather.temp.min.toFixed(0)}</div>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}