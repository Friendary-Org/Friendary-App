import React from 'react';
import { ScrollView, View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { TextInput, Snackbar, Text } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackButton from "../components/BackButton";
import BigAvatar from "../components/BigAvatar";
import CategoryList from '../components/CategoryList';
import BirthdateEntry from '../components/BirthdateEntry';
import SaveButton from '../components/Savebutton';

const CreateFriendScreen = ({ route, navigation }) => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [newCategories, setCategories] = React.useState([]);

    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("")

    const onDismissSnackBar = () => setSnackBarVisible(false);

    const [avatar, setAvatar] = React.useState(null)

    const save = async () => {
        if (name != "") {
            let newContact = {
                id: uuidv4(),
                name: name,
                description: description,
                avatar: avatar,
                birthday: date.toDateString() != new Date().toDateString() ? date : "",
                categories: newCategories,
            }
            let contacts = await _fetchContacts();
            contacts = [...contacts, newContact];
            try {
                await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
                setSnackBarMessage("New friend created successfully!");
                setSnackBarVisible(true);
                setTimeout(() => navigation.goBack(), 1500);
            } catch (error) {
                console.log("error retrieving data: " + error.message);
            }
        } else {
            setSnackBarMessage("Please enter a name!");
            setSnackBarVisible(true);
        }

    }

    const _fetchContacts = async () => {
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
        <KeyboardAvoidingView style={styles.containerView}
            behavior={"padding"}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.baseInfo}>
                    <BigAvatar editable setAvatar={setAvatar}/>
                    <TextInput
                        style={styles.input}
                        label="Name*"
                        mode="outlined"
                        value={name}
                        onChangeText={name => setName(name)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Description"
                        mode="outlined"
                        value={description}
                        onChangeText={desc => setDescription(desc)}
                    />
                    <BirthdateEntry date={date} setDate={setDate} editable />
                </View>
                {/* <View style={styles.lineStyle} /> */}
                <CategoryList editable newCategories={newCategories} setCategories={setCategories} navigation={navigation}/>
            </ScrollView>
            <SaveButton callback={save} />
            <BackButton navigation={navigation} />
            <Snackbar
                visible={snackBarVisible}
                onDismiss={onDismissSnackBar}>
                {snackBarMessage}
            </Snackbar>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "10%",
        backgroundColor: "#F7F6F6",
        width: "100%",
    },
    baseInfo: {
        flex: 1,
        alignContent: "flex-start",
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
    scrollView: {
        width: "100%",
        paddingBottom: 200
    }
});
export default CreateFriendScreen;