import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Queue from './Queue/Queue';
import StartScreen from "./StartPage/StartScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="create-issue"
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
        >
          <Stack.Screen name="create-issue" component={StartScreen} options={{ title: 'Create issue' }} />
          <Stack.Screen name="queue" component={Queue} options={{ title: 'Queue' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;