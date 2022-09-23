import * as React from 'react';
import { List, Avatar, TouchableRipple } from "react-native-paper";

const AvatarWithStar = () => {

    return (
        <TouchableRipple key={0} onPress={() => console.log("Pressed star")}>
            <List.Icon icon="star" />
        </TouchableRipple>
        , 
        <TouchableRipple key={1} onPress={() => console.log("Pressed avatar")}>
            <Avatar.Image size={64} source={require('../assets/avatar.png')} />
        </TouchableRipple>
    );
}

export default AvatarWithStar;
