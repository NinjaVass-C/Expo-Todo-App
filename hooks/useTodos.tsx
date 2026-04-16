import {useState} from "react";
import {apiFetch} from "@/services/api";

export type Todo = {
    id: number;
    userId: number;
    description: string;
    is_completed: boolean;
    due_date: number;
    created_at: number;
}
/**
 * Custom react hook for performing todoRepository actions
 * throughout the application.
 */


export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState('');


    const fetchTodos = async (includeCompleted: boolean = false) => {
        console.log(includeCompleted);
        setError('');
        try {
            const res = await apiFetch(`/tasks?include_completed=${includeCompleted}`);
            const data = await res.json()
            setTodos(data.data);
        } catch (error) {
            setError('There was an error fetching todos.');
        }
    }

    const deleteTodo = async (id: number) => {
        setError('');
        try {
            console.log("Test")
            const res = await apiFetch(`/task/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json()
        } catch (error) {
            setError('There was an error deleting the todo of id: ' + id);
        }
    }

    const deleteAllTodos = async () => {
        setError('');
        try {
            const res = await apiFetch(`/tasks`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.log(error);
            setError('Error Deleting All Todos');
        }

    }

    const updateTodo = async (id: number, description: string, dueDate: number, isCompleted: boolean) => {
        setError('');
        try {
            const res = await apiFetch(`/task/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    description: description,
                    due_date: dueDate,
                    is_completed: isCompleted,
                })
            })
        } catch (error) {
            console.log(error);
            setError('There was an error updating the todo of id: ' + id);
        }
    }

    const createTodo = async(description: string, dueDate: number) => {
        console.log(dueDate);
        setError('');
        try {
            const res = await apiFetch(`/task`, {
                method: 'POST',
                body: JSON.stringify({
                    description: description,
                    due_date: dueDate,
                })
            })
            console.log(res)
        } catch (error) {
            console.log(error);
            setError('There was an error creating todo');
        }
    }
    // debug function, does nothing in this case as app relies on external api.
    // const dropTable = async() =>  {
    //     try {
    //         await dropTables()
    //     } catch (error) {
    //         console.log(error + ' dropping error')
    //     }
    // }

    return {
        todos,
        error,
        createTodo,
        deleteTodo,
        updateTodo,
        fetchTodos,
        deleteAllTodos,
    }
}