import * as SecureStore from "expo-secure-store"
import {router} from "expo-router";
import {apiFetch} from "@/services/api";
import {wipeCache} from "@/services/cache";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Various authentication functions used for
 * tracking user state, logins, etc.
 */


export async function login(username: string, password: string) {
    const controller = new AbortController();
    // shorter than apiFetch timeout, since signin should not take long
    const timeout = setTimeout(() => controller.abort(), 3000);
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            headers: {"Content-Type": "application/json" },
            signal: controller.signal,
            method: "POST",
            body: JSON.stringify({ username, password }),
        })
        clearTimeout(timeout)
        if (!res.ok) throw new Error("Invalid username or password");
        const data = await res.json();
        await SecureStore.setItemAsync("token", data.token);
        await SecureStore.setItemAsync("username", data.username);
        router.replace("/home")
    } catch (error: any) {
        throw new Error("Server could not process sign in");
    }


}

export async function logout() {
    await wipeCache();
    await SecureStore.deleteItemAsync("token");
    router.replace("/login")
}

export async function register(username: string, password: string) {
    const controller = new AbortController();
    // shorter than apiFetch timeout, since signup should not take long
    const timeout = setTimeout(() => controller.abort(), 3000);
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            headers: {"Content-Type": "application/json" },
            signal: controller.signal,
            method: "POST",
            body: JSON.stringify({ username, password }),
        })
        clearTimeout(timeout)
        if (!res.ok) throw new Error("Invalid username or password");
        await login(username, password);
    } catch (error: any) {
        throw new Error("Sign up could not be processed");
    }

}

export async function validateToken() {
    try {
        const res = await apiFetch(`/auth/validate`, {method: "POST"})
        if (!res.ok) throw new Error("Invalid token");
        console.log(res)
    } catch (error) {
        await SecureStore.deleteItemAsync("token");
    }

}