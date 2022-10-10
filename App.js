import { Provider as PaperProvider } from "react-native-paper";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import MainScreen from "./screens/MainScreen";
import TestScreen from "./screens/TestScreen";
import CreateCategoryScreen from "./screens/CreateCategoryScreen";
const Stack = createStackNavigator();


export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="CreateCategory" screenOptions={{headerShown: false}}>
              <Stack.Screen name="Friends" component={MainScreen}/>
              <Stack.Screen name="Test" component={TestScreen}/>
              <Stack.Screen name="CreateCategory" component={CreateCategoryScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}