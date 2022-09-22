import { Provider as PaperProvider } from "react-native-paper";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import MainScreen from "./screens/MainScreen";
import TestScreen from "./screens/TestScreen"
const Stack = createStackNavigator();


export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Friends">
              <Stack.Screen name="Friends" component={MainScreen}/>
              <Stack.Screen name="Test" component={TestScreen} options={{headerLeft: ()=> null,}}/>
          </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}