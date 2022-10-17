import { Provider as PaperProvider } from "react-native-paper";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import MainScreen from "./screens/MainScreen";
import TestScreen from "./screens/TestScreen";
import CreateCategoryScreen from "./screens/CreateCategoryScreen";
import CreateFriendScreen from "./screens/CreateFriendScreen";
import ImportFriendScreen from "./screens/ImportFriendScreen";

const Stack = createStackNavigator();

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Friends" screenOptions={{headerShown: false}}>
              <Stack.Screen name="Friends" component={MainScreen}/>
              <Stack.Screen name="Test" component={TestScreen}/>
              <Stack.Screen name="Create Category" component={CreateCategoryScreen}/>
              <Stack.Screen name="Create Friend" component={CreateFriendScreen}/>
              <Stack.Screen name="ImportFriend" component={ImportFriendScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}