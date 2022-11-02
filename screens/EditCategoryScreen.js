import React, { useEffect } from "react";
import { TextInput, HelperText, Text, Snackbar, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
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

    const saveCategory = async () => {
        if (categoryName == "") {
            setSnackBarMessage("Please enter a category name!");
            setSnackBarVisible(true);
        } else if (validateText()) {
            setSnackBarMessage("Please enter a valid category icon!");
            setSnackBarVisible(true);
        } else {
            oldCategory.entries =[""];
            let newCategoryList = categoryList.map((cat) => {
                if(cat.uid===oldCategory.uid){
                    cat.name = categoryName;
                    cat.icon = icon;
                    return cat
                }else{
                    return cat
                }
            });
            
            try {
                await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList));
                setSnackBarMessage("Category edited successfully!");
                setSnackBarVisible(true);
                setfabDisabled(true);
                setTimeout(() => navigation.goBack(), 1500);
            } catch (error) {
                console.log("error while saving category: " + error.message)
            }
            
            await fetchData();
            let test = friendList.map((friend)=>{
                if(friend.categories.includes(oldCategory.uid)){
                    console.log("MATCH")
                }
            })
        }
    }

    const fetchData = async () => {
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
        fetchCategoryList();
        return () => {
            DeviceEventEmitter.removeAllListeners("event.createdCategory")
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
                        onPress={() => deleteFriend()}
                        textColor="red"
                        style={[styles.deleteButton, Platform.OS == "ios" ? { width: "100%" } : { width: "40%" }]}
                        disabled={fabDisabled ? true : undefined}>
                        Delete Category
            </Button>
            <SaveButton callback={saveCategory} disabled={fabDisabled ? true : undefined}/>
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