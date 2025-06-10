import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import OpenAI from 'openai'
import dotenv from 'dotenv'
import ollama from 'ollama'
import fs from 'fs'

const keyword = 'dave'
const systemPrompt = `   
    Your job is to respond with **only one word**, chosen from this list:
    - weather
    - todo
    - home
    - cta
    - news
    - unknown

    Do not say anything else. Do not explain. Do not include a reason. Do not say "I think..." or "The user likely meant...".

    Respond with exactly one of: weather, todo, home, cta, news, or unknown.
    
    Do not explain. Do not think. Do not write anything else. Just respond with a single word from the list.

`;

export async function POST(request: NextRequest) {
    try {
        dotenv.config()
        const formData = await request.formData();
        const file = formData.get('file') as File
        if (!file) return new NextResponse('Internal Server Error', { status: 500 });

        const message = await transcribeAudio(file)
        if (!message || !message.toLowerCase().includes(keyword))
            return NextResponse.json({ message: 'unknown' });

        const messages = [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: message
            }
        ]

        const response = await ollama.chat({
            model: 'qwen2.5:latest',
            messages: messages,
            stream: false,
            think: false,
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'navigate',
                        description: 'returns a destination to navigate to based off of the enum given. you will not open the app, just return the destination. For example, if the user says "open the weather app", you will return "weather".',
                        parameters: {
                            type: 'object',
                            properties: {
                                destination: {
                                    type: 'string',
                                    description: 'the destination to navigate to',
                                    enum: ['weather', 'todo', 'home', 'cta'],
                                },
                            },
                            required: ['destination'],
                        }
                    }
                }
            ]
        })

        console.log(response.message.content)

        return NextResponse.json({ message: (response.message.content || 'unknown') })

    } catch (error) {
        console.error('Error navigating:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

async function transcribeAudio(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(file.name, buffer);
    const audioFile = fs.createReadStream(file.name)

    const openai = new OpenAI()
    const transcription = await openai.audio.translations.create({
        file: audioFile,
        model: 'whisper-1',
    })
    await unlink(file.name);
    console.log(transcription.text)
    return transcription.text
}