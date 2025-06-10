'use client'

import Link from "next/link"

type Props = { text: string, href: string }

export function AppButton({ text, href }: Props) {
    return (
        <Link
            href={href}
            className="flex h-full w-full border-2 border-white rounded-2xl items-center justify-center hover:border-red-500 transition-all duration-300 text-white"
        >
            {text}
        </Link>
    )
}