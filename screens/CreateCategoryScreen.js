import React, { useEffect } from "react";
import { TextInput, HelperText, Text, Snackbar } from "react-native-paper";
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from "react-native"
import { debounce } from 'lodash';
import { DeviceEventEmitter } from "react-native";

import SaveButton from "../components/SaveButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from "../components/BackButton";

const CreateCategoryScreen = ({ route, navigation }) => {
    const [categoryList, setcategoryList] = React.useState([]);
    const [categoryName, setCategoryName] = React.useState("");
    const [icon, setIcon] = React.useState("");
    const onChangeText = text => setIcon(text);
    const [fabDisabled, setfabDisabled] = React.useState(false);
    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const onDismissSnackBar = () => setSnackBarVisible(false);

    const validateText = () => {
        let regex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/;
        return !regex.test(icon);
    }

    const saveCategory = async () => {
        if (categoryName == "") {
            setSnackBarMessage("Please enter a category name!");
            setSnackBarVisible(true);
        } else if (validateText()) {
            setSnackBarMessage("Please enter a valid category icon!");
            setSnackBarVisible(true);
        } else {
            let newUid = Math.max(...categoryList.map(o => o.uid)) + 1;
            let newCategory = { uid: newUid, name: categoryName, icon: icon, entries: [""] };
            try {
                await AsyncStorage.setItem('categories', JSON.stringify([...categoryList, newCategory]));
                DeviceEventEmitter.emit("event.createdCategory", newCategory);
                setSnackBarMessage("New category created successfully!");
                setSnackBarVisible(true);
                setfabDisabled(true);
                setTimeout(() => navigation.goBack(), 1500);
            } catch (error) {
                console.log("error while saving category: " + error.message)
            }
        }
    }

    const fetchCategoryList = async () => {
        try {
            const value = await AsyncStorage.getItem('categories').then((value) => {
                if (value != null) {
                    setcategoryList(JSON.parse(value));
                } else {
                    setcategoryList([])
                }
            });
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
        return []
    }

    useEffect(() => {
        fetchCategoryList();
        return () => {
            DeviceEventEmitter.removeAllListeners("event.createdCategory")
        };
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.containerView}>
                <Text style={styles.header} variant="headlineMedium">Create new category</Text>
                <TextInput
                    style={styles.input}
                    label="Name*"
                    value={categoryName}
                    onChangeText={categoryName => setCategoryName(categoryName)}
                    mode="outlined"
                />
                <TextInput
                    style={styles.input}
                    label="Emoji*"
                    mode="outlined"
                    value={icon}
                    onChangeText={onChangeText}
                />
                <HelperText type="error" visible={validateText()}>
                    Can only be a single emoji
                </HelperText>
                <SaveButton callback={saveCategory} disabled={fabDisabled ? true : undefined} />
                <BackButton navigation={navigation} disabled={fabDisabled ? true : undefined} />
                <Snackbar
                    visible={snackBarVisible}
                    onDismiss={onDismissSnackBar}>
                    {snackBarMessage}
                </Snackbar>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    header: {
        alignSelf: "center",
        marginTop: "60%"
    },
    input: {
        width: "80%",
        marginTop: "2%"
    },
    containerView: {
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F6F6",
        width: "100%",
        paddingBottom: "30%"
    },
});

export default CreateCategoryScreen;