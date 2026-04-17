import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import {useEffect, useState} from "react";
import {validateToken} from "@/services/auth";
import {CustomViews} from "@/components/CustomViews";
import {CustomText} from "@/components/CustomText";

/**
 *
 * Blank page loaded on startup to check to see if the user is logged in.
 * If yes, redirect to the home page, if no, redirect to login page
 */
export default function Index() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);
    // Function that checks and validates if a token exists,
    // redirects based off if valid token is or is not found
    async function checkAuth() {
        setLoading(true)
        await validateToken()
        const token = await SecureStore.getItemAsync("token")
        if (token) {
            setLoading(false)
            router.replace("/home")
        } else {
            setLoading(false)
            router.replace("/login")
        }
    }
    return (
        <>
            {loading ? (
                <CustomViews type={"default"}>
                    <CustomText type={"default"}>
                        loading...
                    </CustomText>
                </CustomViews>

                ) : null
            }
        </>
    );
}