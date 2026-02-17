import {useState} from "react";
import {
    Todo,
    getAllTodos,
    deleteTodoByID,
    updateTodoByID,
    createNewTodo,
    deleteTodos, dropTables
} from "@/db/toDoRepository";


export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const fetchTodos = async (includeCompleted: boolean) => {
        setLoading(true);
        setError('');
        try {
            const todos = await getAllTodos(includeCompleted);
            setTodos(todos);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('There was an error fetching todos.');
        }
    }

    const deleteTodo = async (id: number) => {
        setLoading(true);
        setError('');
        try {
            await deleteTodoByID(id);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('There was an error deleting the todo of id: ' + id);
        }
    }

    const deleteAllTodos = async () => {
        setLoading(true);
        setError('');
        try {
            await deleteTodos();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('Error Deleting All Todos');
        }

    }

    const updateTodo = async (id: number, description: string, dueDate: number, isCompleted: boolean) => {
        setLoading(true);
        setError('');
        try {
            await updateTodoByID(id, description, dueDate, isCompleted);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('There was an error updating the todo of id: ' + id);
        }
    }

    const createTodo = async(description: string, dueDate: number) => {
        setLoading(true);
        setError('');
        try {
            await createNewTodo(description, dueDate);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('There was an error creating todo');
        }
    }

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
        loading,
        createTodo,
        deleteTodo,
        updateTodo,
        fetchTodos,
        deleteAllTodos,
        dropTable,
    }
}