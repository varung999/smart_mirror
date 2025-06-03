import Database from "better-sqlite3"

const db = new Database('./data/todo.db', { verbose: console.log });

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0
    )
`)

export default db
