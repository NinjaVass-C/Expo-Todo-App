import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useEffect } from "react";
import {validateToken} from "@/services/auth";

/**
 *
 * Blank page loaded on startup to check to see if the user is logged in.
 * If yes, redirect to the home page, if no, redirect to login page
 */
export default function Index() {
    useEffect(() => {
        checkAuth();
    }, []);
    // Function that checks and validates if a token exists,
    // redirects based off if valid token is or is not found
    async function checkAuth() {
        await validateToken()
        const token = await SecureStore.getItemAsync("token")
        if (token) {
            router.replace("/home")
        } else {
            router.replace("/login")
        }
    }
    return null;
}