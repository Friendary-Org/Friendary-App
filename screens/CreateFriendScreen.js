import React from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackButton from "../components/BackButton";
import BigAvatar from "../components/BigAvatar";
import SaveButton from '../components/SaveButton';
import CategoryList from '../components/CategoryList';
import BirthdateEntry from '../components/BirthdateEntry';

const CreateFriendScreen = ({ route, navigation }) => {
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [newCategories, setCategories] = React.useState([]);

    const save = async () => {
        let newContact = {
            id: uuidv4(), 
            name: name, 
            description: "no description",
            avatar: "default",
            birthday: date,
            categories: newCategories,
        }
        let contacts = await _fetchContacts();
        contacts = [...contacts, newContact];
        try {
            await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
            console.log("Saved new contact")
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }

        console.log(friend);
    }

    const _fetchContacts = async() => {
        try {
            const contacts = await AsyncStorage.getItem('contacts');
            if (contacts != null)
                return JSON.parse(contacts);
            else 
                return []
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    return (
        <React.Fragment>
            <ScrollView contentContainerStyle={styles.containerView}>
                <View style={styles.baseInfo}>
                    <BigAvatar editable />
                    <TextInput
                        style={styles.input}
                        label="Name*"
                        mode="outlined"
                        value={name}
                        onChangeText={name => setName(name)}
                    />
                    <BirthdateEntry date={date} setDate={setDate} editable/>
                </View>
                {/* <View style={styles.lineStyle} /> */}
                <CategoryList editable newCategories={newCategories} setCategories={setCategories}/>
            </ScrollView>
            <SaveButton callback={save} />
            <BackButton navigation={navigation} />
        </React.Fragment>

    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "10%",
        backgroundColor: "#F7F6F6",
    },
    baseInfo: {
        width: "100%",
        flex: 1,
        alignContent: "center",
        alignItems: "center"
    },
    input: {
        width: "80%"
    },
    lineStyle: {
        borderWidth: 0.5,
        width: "80%",
        borderColor: 'black',
        margin: 0,
    },
});
export default CreateFriendScreen;