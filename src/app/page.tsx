import { Weather } from "@/components/Weather";
import { fetchWeather } from "@/services/fetchWeather";
import Link from "next/link";
import Image from "next/image"
import { useNexoPixel } from "@/services/useNeopixel";

export default async function HomePage() {
  const weather = await fetchWeather()

  return (
    <main className="h-screen p-4 bg-black flex flex-col gap-y-4">
      <div className="w-full border border-white bg-gray-200 rounded-2xl flex items-center justify-between px-16 py-1">
        <div className="flex flex-col items-center">
          <label className="text-xl">Temperature: <span className="font-semibold">{weather.current.temp}°</span></label>
        </div>
        <div className="flex items-center">
          <Image
            src={`${process.env.OPEN_WEATHER_ICON_URL}/${weather.current.weather[0].icon}.png`}
            alt={weather.current.weather[0].description}
            width={75}
            height={75}
          />
          <label>{weather.current.weather[0].description
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}</label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <Link
          href="/weather"
          className="flex h-full w-full border-2 border-white bg-gray-200 rounded-2xl items-center justify-center hover:border-red-500 transition-all duration-300"
        >
          Weather
        </Link>
        <Link
          href="/todo"
          className="flex h-full w-full border-2 border-white bg-gray-200 rounded-2xl items-center justify-center hover:border-red-500 transition-all duration-300"
        >
          Todos
        </Link>
        <Link
          href="/"
          className="flex h-full w-full border-2 border-white bg-gray-200 rounded-2xl items-center justify-center hover:border-red-500 transition-all duration-300"
        >
          App
        </Link>
        <button
          onClick={useNexoPixel}
          className="flex h-full w-full border-2 border-white bg-gray-200 rounded-2xl items-center justify-center hover:border-red-500 transition-all duration-300"
        >
          Use Nexo Pixel
        </button>
      </div>
    </main>
  );
}

