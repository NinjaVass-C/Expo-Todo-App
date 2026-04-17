import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Dynamic fetch method that is used to interact with the api. Can take
 * in different options, methods, and headers, allowing it to be used
 * for all api endpoints.
 * @param path
 * @param options
 */

export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = await SecureStore.getItemAsync("token");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
        const res = await fetch(`${API_URL}${path}`, {
            ...options,
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        clearTimeout(timeout);
        if (res.status === 401) {
            await SecureStore.deleteItemAsync("token");
            // redirect to login
            router.replace("/login");
        }
        if (!res.ok) throw new Error("Something went wrong");
        return res;
    } catch (error) {
        console.log("TEST HERE")
        throw new Error("Request to server has timed out")
    }
}