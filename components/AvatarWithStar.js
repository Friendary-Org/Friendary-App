import * as React from 'react';
import { StyleSheet } from "react-native";
import { List, Avatar, TouchableRipple } from "react-native-paper";

const AvatarWithStar = (props) => {

    const {avatar} = props;

    return (
        <React.Fragment>
            <TouchableRipple style={styles.listIconTouch} onPress={() => console.log("pressed star")}>
                <List.Icon style={styles.listIcon} icon="star-outline"/>
            </TouchableRipple>
            
            <TouchableRipple onPress={() => console.log("pressed avatar")}>
                <Avatar.Image size={60} source={avatar} />
            </TouchableRipple>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    listIcon: {
        height: 20, 
        width: 20, 
        margin: 0
    },
    listIconTouch: {
        height: 25, 
        width: 25
    }
});

export default AvatarWithStar;
