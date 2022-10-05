import * as React from 'react';
import { StyleSheet } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import FriendEntry from './FriendEntry';


const AvatarWithStar = (props) => {

    const { defaultAvatar } = props;

    return (
        <React.Fragment>
            <IconButton 
                icon="star-outline" 
                style={styles.starIconButton} 
                size={20} 
                onPress={() => console.log("pressed star")} 
            />

            <Avatar.Image size={60} source={defaultAvatar} />
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    starIconButton: {
        margin: 0
    }
});

export default AvatarWithStar;