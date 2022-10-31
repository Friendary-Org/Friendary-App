import * as React from 'react';
import { List } from "react-native-paper";
import { debounce } from 'lodash';
import AvatarWithStar from "../components/AvatarWithStar";


const FriendEntry = (props) => {

    const { friend, navigation } = props;

    return (
        <React.Fragment>
            <List.Item 
                onPress={debounce(() => navigation.push("View Friend", {friendId: friend.id}),300)}
                title = {friend.name} 
                description = {friend.description}
                left = {() => <AvatarWithStar avatar={friend.avatar} />}
            />
        </React.Fragment>
    );
}

export default FriendEntry;