import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
    useEffect(() => {
        checkAuth();
    }, []);
    async function checkAuth() {
        const token = await SecureStore.getItemAsync("token")
        if (token) {
            router.replace("/home")
        } else {
            router.replace("/login")
        }
    }







    return null;
}