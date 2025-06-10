import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data/todo.db", (err) => {
  if (err) console.error(err);
  else console.log("Database connected");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT
        )`,
    (err) => {
      if (err) console.error(err);
      db.close();
    }
  );
});
