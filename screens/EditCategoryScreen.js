import React, { useEffect } from "react";
import { TextInput, HelperText, Text, Snackbar, Button } from "react-native-paper";
import { StyleSheet, View, Alert } from "react-native";
import { debounce } from 'lodash';
import {DeviceEventEmitter} from "react-native";

import SaveButton from "../components/SaveButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from "../components/BackButton";

const EditCategoryScreen = ({ route, navigation }) => {
    const [categoryList, setcategoryList] = React.useState([]);
    const oldCategory = route.params.category;
    const [categoryName, setCategoryName] = React.useState(oldCategory.name);
    const [icon, setIcon] = React.useState(oldCategory.icon);
    const onChangeText = text => setIcon(text);
    const [friendList, setFriendList] = React.useState([]);
    const [fabDisabled, setfabDisabled] = React.useState(false);


    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const onDismissSnackBar = () => setSnackBarVisible(false);

    const validateText = () => {
        let regex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/;
        return !regex.test(icon);
    }

    const editCategory = async () => {
        if (categoryName == "") {
            setSnackBarMessage("Please enter a category name!");
            setSnackBarVisible(true);
        } else if (validateText()) {
            setSnackBarMessage("Please enter a valid category icon!");
            setSnackBarVisible(true);
        } else {
            oldCategory.entries =[""];
            let newCategory = {};
            let newCategoryList = categoryList.map((cat) => {
                if(cat.uid===oldCategory.uid){
                    cat.name = categoryName;
                    cat.icon = icon;
                    return cat
                }else{
                    return cat
                }
            });
            
            let newFriendList = friendList.map((friend)=>{
                let editCategory = friend.categories.find((cat) => cat.uid === oldCategory.uid);
                if(editCategory !== undefined){  
                    newCategory = editCategory;
                    newCategory.name = categoryName;
                    newCategory.icon = icon;
                    console.log(newCategory)
                    friend.categories[friend.categories.findIndex((cat) => cat==editCategory)] = newCategory
                }
                return friend
            })

            try {
                await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList));
                await AsyncStorage.setItem('contacts', JSON.stringify(newFriendList));
                DeviceEventEmitter.emit("event.changedCategory", newCategory);
                setSnackBarMessage("Category edited successfully!");
                setSnackBarVisible(true);
                setfabDisabled(true);
                setTimeout(() => navigation.goBack(), 1500);
            } catch (error) {
                console.log("error while saving category: " + error.message)
            }
            
        }
    }

    const deleteCategory = async () => {
        let value = await confirm();
        if(value == "true"){
            let newCategoryList = categoryList.filter((cat) => cat.uid!==oldCategory.uid);
        let newFriendList = friendList.map((friend) => {
            let friendCategories = friend.categories.filter((cat) => cat.uid!==oldCategory.uid);
            friend.categories = friendCategories;
            return friend
        });
        try {
            await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList));
            await AsyncStorage.setItem('contacts', JSON.stringify(newFriendList));
            DeviceEventEmitter.emit("event.deletedCategory", oldCategory);
            setSnackBarMessage("Category deleted successfully!");
            setSnackBarVisible(true);
            setfabDisabled(true);
            setTimeout(() => navigation.goBack(), 1500);
        } catch (error) {
            console.log("error while saving category: " + error.message)
        }
        }
    }

    const confirm = async () => new Promise((resolve) => {
        Alert.alert(
            "Delete Category",
            `Do you want to completly delete this category? \n This category will be removed from all friends! \n This can't be reverted`,
            [
                {
                    text: "cancel",
                    onPress: () => resolve("false"),
                    style: "cancel"
                },
                {
                    text: "delete",
                    onPress: () => resolve("true"),
                    style: "destructive"
                }
            ]
        );
    });

    const fetchFriendList = async () => {
        try {
            const contacts = await AsyncStorage.getItem('contacts');
            if (contacts != null)
                setFriendList(JSON.parse(contacts))
            else
                setFriendList([])
        } catch (error) {
            console.log("error retrieving data: " + error.message)
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
        fetchFriendList();
        fetchCategoryList();
        return () => {
            DeviceEventEmitter.removeAllListeners("event.changedCategory");
            DeviceEventEmitter.removeAllListeners("event.deletedCategory")
          };
    }, []);

    return (
        <View style={styles.containerView}>
            <Text style={styles.header} variant="headlineMedium">Edit category</Text>
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
            <Button icon="trash-can-outline"
                        mode="outlined"
                        onPress={() => deleteCategory()}
                        textColor="red"
                        style={[styles.deleteButton, Platform.OS == "ios" ? { width: "100%" } : { width: "40%" }]}
                        disabled={fabDisabled ? true : undefined}>
                        Delete Category
            </Button>
            <SaveButton callback={editCategory} disabled={fabDisabled ? true : undefined}/>
            <BackButton navigation={navigation} disabled={fabDisabled ? true : undefined}/>
            <Snackbar
                visible={snackBarVisible}
                onDismiss={onDismissSnackBar}>
                {snackBarMessage}
            </Snackbar>
        </View>
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
    deleteButton: {
        borderColor: "red",
        alignSelf: "center",
        marginTop: "2%"
    }
});

export default EditCategoryScreen;