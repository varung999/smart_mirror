import { fetchWeather } from "@/services/fetchWeather";
import Image from "next/image"
import { DetectSpeech } from "@/components/DetectSpeech";
import { AppButton } from "@/components/AppButton";

export const dynamic = "force-dynamic"
export default async function HomePage() {
  const weather = await fetchWeather()

  return (
    <DetectSpeech>
      <main className="h-screen p-4 bg-black text-white flex flex-col gap-y-4">
        <div className="w-full border border-white rounded-2xl flex items-center justify-between px-16 py-1">
          <div className="flex flex-col items-center text-white">
            <label className="text-xl">Temperature: <span className="font-semibold">{weather.current.temp}°</span></label>
          </div>
          <div className="flex items-center">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`}
              alt={weather.current.weather[0].description ?? ""}
              width={75}
              height={75}
            />
            <label>
              {weather.current.weather[0].description
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <AppButton text="Weather" href="/weather" />
          <AppButton text="Todo" href="/todo" />
          <AppButton text="CTA" href="/cta" />
          <AppButton text="News" href="/news" />
        </div>
      </main>
    </DetectSpeech>
  );
}

