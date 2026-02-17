import * as SQLite from "expo-sqlite"

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
    if (!db) {
        db = await SQLite.openDatabaseAsync('todos.db')
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS todos(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NOT NULL,
                is_completed BOOLEAN DEFAULT 0,
                due_date TIMESTAMP DEFAULT NULL,
                created_at TIMESTAMP DATETIME DEFAULT (unixepoch())
                );`,
        );
    }
    return db;
}