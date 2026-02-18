import {StyleSheet, Pressable, FlatList} from "react-native";
import {CustomViews} from "@/components/CustomViews";
import {CustomText} from "@/components/CustomText";
import {Checkbox} from 'expo-checkbox'
import {useEffect, useState} from "react";
import {router} from "expo-router";
import {useTodos} from '@/hooks/useTodos'
import {TodoTask} from "@/components/TodoTask";

/**
 * Index page for user to perform crud operations
 * on their todos. All todos already created are listed in a
 * scroll view, with the user being able to toggle by not completed/all tasks.
 * The user can also clear all todo tasks at once with the 'clear all' button.
 */



export default function Index() {
    const [includeCompleted, setIncludeCompleted] = useState(false);
    const {todos, fetchTodos, updateTodo, deleteAllTodos} = useTodos();

    // useEffect for updating todos list when filtering by not completed/all
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
                {/* Flatlist that is used to store todos. Using the todos fetched in the useEffect,
                 Creates a TodoTask Component for each todo, allowing the user to easily delete, update, and mark
                 an individual task as complete*/}
                <FlatList
                    contentContainerStyle={Styles.scrollView}
                    data={todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <TodoTask description={item.description}
                                  createdDate={item.created_at}
                                  dueDate={item.due_date}
                                  isCompleted={item.is_completed}
                                  onDelete={() => router.push({
                                          pathname: '/DeleteTodoPage',
                                          params: {
                                              id: item.id,
                                              description: item.description
                                          }
                                      }
                                  )}
                                  onEdit={() => router.push({
                                          pathname: '/UpdateTodoPage',
                                          params: {
                                              id: item.id,
                                              initialDescription: item.description,
                                              initialDueDate: item.due_date,
                                              initialCompleted: item.is_completed.toString()
                                          }
                                      }
                                  )}
                                  onToggleComplete={() => {
                                      item.is_completed = !item.is_completed;
                                      updateTodo(item.id, item.description, item.due_date, item.is_completed);
                                      // when marking a task as complete, fetch the todos again to update,
                                      // I did this instead of updating the checkbox state directly since I wanted
                                      // to keep the db as the source of truth.
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