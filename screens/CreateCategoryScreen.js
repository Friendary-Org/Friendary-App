import React from "react";
import { TextInput, HelperText } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import SaveButton from "../components/Savebutton";

const CreateCategoryScreen = () => {
    const [categoryName, setCategoryName] = React.useState("");

        const [text, setText] = React.useState("");
    
        const onChangeText = text => setText(text);
    
        const validateText = () => {
            var regex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/;
            return !regex.test(text);
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
                value={text}
                onChangeText={onChangeText}
            />
            <HelperText type="error" visible={validateText()}>
                Can only be a single emoji
            </HelperText>
        </View>
        <SaveButton/>

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