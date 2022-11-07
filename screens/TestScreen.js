import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackButton from "../components/BackButton"

const TestScreen = ({navigation}) => {

    const removeContacts = async () => {
        try {
            await AsyncStorage.removeItem('contacts');
            console.log("removal successful");
        } catch (error) {
            console.log("removal failed: " + error.message)
        }
    }

    const printContacts = async () => {   
        const contacts = await AsyncStorage.getItem("contacts");
        if(contacts != null){
            JSON.parse(contacts).map((c) => (
                console.log(c)
            ));
        }else
            console.log("no contacts found")
        
    }

    const categoryList = [
        {uid: 0, name: "Likes", icon: "👍", entries: [""]},
        {uid: 1, name: "Dislikes", icon: "👎", entries: [""]},
        {uid: 2, name: "Allergies", icon: "💉", entries: [""]}
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

    const printCategories = async () => {   
        const categories = await AsyncStorage.getItem("categories");
        if(categories != null){
            JSON.parse(categories).map((c) => (
                console.log(c)
            ));
        }else
            console.log("no categories found")
        
    }

    const removeCategories = async () => {
        try {
            await AsyncStorage.removeItem('categories');
            await AsyncStorage.removeItem('firstBoot');
            console.log("removal successful");
        } catch (error) {
            console.log("removal failed: " + error.message)
        }
    }

    return(
        <View style={styles.containerView}>
            <Text variant="displaySmall">Debug Screen</Text>
            
            <Text variant="bodyLarge" style={{marginTop: "5%"}}>Contacts</Text>
            <Button onPress={() => printContacts()}>Print all Contacts</Button>
            <Button onPress={() => removeContacts()}>Delete all Contacts</Button>

            <Text variant="bodyLarge" style={{marginTop: "5%"}}>Categories</Text>
            <Button onPress={() => printCategories()}>Print all categories</Button>
            <Button onPress={() => addDefaultCategories()}>Add default categories</Button>
            <Button onPress={() => removeCategories()}>Delete all categories</Button>

            <BackButton navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: "10%"
    }
});

export default TestScreen;