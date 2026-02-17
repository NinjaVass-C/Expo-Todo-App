import {getDb} from './database';

export type Todo = {
    id: number;
    description: string;
    is_completed: boolean;
    due_date: number;
    created_at: number;
}

export type dbTodo = {
    id: number;
    description: string;
    is_completed: number;
    due_date: number;
    created_at: number;
}

export async function createNewTodo(description: string, dueDate: number) {
    const db = await getDb();
    const createdDate = Number(new Date())
    const result = await db.runAsync(`
        INSERT INTO todos(description, due_date, created_at)
        VALUES (?, ?, ?);`,
        description,
        dueDate,
        createdDate
    );
    return result.lastInsertRowId
}

export async function updateTodoByID(id: number, description: string, dueDate: number, isCompleted: boolean ) {
    const db = await getDb();
    const result = await db.runAsync(`
        UPDATE todos SET description = ?, due_date = ?, is_completed = ? WHERE id = ?`,
        description,
        dueDate,
        isCompleted,
        id
    );
}

export async function deleteTodoByID(id: number) {
    const db = await getDb();
    const result = await db.runAsync(`
        DELETE FROM todos WHERE id = ?`,
        id
    );
}

export async function getAllTodos(include_completed: boolean): Promise<Todo[]> {
    console.log(' inside function')
    const db = await getDb();
    const query =  `SELECT * FROM todos ${include_completed ? '' : 'WHERE is_completed = 0'}`
    console.log(query, include_completed);
    const dbTodos: dbTodo[] = await db.getAllAsync(
        query
    );
    console.log(dbTodos + 'test');
    return dbTodos.map(row => ({
        ...row,
        is_completed: row.is_completed == 1
    }));
}

export async function deleteTodos() {
    const db = await getDb();
    return await db.runAsync(`
    DELETE FROM todos
    `);
}

export async function dropTables() {
    const db = await getDb();
    return await db.getAllAsync(`
        drop table if exists todos
    `)
}
