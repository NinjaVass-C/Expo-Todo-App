import * as SecureStore from "expo-secure-store"
import {router} from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(username: string, password: string) {
    console.log(`${API_URL}/auth/login`)
    const res = await fetch(`${API_URL}/auth/login`, {
        headers: {"Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ username, password }),
    })
    console.log("TEST AFTER")
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