import * as React from 'react';
import { List } from "react-native-paper";

import AvatarWithStar from "../components/AvatarWithStar";


const FriendEntry = (props) => {

    const { friend } = props;

    return (
        <React.Fragment>
            <List.Item 
                onPress={() => console.log("pressed list")}
                title = {friend.name} 
                description = {friend.description}
                left = {() => <AvatarWithStar avatar={friend.avatar} />}
            />
        </React.Fragment>
    );
}

export default FriendEntry;