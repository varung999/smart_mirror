import db from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title } = body;

        if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

        const statement = db.prepare('INSERT INTO todos (title) VALUES (?)');
        const info = statement.run(title);
        console.log('Insert result:', info);

        return NextResponse.json(
            { message: 'Todo created', id: info.lastInsertRowid, title },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating todo:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Invalid JSON or server error' },
            { status: error instanceof SyntaxError ? 400 : 500 }
        );
    }
}