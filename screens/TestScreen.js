import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackButton from "../components/BackButton"

const TestScreen = ({navigation}) => {

    const fabian = {name: 'Fabian', age: 28}

    const _storeData = async () => {
        try {
            await AsyncStorage.setItem(
                'personFabian',
                JSON.stringify(fabian)
            );
            console.log("save successful")
        } catch (error) {
            console.log("error saving data: " + error.message)
        }
    }

    const _fetchData = async () => {
        try {
            const value = await AsyncStorage.getItem('personFabian');
            if (value !== null)
                console.log(JSON.parse(value));
            else 
                console.log("not entry for given key")
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    const _removeData = async () => {
        try {
            await AsyncStorage.removeItem('personFabian');
            console.log("removal successful");
        } catch (error) {
            console.log("removal failed: " + error.message)
        }
    }

    const _printAllEntriesFromAsyncStorage = async () => {   
        const keys = await AsyncStorage.getAllKeys();
        const entries = await AsyncStorage.multiGet(keys);
        console.log(entries);
    }

    const categoryList = [
        {uid: 0, name: "Likes", icon: "👍", entries: [""]},
        {uid: 1, name: "Dislikes", icon: "👎", entries: [""]},
        {uid: 2, name: "Allergies", icon: "💉", entries: [""]}
    ];

    const _addDefaultCategories = async () => {
        try {
            await AsyncStorage.setItem(
                'categories',
                JSON.stringify(categoryList)
            );
            console.log("save successful")
        } catch (error) {
            console.log("error saving data: " + error.message)
        }
    }

    return(
        <View style={styles.containerView}>
            <Text>These are really awesome Details!</Text>

            <Button onPress={() => _storeData()}>Save</Button>
            <Button onPress={() => _fetchData()}>Fetch</Button>
            <Button onPress={() => _removeData()}>Remove</Button>
            <Button onPress={() => _printAllEntriesFromAsyncStorage()}>Print All Entries</Button>
            <Button onPress={() => console.log("save pressed")}>Delete</Button>
            <Button onPress={() => _addDefaultCategories()}>Add default categories</Button>

            <BackButton navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default TestScreen;