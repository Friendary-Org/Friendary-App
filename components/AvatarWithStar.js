import * as React from 'react';
import { StyleSheet } from "react-native";
import { List, Avatar, TouchableRipple, IconButton, MD3Colors } from "react-native-paper";

const AvatarWithStar = (props) => {

    const {avatar} = props;

    return (
        <React.Fragment>
            <IconButton icon="star-outline" style={styles.starIconButton} size={20} onPress={() => console.log("pressed star")} />
            <Avatar.Image size={60} source={avatar} />
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    starIconButton: {
        margin: 0
    }
});

export default AvatarWithStar;
