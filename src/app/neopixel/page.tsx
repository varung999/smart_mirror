'use client'

import { showNexoPixel } from "@/services/showNexoPixel"

export default function NeopixelPage() {

    const handleClick = () => {
        showNexoPixel()
    }

    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            <button onClick={handleClick} className="bg-white h-1/3 w-1/3 rounded-2xl flex items-center justify-center">
                <div className="text-black text-2xl font-bold">
                    Show Neo Pixel
                </div>
            </button>
        </div>
    )
}