import * as SecureStore from "expo-secure-store"
import {router} from "expo-router";
import {apiFetch} from "@/services/api";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Various authentication functions used for
 * tracking user state, logins, etc.
 * Doesn't use apiFetch to prevent login redirects.
 */


export async function login(username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        headers: {"Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error("Invalid username or password");
    const data = await res.json();
    await SecureStore.setItemAsync("token", data.token);
    router.replace("/home")

}

export async function logout() {
    await SecureStore.deleteItemAsync("token");
    router.replace("/login")
}

export async function register(username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        headers: {"Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error("Invalid username or password");
    await login(username, password);
}

export async function validateToken() {
    try {
        const res = await apiFetch(`/auth/validate`, {method: "POST"})
        if (!res.ok) throw new Error("Invalid token");
        console.log(res)
        console.log("we good")
    } catch (error) {
        console.log("errored")
        await SecureStore.deleteItemAsync("token");
    }

}