import {View, StyleSheet, Text, Pressable} from "react-native";
import {Checkbox} from 'expo-checkbox'
import {CustomText} from "@/components/CustomText";

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
    const convertedCreatedDate = new Date(createdDate);
    const convertedDueDate = new Date(dueDate);
    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.textContainer}>
                <Text>{description}</Text>
                <Text>Created At: {convertedCreatedDate.toDateString()}</Text>
                <Text>Due Date: {convertedDueDate.toDateString()}</Text>
            </View>
            <View style={Styles.buttonContainer}>
                <Pressable
                    style={Styles.button}
                    onPress={onDelete}>
                    <CustomText type={'buttonText'}>Delete</CustomText>
                </Pressable>
                <Pressable
                    style={Styles.button}
                    onPress={onEdit}>
                    <Text>Edit</Text>
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
        backgroundColor: '#00fff7',
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