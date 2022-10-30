import { useState } from 'react';
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

const Stack = createNativeStackNavigator();

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [authStateChanged, setAuthStateChanged] = useState(false);

    onAuthStateChanged(auth, user => {
        setUser(user);
        setAuthStateChanged(true);
    });

    return (
        <SafeAreaProvider style={styles.wrapper}>
            {authStateChanged ? (
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={user ? 'chat' : 'login'}
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
                    <Text style={{ color: '#fff' }}>Loading...</Text>
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
