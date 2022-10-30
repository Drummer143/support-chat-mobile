import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatPage from './ChatPage/ChatPage';
import QueuePage from './QueuePage/QueuePage';
import LoginPage from './LoginPage/LoginPage';
import CreateIssuePage from './CreateIssuePage/CreateIssuePage';
import { auth } from './firebase';
import { DataSnapshot } from 'firebase/database';
import useGetData from './hooks/useGetData';

const Stack = createNativeStackNavigator();

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [authStateChanged, setAuthStateChanged] = useState(false);
    const [initialRoute, setInitialRoute] = useState('login');
    const [isDialogsChecked, setIsDialogsChecked] = useState(false);
    const [loaderText, setLoaderText] = useState('Входим в систему');
    const [points, setPoints] = useState('.');

    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prev => prev.length === 3 ? '.' : prev + '.');
        }, 750);

        return () => clearInterval(interval);
    })

    onAuthStateChanged(auth, user => {
        setUser(user);
        setAuthStateChanged(true);

        if (user) {
            setInitialRoute('create-issue');
            setLoaderText('Проверяем наличие активных проблем')
        }
    });

    useGetData(`clientsData/${user?.uid}/currentDialog`, (snap: DataSnapshot) => {
        if (authStateChanged && user) {
            if (snap?.val()) {
                setInitialRoute('chat');
            }

            setIsDialogsChecked(true);
        }
    }, true, [authStateChanged]);

    return (
        <SafeAreaProvider style={styles.wrapper}>
            {authStateChanged && isDialogsChecked ? (
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={initialRoute}
                        screenOptions={{
                            headerShown: false,
                            animation: 'fade_from_bottom'
                        }}
                    >
                        {user ? (
                            <>
                                <Stack.Screen
                                    name="create-issue"
                                    options={{ title: 'Create issue' }}
                                >
                                    {props => <CreateIssuePage {...props} user={user} />}
                                </Stack.Screen>

                                <Stack.Screen name="queue" options={{ title: 'Queue' }}>
                                    {props => <QueuePage {...props} user={user} />}
                                </Stack.Screen>

                                <Stack.Screen name="chat" options={{ title: 'Chat' }}>
                                    {props => <ChatPage {...props} user={user} />}
                                </Stack.Screen>
                            </>
                        ) : (
                            <Stack.Screen
                                name="login"
                                component={LoginPage}
                                options={{ title: 'Login' }}
                            />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <View style={styles.loader}>
                    <Text style={{ color: '#fff' }}>{loaderText}{points}</Text>
                </View>
            )}
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#000'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default App;
