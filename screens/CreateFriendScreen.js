import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Divider, TextInput } from 'react-native-paper';

import BackButton from "../components/BackButton"
import AddFriendAvatar from "../components/AddFriendAvatar"

const CreateFriendScreen = ({route,navigation}) => {
    const [text, setText] = React.useState("");

    return(
        <View style={styles.containerView}>
            <AddFriendAvatar editable/>
            <TextInput
                style={styles.input}
                label="Name*"
                mode="outlined"
                value={text}
                onChangeText={text => setText(text)}
            />
            <Divider/>

            <BackButton navigation={navigation}/>
        </View>  
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width:"80%"
    }
});

export default CreateFriendScreen;