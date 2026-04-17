import {CustomViews} from "@/components/CustomViews";
import {CustomText} from "@/components/CustomText";
import {Pressable, StyleSheet, TextInput} from "react-native";
import {router} from "expo-router";
import {useState} from "react";
import {login} from "@/services/auth";

/**
 * Login page that uses auth in api to let user see their tasks
 */
export default function LoginPage() {
    async function processLogin() {
        try {
            await login(username, password)
        } catch (error: any) {
            setError(error.message)
        }
    }


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    return (
        <CustomViews type={'default'}>
            <CustomViews type={'title'}>
                <CustomText type={'title'}>
                    Login
                </CustomText>
            </CustomViews>
            <CustomViews type={'content'}>
                <CustomViews type={'inputs'}>
                    <CustomText type={'subtitle'}>
                        Please enter your username
                    </CustomText>
                    <TextInput
                        style={Styles.textInput}
                        onChangeText={input => setUsername(input)}
                        placeholder={'Enter Username'}
                    />
                </CustomViews>
                <CustomViews type={'inputs'}>
                    <CustomText type={'subtitle'}>
                        Please enter your password
                    </CustomText>
                    <TextInput
                        style={Styles.textInput}
                        onChangeText={input => setPassword(input)}
                        placeholder={'Enter Password'}
                        secureTextEntry={true}
                    />
                </CustomViews>
                <CustomViews type={'error'}>
                    <CustomText type={'error'}>
                        {error}
                    </CustomText>
                </CustomViews>
            </CustomViews>
            <CustomViews type={'footer'}>
                <CustomViews type={'buttons'}>
                    <Pressable
                        style={Styles.button}
                        onPress={() => router.push('/sign-up-page')}
                    >
                        <CustomText type={'buttonText'}>Create Account</CustomText>
                    </Pressable>
                    <Pressable
                        style={Styles.button}
                        onPress={() => processLogin()}
                    >
                        <CustomText type={'buttonText'}>Login</CustomText>
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