import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { Avatar, IconButton } from 'react-native-paper';

const avatarSize = 128;

const BigAvatar = (props) => {
    const {avatar,editable} = props;
    return (
        <View style={styles.avatarContainer}>
                <Avatar.Image size={avatarSize} source={avatar!==undefined?avatar:require("../assets/test-avatar.jpg")}/>
                <IconButton
                    style={[styles.upload,editable==undefined?{display:"none"}:{}]}
                    icon="pencil-outline"
                    size={avatarSize/4}
                    onPress={() => console.log('Pressed')
                    }
                    mode="outlined"
                />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: "#80D8F7",
    },
    upload: {
        position: "absolute",
        marginLeft: avatarSize*0.65,
        marginTop: avatarSize*0.65,
        backgroundColor: "#80D8F7",
    },
    avatarContainer: {
        flexDirection: "row",
    },
});

export default BigAvatar;