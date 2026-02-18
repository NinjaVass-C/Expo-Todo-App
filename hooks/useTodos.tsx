import {useState} from "react";
import {
    Todo,
    getAllTodos,
    deleteTodoByID,
    updateTodoByID,
    createNewTodo,
    deleteTodos, dropTables
} from "@/db/toDoRepository";

/**
 * Custom react hook for performing todoRepository actions
 * throughout the application.
 */


export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState('');


    const fetchTodos = async (includeCompleted: boolean) => {
        setError('');
        try {
            const todos = await getAllTodos(includeCompleted);
            setTodos(todos);
        } catch (error) {
            console.log(error);
            setError('There was an error fetching todos.');
        }
    }

    const deleteTodo = async (id: number) => {
        setError('');
        try {
            await deleteTodoByID(id);
        } catch (error) {
            console.log(error);
            setError('There was an error deleting the todo of id: ' + id);
        }
    }

    const deleteAllTodos = async () => {
        setError('');
        try {
            await deleteTodos();
        } catch (error) {
            console.log(error);
            setError('Error Deleting All Todos');
        }

    }

    const updateTodo = async (id: number, description: string, dueDate: number, isCompleted: boolean) => {
        setError('');
        try {
            await updateTodoByID(id, description, dueDate, isCompleted);
        } catch (error) {
            console.log(error);
            setError('There was an error updating the todo of id: ' + id);
        }
    }

    const createTodo = async(description: string, dueDate: number) => {
        setError('');
        try {
            await createNewTodo(description, dueDate);
        } catch (error) {
            console.log(error);
            setError('There was an error creating todo');
        }
    }
    // debug function.
    const dropTable = async() =>  {
        try {
            await dropTables()
        } catch (error) {
            console.log(error + ' dropping error')
        }
    }

    return {
        todos,
        error,
        createTodo,
        deleteTodo,
        updateTodo,
        fetchTodos,
        deleteAllTodos,
        dropTable,
    }
}