import {StyleSheet, Pressable, FlatList} from "react-native";
import {CustomViews} from "@/components/CustomViews";
import {CustomText} from "@/components/CustomText";
import {Checkbox} from 'expo-checkbox'
import {useEffect, useState} from "react";
import {router} from "expo-router";
import {useTodos} from '@/hooks/useTodos'
import {TodoTask} from "@/components/TodoTask";


export default function Index() {
    const [includeCompleted, setIncludeCompleted] = useState(false);
    const {todos, error, loading, fetchTodos, updateTodo, deleteAllTodos} = useTodos();
    useEffect(() => {
        fetchTodos(includeCompleted);
    }, [fetchTodos, includeCompleted]);

    return (
        <CustomViews type={'default'}>
            <CustomViews type={'title'}>
                <CustomText type={'title'}>
                    What ToDo
                </CustomText>
            </CustomViews>
            <CustomViews type={'scrollContainer'}>
                <FlatList
                    contentContainerStyle={Styles.scrollView}
                    data={todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <TodoTask description={item.description}
                                  createdDate={item.created_at}
                                  dueDate={item.due_date}
                                  isCompleted={item.is_completed}
                                  onDelete={() => router.push('/DeleteTodoPage')}
                                  onEdit={() => router.push('/UpdateTodoPage')}
                                  onToggleComplete={() => {
                                      item.is_completed = !item.is_completed;
                                      updateTodo(item.id, item.description, item.due_date, item.is_completed);
                                      fetchTodos(includeCompleted);
                                  }}
                        />
                    )}
                />
            </CustomViews>
            <CustomViews type={'footer'}>
                <CustomViews type={'buttons'}>
                    <CustomText type={'subtitle'}>
                        Include Completed:
                    </CustomText>
                    <Checkbox
                        value={includeCompleted}
                        onValueChange={value => setIncludeCompleted(value)}
                    />
                </CustomViews>
                <CustomViews type={'buttons'}>
                    <Pressable
                        style={Styles.button}
                        onPress={() => {
                            router.push('/CreateTodoPage')
                        }}
                    >
                        <CustomText type={'buttonText'}>Create Todo</CustomText>
                    </Pressable>
                    <Pressable
                        style={Styles.button}
                        onPress={() => {
                            deleteAllTodos();
                            fetchTodos(includeCompleted);
                        }}
                    >
                        <CustomText type={'buttonText'}>Clear All</CustomText>
                    </Pressable>
                </CustomViews>
            </CustomViews>
        </CustomViews>
    );
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
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10
    }
})