'use client'

type Props = {
    temp: number;
    minTemp?: number;
    maxTemp?: number;
    description: string;
}

export function Weather({ temp, minTemp, maxTemp, description }: Props) {
    return (
        <div className="w-full border border-white bg-gray-200 rounded-2xl flex items-center justify-between px-16 py-2">
            <div className="flex flex-col items-center">
                <label className="text-xl">Temperature: <span className="font-semibold">{temp}°F</span></label>
                <div className="flex gap-x-4">
                    {/* <label className="text-sm">Min: {minTemp}</label>
                    <label className="text-sm">Max: {maxTemp}</label> */}
                </div>
            </div>
            <label>{description}</label>
        </div>
    )
}