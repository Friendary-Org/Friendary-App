import * as React from 'react';
import { List } from "react-native-paper";

import AvatarWithStar from "../components/AvatarWithStar";


const FriendEntry = (props) => {

    const { friend, navigation } = props;

    return (
        <React.Fragment>
            <List.Item 
                onPress={() => navigation.push("View Friend", {friendId: friend.id})}
                title = {friend.name} 
                description = {friend.description}
                left = {() => <AvatarWithStar avatar={friend.avatar} />}
            />
        </React.Fragment>
    );
}

export default FriendEntry;