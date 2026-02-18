import { CustomViews } from "@/components/CustomViews"
import {Pressable, StyleSheet, Text} from 'react-native'
import {router, useLocalSearchParams} from "expo-router";
import {CustomText} from "@/components/CustomText";
import {useTodos} from "@/hooks/useTodos";

export default function DeleteTodoPage() {
    const { id, description } = useLocalSearchParams<{
        id: string;
        description: string;
    }>();
    const {deleteTodo} = useTodos();
    function validateDeletion() {
        deleteTodo(Number(id));
        router.push('/');
    }


    return (
        <CustomViews type={'default'}>
            <CustomViews type={'title'}>
                <CustomText>
                    Deleting Todo
                </CustomText>
            </CustomViews>
            <CustomViews type={'content'}>
                <CustomText type={'subtitle'}>
                    Are you sure you want to delete {description}?
                </CustomText>
            </CustomViews>
            <CustomViews type={'footer'}>
                <CustomViews type={'buttons'}>
                    <Pressable
                        style={Styles.button}
                        onPress={() => validateDeletion()}
                    >
                        <CustomText type={'buttonText'}>Delete Todo</CustomText>
                    </Pressable>
                    <Pressable
                        style={Styles.button}
                        onPress={() => {
                            router.push('/')
                        }}
                    >
                        <CustomText type={'buttonText'}>Back Home</CustomText>
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
    }
})