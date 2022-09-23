import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { Avatar, IconButton } from 'react-native-paper';

const avatarSize = 128;

const AddFriendAvatar = ({avatarSource}) => {
    if (avatarSource== null){
        return (
            <React.Fragment>
                    <Avatar.Icon size={avatarSize} icon="account-circle" style={styles.icon}/>
                    <IconButton
                        style={styles.upload}
                        icon="plus-circle-outline"
                        size={avatarSize/2.5}
                        onPress={() => console.log('Pressed')}
                    />
            </React.Fragment>
        );
    }else{
        return (
            <React.Fragment>
                    <Avatar.Image size={avatarSize} source={avatarSource}/>
                    <IconButton
                        style={styles.upload}
                        icon="pencil-outline"
                        size={avatarSize/2.5}
                        onPress={() => console.log('Pressed')}
                    />
            </React.Fragment>
        );
    }
    
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: "#80D8F7",
    },
    upload: {
        position: "absolute",
        marginLeft: avatarSize*0.75,
        marginTop: avatarSize*0.75,
    }
});

export default AddFriendAvatar;