import { CustomViews } from "@/components/CustomViews"
import {Pressable, StyleSheet, Text} from 'react-native'
import {router, useLocalSearchParams} from "expo-router";
import {CustomText} from "@/components/CustomText";
import {useTodos} from "@/hooks/useTodos";
import {useState} from "react";


/**
 * Page used for confirming a deletion
 * of a todo, displays the description,
 * allowing user to validate their option.
 * The user can either delete the todo, or
 * return back to the home page
 */

export default function DeleteTodoPage() {
    // get params sent by the index router call
    const { id, description } = useLocalSearchParams<{
        id: string;
        description: string;
    }>();
    const {deleteTodo, loading, error} = useTodos();
    // Helper function to delete todo and go back to home in one go
    const validateDeletion = async () => {
        try {
            await deleteTodo(Number(id));
            router.back()
        } catch {
            // useTodos handles this error
        }

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
                <CustomViews type={'error'}>
                    <CustomText type={'error'}>
                        {error}
                    </CustomText>
                    <CustomText type={'default'}>
                        {loading ? 'Loading...' : ''}
                    </CustomText>
                </CustomViews>
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
                            router.back()
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