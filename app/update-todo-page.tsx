import {Pressable, StyleSheet, TextInput} from 'react-native'
import {CustomViews} from "@/components/CustomViews";
import {CustomText} from "@/components/CustomText";
import DateTimePicker from "@react-native-community/datetimepicker";
import {router, useLocalSearchParams} from "expo-router";
import {useState} from "react";
import {useTodos} from "@/hooks/useTodos";
import {Checkbox} from "expo-checkbox";

/**
 * Page used for updating todos, when clicking on the update
 * button for a todo, sends the id, description, due date, and completed status,
 * allowing the user to modify all aspects of the todo. The user can then press 'update todo'
 * to update the record in the db, then return back to home. Return to home button is also present to cancel.
 *
 *
 */


export default function UpdateTodoPage() {
    const {id, initialDescription, initialDueDate, initialCompleted} = useLocalSearchParams<{
        id: string;
        initialDescription: string;
        initialDueDate: string;
        initialCompleted: string;
    }>();

    const [description, setDescription] = useState<string>(initialDescription);
    const [dueDate, setDueDate] = useState<Date>(new Date(initialDueDate));
    const [completed, setCompleted] = useState<boolean>(initialCompleted === 'true');
    const [showDateSelector, setShowDateSelector] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const {updateTodo} = useTodos();

    const validateTodo = async () => {
        setError('');
        if (description !== '') {
            setDescription(description);
            await updateTodo(Number(id), description, dueDate.getTime(), completed);
            router.back()
        } else {
            setError('Please enter a description for the todo.')
        }
    }

    return (
        <CustomViews type={'default'}>
            <CustomViews type={'title'}>
                <CustomText type={'title'}>
                    Editing Todo
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
                        placeholder={description}
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
                    <CustomText type={'subtitle'}>
                        Toggle Task Completion Status
                    </CustomText>
                    <Checkbox
                        value={completed}
                        onValueChange={(completed) => {
                            setCompleted(completed)
                        }}
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
                        onPress={() => validateTodo()}
                    >
                        <CustomText type={'buttonText'}>Update Todo</CustomText>
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