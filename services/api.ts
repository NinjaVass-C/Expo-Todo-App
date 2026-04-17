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
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    // api has stated user is not logged in
    if (res.status === 401) {
        await SecureStore.deleteItemAsync("token");
        // redirect to login
        router.replace("/login");
        throw new Error("Unauthorized");
    }

    return res;
}