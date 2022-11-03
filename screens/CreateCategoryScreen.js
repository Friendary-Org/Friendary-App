import React, { useEffect } from "react";
import { TextInput, HelperText, Text, Snackbar } from "react-native-paper";
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import SaveButton from "../components/Savebutton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from "../components/BackButton";

const CreateCategoryScreen = ({ route, navigation }) => {
    const [categoryList, setcategoryList] = React.useState([]);
    const [categoryName, setCategoryName] = React.useState("");
    const [icon, setIcon] = React.useState("");
    const onChangeText = text => setIcon(text);

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
                setSnackBarMessage("New category created successfully!");
                setSnackBarVisible(true);
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
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.containerView}>
                <Text style={styles.header} variant="headlineMedium">Create new category</Text>
                <TextInput
                    style={styles.input}
                    label="Category Name*"
                    value={categoryName}
                    onChangeText={categoryName => setCategoryName(categoryName)}
                    mode="outlined"
                />
                <TextInput
                    style={styles.input}
                    label="Set Emoji"
                    mode="outlined"
                    value={icon}
                    onChangeText={onChangeText}
                />
                <HelperText type="error" visible={validateText()}>
                    Can only be a single emoji
                </HelperText>
                <SaveButton callback={saveCategory}></SaveButton>
                <BackButton navigation={navigation} />
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
        alignSelf: "center"
    },
    input: {
        width: "80%",
        marginTop: "2%"
    },
    containerView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F6F6",
        width: "100%",
        paddingBottom: "20%"
    },
});

export default CreateCategoryScreen;