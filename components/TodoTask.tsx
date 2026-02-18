import {View, StyleSheet, Text, Pressable} from "react-native";
import {Checkbox} from 'expo-checkbox'
import {CustomText} from "@/components/CustomText";

/**
 * TodoTask components used to render individual todo tasks,
 * receives information about the todo item, and also contains
 * inputs that trigger functions to perform crud operations on
 * each individual task. This is used in index to delete, update, and
 * mark a task as completed.
 *
 */



// Custom type used for the component.
type TodoTaskProps = {
    description: string;
    isCompleted: boolean;
    dueDate: number;
    createdDate: number;
    onToggleComplete?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
};

export function TodoTask({description, isCompleted, dueDate, createdDate, onToggleComplete, onDelete, onEdit}: TodoTaskProps) {
    // convert the date timestamp to a date, allowing it to be converted to a readable format
    const convertedCreatedDate = new Date(createdDate).toDateString();
    const convertedDueDate = new Date(dueDate).toDateString();
    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.textContainer}>
                <CustomText type={'subtitle'}>{description}</CustomText>
                <Text>Created At: {convertedCreatedDate}</Text>
                <Text>Due Date: {convertedDueDate}</Text>
            </View>
            <View style={Styles.buttonContainer}>
                <Pressable
                    style={[Styles.button, { backgroundColor: '#cd0101' }]}
                    onPress={onDelete}>
                    <CustomText type={'buttonText'}>
                        Delete
                    </CustomText>
                </Pressable>
                <Pressable
                    style={Styles.button}
                    onPress={onEdit}>
                    <CustomText type={'buttonText'}>
                        Edit
                    </CustomText>
                </Pressable>
                <Checkbox
                    value={isCompleted}
                    onValueChange={onToggleComplete}
                />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    textContainer: {
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    buttonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        alignItems:'center',
        padding: 5,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00d595',
        borderStyle: 'solid',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 5,
        minWidth: '25%'
    },
    mainContainer: {
        paddingVertical: 20
    }
})