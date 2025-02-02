// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import Profile from './Profile';

const Stack = createNativeStackNavigator();

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [deletedTasks, setDeletedTasks] = useState([]);

    // Verileri yükle
    useEffect(() => {
        const loadData = async () => {
            try {
                const savedData = await AsyncStorage.multiGet([
                    'tasks',
                    'completedTasks',
                    'deletedTasks',
                ]);

                setTasks(JSON.parse(savedData[0][1] || '[]'));
                setCompletedTasks(JSON.parse(savedData[1][1] || '[]'));
                setDeletedTasks(JSON.parse(savedData[2][1] || '[]'));
            } catch (error) {
                console.error('Data load error:', error);
            }
        };
        loadData();
    }, []);

    // Verileri kaydet
    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.multiSet([
                    ['tasks', JSON.stringify(tasks)],
                    ['completedTasks', JSON.stringify(completedTasks)],
                    ['deletedTasks', JSON.stringify(deletedTasks)],
                ]);
            } catch (error) {
                console.error('Data save error:', error);
            }
        };
        saveData();
    }, [tasks, completedTasks, deletedTasks]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home">
                    {props => (
                        <Home
                            {...props}
                            tasks={tasks}
                            setTasks={setTasks}
                            completedTasks={completedTasks}
                            setCompletedTasks={setCompletedTasks}
                            deletedTasks={deletedTasks}
                            setDeletedTasks={setDeletedTasks}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Profile">
                    {props => (
                        <Profile
                            {...props}
                            completedTasks={completedTasks}
                            deletedTasks={deletedTasks}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}