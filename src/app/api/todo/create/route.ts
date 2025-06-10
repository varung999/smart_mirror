import sqlite3 from "sqlite3";
import { open, Database } from 'sqlite'
import { NextRequest, NextResponse } from 'next/server';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title } = body;

        if (!db) {
            db = await open({
                filename: './data/todo.db',
                driver: sqlite3.Database
            })
        }

        const info = await db.run('INSERT INTO todos (title) VALUES (?)', [title])

        // if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

        // const statement = db.prepare('INSERT INTO todos (title) VALUES (?)');
        // const info = statement.run(title);
        // console.log('Insert result:', info);

        return NextResponse.json(
            { message: 'Todo created', id: info.lastID, title },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating todo:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Invalid JSON or server error' },
            { status: error instanceof SyntaxError ? 400 : 500 }
        );
    }
}