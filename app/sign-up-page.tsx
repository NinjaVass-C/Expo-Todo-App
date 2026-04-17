import {useState} from "react";
import {CustomViews} from "@/components/CustomViews";
import {CustomText} from "@/components/CustomText";
import {Pressable, StyleSheet, TextInput} from "react-native";
import {router} from "expo-router";
import {register} from "@/services/auth";

/**
 * Signup page that allows user to create a new account to manage their todos.
 *
 */
export default function SignUpPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleCreation() {
        try {
            if (password === "" || username === "") {
                setError("Please enter a valid username and password")
                return;
            }
            setError("")
            setLoading(true);
            await register(username, password);
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    }

    return (
        <CustomViews type={'default'}>
            <CustomViews type={'title'}>
                <CustomText type={'title'}>
                    Create New Account
                </CustomText>
            </CustomViews>
            <CustomViews type={'content'}>
                <CustomViews type={'inputs'}>
                    <CustomText type={'subtitle'}>
                        Please enter a username
                    </CustomText>
                    <TextInput
                        style={Styles.textInput}
                        onChangeText={input => setUsername(input)}
                        placeholder={'Enter Username'}
                    />
                </CustomViews>
                <CustomViews type={'inputs'}>
                    <CustomText type={'subtitle'}>
                        Please enter a password
                    </CustomText>
                    <TextInput
                        style={Styles.textInput}
                        onChangeText={input => setPassword(input)}
                        placeholder={'Enter Password'}
                        secureTextEntry={true}
                    />
                </CustomViews>
            </CustomViews>
            <CustomViews type={'error'}>
                <CustomText type={'error'}>
                    {error}
                </CustomText>
                <CustomText type={'default'}>
                    {loading ? 'Loading...' : ''}
                </CustomText>
            </CustomViews>
            <CustomViews type={'footer'}>
                <CustomViews type={'buttons'}>
                    <Pressable
                        onPress={() => handleCreation()}
                        style={Styles.button}
                    >
                        <CustomText type={'buttonText'}>Create Account</CustomText>
                    </Pressable>
                    <Pressable
                        style={Styles.button}
                        onPress={() => router.back()}
                    >
                        <CustomText type={'buttonText'}>Back to Login</CustomText>
                    </Pressable>
                </CustomViews>
            </CustomViews>
        </CustomViews>
    )
}
const Styles = StyleSheet.create({
    button: {
        paddingHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0004FF',
        minHeight: 40,
        borderStyle: 'solid',
        borderColor: '#000000',
        borderWidth: 1,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#000000',
        width: 300,
        justifyContent: 'center',
    },
});