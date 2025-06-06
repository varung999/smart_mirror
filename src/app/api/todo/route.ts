import db from "@/services/db";
import { TodoType } from "@/types/todo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const stmt = db.prepare('SELECT * FROM todos')
        const data = stmt.all() as TodoType[];
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}