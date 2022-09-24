import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { Avatar, IconButton } from 'react-native-paper';

const avatarSize = 128;

const AddFriendAvatar = ({avatar}) => {
    if (avatar== null){
        return (
            <View style={styles.avatarContainer}>
                    <Avatar.Icon size={avatarSize} icon="account-circle" style={styles.icon}/>
                    <IconButton
                        style={styles.upload}
                        icon="plus-circle-outline"
                        size={avatarSize/4}
                        onPress={() => console.log('Pressed')}
                    />
            </View>
        );
    }else{
        return (
            <View style={styles.avatarContainer}>
                    <Avatar.Image size={avatarSize} source={avatar}/>
                    <IconButton
                        style={styles.upload}
                        icon="pencil-outline"
                        size={avatarSize/4}
                        onPress={() => console.log('Pressed')}
                    />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: "#80D8F7",
    },
    upload: {
        position: "absolute",
        marginLeft: avatarSize*0.65,
        marginTop: avatarSize*0.65,
        backgroundColor: "#80D8F7"
    },
    avatarContainer: {
        flexDirection: "row"
    },
});

export default AddFriendAvatar;