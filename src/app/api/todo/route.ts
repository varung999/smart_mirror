import { NextRequest, NextResponse } from "next/server";
import { open, Database } from 'sqlite'
import sqlite3 from "sqlite3";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function GET(request: NextRequest) {
    try {
        if (!db) {
            db = await open({
                filename: './data/todo.db',
                driver: sqlite3.Database
            })
        }
        const todos = await db.all('SELECT * FROM todos')
        return NextResponse.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}