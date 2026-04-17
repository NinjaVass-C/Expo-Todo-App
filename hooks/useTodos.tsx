import {useCallback, useState} from "react";
import {apiFetch} from "@/services/api";
import {getCache, setCache, wipeCache} from "@/services/cache";

export type Todo = {
    id: number;
    userId: number;
    description: string;
    is_completed: boolean;
    due_date: number;
    created_at: number;
}
/**
 * Custom react hook that performs crud operations from
 * the external api for todo tasks.
 */

const CACHE_KEY = "todos";
export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const fetchTodos = useCallback(async (includeCompleted: boolean = false) => {
        setError('');
        setLoading(true)
        const cached: Todo[] = await getCache(CACHE_KEY);
        if (cached) {
            let filtered: Todo[] = cached
            if (!includeCompleted) {
                filtered = cached.filter(t => !t.is_completed)
            }
            setTodos(filtered)
            setLoading(false)
            return
        }
        try {
            const res = await apiFetch(`/tasks`);
            const data = await res.json();
            let all: Todo[] = data.data
            let filtered
            if (!includeCompleted) {
                filtered = all.filter(t=> !t.is_completed)
                setTodos(filtered);
            } else {
                setTodos(data.data)
            }
            await setCache(CACHE_KEY, data.data)
        } catch (error) {
            setTodos([])
            setError('There was an error fetching todos.');
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTodo = async (id: number) => {
        setError('');
        try {
            setLoading(true);
            await apiFetch(`/task/${id}`, {
                method: 'DELETE',
            });
            const cache: Todo[] = await getCache(CACHE_KEY);
            if (cache) {
                const updated = cache.filter(t => t.id !== id);
                await setCache(CACHE_KEY, updated);
                setTodos(updated);
            }
        } catch (error) {
            setError('There was an error deleting the todo');
            throw new Error("Deletion error")
        } finally {
            setLoading(false);
        }
    }

    const deleteAllTodos = async () => {
        setError('');
        try {
            setLoading(true);
            await apiFetch(`/tasks`, {
                method: 'DELETE',
            });
            await wipeCache()
        } catch (error) {
            setError('Error Deleting All Todos');
        } finally {
            setLoading(false);
        }

    }

    const updateTodo = async (id: number, description: string, dueDate: number, isCompleted: boolean) => {
        setError('');
        try {
            setLoading(true);
            const res = await apiFetch(`/task/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    description: description,
                    due_date: dueDate,
                    is_completed: isCompleted,
                })
            })
            const data = await res.json();
            const updatedTodo = data.data[0]
            const cached: Todo[] = await getCache(CACHE_KEY);
            if (cached) {
                const updated = cached.map(t => t.id === updatedTodo.id ? updatedTodo : t);
                await setCache(CACHE_KEY, updated);
                setTodos(updated);
            }
        } catch (error) {
            setError('There was an error updating todo');
            throw new Error("Update Error")
        } finally {
            setLoading(false);
        }
    }

    const createTodo = async(description: string, dueDate: number) => {
        setError('');
        try {
            setLoading(true);
            const res = await apiFetch(`/task`, {
                method: 'POST',
                body: JSON.stringify({
                    description: description,
                    due_date: dueDate,
                })
            })
            const data = await res.json();
            const createdTodo = data.data[0]
            const cached = await getCache(CACHE_KEY);
            if (cached) {
                await setCache("todos", [createdTodo, ...cached]);
            }
        } catch (error) {
            setError('There was an error creating todo');
            throw new Error("Creation error")
        } finally {
            setLoading(false);
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
    }
}