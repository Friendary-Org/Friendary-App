import { Provider as PaperProvider } from "react-native-paper";
import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainScreen from "./screens/MainScreen";
import TestScreen from "./screens/TestScreen";
import CreateCategoryScreen from "./screens/CreateCategoryScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import CreateFriendScreen from "./screens/CreateFriendScreen";
import ImportFriendScreen from "./screens/ImportFriendScreen";
import ViewFriendScreen from "./screens/ViewFriendScreen";
import EditFriendScreen from "./screens/EditFriendScreen";

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    (async () => {
      let firstBoot = await isFirstBoot();
      if (firstBoot) {
        addDefaultCategories();
        setFirstBoot();
      }
    })();

  }, []);

  const categoryList = [
    { uid: 0, name: "Likes", icon: "👍", entries: [""] },
    { uid: 1, name: "Dislikes", icon: "👎", entries: [""] },
    { uid: 2, name: "Allergies", icon: "💉", entries: [""] }
  ];

  const addDefaultCategories = async () => {
    try {
      await AsyncStorage.setItem(
        'categories',
        JSON.stringify(categoryList)
      );
      console.log("added default categories")
    } catch (error) {
      console.log("error saving data: " + error.message)
    }
  }

  const setFirstBoot = async () => {
    try {
      await AsyncStorage.setItem(
        'firstBoot',
        JSON.stringify(false)
      );
    } catch (error) {
      console.log("error saving data: " + error.message)
    }
  }

  const isFirstBoot = async () => {
    let flag = true;
    try {
      await AsyncStorage.getItem('firstBoot').then((value) => {
        if (value != null) {
          flag = false;
        }
      });
    } catch (error) {
      console.log("error retrieving data: " + error.message)
    }
    return flag;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Friends" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Friends" component={MainScreen} />
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="Create Category" component={CreateCategoryScreen} />
          <Stack.Screen name="Edit Category" component={EditCategoryScreen} />
          <Stack.Screen name="Create Friend" component={CreateFriendScreen} />
          <Stack.Screen name="ImportFriend" component={ImportFriendScreen} />
          <Stack.Screen name="View Friend" component={ViewFriendScreen} />
          <Stack.Screen name="Edit Friend" component={EditFriendScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}