import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

import BackButton from "../components/BackButton"
import AddFriendAvatar from "../components/AddFriendAvatar"

const CreateFriendScreen = ({route,navigation}) => {
    const [text, setText] = React.useState("");
    const [inputDate, setInputDate] = React.useState(inputDate);


    return(
        <View style={styles.containerView}>
            <View style={styles.baseInfo}>
                <AddFriendAvatar editable/>
                <TextInput
                    style={styles.input}
                    label="Name*"
                    mode="outlined"
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <DatePickerInput
                    style={styles.input}
                    locale="en"
                    label="Birthdate"
                    value={inputDate}
                    onChange={(inputDate) => setInputDate(inputDate)}
                    mode="outlined"
                    editable="false"
                />
            </View>
            
            <Divider/>
            <BackButton navigation={navigation}/>
        </View>  
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "10%",
    },
    baseInfo:{
        width:"70%",
        maxHeight: "40%",
        flex:1,
        alignContent: "center",
        alignItems: "center"
    },
    input: {
        width: 250
    }
});

export default CreateFriendScreen;