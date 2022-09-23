import * as React from 'react';
import { List } from "react-native-paper";
import AvatarWithStar from "../components/AvatarWithStar";

const FriendEntry = (props) => {

    const {title, description} = props;

    return (
        <List.Item onPress={() => console.log("pressed list")}
            title = {title} 
            description = {description}
            left = {() => <AvatarWithStar avatar={props.avatar}/>}
        />
    );
}

export default FriendEntry;