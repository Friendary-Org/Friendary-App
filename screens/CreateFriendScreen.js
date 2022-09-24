import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import BackButton from "../components/BackButton"
import AddFriendAvatar from "../components/AddFriendAvatar"

const CreateFriendScreen = ({route,navigation}) => {
    return(
        <View style={styles.containerView}>
            <AddFriendAvatar/>
            <AddFriendAvatar avatar={require("../assets/test-avatar.jpg")}/>
            <BackButton navigation={navigation}/>
        </View>  
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CreateFriendScreen;