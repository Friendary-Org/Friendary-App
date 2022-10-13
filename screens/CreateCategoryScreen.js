import React from "react";
import { TextInput, HelperText } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import SaveButton from "../components/Savebutton";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateCategoryScreen = () => {
    const [categoryName, setCategoryName] = React.useState("");

        const [icon, setIcon] = React.useState("");
    
        const onChangeText = text => setIcon(text);
    
        const validateText = () => {
            let regex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/;
            return !regex.test(icon);
        }
        const _saveCategory = async () => {
            let categoryList = _fetchCategoryList();
            let newCategory = {uid: Math.max(...categoryList.map(o => o.uid)), name: categoryName, icon: icon, entries: [""]};
        //     try {
        //         await AsyncStorage.setItem('categoryName', JSON.stringify(categoryName));
        //         console.log("Saved Category")
        //     } catch (error) {
        //         console.log("error while saving category: " + error.message)
        //     }
            }
        const _fetchCategoryList = async () => {
            try {
                await AsyncStorage.getItem('categories').then((value) => {
                    return JSON.parse(value);
                });
            } catch (error) {
                console.log("error retrieving data: " + error.message)
            }
            return []
        }

        

return(
    <React.Fragment>
         <View style={style.header}>
        <Text variant="headlineMedium">Create Category</Text>
        </View>
       
        <View style={style.TextInput}>
        <TextInput
        label="Category Name"
        value={categoryName}
        onChangeText={categoryName => setCategoryName(categoryName)}
        mode="outlined"
        />
        </View>

        <View>
            <TextInput
            style={{marginTop: "10%"}}
                label="Set Emoji"
                mode="outlined"
                value={icon}
                onChangeText={onChangeText}
            />
            <HelperText type="error" visible={validateText()}>
                Can only be a single emoji
            </HelperText>
        </View>
        <SaveButton callback={_saveCategory}></SaveButton>

    </React.Fragment>
);
}

const style = StyleSheet.create({
    TextInput: {
        marginTop: 20,
    },
    header:{
        marginTop: 50,
        alignItems: "center",
    },
    Emoji: {
        marginTop: 20,
    },
    FieldsText:{
        fontSize: 20,
    },
    });

export default CreateCategoryScreen;