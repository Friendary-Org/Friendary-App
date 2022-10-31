import React, { useEffect } from 'react';
import { ScrollView, View, StyleSheet, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput, Snackbar, Text, Button } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import BackButton from "../components/BackButton";
import BigAvatar from "../components/BigAvatar";
import CategoryList from '../components/CategoryList';
import BirthdateEntry from '../components/BirthdateEntry';
import SaveButton from '../components/SaveButton';

const EditFriendScreen = ({ route, navigation }) => {
    const friend = route.params.friend;
    const [name, setName] = React.useState(friend.name);
    const [description, setDescription] = React.useState(friend.description);
    const [date, setDate] = React.useState(new Date());
    const [newCategories, setCategories] = React.useState(friend.categories);

    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("")

    const onDismissSnackBar = () => setSnackBarVisible(false);

    const [avatar, setAvatar] = React.useState(null)

    const save = async () => {
        if (name != "") {
            let changedFriend = {
                id: friend.id,
                name: name,
                description: description,
                avatar: avatar,
                birthday: date.toDateString() != new Date().toDateString() ? date : "",
                categories: newCategories,
            }
            let contacts = await _fetchContacts();

            contacts = contacts.map((c) => {
                if (c.id == changedFriend.id) {
                    return changedFriend
                } else {
                    return c
                }
            });

            try {
                await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
                setSnackBarMessage("Friend edited successfully!");
                setSnackBarVisible(true);
                changedFriend.birthday = changedFriend.birthday.toString();
                setTimeout(() => navigation.navigate("View Friend", { friend: changedFriend }), 1500);
            } catch (error) {
                console.log("error retrieving data: " + error.message);
            }
        } else {
            setSnackBarMessage("Please enter a name!");
            setSnackBarVisible(true);
        }

    }

    const confirm = async () => new Promise((resolve) => {
        Alert.alert(
            "Delete Friend",
            `Do you want to delete ${friend.name} from your list? This can't be reverted`,
            [
                {
                    text: "cancel",
                    onPress: () => resolve("false"),
                    style: "cancel"
                },
                { text: "delete", onPress: () => resolve("true") }
            ]
        );
    });

    const deleteFriend = async () => {
        let value = await confirm();

        if (value == "true") {
            let contacts = await _fetchContacts();

            contacts = contacts.filter(c => c.id != friend.id);

            try {
                await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
                setSnackBarMessage("Friend deleted successfully!");
                setSnackBarVisible(true);
                setTimeout(() => navigation.popToTop(), 1500);
            } catch (error) {
                console.log("error retrieving data: " + error.message);
            }
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

    useEffect(() => {
        if (friend.birthday != "") {
            setDate(new Date(friend.birthday))
        }
        if (friend.avatar != null) {
            setAvatar(friend.avatar)
        }
    }, []);

    return (
        <React.Fragment>
            <KeyboardAvoidingView style={styles.containerView}
                behavior={"padding"}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.baseInfo}>
                        <BigAvatar editable setAvatar={setAvatar} preloadedAvatar={friend.avatar} />
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
                    <View style={styles.lineStyle} />
                    <CategoryList editable newCategories={newCategories} setCategories={setCategories} navigation={navigation} />
                    <Button icon="trash-can-outline"
                        mode="outlined"
                        onPress={() => deleteFriend()}
                        textColor="red"
                        style={[styles.deleteButton, Platform.OS == "ios" ? { width: "100%" } : { width: "40%" }]}>
                        Delete Friend
                    </Button>
                </ScrollView>


            </KeyboardAvoidingView>
            <SaveButton callback={save} />
            <BackButton navigation={navigation} />
            <Snackbar
                visible={snackBarVisible}
                onDismiss={onDismissSnackBar}>
                {snackBarMessage}
            </Snackbar>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    containerView: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#F7F6F6",
        width: "100%",
        height: "100%"
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
        marginTop: "2%",
        alignSelf: "center"
    },
    scrollView: {
        width: "100%",
        paddingBottom: 200
    },
    deleteButton: {
        borderColor: "red",
        alignSelf: "center",
        marginTop: "2%"
    }
});
export default EditFriendScreen;