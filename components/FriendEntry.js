import * as React from 'react';
import { List } from "react-native-paper";
import { Text } from 'react-native';

import AvatarWithStar from "../components/AvatarWithStar";


const FriendEntry = (props) => {

    const { friend } = props;

    return (
        <React.Fragment>
            {/* <Text>{avatar}</Text> */}


        <List.Item 
            onPress={() => console.log("pressed list")}
            title = {friend.name} 
            description = {friend.description}
            left = {() => <AvatarWithStar defaultAvatar={props.defaultAvatar}/>}
        />
                </React.Fragment>
    );
}

export default FriendEntry;