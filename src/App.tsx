import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged, User } from 'firebase/auth';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Queue from './QueuePage/Queue';
import LoginPage from './LoginPage/LoginPage';
import StartScreen from "./StartPage/StartScreen";
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
            initialRouteName={user ? 'create-issue' : 'login'}
            screenOptions={{
              // headerShown: false,
              animation: 'fade_from_bottom'
            }}
          >
            {
              user ? (
                <>
                  <Stack.Screen name="create-issue" options={{ title: 'Create issue' }}>
                    {props => <StartScreen {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="queue" component={Queue} options={{ title: 'Queue' }} />
                </>
              )
                : <Stack.Screen name='login' component={LoginPage} options={{ title: 'Login' }} />
            }
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <View style={styles.loader}>
          <Text style={{ color: '#fff' }}>Loading...</Text>
        </View>
      )}
    </SafeAreaProvider>
  )
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
})

export default App;