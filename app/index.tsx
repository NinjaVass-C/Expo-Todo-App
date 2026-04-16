import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useEffect } from "react";
import {validateToken} from "@/services/auth";

export default function Index() {
    useEffect(() => {
        checkAuth();
    }, []);
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