import {Pressable, StyleSheet, Text, TextInput} from 'react-native'
import {CustomViews} from "@/components/CustomViews";
import {CustomText} from "@/components/CustomText";
import {useEffect, useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker'
import {router} from "expo-router";
import {useTodos} from '@/hooks/useTodos'

/**
 * Page used for creating todos, allows user to enter
 * a description and due date, then a 'create todo' button
 * to submit the todo. Also has a button to go back home
 *
 *
 */


export default function CreateTodoPage() {
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [showDateSelector, setShowDateSelector] = useState<boolean>(false);
    const [pageError, setPageError] = useState<string>('');
    const {createTodo, error, loading} = useTodos();
    /**
     * Validate the todo before submitting it,
     * since due date is default set to the current time
     * only the description needs to be validated.
     */
    async function validateTodo() {
        setPageError('');
        if (description === '') {
            setPageError('Please enter a valid description')
            return;
        }
        try {
            setDescription(description);
            await createTodo(description, dueDate.getTime());
            router.back()
        } catch {
            // useTodos handle this error
        }
    }

    return (
        <CustomViews type={'default'}>
            <CustomViews type={'title'}>
                <CustomText type={'title'}>
                    Creating Todo
                </CustomText>
            </CustomViews>
            <CustomViews type={'content'}>
                <CustomViews type={'inputs'}>
                    <CustomText type={'subtitle'}>
                        Please enter a Description
                    </CustomText>
                    <TextInput
                        style={Styles.textInput}
                        onChangeText={input => setDescription(input)}
                        placeholder={'Enter Description'}
                    />
                </CustomViews>
                <CustomViews type={'inputs'}>
                    <Pressable
                        style={Styles.button}
                        onPress={() => {
                            setShowDateSelector(true)
                        }}
                    >
                        <CustomText type={'buttonText'}>Click to enter due date</CustomText>
                    </Pressable>
                    {showDateSelector && (<DateTimePicker
                            value={dueDate}
                            mode={'date'}
                            onChange={(event, selectedDate) => {
                                setShowDateSelector(false)
                                if (selectedDate) {
                                    setDueDate(selectedDate)
                                }
                            }}
                        />
                    )
                    }
                    <CustomText type={'subtitle'}>
                        The current date selected is {dueDate.toDateString()}
                    </CustomText>
                </CustomViews>
                <CustomViews type={'error'}>
                    <CustomText type={'error'}>
                        {pageError ? pageError: error}
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
                        onPress={() => validateTodo()}
                    >
                        <CustomText type={'buttonText'}>Create Todo</CustomText>
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
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#000000',
        width: 300,
        justifyContent: 'center',
    },
});