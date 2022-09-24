import { Provider as PaperProvider } from "react-native-paper";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import MainScreen from "./screens/MainScreen";
import TestScreen from "./screens/TestScreen";
import CreateFriendScreen from "./screens/CreateFriendScreen";
const Stack = createStackNavigator();

import {
  en,
  de,
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en', en)
registerTranslation('de', de)
registerTranslation('en-GB', enGB)

export default function App() {

  return (
    <PaperProvider theme={{ version: 2 }}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Friends" screenOptions={{headerShown: false}}>
              <Stack.Screen name="Friends" component={MainScreen}/>
              <Stack.Screen name="Test" component={TestScreen}/>
              <Stack.Screen name="Create Friend" component={CreateFriendScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}